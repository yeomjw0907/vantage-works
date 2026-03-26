-- Portfolio image storage bucket + admin upload policies

insert into storage.buckets (id, name, public)
values ('portfolio-images', 'portfolio-images', true)
on conflict (id) do nothing;

drop policy if exists "portfolio_images_public_read" on storage.objects;
create policy "portfolio_images_public_read"
on storage.objects
for select
to public
using (bucket_id = 'portfolio-images');

drop policy if exists "portfolio_images_admin_insert" on storage.objects;
create policy "portfolio_images_admin_insert"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'portfolio-images' and public.is_admin());

drop policy if exists "portfolio_images_admin_update" on storage.objects;
create policy "portfolio_images_admin_update"
on storage.objects
for update
to authenticated
using (bucket_id = 'portfolio-images' and public.is_admin())
with check (bucket_id = 'portfolio-images' and public.is_admin());

drop policy if exists "portfolio_images_admin_delete" on storage.objects;
create policy "portfolio_images_admin_delete"
on storage.objects
for delete
to authenticated
using (bucket_id = 'portfolio-images' and public.is_admin());

