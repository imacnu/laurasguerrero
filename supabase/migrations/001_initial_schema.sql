-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Updated at trigger function
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Categories
create table public.categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now()
);

-- Collections
create table public.collections (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  description text,
  image text,
  created_at timestamptz not null default now()
);

-- Products
create table public.products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  description text,
  price numeric(10,2) not null check (price > 0),
  images text[] not null default '{}',
  stock integer not null default 0 check (stock >= 0),
  category_id uuid references public.categories(id) on delete set null,
  material text,
  collection_id uuid references public.collections(id) on delete set null,
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_products_slug on public.products(slug);
create index idx_products_category_id on public.products(category_id);
create index idx_products_collection_id on public.products(collection_id);
create index idx_products_featured on public.products(featured) where featured = true;

create trigger set_products_updated_at
  before update on public.products
  for each row execute function set_updated_at();

-- Profiles (extends auth.users)
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute function set_updated_at();

-- Addresses
create table public.addresses (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  label text not null default 'Casa',
  full_name text not null,
  line1 text not null,
  line2 text,
  city text not null,
  province text not null,
  postal_code text not null,
  country text not null default 'ES',
  is_default boolean not null default false,
  created_at timestamptz not null default now()
);

create index idx_addresses_user_id on public.addresses(user_id);

-- Order status enum
create type order_status as enum (
  'pending',
  'processing',
  'shipped',
  'delivered',
  'cancelled'
);

-- Orders
create table public.orders (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete set null,
  status order_status not null default 'pending',
  total numeric(10,2) not null check (total >= 0),
  stripe_session_id text unique,
  shipping_address jsonb,
  customer_email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_orders_user_id on public.orders(user_id);
create index idx_orders_stripe_session_id on public.orders(stripe_session_id);
create index idx_orders_status on public.orders(status);

create trigger set_orders_updated_at
  before update on public.orders
  for each row execute function set_updated_at();

-- Order items
create table public.order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  product_name text not null,
  product_image text,
  quantity integer not null check (quantity > 0),
  price numeric(10,2) not null check (price >= 0),
  created_at timestamptz not null default now()
);

create index idx_order_items_order_id on public.order_items(order_id);

-- Blog posts
create table public.blog_posts (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text not null default '',
  cover_image text,
  published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_blog_posts_slug on public.blog_posts(slug);
create index idx_blog_posts_published on public.blog_posts(published, published_at desc)
  where published = true;

create trigger set_blog_posts_updated_at
  before update on public.blog_posts
  for each row execute function set_updated_at();

-- User roles
create table public.user_roles (
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('admin', 'staff')),
  created_at timestamptz not null default now(),
  primary key (user_id, role)
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
