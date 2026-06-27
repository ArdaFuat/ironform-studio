-- IRONFORM STUDIO SUPABASE SCHEMA
-- IMPORTANT: Before running, replace YOUR_ADMIN_EMAIL@example.com below with your real admin email.
-- Run this whole file in Supabase Dashboard > SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  email text primary key,
  created_at timestamptz default now(),
  created_by text
);

create table if not exists public.site_settings (
  id text primary key default 'main',
  brand_name text default 'IRONFORM STUDIO',
  logo_url text default 'assets/logo.png',
  email text default 'hello@ironformstudio.com',
  phone text default '',
  instagram text default '',
  facebook text default '',
  tiktok text default '',
  address text default 'United States',
  social jsonb default '{}'::jsonb,
  updated_at timestamptz default now()
);

create table if not exists public.page_sections (
  id uuid primary key default gen_random_uuid(),
  page text not null,
  section_key text not null,
  sort_order int default 1,
  kind text default 'text',
  visible boolean default true,
  content jsonb not null default '{}'::jsonb,
  images text[] default '{}',
  updated_at timestamptz default now(),
  unique(page, section_key)
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  category text default 'Sculpture',
  status text default 'Concept',
  price_text text default 'Price on request',
  dimensions text default 'Custom',
  material text default 'Laser-cut steel',
  featured boolean default false,
  visible boolean default true,
  sort_order int default 1,
  title jsonb not null default '{}'::jsonb,
  description jsonb not null default '{}'::jsonb,
  images text[] default '{}',
  specs jsonb default '{}'::jsonb,
  updated_at timestamptz default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  category text default 'Project',
  status text default 'Planning',
  location text default 'United States',
  featured boolean default false,
  visible boolean default true,
  sort_order int default 1,
  title jsonb not null default '{}'::jsonb,
  description jsonb not null default '{}'::jsonb,
  images text[] default '{}',
  updated_at timestamptz default now()
);

create table if not exists public.order_inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  name text,
  email text,
  phone text,
  interest text,
  message text,
  source text default 'website'
);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end; $$;

drop trigger if exists trg_site_settings_updated on public.site_settings;
create trigger trg_site_settings_updated before update on public.site_settings for each row execute procedure public.set_updated_at();
drop trigger if exists trg_page_sections_updated on public.page_sections;
create trigger trg_page_sections_updated before update on public.page_sections for each row execute procedure public.set_updated_at();
drop trigger if exists trg_products_updated on public.products;
create trigger trg_products_updated before update on public.products for each row execute procedure public.set_updated_at();
drop trigger if exists trg_projects_updated on public.projects;
create trigger trg_projects_updated before update on public.projects for each row execute procedure public.set_updated_at();

-- Admin check. It is SECURITY DEFINER so RLS on admin_users does not block the check.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email',''))
  );
$$;

grant execute on function public.is_admin() to anon, authenticated;

alter table public.admin_users enable row level security;
alter table public.site_settings enable row level security;
alter table public.page_sections enable row level security;
alter table public.products enable row level security;
alter table public.projects enable row level security;
alter table public.order_inquiries enable row level security;

-- Remove old policies if you re-run the SQL.
drop policy if exists "admins read admins" on public.admin_users;
drop policy if exists "admins insert admins" on public.admin_users;
drop policy if exists "admins update admins" on public.admin_users;
drop policy if exists "admins delete admins" on public.admin_users;
drop policy if exists "public read settings" on public.site_settings;
drop policy if exists "admins mutate settings" on public.site_settings;
drop policy if exists "public read visible sections" on public.page_sections;
drop policy if exists "admins mutate sections" on public.page_sections;
drop policy if exists "public read visible products" on public.products;
drop policy if exists "admins mutate products" on public.products;
drop policy if exists "public read visible projects" on public.projects;
drop policy if exists "admins mutate projects" on public.projects;
drop policy if exists "public insert inquiries" on public.order_inquiries;
drop policy if exists "admins read inquiries" on public.order_inquiries;
drop policy if exists "admins mutate inquiries" on public.order_inquiries;

