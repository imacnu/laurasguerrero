-- Enable RLS on all tables
alter table public.categories enable row level security;
alter table public.collections enable row level security;
alter table public.products enable row level security;
alter table public.profiles enable row level security;
alter table public.addresses enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.blog_posts enable row level security;
alter table public.user_roles enable row level security;

-- Helper function: is_admin
create or replace function public.is_admin()
returns boolean as $$
  select exists (
    select 1 from public.user_roles
    where user_id = auth.uid() and role = 'admin'
  );
$$ language sql security definer stable;

-- Categories: public read, admin write
create policy "categories_select" on public.categories
  for select using (true);

create policy "categories_insert" on public.categories
  for insert with check (public.is_admin());

create policy "categories_update" on public.categories
  for update using (public.is_admin());

create policy "categories_delete" on public.categories
  for delete using (public.is_admin());

-- Collections: public read, admin write
create policy "collections_select" on public.collections
  for select using (true);

create policy "collections_insert" on public.collections
  for insert with check (public.is_admin());

create policy "collections_update" on public.collections
  for update using (public.is_admin());

create policy "collections_delete" on public.collections
  for delete using (public.is_admin());

-- Products: public read, admin write
create policy "products_select" on public.products
  for select using (true);

create policy "products_insert" on public.products
  for insert with check (public.is_admin());

create policy "products_update" on public.products
  for update using (public.is_admin());

create policy "products_delete" on public.products
  for delete using (public.is_admin());

-- Profiles: own row only
create policy "profiles_select" on public.profiles
  for select using (id = auth.uid() or public.is_admin());

create policy "profiles_update" on public.profiles
  for update using (id = auth.uid());

-- Addresses: own rows only
create policy "addresses_select" on public.addresses
  for select using (user_id = auth.uid() or public.is_admin());

create policy "addresses_insert" on public.addresses
  for insert with check (user_id = auth.uid());

create policy "addresses_update" on public.addresses
  for update using (user_id = auth.uid());

create policy "addresses_delete" on public.addresses
  for delete using (user_id = auth.uid());

-- Orders: own rows only (service role bypasses for webhook)
create policy "orders_select" on public.orders
  for select using (user_id = auth.uid() or public.is_admin());

create policy "orders_update" on public.orders
  for update using (public.is_admin());

-- Order items: accessible via order ownership
create policy "order_items_select" on public.order_items
  for select using (
    exists (
      select 1 from public.orders o
      where o.id = order_id and (o.user_id = auth.uid() or public.is_admin())
    )
  );

-- Blog posts: public read published, admin write
create policy "blog_posts_select" on public.blog_posts
  for select using (published = true or public.is_admin());

create policy "blog_posts_insert" on public.blog_posts
  for insert with check (public.is_admin());

create policy "blog_posts_update" on public.blog_posts
  for update using (public.is_admin());

create policy "blog_posts_delete" on public.blog_posts
  for delete using (public.is_admin());

-- User roles: admin only
create policy "user_roles_select" on public.user_roles
  for select using (user_id = auth.uid() or public.is_admin());

create policy "user_roles_insert" on public.user_roles
  for insert with check (public.is_admin());

create policy "user_roles_delete" on public.user_roles
  for delete using (public.is_admin());
