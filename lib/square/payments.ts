import { client } from './client';
import { randomUUID } from 'crypto';
import { supabase } from '@/lib/supabase/client';

export interface PaymentRequest {
  organizationId: string;
  userId: string;
  amountCents: number;
  currency: string;
  description?: string;
  subscriptionTier?: 'basic' | 'premium' | 'enterprise';
  subscriptionDuration?: '24h' | '1w' | '1m';
}

export interface PaymentResult {
  success: boolean;
  paymentId?: string;
  checkoutUrl?: string;
  error?: string;
}

export interface RefundRequest {
  paymentId: string;
  amountCents?: number; // Partial refund if specified
  reason?: string;
}

export interface RefundResult {
  success: boolean;
  refundId?: string;
  error?: string;
}

/**
 * Create a Square checkout session for subscription payment
 */
export async function createCheckoutSession(request: PaymentRequest): Promise<PaymentResult> {
  try {
    const idempotencyKey = randomUUID();
    
    // Create checkout request
    const checkoutRequest = {
      idempotencyKey,
      order: {
        locationId: process.env.SQUARE_LOCATION_ID || 'main',
        lineItems: [
          {
            name: `24Hour-AI ${request.subscriptionTier?.toUpperCase()} - ${request.subscriptionDuration}`,
            quantity: '1',
            basePriceMoney: {
              amount: BigInt(request.amountCents),
              currency: request.currency as any
            }
          }
        ]
      },
      checkoutOptions: {
        redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/billing?success=true`,
        askForShippingAddress: false,
        acceptedPaymentMethods: {
          applePay: true,
          googlePay: true,
          cashAppPay: true,
          afterpayClearpay: false
        }
      },
      prePopulatedData: {
        buyerEmail: '', // Will be populated from user context
      }
    };

    const { result, statusCode } = await client.checkoutApi.createPaymentLink(checkoutRequest);

    if (statusCode === 200 && result.paymentLink) {
      // Store payment intent in database
      const { data: paymentData, error: dbError } = await supabase
        .from('payments')
        .insert({
          organization_id: request.organizationId,
          user_id: request.userId,
          provider: 'square',
          provider_payment_id: result.paymentLink.id,
          amount_cents: request.amountCents,
          currency: request.currency,
          status: 'pending',
          metadata: {
            subscription_tier: request.subscriptionTier,
            subscription_duration: request.subscriptionDuration,
            idempotency_key: idempotencyKey
          }
        })
        .select()
        .single();

      if (dbError) {
        console.error('Database error storing payment:', dbError);
        return { success: false, error: 'Failed to store payment record' };
      }

      return {
        success: true,
        paymentId: paymentData.id,
        checkoutUrl: result.paymentLink.url
      };
    }

    return { success: false, error: 'Failed to create checkout session' };
  } catch (error) {
    console.error('Square checkout error:', error);
    return { success: false, error: 'Payment service unavailable' };
  }
}

/**
 * Process a refund for a completed payment
 */
export async function processRefund(request: RefundRequest): Promise<RefundResult> {
  try {
    // Get payment details from database
    const { data: payment, error: dbError } = await supabase
      .from('payments')
      .select('*')
      .eq('id', request.paymentId)
      .eq('status', 'completed')
      .single();

    if (dbError || !payment) {
      return { success: false, error: 'Payment not found or not eligible for refund' };
    }

    const refundAmount = request.amountCents || payment.amount_cents;
    const idempotencyKey = randomUUID();

    const refundRequest = {
      idempotencyKey,
      amountMoney: {
        amount: BigInt(refundAmount),
        currency: payment.currency as any
      },
      paymentId: payment.provider_payment_id,
      reason: request.reason || 'Customer request'
    };

    const { result, statusCode } = await client.refundsApi.refundPayment(refundRequest);

    if (statusCode === 200 && result.refund) {
      // Update payment status in database
      const { error: updateError } = await supabase
        .from('payments')
        .update({
          status: refundAmount === payment.amount_cents ? 'refunded' : 'partially_refunded',
          updated_at: new Date().toISOString(),
          metadata: {
            ...payment.metadata,
            refund_id: result.refund.id,
            refund_amount: refundAmount,
            refund_reason: request.reason
          }
        })
        .eq('id', request.paymentId);

      if (updateError) {
        console.error('Database error updating refund:', updateError);
      }

      return {
        success: true,
        refundId: result.refund.id
      };
    }

    return { success: false, error: 'Failed to process refund' };
  } catch (error) {
    console.error('Square refund error:', error);
    return { success: false, error: 'Refund service unavailable' };
  }
}

/**
 * Verify webhook signature for security
 */
export function verifyWebhookSignature(body: string, signature: string, url: string): boolean {
  try {
    const webhookSignatureKey = process.env.SQUARE_WEBHOOK_SIGNATURE_KEY;
    if (!webhookSignatureKey) {
      console.error('Missing webhook signature key');
      return false;
    }

    // Square webhook signature verification logic
    const crypto = require('crypto');
    const hmac = crypto.createHmac('sha256', webhookSignatureKey);
    hmac.update(url + body);
    const expectedSignature = hmac.digest('base64');

    return signature === expectedSignature;
  } catch (error) {
    console.error('Webhook signature verification error:', error);
    return false;
  }
}

/**
 * Handle Square webhook events
 */
export async function handleWebhookEvent(eventType: string, eventData: any): Promise<boolean> {
  try {
    switch (eventType) {
      case 'payment.updated':
        return await handlePaymentUpdated(eventData);
      case 'payment.created':
        return await handlePaymentCreated(eventData);
      case 'refund.updated':
        return await handleRefundUpdated(eventData);
      default:
        console.log(`Unhandled webhook event: ${eventType}`);
        return true;
    }
  } catch (error) {
    console.error('Webhook handling error:', error);
    return false;
  }
}

async function handlePaymentUpdated(eventData: any): Promise<boolean> {
  const payment = eventData.object?.payment;
  if (!payment) return false;

  const status = payment.status?.toLowerCase();
  const paymentId = payment.id;

  // Update payment status in database
  const { error } = await supabase
    .from('payments')
    .update({
      status: mapSquareStatusToInternal(status),
      updated_at: new Date().toISOString(),
      metadata: {
        square_payment_data: payment
      }
    })
    .eq('provider_payment_id', paymentId);

  if (error) {
    console.error('Failed to update payment status:', error);
    return false;
  }

  // If payment completed, activate subscription
  if (status === 'completed') {
    await activateSubscription(paymentId);
  }

  return true;
}

async function handlePaymentCreated(eventData: any): Promise<boolean> {
  // Payment creation is handled in createCheckoutSession
  return true;
}

async function handleRefundUpdated(eventData: any): Promise<boolean> {
  const refund = eventData.object?.refund;
  if (!refund) return false;

  // Update refund status if needed
  console.log('Refund updated:', refund);
  return true;
}

function mapSquareStatusToInternal(squareStatus: string): string {
  const statusMap: Record<string, string> = {
    'pending': 'pending',
    'completed': 'completed',
    'canceled': 'cancelled',
    'failed': 'failed'
  };

  return statusMap[squareStatus] || 'unknown';
}

async function activateSubscription(paymentId: string): Promise<void> {
  // Get payment details
  const { data: payment } = await supabase
    .from('payments')
    .select('*')
    .eq('provider_payment_id', paymentId)
    .single();

  if (!payment) return;

  const metadata = payment.metadata || {};
  const duration = metadata.subscription_duration;
  const tier = metadata.subscription_tier;

  // Calculate subscription end date
  let endDate = new Date();
  switch (duration) {
    case '24h':
      endDate.setHours(endDate.getHours() + 24);
      break;
    case '1w':
      endDate.setDate(endDate.getDate() + 7);
      break;
    case '1m':
      endDate.setMonth(endDate.getMonth() + 1);
      break;
    default:
      endDate.setHours(endDate.getHours() + 24); // Default to 24h
  }

  // Update organization subscription status
  await supabase
    .from('organizations')
    .update({
      subscription_tier: tier,
      subscription_end_date: endDate.toISOString(),
      updated_at: new Date().toISOString()
    })
    .eq('id', payment.organization_id);
}
