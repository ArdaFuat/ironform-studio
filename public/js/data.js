import { getSupabase } from './supabaseClient.js';

const DATA_TIMEOUT_MS = 1200;
const queryWithTimeout = (query, ms = DATA_TIMEOUT_MS) => Promise.race([
  query,
  new Promise(resolve => setTimeout(() => resolve({ data: null, error: new Error('timeout') }), ms))
]);

export const fallbackSettings = {
  id: 'main',
  brand_name: 'IRONFORM STUDIO',
  logo_url: 'assets/logo.webp',
  email: 'hello@ironformstudio.com',
  phone: '',
  instagram: 'https://instagram.com/',
  facebook: '',
  tiktok: '',
  address: 'United States',
  social: {}
};

export const fallbackSections = [
  {
    page:'home', section_key:'hero', sort_order:1, visible:true, kind:'hero', images:['assets/placeholders/eagle.svg'],
    content:{
      title:{en:'Low-Poly Metal Sculptures, Forged for Bold Spaces.',tr:'Güçlü mekanlar için low-poly metal heykeller.',es:'Esculturas metálicas low-poly para espacios audaces.'},
      subtitle:{en:'Ironform Studio designs and produces angular steel art for homes, offices, hotels, gardens and statement interiors across the American market.',tr:'Ironform Studio; evler, ofisler, oteller, bahçeler ve dikkat çeken iç mekanlar için köşeli metal sanat ürünleri tasarlar ve üretir.',es:'Ironform Studio diseña y produce arte angular en acero para hogares, oficinas, hoteles, jardines e interiores memorables.'},
      eyebrow:{en:'Industrial art studio',tr:'Endüstriyel sanat stüdyosu',es:'Estudio de arte industrial'},
      body:{en:'Sculptural silhouettes, precision-cut metal, hand-formed details and durable finishes built to become the strongest piece in the room.',tr:'Heykelsi siluetler, hassas kesilmiş metal, elle form verilen detaylar ve mekanın en güçlü parçası olacak dayanıklı yüzeyler.',es:'Siluetas escultóricas, metal cortado con precisión, detalles formados a mano y acabados duraderos.'}
    }
  },
  {
    page:'home', section_key:'intro', sort_order:2, visible:true, kind:'feature', images:['assets/placeholders/workshop.svg'],
    content:{
      title:{en:'Metal art with architectural presence.',tr:'Mimari etkiye sahip metal sanat.',es:'Arte metálico con presencia arquitectónica.'},
      subtitle:{en:'Built for collectors, designers, builders and brands that need a centerpiece with weight, character and permanence.',tr:'Ağırlığı, karakteri ve kalıcılığı olan bir merkez parça arayan koleksiyonerler, tasarımcılar, inşaat firmaları ve markalar için.',es:'Creado para coleccionistas, diseñadores, constructores y marcas que necesitan una pieza central con carácter y permanencia.'},
      body:{en:'Our visual language comes from low-poly geometry: sharp planes, clean edges and silhouettes that read clearly from across a lobby, garden or showroom.',tr:'Görsel dilimiz low-poly geometriden gelir: keskin yüzeyler, temiz kenarlar ve lobi, bahçe ya da showroom içinde uzaktan bile net okunan siluetler.',es:'Nuestro lenguaje visual nace de la geometría low-poly: planos definidos, bordes limpios y siluetas claras en cualquier espacio.'}
    }
  },
  {
    page:'what-we-do', section_key:'process-intro', sort_order:1, visible:true, kind:'text', images:['assets/placeholders/workshop.svg'],
    content:{
      title:{en:'A production workflow made for sharp geometry.',tr:'Keskin geometri için tasarlanmış üretim akışı.',es:'Un flujo de producción para geometría definida.'},
      subtitle:{en:'From model selection to final coating, every decision is made to keep the sculpture clean, strong and visually striking.',tr:'Model seçiminden son kaplamaya kadar her karar; heykelin temiz, güçlü ve etkileyici görünmesi için verilir.',es:'Desde la selección del modelo hasta el acabado final, cada decisión mantiene la pieza limpia, fuerte e impactante.'},
      body:{en:'The process begins with choosing or developing the model. The form is modeled and translated into buildable drawings. Once the drawing stage is complete, steel parts are laser-cut, shaped into the correct angles, welded, refined and finished for indoor or outdoor use.',tr:'Süreç modelin seçilmesi veya oluşturulmasıyla başlar. Form modellenir ve üretilebilir çizimlere dönüştürülür. Çizim tamamlandıktan sonra çelik parçalar lazer kesimle kesilir, doğru açılara getirilir, kaynaklanır, temizlenir ve iç/dış mekan kullanımına uygun şekilde bitirilir.',es:'El proceso comienza con la selección o desarrollo del modelo. La forma se modela y se convierte en dibujos fabricables. Luego las piezas de acero se cortan con láser, se forman, se sueldan, se refinan y se terminan para uso interior o exterior.'}
    }
  },
  {
    page:'about', section_key:'story', sort_order:1, visible:true, kind:'text', images:['assets/placeholders/eagle.svg'],
    content:{
      title:{en:'Ironform Studio turns steel into modern statement art.',tr:'Ironform Studio çeliği modern statement art ürünlerine dönüştürür.',es:'Ironform Studio transforma el acero en arte moderno de alto impacto.'},
      subtitle:{en:'A sculptural brand focused on bold geometry, durable materials and premium presentation for the U.S. market.',tr:'ABD pazarı için güçlü geometriye, dayanıklı malzemeye ve premium sunuma odaklanan heykelsi bir marka.',es:'Una marca escultórica enfocada en geometría audaz, materiales duraderos y presentación premium para el mercado de EE. UU.'},
      body:{en:'We create low-poly metal sculptures that feel both engineered and artistic. The work is designed to sit comfortably in residential interiors, outdoor landscapes, hotel lobbies, office entries and branded environments where a memorable focal point matters.',tr:'Hem mühendislik hem sanat hissi veren low-poly metal heykeller üretiyoruz. Ürünler; konut iç mekanları, dış peyzajlar, otel lobileri, ofis girişleri ve marka alanlarında güçlü bir odak noktası oluşturmak için tasarlanır.',es:'Creamos esculturas metálicas low-poly con una sensación artística e ingeniería precisa, pensadas para interiores residenciales, jardines, hoteles, oficinas y espacios de marca.'}
    }
  },
  {
    page:'custom-orders', section_key:'coming-soon', sort_order:1, visible:true, kind:'text', images:['assets/placeholders/stag.svg'],
    content:{
      title:{en:'Custom order requests are coming soon.',tr:'Özel sipariş talepleri çok yakında aktif olacak.',es:'Los pedidos especiales estarán disponibles muy pronto.'},
      subtitle:{en:'Soon you will be able to request a sculpture around your preferred animal, size, finish and space.',tr:'Yakında istediğin hayvan/model, ölçü, kaplama ve mekana göre özel heykel talebi oluşturabileceksin.',es:'Pronto podrás solicitar una escultura según animal, tamaño, acabado y espacio.'},
      body:{en:'Until the custom builder is active, you can still contact Ironform Studio for early project conversations. The future system will include reference uploads, preferred dimensions, indoor/outdoor use, finish choices and budget range.',tr:'Özel sipariş sistemi aktif olana kadar erken proje görüşmesi için yine iletişime geçebilirsin. Gelecek sistemde referans görsel yükleme, ölçü, iç/dış mekan seçimi, kaplama ve bütçe aralığı alanları olacak.',es:'Hasta que el configurador esté activo, puedes contactarnos para conversaciones iniciales. El sistema incluirá referencias, dimensiones, uso interior/exterior, acabados y rango de presupuesto.'}
    }
  },
  {
    page:'contact', section_key:'intro', sort_order:1, visible:true, kind:'text', images:['assets/placeholders/workshop.svg'],
    content:{
      title:{en:'Tell us what kind of piece you want to build.',tr:'Nasıl bir ürün yaptırmak istediğini anlat.',es:'Cuéntanos qué tipo de pieza quieres crear.'},
      subtitle:{en:'Send an inquiry for catalog pieces, project partnerships, commercial installations or early custom order conversations.',tr:'Katalog ürünleri, proje iş birlikleri, ticari alan kurulumları veya erken özel sipariş görüşmeleri için talep gönder.',es:'Envía una consulta para piezas de catálogo, alianzas, instalaciones comerciales o pedidos especiales.'},
      body:{en:'The form is saved directly into Supabase when the backend is connected. You can review incoming requests from the Turkish admin panel.',tr:'Backend bağlandığında form doğrudan Supabase içine kaydedilir. Gelen talepleri Türkçe admin panelinden inceleyebilirsin.',es:'El formulario se guarda en Supabase cuando el backend está conectado. Puedes revisar solicitudes desde el panel de admin en turco.'}
    }
  }
];

