-- Portfolio: multiple images stored as JSON array; image_url remains cover / list thumbnail

alter table public.portfolio_items
  add column if not exists gallery_urls jsonb not null default '[]'::jsonb;

update public.portfolio_items
set gallery_urls = jsonb_build_array(image_url)
where coalesce(nullif(trim(image_url), ''), '') <> ''
  and jsonb_array_length(coalesce(gallery_urls, '[]'::jsonb)) = 0;
