-- Admin RBAC foundation:
-- - public.profiles: user role storage
-- - public.is_admin(): helper function for RLS policies in other tables

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role text not null default 'user',
  created_at timestamptz not null default now()
);

create index if not exists profiles_role_idx on public.profiles(role);

alter table public.profiles enable row level security;

-- Users can read their own profile (needed for the admin route guard).
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
on public.profiles
for select
to authenticated
using (id = auth.uid());

-- Admin check helper for other RLS policies.
create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.profiles
    where profiles.id = auth.uid()
      and profiles.role = 'admin'
  );
$$;