create policy "admins read admins" on public.admin_users for select using (public.is_admin());
create policy "admins insert admins" on public.admin_users for insert with check (public.is_admin());
create policy "admins update admins" on public.admin_users for update using (public.is_admin()) with check (public.is_admin());
create policy "admins delete admins" on public.admin_users for delete using (public.is_admin());

create policy "public read settings" on public.site_settings for select using (true);
create policy "admins mutate settings" on public.site_settings for all using (public.is_admin()) with check (public.is_admin());

create policy "public read visible sections" on public.page_sections for select using (visible = true or public.is_admin());
create policy "admins mutate sections" on public.page_sections for all using (public.is_admin()) with check (public.is_admin());

create policy "public read visible products" on public.products for select using (visible = true or public.is_admin());
create policy "admins mutate products" on public.products for all using (public.is_admin()) with check (public.is_admin());

create policy "public read visible projects" on public.projects for select using (visible = true or public.is_admin());
create policy "admins mutate projects" on public.projects for all using (public.is_admin()) with check (public.is_admin());

create policy "public insert inquiries" on public.order_inquiries for insert with check (true);
create policy "admins read inquiries" on public.order_inquiries for select using (public.is_admin());
create policy "admins mutate inquiries" on public.order_inquiries for all using (public.is_admin()) with check (public.is_admin());

-- First admin. Replace this email before running.
insert into public.admin_users (email, created_by)
values (lower('YOUR_ADMIN_EMAIL@example.com'), 'bootstrap')
on conflict (email) do nothing;

-- Storage bucket for uploaded images.
insert into storage.buckets (id, name, public)
values ('site-assets', 'site-assets', true)
on conflict (id) do update set public = true;

drop policy if exists "public read site assets" on storage.objects;
drop policy if exists "admins insert site assets" on storage.objects;
drop policy if exists "admins update site assets" on storage.objects;
drop policy if exists "admins delete site assets" on storage.objects;
create policy "public read site assets" on storage.objects for select using (bucket_id = 'site-assets');
create policy "admins insert site assets" on storage.objects for insert with check (bucket_id = 'site-assets' and public.is_admin());
create policy "admins update site assets" on storage.objects for update using (bucket_id = 'site-assets' and public.is_admin()) with check (bucket_id = 'site-assets' and public.is_admin());
create policy "admins delete site assets" on storage.objects for delete using (bucket_id = 'site-assets' and public.is_admin());

-- Starter data.
insert into public.site_settings (id, brand_name, logo_url, email, instagram, address)
values ('main','IRONFORM STUDIO','assets/logo.png','hello@ironformstudio.com','https://instagram.com/','United States')
on conflict (id) do update set brand_name=excluded.brand_name;

