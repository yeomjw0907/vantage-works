-- Leads + CMS content schema
-- public read: only published rows
-- admin write/read: via public.is_admin()

create extension if not exists pgcrypto;

-- 문의/리드 (admin 열람용)
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  inquiry_type text not null,
  company text not null,
  contact_name text not null,
  email text not null,
  phone text not null,
  details text not null
);

alter table public.leads enable row level security;

drop policy if exists "leads_admin_select" on public.leads;
create policy "leads_admin_select"
on public.leads
for select
to authenticated
using (public.is_admin());

-- CMS: FAQ
create table if not exists public.faq_items (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  question text not null,
  answer text not null,
  sort_order integer not null default 0,
  published boolean not null default true
);

create index if not exists faq_items_published_idx on public.faq_items(published, sort_order);

alter table public.faq_items enable row level security;

drop policy if exists "faq_items_public_select_published" on public.faq_items;
create policy "faq_items_public_select_published"
on public.faq_items
for select
to anon, authenticated
using (published = true);

drop policy if exists "faq_items_admin_select" on public.faq_items;
create policy "faq_items_admin_select"
on public.faq_items
for select
to authenticated
using (public.is_admin());

drop policy if exists "faq_items_admin_write" on public.faq_items;
create policy "faq_items_admin_write"
on public.faq_items
for insert
to authenticated
with check (public.is_admin());

create policy "faq_items_admin_update"
on public.faq_items
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "faq_items_admin_delete"
on public.faq_items
for delete
to authenticated
using (public.is_admin());

-- CMS: Portfolio
create table if not exists public.portfolio_items (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  client text not null,
  type text not null,
  items text not null,
  qty text not null,
  lead_time text not null,
  point text not null,
  image_url text not null,
  description text not null,
  sort_order integer not null default 0,
  published boolean not null default true
);

create index if not exists portfolio_items_published_idx on public.portfolio_items(published, sort_order);

alter table public.portfolio_items enable row level security;

drop policy if exists "portfolio_items_public_select_published" on public.portfolio_items;
create policy "portfolio_items_public_select_published"
on public.portfolio_items
for select
to anon, authenticated
using (published = true);

drop policy if exists "portfolio_items_admin_select" on public.portfolio_items;
create policy "portfolio_items_admin_select"
on public.portfolio_items
for select
to authenticated
using (public.is_admin());

drop policy if exists "portfolio_items_admin_write" on public.portfolio_items;
create policy "portfolio_items_admin_write"
on public.portfolio_items
for insert
to authenticated
with check (public.is_admin());

create policy "portfolio_items_admin_update"
on public.portfolio_items
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "portfolio_items_admin_delete"
on public.portfolio_items
for delete
to authenticated
using (public.is_admin());

-- CMS: Services
create table if not exists public.service_cards (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  title text not null,
  description text not null,
  image_url text not null,
  link_path text not null,
  sort_order integer not null default 0,
  published boolean not null default true
);

create index if not exists service_cards_published_idx on public.service_cards(published, sort_order);

alter table public.service_cards enable row level security;

drop policy if exists "service_cards_public_select_published" on public.service_cards;
create policy "service_cards_public_select_published"
on public.service_cards
for select
to anon, authenticated
using (published = true);

drop policy if exists "service_cards_admin_select" on public.service_cards;
create policy "service_cards_admin_select"
on public.service_cards
for select
to authenticated
using (public.is_admin());

drop policy if exists "service_cards_admin_write" on public.service_cards;
create policy "service_cards_admin_write"
on public.service_cards
for insert
to authenticated
with check (public.is_admin());

create policy "service_cards_admin_update"
on public.service_cards
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "service_cards_admin_delete"
on public.service_cards
for delete
to authenticated
using (public.is_admin());

-- Site settings (알림 수신처 등)
-- (MVP: admin_email/admin_phone 중심. 향후 nav/footer CMS로 확장하기 쉬운 형태로 둡니다.)
create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  updated_at timestamptz not null default now(),
  admin_email text,
  admin_phone text
);

alter table public.site_settings enable row level security;

drop policy if exists "site_settings_public_select" on public.site_settings;
create policy "site_settings_public_select"
on public.site_settings
for select
to anon, authenticated
using (true);

drop policy if exists "site_settings_admin_write" on public.site_settings;
create policy "site_settings_admin_write"
on public.site_settings
for insert
to authenticated
with check (public.is_admin());

create policy "site_settings_admin_update"
on public.site_settings
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "site_settings_admin_delete"
on public.site_settings
for delete
to authenticated
using (public.is_admin());

