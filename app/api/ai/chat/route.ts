import { NextRequest, NextResponse } from 'next/server';
import { aiService } from '@/lib/ai/service';
import { ChatRequest } from '@/lib/ai/providers/base';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  try {
    const body = await request.json();
    const { model, messages, temperature, maxTokens, organizationId } = body;

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
      .is('deleted_at', null)
      .single();

    if (memberError || !membership) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    // Validate request
    if (!model || !messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid request format' }, { status: 400 });
    }

    // Prepare chat request
    const chatRequest: ChatRequest = {
      model,
      messages,
      temperature,
      maxTokens,
      userId: user.id,
      organizationId,
    };

    // Execute chat request
    const response = await aiService.chat(chatRequest);

    return NextResponse.json({
      id: response.id,
      model: response.model,
      content: response.content,
      usage: response.usage,
      finishReason: response.finishReason,
      provider: response.provider,
    });

  } catch (error: any) {
    console.error('AI Chat API error:', error);
    
    // Return appropriate error messages
    if (error.message.includes('Rate limit')) {
      return NextResponse.json({ error: 'Rate limit exceeded. Please try again later.' }, { status: 429 });
    } else if (error.message.includes('Subscription')) {
      return NextResponse.json({ error: 'Subscription required or expired.' }, { status: 402 });
    } else if (error.message.includes('Daily request limit')) {
      return NextResponse.json({ error: 'Daily request limit exceeded.' }, { status: 429 });
    } else {
      return NextResponse.json({ error: 'AI service temporarily unavailable.' }, { status: 503 });
    }
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get available models and provider status
    const models = aiService.getAvailableModels();
    const status = await aiService.getProviderStatus();

    return NextResponse.json({
      models,
      providers: status,
    });
  } catch (error) {
    console.error('AI Models API error:', error);
    return NextResponse.json({ error: 'Failed to fetch models' }, { status: 500 });
  }
}
