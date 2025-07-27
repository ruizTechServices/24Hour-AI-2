import { NextRequest, NextResponse } from 'next/server';
import { createCheckoutSession, PaymentRequest } from '@/lib/square/payments';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { organizationId, subscriptionTier, subscriptionDuration } = body;

    // Get user from session
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Verify user is member of organization
    const { data: membership, error: memberError } = await supabase
      .from('organization_members')
      .select('role')
      .eq('organization_id', organizationId)
      .eq('user_id', user.id)
      .eq('deleted_at', null)
      .single();

    if (memberError || !membership) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    // Define pricing tiers
    const pricingMap: Record<string, Record<string, number>> = {
      basic: {
        '24h': 499,  // $4.99
        '1w': 1999,  // $19.99
        '1m': 4999   // $49.99
      },
      premium: {
        '24h': 999,  // $9.99
        '1w': 3999,  // $39.99
        '1m': 9999   // $99.99
      },
      enterprise: {
        '24h': 1999, // $19.99
        '1w': 7999,  // $79.99
        '1m': 19999  // $199.99
      }
    };

    const amountCents = pricingMap[subscriptionTier]?.[subscriptionDuration];
    if (!amountCents) {
      return NextResponse.json({ error: 'Invalid subscription tier or duration' }, { status: 400 });
    }

    const paymentRequest: PaymentRequest = {
      organizationId,
      userId: user.id,
      amountCents,
      currency: 'USD',
      subscriptionTier: subscriptionTier as any,
      subscriptionDuration: subscriptionDuration as any,
      description: `24Hour-AI ${subscriptionTier} subscription for ${subscriptionDuration}`
    };

    const result = await createCheckoutSession(paymentRequest);

    if (result.success) {
      return NextResponse.json({
        checkoutUrl: result.checkoutUrl,
        paymentId: result.paymentId
      });
    } else {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }
  } catch (error) {
    console.error('Checkout API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
