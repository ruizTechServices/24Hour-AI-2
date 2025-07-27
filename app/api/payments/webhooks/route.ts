import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhookSignature, handleWebhookEvent } from '@/lib/square/payments';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-square-signature') || '';
    const url = request.url;

    // Verify webhook signature for security
    if (!verifyWebhookSignature(body, signature, url)) {
      console.error('Invalid webhook signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const event = JSON.parse(body);
    const eventType = event.type;
    const eventData = event.data;

    console.log(`Processing Square webhook: ${eventType}`);

    const success = await handleWebhookEvent(eventType, eventData);

    if (success) {
      return NextResponse.json({ received: true });
    } else {
      return NextResponse.json({ error: 'Failed to process event' }, { status: 500 });
    }
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
