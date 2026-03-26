-- Site settings: customer logos for marquee sections
alter table public.site_settings
  add column if not exists customer_logos jsonb;