export const processSteps = [
  {title:{en:'Model selection & sculpting',tr:'Model seçimi ve modelleme',es:'Selección y modelado'},text:{en:'A low-poly animal, emblem or object is selected, refined and prepared as a sculptural 3D form.',tr:'Low-poly hayvan, amblem veya obje seçilir; heykelsi 3D form olarak düzenlenir.',es:'Se selecciona y refina un animal, emblema u objeto low-poly como forma 3D escultórica.'}},
  {title:{en:'Build drawings',tr:'Üretim çizimleri',es:'Dibujos de fabricación'},text:{en:'The 3D form is translated into clean build drawings with panels, angles and assembly logic.',tr:'3D form; paneller, açılar ve montaj mantığıyla temiz üretim çizimlerine dönüştürülür.',es:'La forma 3D se convierte en dibujos con paneles, ángulos y lógica de ensamblaje.'}},
  {title:{en:'Laser cutting & forming',tr:'Lazer kesim ve form verme',es:'Corte láser y formado'},text:{en:'Steel sheets are laser-cut, then each piece is bent and shaped into its proper low-poly angle.',tr:'Çelik saclar lazerle kesilir; her parça doğru low-poly açısına göre bükülüp forma getirilir.',es:'Las láminas de acero se cortan con láser y cada pieza se forma con su ángulo correcto.'}},
  {title:{en:'Welding & finish',tr:'Kaynak ve son işlem',es:'Soldadura y acabado'},text:{en:'The sculpture is welded, refined, cleaned and finished with the right coating for its space.',tr:'Heykel kaynaklanır, temizlenir, düzeltilir ve kullanılacağı mekana uygun kaplamayla bitirilir.',es:'La escultura se suelda, se refina, se limpia y se termina con el recubrimiento adecuado.'}}
];

