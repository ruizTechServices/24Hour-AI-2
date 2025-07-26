-- Seed script for 24HourGPT-main
-- Run via: supabase db reset && supabase db seed

-- NOTE: This script is idempotent via ON CONFLICT clauses.

-- === Demo organization ===
insert into public.organizations (id, name)
values ('11111111-1111-1111-1111-111111111111', 'Demo Org')
on conflict (id) do nothing;

-- === Demo user (optional) ===
-- To keep seeding simple, we only create a stub user row with minimal required fields.
-- Adjust columns to match your auth.users definition if constraints change.
insert into auth.users (id, email, raw_app_meta_data, raw_user_meta_data)
values (
  '00000000-0000-0000-0000-000000000001',
  'demo@example.com',
  '{"provider":"email"}',
  '{}'
) on conflict (id) do nothing;

-- === Membership ===
insert into public.organization_members (id, organization_id, user_id, role)
values (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  '00000000-0000-0000-0000-000000000001',
  'owner'
) on conflict (organization_id, user_id) do nothing;

-- === Sample chat messages ===
insert into public.chat_history (id, organization_id, user_id, role, content)
values
  (gen_random_uuid(), '11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000001', 'user', 'Hello, world!'),
  (gen_random_uuid(), '11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000001', 'assistant', 'Hi! How can I help?');

-- === Sample payment ===
insert into public.payments (
  id,
  organization_id,
  user_id,
  provider,
  provider_payment_id,
  amount_cents,
  currency,
  status
) values (
  '22222222-2222-2222-2222-222222222222',
  '11111111-1111-1111-1111-111111111111',
  '00000000-0000-0000-0000-000000000001',
  'square',
  'demo_txn',
  1999,
  'USD',
  'succeeded'
) on conflict (id) do nothing;
