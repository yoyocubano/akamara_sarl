-- Akamara Backend Schema: "El Tablero de la Creación"
-- Based on the Elemental/Orisha Theme (Metaphorical)

-- 1. DIVISIONS (The Archetypes)
create table divisions (
  id uuid default uuid_generate_v4() primary key,
  code text unique not null, -- 'legal', 'furniture', 'logistics', 'construction', 'gastronomy'
  name text not null, -- 'El Tablero', 'La Fragua', 'El Portal', etc.
  archetype_color text not null, -- Hex code for the UI theme
  description text
);

insert into divisions (code, name, archetype_color, description) values
('legal', 'El Tablero', '#166534', 'Gerencia y Legal (Orula/Wisdom)'),
('furniture', 'La Fragua', '#dc2626', 'Mobiliario y Diseño (Shango/Fire)'),
('logistics', 'El Portal', '#0f172a', 'Logística y Flota (Eshu/Crossroads)'),
('construction', 'Los Cimientos', '#1e3a8a', 'Construcción (Olokun/Deep Ocean)'),
('gastronomy', 'El Manantial', '#0ea5e9', 'Gastronomía (Yemaya/Water)');

-- 2. INVENTORY ("La Fragua" - Materials)
create table inventory (
  id uuid default uuid_generate_v4() primary key,
  division_id uuid references divisions(id),
  item_name text not null,
  category text not null, -- 'Wood', 'Metal', 'Textile'
  stock_quantity numeric default 0,
  unit text default 'units',
  status text default 'available' -- 'available', 'low_stock', 'reserved'
);

-- 3. PRODUCTS ("La Fragua" - Catalog)
create table products (
  id uuid default uuid_generate_v4() primary key,
  division_id uuid references divisions(id),
  name text not null,
  description text,
  image_url text,
  price numeric,
  is_featured boolean default false
);

-- 4. PROJECTS ("Los Cimientos" - Construction)
create table projects (
  id uuid default uuid_generate_v4() primary key,
  division_id uuid references divisions(id),
  title text not null,
  client text,
  status text default 'planning', -- 'planning', 'in_progress', 'completed'
  progress_percentage integer default 0,
  start_date date,
  end_date date
);

-- 5. LEGAL DOCS ("El Tablero" - The Oracle)
create table legal_docs (
  id uuid default uuid_generate_v4() primary key,
  division_id uuid references divisions(id),
  title text not null,
  doc_type text not null, -- 'contract', 'license', 'permit'
  storage_url text not null,
  expiration_date date,
  status text default 'active'
);

-- 6. LOGISTICS ("El Portal" - The Fleet)
create table fleet (
  id uuid default uuid_generate_v4() primary key,
  vehicle_type text not null,
  plate_number text unique,
  status text default 'active', -- 'active', 'maintenance', 'on_route'
  current_location text
);