export const fallbackProducts = [
  {
    slug:'eagle-wall-sculpture', category:'Wall Art', status:'Available Soon', price_text:'Price on request', dimensions:'Custom / Medium / Large', material:'Laser-cut steel', featured:true, visible:true, sort_order:1,
    title:{en:'Eagle Wall Sculpture',tr:'Kartal Duvar Heykeli',es:'Escultura de Águila para Pared'},
    description:{en:'A bold low-poly eagle silhouette designed for offices, entry walls and brand environments.',tr:'Ofisler, giriş duvarları ve marka alanları için tasarlanmış güçlü low-poly kartal silueti.',es:'Una silueta de águila low-poly para oficinas, entradas y espacios de marca.'},
    images:['assets/placeholders/eagle.svg'], specs:{finish:'Matte black / custom', use:'Indoor / covered outdoor'}
  },
  {
    slug:'panther-statement-piece', category:'Animal Sculptures', status:'Concept', price_text:'Price on request', dimensions:'36–96 in range', material:'Steel body + coated finish', featured:true, visible:true, sort_order:2,
    title:{en:'Panther Statement Piece',tr:'Panter Statement Heykeli',es:'Pieza Principal Pantera'},
    description:{en:'A dynamic angular panther form for luxury interiors, showrooms and dramatic outdoor corners.',tr:'Lüks iç mekanlar, showroomlar ve dramatik dış köşeler için dinamik, köşeli panter formu.',es:'Una forma angular y dinámica de pantera para interiores de lujo, showrooms y exteriores.'},
    images:['assets/placeholders/panther.svg'], specs:{finish:'Satin black / weatherproof option', use:'Indoor / outdoor'}
  },
  {
    slug:'wolf-geometric-wall-art', category:'Wall Art', status:'Available Soon', price_text:'Price on request', dimensions:'24–72 in range', material:'Powder-coated steel', featured:true, visible:true, sort_order:3,
    title:{en:'Wolf Geometric Wall Art',tr:'Kurt Geometrik Duvar Sanatı',es:'Arte Geométrico de Lobo'},
    description:{en:'A sharp wolf face built for modern cabins, offices, studios and statement living rooms.',tr:'Modern dağ evleri, ofisler, stüdyolar ve dikkat çeken salonlar için keskin kurt yüzü.',es:'Un rostro de lobo definido para cabañas modernas, oficinas, estudios y salas memorables.'},
    images:['assets/placeholders/wolf.svg'], specs:{finish:'Raw steel look / painted', use:'Indoor'}
  },
  {
    slug:'stag-lobby-installation', category:'Commercial', status:'Project Concept', price_text:'Quote required', dimensions:'Large scale', material:'Structural steel panels', featured:false, visible:true, sort_order:4,
    title:{en:'Stag Lobby Installation',tr:'Geyik Lobi Kurulumu',es:'Instalación de Ciervo para Lobby'},
    description:{en:'A large-format stag concept designed for hotel lobbies, resorts and mountain-inspired spaces.',tr:'Otel lobileri, resort alanları ve dağ konseptli mekanlar için büyük ölçekli geyik konsepti.',es:'Concepto de ciervo a gran escala para hoteles, resorts y espacios inspirados en montaña.'},
    images:['assets/placeholders/stag.svg'], specs:{finish:'Architectural coating', use:'Commercial interior'}
  }
];

