create table if not exists chat_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  model text not null,
  started_at timestamptz default now(),
  messages integer default 0,
  tokens   integer default 0,
  cost     numeric(10,4) default 0,
  metadata jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table chat_sessions enable row level security;

-- read / write your own rows
create policy "Users can CRUD their own sessions"
on chat_sessions
for all
using ( auth.uid() = user_id )
with check ( auth.uid() = user_id );