insert into public.page_sections (page, section_key, sort_order, kind, visible, images, content) values
('home','hero',1,'hero',true,array['assets/placeholders/eagle.svg'], '{"eyebrow":{"en":"Industrial art studio","tr":"Endüstriyel sanat stüdyosu","es":"Estudio de arte industrial"},"title":{"en":"Low-Poly Metal Sculptures, Forged for Bold Spaces.","tr":"Güçlü mekanlar için low-poly metal heykeller.","es":"Esculturas metálicas low-poly para espacios audaces."},"subtitle":{"en":"Ironform Studio designs and produces angular steel art for homes, offices, hotels, gardens and statement interiors across the American market.","tr":"Ironform Studio; evler, ofisler, oteller, bahçeler ve dikkat çeken iç mekanlar için köşeli metal sanat ürünleri tasarlar ve üretir.","es":"Ironform Studio diseña y produce arte angular en acero para hogares, oficinas, hoteles, jardines e interiores memorables."},"body":{"en":"Sculptural silhouettes, precision-cut metal, hand-formed details and durable finishes built to become the strongest piece in the room.","tr":"Heykelsi siluetler, hassas kesilmiş metal, elle form verilen detaylar ve mekanın en güçlü parçası olacak dayanıklı yüzeyler.","es":"Siluetas escultóricas, metal cortado con precisión, detalles formados a mano y acabados duraderos."}}'::jsonb),
('home','intro',2,'feature',true,array['assets/placeholders/workshop.svg'], '{"title":{"en":"Metal art with architectural presence.","tr":"Mimari etkiye sahip metal sanat.","es":"Arte metálico con presencia arquitectónica."},"subtitle":{"en":"Built for collectors, designers, builders and brands that need a centerpiece with weight, character and permanence.","tr":"Ağırlığı, karakteri ve kalıcılığı olan bir merkez parça arayan koleksiyonerler, tasarımcılar, inşaat firmaları ve markalar için.","es":"Creado para coleccionistas, diseñadores, constructores y marcas que necesitan una pieza central con carácter y permanencia."},"body":{"en":"Our visual language comes from low-poly geometry: sharp planes, clean edges and silhouettes that read clearly from across a lobby, garden or showroom.","tr":"Görsel dilimiz low-poly geometriden gelir: keskin yüzeyler, temiz kenarlar ve lobi, bahçe ya da showroom içinde uzaktan bile net okunan siluetler.","es":"Nuestro lenguaje visual nace de la geometría low-poly: planos definidos, bordes limpios y siluetas claras en cualquier espacio."}}'::jsonb),
('what-we-do','process-intro',1,'text',true,array['assets/placeholders/workshop.svg'], '{"title":{"en":"A production workflow made for sharp geometry.","tr":"Keskin geometri için tasarlanmış üretim akışı.","es":"Un flujo de producción para geometría definida."},"subtitle":{"en":"From model selection to final coating, every decision is made to keep the sculpture clean, strong and visually striking.","tr":"Model seçiminden son kaplamaya kadar her karar; heykelin temiz, güçlü ve etkileyici görünmesi için verilir.","es":"Desde la selección del modelo hasta el acabado final, cada decisión mantiene la pieza limpia, fuerte e impactante."},"body":{"en":"The process begins with choosing or developing the model. The form is modeled and translated into buildable drawings. Once the drawing stage is complete, steel parts are laser-cut, shaped into the correct angles, welded, refined and finished for indoor or outdoor use.","tr":"Süreç modelin seçilmesi veya oluşturulmasıyla başlar. Form modellenir ve üretilebilir çizimlere dönüştürülür. Çizim tamamlandıktan sonra çelik parçalar lazer kesimle kesilir, doğru açılara getirilir, kaynaklanır, temizlenir ve iç/dış mekan kullanımına uygun şekilde bitirilir.","es":"El proceso comienza con la selección o desarrollo del modelo. La forma se modela y se convierte en dibujos fabricables. Luego las piezas de acero se cortan con láser, se forman, se sueldan, se refinan y se terminan para uso interior o exterior."}}'::jsonb),
('about','story',1,'text',true,array['assets/placeholders/eagle.svg'], '{"title":{"en":"Ironform Studio turns steel into modern statement art.","tr":"Ironform Studio çeliği modern statement art ürünlerine dönüştürür.","es":"Ironform Studio transforma el acero en arte moderno de alto impacto."},"subtitle":{"en":"A sculptural brand focused on bold geometry, durable materials and premium presentation for the U.S. market.","tr":"ABD pazarı için güçlü geometriye, dayanıklı malzemeye ve premium sunuma odaklanan heykelsi bir marka.","es":"Una marca escultórica enfocada en geometría audaz, materiales duraderos y presentación premium para el mercado de EE. UU."},"body":{"en":"We create low-poly metal sculptures that feel both engineered and artistic. The work is designed to sit comfortably in residential interiors, outdoor landscapes, hotel lobbies, office entries and branded environments where a memorable focal point matters.","tr":"Hem mühendislik hem sanat hissi veren low-poly metal heykeller üretiyoruz. Ürünler; konut iç mekanları, dış peyzajlar, otel lobileri, ofis girişleri ve marka alanlarında güçlü bir odak noktası oluşturmak için tasarlanır.","es":"Creamos esculturas metálicas low-poly con una sensación artística e ingeniería precisa, pensadas para interiores residenciales, jardines, hoteles, oficinas y espacios de marca."}}'::jsonb),
('custom-orders','coming-soon',1,'text',true,array['assets/placeholders/stag.svg'], '{"title":{"en":"Custom order requests are coming soon.","tr":"Özel sipariş talepleri çok yakında aktif olacak.","es":"Los pedidos especiales estarán disponibles muy pronto."},"subtitle":{"en":"Soon you will be able to request a sculpture around your preferred animal, size, finish and space.","tr":"Yakında istediğin hayvan/model, ölçü, kaplama ve mekana göre özel heykel talebi oluşturabileceksin.","es":"Pronto podrás solicitar una escultura según animal, tamaño, acabado y espacio."},"body":{"en":"Until the custom builder is active, you can still contact Ironform Studio for early project conversations. The future system will include reference uploads, preferred dimensions, indoor/outdoor use, finish choices and budget range.","tr":"Özel sipariş sistemi aktif olana kadar erken proje görüşmesi için yine iletişime geçebilirsin. Gelecek sistemde referans görsel yükleme, ölçü, iç/dış mekan seçimi, kaplama ve bütçe aralığı alanları olacak.","es":"Hasta que el configurador esté activo, puedes contactarnos para conversaciones iniciales. El sistema incluirá referencias, dimensiones, uso interior/exterior, acabados y rango de presupuesto."}}'::jsonb),
('contact','intro',1,'text',true,array['assets/placeholders/workshop.svg'], '{"title":{"en":"Tell us what kind of piece you want to build.","tr":"Nasıl bir ürün yaptırmak istediğini anlat.","es":"Cuéntanos qué tipo de pieza quieres crear."},"subtitle":{"en":"Send an inquiry for catalog pieces, project partnerships, commercial installations or early custom order conversations.","tr":"Katalog ürünleri, proje iş birlikleri, ticari alan kurulumları veya erken özel sipariş görüşmeleri için talep gönder.","es":"Envía una consulta para piezas de catálogo, alianzas, instalaciones comerciales o pedidos especiales."},"body":{"en":"The form is saved directly into Supabase when the backend is connected. You can review incoming requests from the Turkish admin panel.","tr":"Backend bağlandığında form doğrudan Supabase içine kaydedilir. Gelen talepleri Türkçe admin panelinden inceleyebilirsin.","es":"El formulario se guarda en Supabase cuando el backend está conectado. Puedes revisar solicitudes desde el panel de admin en turco."}}'::jsonb)
on conflict (page, section_key) do update set content=excluded.content, images=excluded.images, visible=excluded.visible;

