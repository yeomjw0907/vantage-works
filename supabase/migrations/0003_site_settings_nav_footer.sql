-- Extend site_settings with data for Navbar/Footer CMS

alter table public.site_settings
  add column if not exists company_name text,
  add column if not exists company_description text,
  add column if not exists address text,
  add column if not exists phone text,
  add column if not exists email text,
  add column if not exists nav_items jsonb,
  add column if not exists footer_service_links jsonb,
  add column if not exists footer_support_links jsonb;

