-- Seed categories
insert into public.categories (name, slug) values
  ('Anillos', 'anillos'),
  ('Collares', 'collares'),
  ('Pulseras', 'pulseras'),
  ('Pendientes', 'pendientes');

-- Seed collections
insert into public.collections (name, slug, description) values
  ('Esencia', 'esencia', 'Piezas minimalistas que capturan la esencia de lo eterno'),
  ('Jardín Secreto', 'jardin-secreto', 'Inspirada en la naturaleza y sus formas orgánicas'),
  ('Noche Dorada', 'noche-dorada', 'Diseños elegantes para los momentos más especiales');

-- Seed sample products
with cat as (select id from public.categories where slug = 'anillos' limit 1),
     col as (select id from public.collections where slug = 'esencia' limit 1)
insert into public.products (name, slug, description, price, images, stock, category_id, collection_id, material, featured)
select
  'Anillo Esencia',
  'anillo-esencia',
  'Un anillo de banda fina en oro de 18 quilates, diseñado para llevar sola o en combinación. Elegancia en su forma más pura.',
  285.00,
  array[]::text[],
  12,
  cat.id,
  col.id,
  'Oro 18k',
  true
from cat, col;

with cat as (select id from public.categories where slug = 'collares' limit 1),
     col as (select id from public.collections where slug = 'esencia' limit 1)
insert into public.products (name, slug, description, price, images, stock, category_id, collection_id, material, featured)
select
  'Collar Minimalista',
  'collar-minimalista',
  'Cadena fina con colgante geométrico en plata de ley. Sofisticación discreta para el día a día.',
  195.00,
  array[]::text[],
  8,
  cat.id,
  col.id,
  'Plata 925',
  true
from cat, col;

with cat as (select id from public.categories where slug = 'pendientes' limit 1),
     col as (select id from public.collections where slug = 'noche-dorada' limit 1)
insert into public.products (name, slug, description, price, images, stock, category_id, collection_id, material, featured)
select
  'Pendientes Luna',
  'pendientes-luna',
  'Pendientes colgantes inspirados en la media luna. Oro rosa con acabado satinado.',
  320.00,
  array[]::text[],
  6,
  cat.id,
  col.id,
  'Oro rosa 18k',
  true
from cat, col;

with cat as (select id from public.categories where slug = 'pulseras' limit 1)
insert into public.products (name, slug, description, price, images, stock, category_id, material, featured)
select
  'Pulsera Trenzada',
  'pulsera-trenzada',
  'Pulsera de cadena trenzada en plata con cierre de presión. Un clásico reinventado.',
  165.00,
  array[]::text[],
  15,
  cat.id,
  'Plata 925',
  false
from cat;
