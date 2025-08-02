import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createClient as createSupabaseServerClient } from '@/lib/supabase/server';
import Chatbot from './Chatbot';

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient(cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Retrieve first organization membership (if any)
  const { data: membership } = await supabase
    .from('organization_members')
    .select('organization_id')
    .eq('user_id', user.id)
    .is('deleted_at', null)
    .order('created_at', { ascending: true })
    .limit(1)
    .single();

  const organizationId: string | null = membership?.organization_id ?? null;

  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="mb-6 text-2xl font-bold text-white">24HourAI Chatbot</h1>
      <Chatbot organizationId={organizationId} />
    </section>
  );
}