export const fallbackProjects = [
  {
    slug:'signature-eagle-brand-wall', category:'Brand Wall', status:'Concept Ready', location:'United States', featured:true, visible:true, sort_order:1,
    title:{en:'Signature Eagle Brand Wall',tr:'İmza Kartal Marka Duvarı',es:'Muro de Marca Águila'},
    description:{en:'A strong metal eagle composition created as a hero piece for offices, studios and commercial reception areas.',tr:'Ofisler, stüdyolar ve ticari resepsiyon alanları için ana odak parçası olarak oluşturulan güçlü metal kartal kompozisyonu.',es:'Composición metálica de águila creada como pieza principal para oficinas, estudios y recepciones comerciales.'},
    images:['assets/placeholders/eagle.svg','assets/placeholders/workshop.svg']
  },
  {
    slug:'outdoor-panther-garden-piece', category:'Outdoor Sculpture', status:'Concept Ready', location:'United States', featured:true, visible:true, sort_order:2,
    title:{en:'Outdoor Panther Garden Piece',tr:'Dış Mekan Panter Bahçe Heykeli',es:'Pantera para Jardín Exterior'},
    description:{en:'A weather-ready panther concept designed to add movement and sharp character to landscaped spaces.',tr:'Peyzaj alanlarına hareket ve keskin karakter katmak için tasarlanmış dış mekana uygun panter konsepti.',es:'Concepto de pantera para exterior que aporta movimiento y carácter a espacios verdes.'},
    images:['assets/placeholders/panther.svg','assets/placeholders/stag.svg']
  },
  {
    slug:'hotel-lobby-stag-concept', category:'Hospitality', status:'Planning', location:'United States', featured:false, visible:true, sort_order:3,
    title:{en:'Hotel Lobby Stag Concept',tr:'Otel Lobisi Geyik Konsepti',es:'Concepto Ciervo para Hotel'},
    description:{en:'An architectural stag sculpture concept for hospitality spaces that need a premium focal point.',tr:'Premium bir odak noktası isteyen otel alanları için mimari geyik heykeli konsepti.',es:'Concepto de ciervo arquitectónico para espacios hoteleros con presencia premium.'},
    images:['assets/placeholders/stag.svg','assets/placeholders/workshop.svg']
  }
];

function byOrder(a,b){return (a.sort_order ?? 999)-(b.sort_order ?? 999)}

export async function loadSettings(){
  const supabase = await getSupabase({ timeoutMs: 1200 });
  if(!supabase) return fallbackSettings;
  const { data, error } = await queryWithTimeout(supabase.from('site_settings').select('*').eq('id','main').maybeSingle());
  if(error || !data) return fallbackSettings;
  return {...fallbackSettings,...data, social:{...(fallbackSettings.social||{}),...(data.social||{})}};
}

export async function loadSections(page=null){
  const supabase = await getSupabase({ timeoutMs: 1200 });
  if(!supabase) return fallbackSections.filter(s=>!page || s.page===page).sort(byOrder);
  let q = supabase.from('page_sections').select('*').eq('visible', true).order('sort_order',{ascending:true});
  if(page) q = q.eq('page', page);
  const { data, error } = await queryWithTimeout(q);
  if(error || !data || data.length===0) return fallbackSections.filter(s=>!page || s.page===page).sort(byOrder);
  return data.sort(byOrder);
}

export async function loadProducts(all=false){
  const supabase = await getSupabase({ timeoutMs: 1200 });
  if(!supabase) return fallbackProducts.filter(p=>all || p.visible).sort(byOrder);
  let q = supabase.from('products').select('*').order('sort_order',{ascending:true});
  if(!all) q = q.eq('visible', true);
  const { data, error } = await queryWithTimeout(q);
  if(error || !data || data.length===0) return fallbackProducts.filter(p=>all || p.visible).sort(byOrder);
  return data.sort(byOrder);
}

export async function loadProjects(all=false){
  const supabase = await getSupabase({ timeoutMs: 1200 });
  if(!supabase) return fallbackProjects.filter(p=>all || p.visible).sort(byOrder);
  let q = supabase.from('projects').select('*').order('sort_order',{ascending:true});
  if(!all) q = q.eq('visible', true);
  const { data, error } = await queryWithTimeout(q);
  if(error || !data || data.length===0) return fallbackProjects.filter(p=>all || p.visible).sort(byOrder);
  return data.sort(byOrder);
}
