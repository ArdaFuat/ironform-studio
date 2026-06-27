export const languages = {
  en: 'English',
  tr: 'Türkçe',
  es: 'Español'
};

export const t = {
  en: {
    home: 'Home', catalog: 'Catalog', what: 'What We Do', projects: 'Projects', custom: 'Custom Orders', about: 'About', contact: 'Contact', admin: 'Admin',
    catalogCta: 'View Catalog', contactCta: 'Start an Inquiry', customSoon: 'Custom Orders Coming Soon',
    featured: 'Featured Pieces', viewDetails: 'View Details', viewProject: 'View Project', all: 'All', search: 'Search pieces, materials, categories...',
    noItems: 'No items found.', madeFor: 'Made for homes, offices, hotels, gardens and statement interiors.',
    inquiry: 'Order Inquiry', name: 'Name', email: 'Email', phone: 'Phone', interest: 'Interested In', message: 'Message', submit: 'Send Inquiry',
    inquirySuccess: 'Your inquiry has been saved. We will contact you soon.', inquiryError: 'Could not send the inquiry right now. Please check Supabase setup or try email/social links.',
    back: 'Back', dimensions: 'Dimensions', material: 'Material', category: 'Category', status: 'Status', price: 'Price',
    footerText: 'Low-poly metal sculptures built for bold interiors, outdoor spaces and memorable commercial environments.',
    quickLinks: 'Quick Links', studio: 'Studio', getInTouch: 'Get in Touch', rights: 'All rights reserved.',
    soonText: 'The custom order builder is not active yet. Soon, customers will be able to request animal types, dimensions, finishes and project concepts directly from this page.',
    processTitle: 'From digital model to finished steel form', processLead: 'Every piece starts as a sharp low-poly concept and becomes a physical sculpture through precise planning, cutting, forming and finishing.',
    stat1: 'Low-poly', stat1s: 'visual language', stat2: 'Steel', stat2s: 'formed by hand', stat3: 'USA', stat3s: 'market focus'
  },
  tr: {
    home: 'Ana Sayfa', catalog: 'Katalog', what: 'Neler Yapıyoruz', projects: 'Projeler', custom: 'Özel Sipariş', about: 'Hakkımızda', contact: 'İletişim', admin: 'Admin',
    catalogCta: 'Kataloğu Gör', contactCta: 'Sipariş Talebi', customSoon: 'Özel Sipariş Çok Yakında',
    featured: 'Öne Çıkan Ürünler', viewDetails: 'Detayları Gör', viewProject: 'Projeyi Gör', all: 'Tümü', search: 'Ürün, malzeme, kategori ara...',
    noItems: 'Sonuç bulunamadı.', madeFor: 'Evler, ofisler, oteller, bahçeler ve dikkat çeken iç mekanlar için üretildi.',
    inquiry: 'Sipariş Talebi', name: 'Ad Soyad', email: 'E-posta', phone: 'Telefon', interest: 'İlgilendiğin Ürün', message: 'Mesaj', submit: 'Talep Gönder',
    inquirySuccess: 'Talebin kaydedildi. Yakında dönüş yapılacak.', inquiryError: 'Talep şu an gönderilemedi. Supabase ayarlarını kontrol et veya iletişim linklerini kullan.',
    back: 'Geri', dimensions: 'Ölçü', material: 'Malzeme', category: 'Kategori', status: 'Durum', price: 'Fiyat',
    footerText: 'Güçlü iç mekanlar, dış mekanlar ve ticari alanlar için tasarlanan low-poly metal heykeller.',
    quickLinks: 'Hızlı Linkler', studio: 'Stüdyo', getInTouch: 'İletişim', rights: 'Tüm hakları saklıdır.',
    soonText: 'Özel sipariş sistemi henüz aktif değil. Yakında müşteriler hayvan/model seçimini, ölçüleri, kaplamayı ve proje fikrini bu sayfadan gönderebilecek.',
    processTitle: 'Dijital modelden bitmiş çelik forma', processLead: 'Her ürün keskin bir low-poly fikir olarak başlar; planlama, kesim, form verme ve son işlem aşamalarıyla fiziksel bir heykele dönüşür.',
    stat1: 'Low-poly', stat1s: 'tasarım dili', stat2: 'Çelik', stat2s: 'elle form verilir', stat3: 'ABD', stat3s: 'pazar odağı'
  },
  es: {
    home: 'Inicio', catalog: 'Catálogo', what: 'Qué Hacemos', projects: 'Proyectos', custom: 'Pedidos Especiales', about: 'Nosotros', contact: 'Contacto', admin: 'Admin',
    catalogCta: 'Ver Catálogo', contactCta: 'Enviar Consulta', customSoon: 'Pedidos Especiales Muy Pronto',
    featured: 'Piezas Destacadas', viewDetails: 'Ver Detalles', viewProject: 'Ver Proyecto', all: 'Todo', search: 'Buscar piezas, materiales, categorías...',
    noItems: 'No se encontraron resultados.', madeFor: 'Hecho para hogares, oficinas, hoteles, jardines y espacios interiores memorables.',
    inquiry: 'Consulta de Pedido', name: 'Nombre', email: 'Email', phone: 'Teléfono', interest: 'Interés', message: 'Mensaje', submit: 'Enviar Consulta',
    inquirySuccess: 'Tu consulta fue guardada. Nos comunicaremos pronto.', inquiryError: 'No se pudo enviar la consulta ahora. Revisa Supabase o usa los enlaces de contacto.',
    back: 'Volver', dimensions: 'Dimensiones', material: 'Material', category: 'Categoría', status: 'Estado', price: 'Precio',
    footerText: 'Esculturas metálicas low-poly para interiores audaces, espacios exteriores y ambientes comerciales memorables.',
    quickLinks: 'Enlaces', studio: 'Estudio', getInTouch: 'Contacto', rights: 'Todos los derechos reservados.',
    soonText: 'El configurador de pedidos especiales aún no está activo. Pronto los clientes podrán solicitar animales, dimensiones, acabados y conceptos directamente desde esta página.',
    processTitle: 'Del modelo digital a una forma de acero terminada', processLead: 'Cada pieza comienza como un concepto low-poly definido y se convierte en una escultura física mediante planificación, corte, formado y acabado.',
    stat1: 'Low-poly', stat1s: 'lenguaje visual', stat2: 'Acero', stat2s: 'formado a mano', stat3: 'EE. UU.', stat3s: 'enfoque de mercado'
  }
};

export function getLang() {
  const saved = localStorage.getItem('ironform_lang');
  return saved && languages[saved] ? saved : 'en';
}
export function setLang(lang) {
  if (languages[lang]) localStorage.setItem('ironform_lang', lang);
}
export function tr(key) {
  const lang = getLang();
  return t[lang]?.[key] || t.en[key] || key;
}
export function pick(value, lang = getLang()) {
  if (!value) return '';
  if (typeof value === 'string') return value;
  return value[lang] || value.en || value.tr || value.es || '';
}