insert into public.products (slug, category, status, price_text, dimensions, material, featured, visible, sort_order, title, description, images, specs) values
('eagle-wall-sculpture','Wall Art','Available Soon','Price on request','Custom / Medium / Large','Laser-cut steel',true,true,1,'{"en":"Eagle Wall Sculpture","tr":"Kartal Duvar Heykeli","es":"Escultura de Águila para Pared"}'::jsonb,'{"en":"A bold low-poly eagle silhouette designed for offices, entry walls and brand environments.","tr":"Ofisler, giriş duvarları ve marka alanları için tasarlanmış güçlü low-poly kartal silueti.","es":"Una silueta de águila low-poly para oficinas, entradas y espacios de marca."}'::jsonb,array['assets/placeholders/eagle.svg'],'{"finish":"Matte black / custom","use":"Indoor / covered outdoor"}'::jsonb),
('panther-statement-piece','Animal Sculptures','Concept','Price on request','36–96 in range','Steel body + coated finish',true,true,2,'{"en":"Panther Statement Piece","tr":"Panter Statement Heykeli","es":"Pieza Principal Pantera"}'::jsonb,'{"en":"A dynamic angular panther form for luxury interiors, showrooms and dramatic outdoor corners.","tr":"Lüks iç mekanlar, showroomlar ve dramatik dış köşeler için dinamik, köşeli panter formu.","es":"Una forma angular y dinámica de pantera para interiores de lujo, showrooms y exteriores."}'::jsonb,array['assets/placeholders/panther.svg'],'{"finish":"Satin black / weatherproof option","use":"Indoor / outdoor"}'::jsonb),
('wolf-geometric-wall-art','Wall Art','Available Soon','Price on request','24–72 in range','Powder-coated steel',true,true,3,'{"en":"Wolf Geometric Wall Art","tr":"Kurt Geometrik Duvar Sanatı","es":"Arte Geométrico de Lobo"}'::jsonb,'{"en":"A sharp wolf face built for modern cabins, offices, studios and statement living rooms.","tr":"Modern dağ evleri, ofisler, stüdyolar ve dikkat çeken salonlar için keskin kurt yüzü.","es":"Un rostro de lobo definido para cabañas modernas, oficinas, estudios y salas memorables."}'::jsonb,array['assets/placeholders/wolf.svg'],'{"finish":"Raw steel look / painted","use":"Indoor"}'::jsonb),
('stag-lobby-installation','Commercial','Project Concept','Quote required','Large scale','Structural steel panels',false,true,4,'{"en":"Stag Lobby Installation","tr":"Geyik Lobi Kurulumu","es":"Instalación de Ciervo para Lobby"}'::jsonb,'{"en":"A large-format stag concept designed for hotel lobbies, resorts and mountain-inspired spaces.","tr":"Otel lobileri, resort alanları ve dağ konseptli mekanlar için büyük ölçekli geyik konsepti.","es":"Concepto de ciervo a gran escala para hoteles, resorts y espacios inspirados en montaña."}'::jsonb,array['assets/placeholders/stag.svg'],'{"finish":"Architectural coating","use":"Commercial interior"}'::jsonb)
on conflict (slug) do update set title=excluded.title, description=excluded.description, images=excluded.images;

