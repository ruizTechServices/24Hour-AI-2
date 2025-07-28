import { NextRequest, NextResponse } from 'next/server';
import { processRefund, RefundRequest } from '@/lib/square/payments';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  try {
    const body = await request.json();
    const { paymentId, amountCents, reason } = body;

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

    // Get payment details and verify ownership
    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .select(`
        *,
        organization_members!inner(role)
      `)
      .eq('id', paymentId)
      .eq('organization_members.user_id', user.id)
      .eq('organization_members.deleted_at', null)
      .single();

    if (paymentError || !payment) {
      return NextResponse.json({ error: 'Payment not found or access denied' }, { status: 404 });
    }

    // Only owners and admins can process refunds
    const userRole = payment.organization_members.role;
    if (!['owner', 'admin'].includes(userRole)) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    const refundRequest: RefundRequest = {
      paymentId,
      amountCents,
      reason
    };

    const result = await processRefund(refundRequest);

    if (result.success) {
      return NextResponse.json({
        success: true,
        refundId: result.refundId
      });
    } else {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }
  } catch (error) {
    console.error('Refund API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