insert into public.projects (slug, category, status, location, featured, visible, sort_order, title, description, images) values
('signature-eagle-brand-wall','Brand Wall','Concept Ready','United States',true,true,1,'{"en":"Signature Eagle Brand Wall","tr":"İmza Kartal Marka Duvarı","es":"Muro de Marca Águila"}'::jsonb,'{"en":"A strong metal eagle composition created as a hero piece for offices, studios and commercial reception areas.","tr":"Ofisler, stüdyolar ve ticari resepsiyon alanları için ana odak parçası olarak oluşturulan güçlü metal kartal kompozisyonu.","es":"Composición metálica de águila creada como pieza principal para oficinas, estudios y recepciones comerciales."}'::jsonb,array['assets/placeholders/eagle.svg','assets/placeholders/workshop.svg']),
('outdoor-panther-garden-piece','Outdoor Sculpture','Concept Ready','United States',true,true,2,'{"en":"Outdoor Panther Garden Piece","tr":"Dış Mekan Panter Bahçe Heykeli","es":"Pantera para Jardín Exterior"}'::jsonb,'{"en":"A weather-ready panther concept designed to add movement and sharp character to landscaped spaces.","tr":"Peyzaj alanlarına hareket ve keskin karakter katmak için tasarlanmış dış mekana uygun panter konsepti.","es":"Concepto de pantera para exterior que aporta movimiento y carácter a espacios verdes."}'::jsonb,array['assets/placeholders/panther.svg','assets/placeholders/stag.svg']),
('hotel-lobby-stag-concept','Hospitality','Planning','United States',false,true,3,'{"en":"Hotel Lobby Stag Concept","tr":"Otel Lobisi Geyik Konsepti","es":"Concepto Ciervo para Hotel"}'::jsonb,'{"en":"An architectural stag sculpture concept for hospitality spaces that need a premium focal point.","tr":"Premium bir odak noktası isteyen otel alanları için mimari geyik heykeli konsepti.","es":"Concepto de ciervo arquitectónico para espacios hoteleros con presencia premium."}'::jsonb,array['assets/placeholders/stag.svg','assets/placeholders/workshop.svg'])
on conflict (slug) do update set title=excluded.title, description=excluded.description, images=excluded.images;
