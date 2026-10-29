(function () {
  const STORAGE_KEY = 'ironform_language';
  const supported = ['en', 'tr', 'es'];

  const translations = {
    tr: {
      "All products": "Tüm ürünler",
      "Steel, with a point of view.": "Çeliğe farklı bir bakış.",
      "Your idea. Our craft.": "Sizin fikriniz. Bizim işçiliğimiz.",
      "Let’s make something lasting.": "Kalıcı bir iz bırakalım.",
      "Your email app opens with a draft. Send it from there.": "E-posta uygulamanızda bir taslak açılır. Gönderimi oradan tamamlayabilirsiniz.",
      "For general questions, partnerships and studio communication.": "Genel sorular, iş birlikleri ve stüdyo iletişimi için.",
      "A piece made for your space.": "Mekanınıza özel bir parça.",
      "Tell us the form, size, finish and lighting you have in mind.": "Düşündüğünüz formu, ölçüyü, kaplamayı ve aydınlatmayı anlatın.",
      "3D studio model": "3D stüdyo modeli",
      "Illuminated Floor Eagle": "Işıklı Zemin Kartalı",
      "A faceted gold-tone eagle on a sculptural pedestal. Available with lighting or unlit on request.": "Heykelsi kaide üzerinde, altın görünümlü geometrik kartal. İsteğe bağlı ışıklı veya ışıksız üretilebilir.",
      "Illuminated floor eagle": "Işıklı zemin kartalı",
      "A gold-tone floor eagle. Available illuminated or unlit.": "Altın görünümlü zemin kartalı. Işıklı veya ışıksız, tercihinize göre.",
      "Explore the eagle": "Kartalı keşfet",
      "Enable motion": "Hareketi aç",
      "Pause motion": "Hareketi durdur",
      "Scroll to explore": "Kaydırarak keşfet",
      "Studio visualization": "Stüdyo görselleştirmesi",
      "Illuminated / unlit": "Işıklı / ışıksız",
      "Format": "Form",
      "Freestanding floor sculpture": "Kaide üzerinde zemin heykeli",
      "Gold-tone reflective finish": "Altın görünümlü yansıtıcı yüzey",
      "Lighting": "Aydınlatma",
      "Confirm on inquiry": "Talep sırasında netleştirilir",
      "The photographed model is illuminated. An unlit version can also be made on request.": "Fotoğraflardaki model ışıklıdır. İsteğe bağlı olarak ışıksız versiyonu da üretilebilir.",
      "Gold-tone floor eagle, three-quarter view": "Altın görünümlü zemin kartalı, çapraz görünüm",
      "Three-quarter view": "Çapraz görünüm",
      "Front view": "Önden görünüm",
      "Illuminated view": "Işıklı görünüm",
      "Metal detail": "Metal detayı",
      "pieces": "ürün",
      "No pieces found": "Ürün bulunamadı",
      "Try another search or category.": "Farklı bir arama veya kategori deneyin.",
      "Clear filters": "Filtreleri temizle",
      "Search catalog": "Katalogda ara",
      "Product categories": "Ürün kategorileri",
      "Steel.": "Çelik.",
      "Shaped to stand out.": "İz bırakan form.",
      "Low-poly metal sculptures. Precise geometry, lasting presence.": "Low-poly metal heykeller. Kusursuz geometri, kalıcı bir iz.",
      "Hand-finished": "Elde tamamlandı",
      'Choose language': 'Dil seçin',
      'Language': 'Dil',
      "From animal sculptures and geometric wall art to freestanding statement pieces, we shape steel into work with a distinct architectural presence. Our catalog brings these pieces together, while custom requests start with the form, scale, finish and space you have in mind.": "Hayvan heykellerinden geometrik duvar sanatına ve bağımsız heykellere kadar çeliği, mimari bir duruşu olan eserlere dönüştürüyoruz. Kataloğumuz bu parçaları bir araya getiriyor; özel talepler ise düşündüğünüz form, ölçü, kaplama ve mekandan başlıyor.",
      'Home': 'Ana Sayfa',
      'Catalog': 'Katalog',
      'What We Do': 'Neler Yapıyoruz',
      'Projects': 'Projeler',
      'Custom Orders': 'Özel Sipariş',
      'About': 'Hakkımızda',
      'Contact': 'İletişim',
      'Start an Inquiry': 'Talep Oluştur',
      'Start an inquiry': 'Talep oluştur',
      'View Catalog': 'Kataloğu Gör',
      'View details': 'Detayları gör',
      'View project': 'Projeyi gör',
      'Back to Catalog': 'Kataloğa Dön',
      'Back to Projects': 'Projelere Dön',
      'Go Home': 'Ana Sayfaya Git',
      'Page not found': 'Sayfa bulunamadı',
      'The page you requested does not exist.': 'Aradığın sayfa mevcut değil.',
      '404': '404',

      'Industrial art studio': 'Endüstriyel sanat stüdyosu',
      'Low-Poly Metal Sculptures, Forged for Bold Spaces.': 'Cesur Mekanlar İçin Low-Poly Metal Heykeller.',
      'Ironform Studio designs and produces angular steel art for homes, offices, hotels, gardens and statement interiors across the American market.': 'Ironform Studio; Amerika pazarı için evlere, ofislere, otellere, bahçelere ve dikkat çeken iç mekanlara açılı çelik sanat eserleri tasarlar ve üretir.',
      'Sculptural silhouettes, precision-cut metal, hand-formed details and durable finishes built to become the strongest piece in the room.': 'Mekanın en güçlü parçası olmak için tasarlanan heykelsi silüetler, hassas kesim metal, elde şekillendirilen detaylar ve dayanıklı yüzeyler.',
      'Custom Orders Coming Soon': 'Özel Sipariş Çok Yakında',
      'Laser-cut steel': 'Lazer kesim çelik',
      'Low-poly geometry': 'Low-poly geometri',
      'U.S. market focused': 'ABD pazarı odaklı',
      'Modeling': 'Modelleme',
      'Cut & Weld': 'Kesim & Kaynak',
      'Finish': 'Son işlem',
      'Process': 'Süreç',
      'From sharp model to finished steel.': 'Keskin modelden bitmiş çelik esere.',
      'Every piece follows a direct production workflow so the geometry stays clean and the sculpture feels premium.': 'Her parça net bir üretim akışından geçer; böylece geometri temiz kalır ve heykel premium hisseder.',
      'Model selection & sculpting': 'Model seçimi ve heykelleştirme',
      'A low-poly animal, emblem or object is selected, refined and prepared as a sculptural 3D form.': 'Low-poly bir hayvan, amblem veya obje seçilir, rafine edilir ve heykelsi 3D forma hazırlanır.',
      'Build drawings': 'Üretim çizimleri',
      'The 3D form is translated into clean build drawings with panels, angles and assembly logic.': '3D form; panelleri, açıları ve montaj mantığıyla temiz üretim çizimlerine dönüştürülür.',
      'Laser cutting & forming': 'Lazer kesim ve form verme',
      'Steel sheets are laser-cut, then each piece is bent and shaped into its proper low-poly angle.': 'Çelik saclar lazerle kesilir; ardından her parça doğru low-poly açısına göre bükülür ve şekillendirilir.',
      'Welding & finish': 'Kaynak ve son işlem',
      'The sculpture is welded, refined, cleaned and finished with the right coating for its space.': 'Heykel kaynaklanır, detayları düzeltilir, temizlenir ve kullanılacağı mekana uygun kaplama ile tamamlanır.',
      'Featured pieces': 'Öne Çıkan Parçalar',
      'Low-poly wall art, animal sculptures and commercial statement concepts.': 'Low-poly duvar sanatı, hayvan heykelleri ve ticari odak noktası konseptleri.',
      'Studio': 'Stüdyo',
      'Metal art with architectural presence.': 'Mimari duruşa sahip metal sanat.',
      'Built for collectors, designers, builders and brands that need a centerpiece with weight, character and permanence.': 'Ağırlığı, karakteri ve kalıcılığı olan bir odak parçasına ihtiyaç duyan koleksiyonerler, tasarımcılar, uygulayıcılar ve markalar için üretilir.',
      'Our visual language comes from low-poly geometry: sharp planes, clean edges and silhouettes that read clearly from across a lobby, garden or showroom.': 'Görsel dilimiz low-poly geometriden gelir: keskin yüzeyler, temiz kenarlar ve lobi, bahçe ya da showroom boyunca net okunan silüetler.',
      'Architectural presence': 'Mimari duruş',
      'Pieces designed to be seen in lobbies, homes, offices and branded spaces.': 'Lobilerde, evlerde, ofislerde ve markalı alanlarda görünmek için tasarlanan parçalar.',
      'Durable metal build': 'Dayanıklı metal yapı',
      'Laser-cut steel, welded structure and coating options for the space.': 'Lazer kesim çelik, kaynaklı gövde ve mekana uygun kaplama seçenekleri.',

      'Ironform Catalog': 'Ironform Katalog',
      'Low-poly steel wall art, animal sculptures, commercial concepts and outdoor statement pieces.': 'Low-poly çelik duvar sanatı, hayvan heykelleri, ticari konseptler ve dış mekan odak parçaları.',
      'All': 'Tümü',
      'Animal Sculptures': 'Hayvan Heykelleri',
      'Commercial': 'Ticari',
      'Wall Art': 'Duvar Sanatı',
      'Eagle Wall Sculpture': 'Kartal Duvar Heykeli',
      'A bold low-poly eagle silhouette designed for offices, entry walls and brand environments.': 'Ofisler, giriş duvarları ve marka alanları için tasarlanmış güçlü bir low-poly kartal silüeti.',
      'Available Soon': 'Yakında Hazır',
      'Price on request': 'Fiyat talebe göre',
      'Panther Statement Piece': 'Panter Odak Heykeli',
      'A dynamic angular panther form for luxury interiors, showrooms and dramatic outdoor corners.': 'Lüks iç mekanlar, showroomlar ve etkileyici dış mekan köşeleri için dinamik, açılı panter formu.',
      'Concept': 'Konsept',
      'Wolf Geometric Wall Art': 'Geometrik Kurt Duvar Sanatı',
      'A sharp wolf face built for modern cabins, offices, studios and statement living rooms.': 'Modern kabinler, ofisler, stüdyolar ve dikkat çeken yaşam alanları için keskin bir kurt yüzü.',
      'Stag Lobby Installation': 'Geyik Lobi Enstalasyonu',
      'A large-format stag concept designed for hotel lobbies, resorts and mountain-inspired spaces.': 'Otel lobileri, resortlar ve dağ temalı mekanlar için tasarlanmış büyük ölçekli geyik konsepti.',
      'Project Concept': 'Proje Konsepti',
      'Quote required': 'Teklif gerekli',

      'Ironform Projects': 'Ironform Projeleri',
      'Project concepts, installations and sculptural ideas for residential, commercial and outdoor spaces.': 'Konut, ticari ve dış mekan alanları için proje konseptleri, enstalasyonlar ve heykelsi fikirler.',
      'Brand Wall': 'Marka Duvarı',
      'Signature Eagle Brand Wall': 'İmza Kartal Marka Duvarı',
      'A strong metal eagle composition created as a hero piece for offices, studios and commercial reception areas.': 'Ofisler, stüdyolar ve ticari karşılama alanları için odak parçası olarak tasarlanmış güçlü metal kartal kompozisyonu.',
      'Concept Ready': 'Konsept Hazır',
      'United States': 'Amerika Birleşik Devletleri',
      'Outdoor Sculpture': 'Dış Mekan Heykeli',
      'Outdoor Panther Garden Piece': 'Dış Mekan Panter Bahçe Heykeli',
      'A weather-ready panther concept designed to add movement and sharp character to landscaped spaces.': 'Peyzaj alanlarına hareket ve keskin karakter katmak için tasarlanmış, dış koşullara uygun panter konsepti.',
      'Hospitality': 'Otelcilik',
      'Hotel Lobby Stag Concept': 'Otel Lobisi Geyik Konsepti',
      'An architectural stag sculpture concept for hospitality spaces that need a premium focal point.': 'Premium bir odak noktasına ihtiyaç duyan otelcilik alanları için mimari geyik heykeli konsepti.',
      'Planning': 'Planlama',

      'A production workflow made for sharp geometry.': 'Keskin geometri için tasarlanmış üretim akışı.',
      'From model selection to final coating, every decision is made to keep the sculpture clean, strong and visually striking.': 'Model seçiminden son kaplamaya kadar her karar, heykelin temiz, güçlü ve görsel olarak çarpıcı kalması için alınır.',

      'Custom order requests are coming soon.': 'Özel sipariş talepleri çok yakında.',
      'Soon you will be able to request a sculpture around your preferred animal, size, finish and space.': 'Yakında istediğin hayvan/obje, ölçü, yüzey ve mekana göre heykel talebi oluşturabileceksin.',
      'Animal / object concept': 'Hayvan / obje konsepti',
      'Size & placement': 'Ölçü ve yerleşim',
      'Finish options': 'Kaplama seçenekleri',

      'About Ironform': 'Ironform Hakkında',
      'Ironform Studio turns steel into modern statement art.': 'Ironform Studio çeliği modern ve dikkat çeken sanata dönüştürür.',
      'A sculptural brand focused on bold geometry, durable materials and premium presentation for the U.S. market.': 'ABD pazarı için güçlü geometriye, dayanıklı malzemelere ve premium sunuma odaklanan heykelsi bir marka.',
      'Sharp geometry': 'Keskin geometri',
      'Metal permanence': 'Metalin kalıcılığı',
      'Statement placement': 'Odak yerleşim',

      'Tell us what kind of piece you want to build.': 'Nasıl bir parça yaptırmak istediğini anlat.',
      'Send an inquiry for catalog pieces, project partnerships, commercial installations or early custom order conversations.': 'Katalog ürünleri, proje iş birlikleri, ticari kurulumlar veya erken özel sipariş görüşmeleri için talep gönder.',
      'Email': 'E-posta',
      'Market': 'Pazar',
      'Inquiry Form': 'Talep Formu',
      'Name': 'Ad Soyad',
      'Phone': 'Telefon',
      'Interest': 'İlgilenilen Alan',
      'Catalog piece': 'Katalog ürünü',
      'Commercial project': 'Ticari proje',
      'Outdoor sculpture': 'Dış mekan heykeli',
      'Early custom order': 'Erken özel sipariş',
      'Message': 'Mesaj',
      'Prepare Email': 'E-postayı Hazırla',

      'Status': 'Durum',
      'Dimensions': 'Ölçüler',
      'Material': 'Malzeme',
      'Price': 'Fiyat',
      'Finish': 'Kaplama',
      'Use': 'Kullanım',
      'Custom / Medium / Large': 'Özel / Orta / Büyük',
      'Laser-cut steel': 'Lazer kesim çelik',
      'Matte black / custom': 'Mat siyah / özel',
      'Indoor / covered outdoor': 'İç mekan / kapalı dış mekan',
      '36–96 in range': '36–96 inç aralığı',
      'Steel body + coated finish': 'Çelik gövde + kaplamalı yüzey',
      'Satin black / weatherproof option': 'Saten siyah / dış koşula dayanıklı seçenek',
      'Indoor / outdoor': 'İç mekan / dış mekan',
      '24–72 in range': '24–72 inç aralığı',
      'Powder-coated steel': 'Toz boyalı çelik',
      'Raw steel look / painted': 'Ham çelik görünüm / boyalı',
      'Indoor': 'İç mekan',
      'Large scale': 'Büyük ölçek',
      'Structural steel panels': 'Yapısal çelik paneller',
      'Architectural coating': 'Mimari kaplama',
      'Commercial interior': 'Ticari iç mekan',
      'Location': 'Konum',
      'Category': 'Kategori',

      'Explore': 'Keşfet',
      'Low-poly metal sculptures and statement steel art for bold spaces.': 'Cesur mekanlar için low-poly metal heykeller ve dikkat çeken çelik sanat.',
      '© 2026 Ironform Studio.': '© 2026 Ironform Studio.',
      'Forged for bold spaces.': 'Cesur mekanlar için üretildi.',
      'Contact | Ironform Studio': 'İletişim | Ironform Studio',
      'Catalog | Ironform Studio': 'Katalog | Ironform Studio',
      'Projects | Ironform Studio': 'Projeler | Ironform Studio',
      'About | Ironform Studio': 'Hakkımızda | Ironform Studio',
      'Custom Orders | Ironform Studio': 'Özel Sipariş | Ironform Studio',
      'What We Do | Ironform Studio': 'Neler Yapıyoruz | Ironform Studio',
      'Page Not Found | Ironform Studio': 'Sayfa Bulunamadı | Ironform Studio',
      'Ironform Studio | Low-Poly Metal Sculptures': 'Ironform Studio | Low-Poly Metal Heykeller'
    },

    es: {
      "All products": "Todos los productos",
      "Steel, with a point of view.": "Acero con personalidad.",
      "Your idea. Our craft.": "Tu idea. Nuestro oficio.",
      "Let’s make something lasting.": "Creemos algo que perdure.",
      "Your email app opens with a draft. Send it from there.": "Se abrirá un borrador en tu aplicación de correo. Envíalo desde allí.",
      "For general questions, partnerships and studio communication.": "Para preguntas generales, colaboraciones y contacto con el estudio.",
      "A piece made for your space.": "Una pieza para tu espacio.",
      "Tell us the form, size, finish and lighting you have in mind.": "Cuéntanos la forma, el tamaño, el acabado y la iluminación que tienes en mente.",
      "3D studio model": "Modelo 3D de estudio",
      "Illuminated Floor Eagle": "Águila de suelo iluminada",
      "A faceted gold-tone eagle on a sculptural pedestal. Available with lighting or unlit on request.": "Águila geométrica en tono dorado sobre pedestal escultórico. Disponible con o sin iluminación bajo pedido.",
      "Illuminated floor eagle": "Águila de suelo iluminada",
      "A gold-tone floor eagle. Available illuminated or unlit.": "Águila de suelo en tono dorado. Con o sin iluminación, a tu elección.",
      "Explore the eagle": "Descubrir el águila",
      "Enable motion": "Activar movimiento",
      "Pause motion": "Pausar movimiento",
      "Scroll to explore": "Desliza para descubrir",
      "Studio visualization": "Visualización de estudio",
      "Illuminated / unlit": "Con / sin iluminación",
      "Format": "Formato",
      "Freestanding floor sculpture": "Escultura de suelo sobre pedestal",
      "Gold-tone reflective finish": "Acabado reflectante en tono dorado",
      "Lighting": "Iluminación",
      "Confirm on inquiry": "Consultar al solicitar información",
      "The photographed model is illuminated. An unlit version can also be made on request.": "El modelo fotografiado incluye iluminación. También puede fabricarse sin iluminación bajo pedido.",
      "Gold-tone floor eagle, three-quarter view": "Águila de suelo dorada, vista de tres cuartos",
      "Three-quarter view": "Vista de tres cuartos",
      "Front view": "Vista frontal",
      "Illuminated view": "Vista iluminada",
      "Metal detail": "Detalle del metal",
      "pieces": "piezas",
      "No pieces found": "No se encontraron piezas",
      "Try another search or category.": "Prueba otra búsqueda o categoría.",
      "Clear filters": "Borrar filtros",
      "Search catalog": "Buscar en el catálogo",
      "Product categories": "Categorías de productos",
      "Steel.": "Acero.",
      "Shaped to stand out.": "Forma que destaca.",
      "Low-poly metal sculptures. Precise geometry, lasting presence.": "Esculturas de metal low-poly. Geometría precisa, presencia duradera.",
      "Hand-finished": "Acabado a mano",
      'Choose language': 'Elegir idioma',
      'Language': 'Idioma',
      "From animal sculptures and geometric wall art to freestanding statement pieces, we shape steel into work with a distinct architectural presence. Our catalog brings these pieces together, while custom requests start with the form, scale, finish and space you have in mind.": "Desde esculturas de animales y arte mural geométrico hasta piezas independientes, damos forma al acero para crear obras con presencia arquitectónica. Nuestro catálogo reúne estas piezas; los encargos personalizados parten de la forma, la escala, el acabado y el espacio que tienes en mente.",
      'Home': 'Inicio', 'Catalog': 'Catálogo', 'What We Do': 'Qué Hacemos', 'Projects': 'Proyectos', 'Custom Orders': 'Pedidos Especiales', 'About': 'Nosotros', 'Contact': 'Contacto',
      'Start an Inquiry': 'Enviar Consulta', 'Start an inquiry': 'Enviar consulta', 'View Catalog': 'Ver Catálogo', 'View details': 'Ver detalles', 'View project': 'Ver proyecto', 'Back to Catalog': 'Volver al Catálogo', 'Back to Projects': 'Volver a Proyectos', 'Go Home': 'Ir al Inicio',
      'Page not found': 'Página no encontrada', 'The page you requested does not exist.': 'La página solicitada no existe.',

      'Industrial art studio': 'Estudio de arte industrial',
      'Low-Poly Metal Sculptures, Forged for Bold Spaces.': 'Esculturas Metálicas Low-Poly para Espacios Audaces.',
      'Ironform Studio designs and produces angular steel art for homes, offices, hotels, gardens and statement interiors across the American market.': 'Ironform Studio diseña y produce arte angular en acero para hogares, oficinas, hoteles, jardines e interiores destacados del mercado estadounidense.',
      'Sculptural silhouettes, precision-cut metal, hand-formed details and durable finishes built to become the strongest piece in the room.': 'Siluetas escultóricas, metal de corte preciso, detalles formados a mano y acabados duraderos pensados para ser la pieza más fuerte del espacio.',
      'Custom Orders Coming Soon': 'Pedidos Especiales Muy Pronto',
      'Laser-cut steel': 'Acero cortado con láser', 'Low-poly geometry': 'Geometría low-poly', 'U.S. market focused': 'Enfoque en EE. UU.',
      'Modeling': 'Modelado', 'Cut & Weld': 'Corte y Soldadura', 'Finish': 'Acabado', 'Process': 'Proceso',
      'From sharp model to finished steel.': 'Del modelo definido al acero terminado.',
      'Every piece follows a direct production workflow so the geometry stays clean and the sculpture feels premium.': 'Cada pieza sigue un flujo de producción directo para mantener una geometría limpia y una sensación premium.',
      'Model selection & sculpting': 'Selección y escultura del modelo',
      'A low-poly animal, emblem or object is selected, refined and prepared as a sculptural 3D form.': 'Se selecciona, refina y prepara un animal, emblema u objeto low-poly como forma escultórica 3D.',
      'Build drawings': 'Planos de fabricación',
      'The 3D form is translated into clean build drawings with panels, angles and assembly logic.': 'La forma 3D se transforma en planos limpios con paneles, ángulos y lógica de ensamblaje.',
      'Laser cutting & forming': 'Corte láser y formado',
      'Steel sheets are laser-cut, then each piece is bent and shaped into its proper low-poly angle.': 'Las láminas de acero se cortan con láser y cada pieza se dobla a su ángulo low-poly correspondiente.',
      'Welding & finish': 'Soldadura y acabado',
      'The sculpture is welded, refined, cleaned and finished with the right coating for its space.': 'La escultura se suelda, refina, limpia y termina con el recubrimiento adecuado para su espacio.',
      'Featured pieces': 'Piezas Destacadas',
      'Low-poly wall art, animal sculptures and commercial statement concepts.': 'Arte mural low-poly, esculturas animales y conceptos comerciales destacados.',
      'Studio': 'Estudio',
      'Metal art with architectural presence.': 'Arte en metal con presencia arquitectónica.',
      'Built for collectors, designers, builders and brands that need a centerpiece with weight, character and permanence.': 'Creado para coleccionistas, diseñadores, constructores y marcas que necesitan una pieza central con peso, carácter y permanencia.',
      'Our visual language comes from low-poly geometry: sharp planes, clean edges and silhouettes that read clearly from across a lobby, garden or showroom.': 'Nuestro lenguaje visual nace de la geometría low-poly: planos marcados, bordes limpios y siluetas visibles desde un lobby, jardín o showroom.',
      'Architectural presence': 'Presencia arquitectónica',
      'Pieces designed to be seen in lobbies, homes, offices and branded spaces.': 'Piezas diseñadas para verse en lobbies, hogares, oficinas y espacios de marca.',
      'Durable metal build': 'Construcción metálica duradera',
      'Laser-cut steel, welded structure and coating options for the space.': 'Acero cortado con láser, estructura soldada y opciones de acabado para el espacio.',

      'Ironform Catalog': 'Catálogo Ironform',
      'Low-poly steel wall art, animal sculptures, commercial concepts and outdoor statement pieces.': 'Arte mural en acero low-poly, esculturas animales, conceptos comerciales y piezas exteriores destacadas.',
      'All': 'Todo', 'Animal Sculptures': 'Esculturas Animales', 'Commercial': 'Comercial', 'Wall Art': 'Arte Mural',
      'Eagle Wall Sculpture': 'Escultura Mural de Águila',
      'A bold low-poly eagle silhouette designed for offices, entry walls and brand environments.': 'Una fuerte silueta de águila low-poly diseñada para oficinas, muros de entrada y entornos de marca.',
      'Available Soon': 'Próximamente', 'Price on request': 'Precio bajo consulta',
      'Panther Statement Piece': 'Pieza Protagonista de Pantera',
      'A dynamic angular panther form for luxury interiors, showrooms and dramatic outdoor corners.': 'Una forma angular y dinámica de pantera para interiores de lujo, showrooms y esquinas exteriores impactantes.',
      'Concept': 'Concepto',
      'Wolf Geometric Wall Art': 'Arte Mural Geométrico de Lobo',
      'A sharp wolf face built for modern cabins, offices, studios and statement living rooms.': 'Un rostro de lobo marcado para cabañas modernas, oficinas, estudios y salas protagonistas.',
      'Stag Lobby Installation': 'Instalación de Ciervo para Lobby',
      'A large-format stag concept designed for hotel lobbies, resorts and mountain-inspired spaces.': 'Un concepto de ciervo de gran formato para lobbies de hotel, resorts y espacios inspirados en montaña.',
      'Project Concept': 'Concepto de Proyecto', 'Quote required': 'Cotización requerida',

      'Ironform Projects': 'Proyectos Ironform',
      'Project concepts, installations and sculptural ideas for residential, commercial and outdoor spaces.': 'Conceptos, instalaciones e ideas escultóricas para espacios residenciales, comerciales y exteriores.',
      'Brand Wall': 'Muro de Marca', 'Signature Eagle Brand Wall': 'Muro de Marca Águila Signature',
      'A strong metal eagle composition created as a hero piece for offices, studios and commercial reception areas.': 'Una composición fuerte de águila metálica creada como pieza protagonista para oficinas, estudios y recepciones comerciales.',
      'Concept Ready': 'Concepto Listo', 'United States': 'Estados Unidos',
      'Outdoor Sculpture': 'Escultura Exterior', 'Outdoor Panther Garden Piece': 'Pantera Exterior para Jardín',
      'A weather-ready panther concept designed to add movement and sharp character to landscaped spaces.': 'Un concepto de pantera apto para exterior, diseñado para aportar movimiento y carácter a paisajes.',
      'Hospitality': 'Hospitalidad', 'Hotel Lobby Stag Concept': 'Concepto de Ciervo para Lobby de Hotel',
      'An architectural stag sculpture concept for hospitality spaces that need a premium focal point.': 'Un concepto arquitectónico de ciervo para espacios hoteleros que necesitan un foco premium.',
      'Planning': 'Planificación',

      'A production workflow made for sharp geometry.': 'Un flujo de producción hecho para geometría definida.',
      'From model selection to final coating, every decision is made to keep the sculpture clean, strong and visually striking.': 'Desde la selección del modelo hasta el acabado final, cada decisión mantiene la escultura limpia, fuerte e impactante.',
      'Custom order requests are coming soon.': 'Las solicitudes de pedidos especiales estarán disponibles pronto.',
      'Soon you will be able to request a sculpture around your preferred animal, size, finish and space.': 'Pronto podrás solicitar una escultura según tu animal, tamaño, acabado y espacio preferidos.',
      'Animal / object concept': 'Concepto de animal / objeto', 'Size & placement': 'Tamaño y ubicación', 'Finish options': 'Opciones de acabado',
      'About Ironform': 'Sobre Ironform',
      'Ironform Studio turns steel into modern statement art.': 'Ironform Studio transforma el acero en arte moderno protagonista.',
      'A sculptural brand focused on bold geometry, durable materials and premium presentation for the U.S. market.': 'Una marca escultórica enfocada en geometría audaz, materiales duraderos y presentación premium para EE. UU.',
      'Sharp geometry': 'Geometría definida', 'Metal permanence': 'Permanencia del metal', 'Statement placement': 'Ubicación protagonista',

      'Tell us what kind of piece you want to build.': 'Cuéntanos qué tipo de pieza quieres construir.',
      'Send an inquiry for catalog pieces, project partnerships, commercial installations or early custom order conversations.': 'Envía una consulta para piezas de catálogo, alianzas de proyecto, instalaciones comerciales o pedidos especiales iniciales.',
      'Email': 'Email', 'Market': 'Mercado', 'Inquiry Form': 'Formulario de Consulta', 'Name': 'Nombre', 'Phone': 'Teléfono', 'Interest': 'Interés',
      'Catalog piece': 'Pieza de catálogo', 'Commercial project': 'Proyecto comercial', 'Outdoor sculpture': 'Escultura exterior', 'Early custom order': 'Pedido especial inicial', 'Message': 'Mensaje', 'Prepare Email': 'Preparar Email',

      'Status': 'Estado', 'Dimensions': 'Dimensiones', 'Material': 'Material', 'Price': 'Precio', 'Finish': 'Acabado', 'Use': 'Uso',
      'Custom / Medium / Large': 'Personalizado / Mediano / Grande', 'Matte black / custom': 'Negro mate / personalizado', 'Indoor / covered outdoor': 'Interior / exterior cubierto',
      '36–96 in range': 'Rango de 36–96 pulgadas', 'Steel body + coated finish': 'Cuerpo de acero + acabado recubierto', 'Satin black / weatherproof option': 'Negro satinado / opción resistente al clima', 'Indoor / outdoor': 'Interior / exterior',
      '24–72 in range': 'Rango de 24–72 pulgadas', 'Powder-coated steel': 'Acero con pintura en polvo', 'Raw steel look / painted': 'Aspecto acero crudo / pintado', 'Indoor': 'Interior',
      'Large scale': 'Gran escala', 'Structural steel panels': 'Paneles de acero estructural', 'Architectural coating': 'Recubrimiento arquitectónico', 'Commercial interior': 'Interior comercial', 'Location': 'Ubicación', 'Category': 'Categoría',

      'Explore': 'Explorar',
      'Low-poly metal sculptures and statement steel art for bold spaces.': 'Esculturas metálicas low-poly y arte en acero para espacios audaces.',
      'Forged for bold spaces.': 'Forjado para espacios audaces.',
      'Contact | Ironform Studio': 'Contacto | Ironform Studio', 'Catalog | Ironform Studio': 'Catálogo | Ironform Studio', 'Projects | Ironform Studio': 'Proyectos | Ironform Studio', 'About | Ironform Studio': 'Nosotros | Ironform Studio', 'Custom Orders | Ironform Studio': 'Pedidos Especiales | Ironform Studio', 'What We Do | Ironform Studio': 'Qué Hacemos | Ironform Studio', 'Page Not Found | Ironform Studio': 'Página No Encontrada | Ironform Studio', 'Ironform Studio | Low-Poly Metal Sculptures': 'Ironform Studio | Esculturas Metálicas Low-Poly'
    }
  };

  const placeholders = {
    tr: {
      'Search catalog...': 'Katalogda ara...',
      'Tell us the piece, size, location and timing you have in mind.': 'Aklındaki parça, ölçü, konum ve zamanlamayı anlat.'
    },
    es: {
      'Search catalog...': 'Buscar en el catálogo...',
      'Tell us the piece, size, location and timing you have in mind.': 'Cuéntanos la pieza, tamaño, ubicación y plazo que tienes en mente.'
    }
  };



  Object.assign(translations.tr, {
    'Request Quote': 'Teklif Al',
    'Request a quote': 'Teklif al',
    'Contact Ironform Studio.': 'Ironform Studio ile iletişime geçin.',
    'Reach us directly for general questions, partnerships and studio communication.': 'Genel sorular, iş birlikleri ve stüdyo iletişimi için bize doğrudan ulaşın.',
    'Email Us': 'Bize E-posta Gönder',
    'If you want pricing, a custom sculpture or a project quotation, please use the Request Quote page. For all other topics, you can contact us directly by email.': 'Fiyat, özel heykel veya proje teklifi istiyorsan Teklif Al sayfasını kullan. Diğer tüm konular için bize doğrudan e-postayla ulaşabilirsin.',
    'Quote requests': 'Teklif talepleri',
    'Use the Request Quote page for product and project inquiries.': 'Ürün ve proje talepleri için Teklif Al sayfasını kullan.',
    'Quick Contact': 'Hızlı İletişim',
    'For direct communication, email us and briefly tell us what you need.': 'Doğrudan iletişim için bize e-posta gönder ve neye ihtiyacın olduğunu kısaca anlat.',
    'Go to Request Quote': 'Teklif Al sayfasına git',
    'Request a quote for your custom piece.': 'Özel parçan için teklif iste.',
    'Tell us about the sculpture, size, finish and space you have in mind.': 'Aklındaki heykeli, ölçüyü, yüzeyi ve kullanılacağı mekanı bize anlat.',
    'Use this page for custom sculpture requests, pricing questions, catalog piece interest and early project conversations.': 'Bu sayfayı özel heykel talepleri, fiyat soruları, katalog ürün ilgisi ve erken proje görüşmeleri için kullan.',
    'Custom piece': 'Özel parça',
    'We create low-poly metal sculptures that feel both engineered and artistic. The work is designed to sit comfortably in residential interiors, outdoor landscapes, hotel lobbies, office entries and branded environments where a memorable focal point matters.': 'Hem mühendislik hissi veren hem de sanatsal duran low-poly metal heykeller üretiyoruz. Çalışmalar; konut iç mekanları, dış alanlar, otel lobileri, ofis girişleri ve unutulmaz bir odak noktasının önemli olduğu marka alanları için tasarlanır.',
    'Low-poly planes give every sculpture a clean silhouette and strong modern identity.': 'Low-poly yüzeyler her heykele temiz bir silüet ve güçlü modern bir kimlik kazandırır.',
    'Steel construction and durable finishes make the work suitable for long-term display.': 'Çelik yapı ve dayanıklı yüzeyler işi uzun süreli sergileme için uygun hale getirir.',
    'Pieces are created for places where art must be seen, remembered and photographed.': 'Parçalar; sanatın görülmesi, hatırlanması ve fotoğraflanması gereken mekanlar için üretilir.',
    'The process begins with choosing or developing the model. The form is modeled and translated into buildable drawings. Once the drawing stage is complete, steel parts are laser-cut, shaped into the correct angles, welded, refined and finished for indoor or outdoor use.': 'Süreç modelin seçilmesi veya geliştirilmesiyle başlar. Form modellenir ve üretilebilir çizimlere dönüştürülür. Çizim aşaması tamamlandıktan sonra çelik parçalar lazerle kesilir, doğru açılara getirilir, kaynaklanır, düzeltilir ve iç/dış mekan kullanımına uygun şekilde tamamlanır.',
    'Eagle, panther, wolf, horse, stag, lion or a custom symbol.': 'Kartal, panter, kurt, at, geyik, aslan veya özel bir sembol.',
    'Wall, freestanding, garden, lobby or brand installation.': 'Duvar, ayaklı form, bahçe, lobi veya marka yerleşimi.',
    'Matte black, raw steel look, powder coating and outdoor coatings.': 'Mat siyah, ham çelik görünümü, toz boya ve dış mekan kaplamaları.',
    'Send Inquiry': 'Talep Gönder'
  });

  Object.assign(translations.es, {
    'Request Quote': 'Solicitar Cotización',
    'Request a quote': 'Solicitar cotización',
    'Contact Ironform Studio.': 'Contacta con Ironform Studio.',
    'Reach us directly for general questions, partnerships and studio communication.': 'Contáctanos directamente para preguntas generales, colaboraciones y comunicación del estudio.',
    'Email Us': 'Envíanos un Email',
    'If you want pricing, a custom sculpture or a project quotation, please use the Request Quote page. For all other topics, you can contact us directly by email.': 'Si quieres precios, una escultura personalizada o una cotización de proyecto, utiliza la página Solicitar Cotización. Para cualquier otro tema, puedes contactarnos directamente por email.',
    'Quote requests': 'Solicitudes de cotización',
    'Use the Request Quote page for product and project inquiries.': 'Usa la página Solicitar Cotización para consultas de productos y proyectos.',
    'Quick Contact': 'Contacto Rápido',
    'For direct communication, email us and briefly tell us what you need.': 'Para comunicación directa, envíanos un email y cuéntanos brevemente lo que necesitas.',
    'Go to Request Quote': 'Ir a Solicitar Cotización',
    'Request a quote for your custom piece.': 'Solicita una cotización para tu pieza personalizada.',
    'Tell us about the sculpture, size, finish and space you have in mind.': 'Cuéntanos sobre la escultura, el tamaño, el acabado y el espacio que tienes en mente.',
    'Use this page for custom sculpture requests, pricing questions, catalog piece interest and early project conversations.': 'Usa esta página para solicitudes de esculturas personalizadas, preguntas de precios, interés por piezas del catálogo y conversaciones iniciales de proyectos.',
    'Custom piece': 'Pieza personalizada',
    'We create low-poly metal sculptures that feel both engineered and artistic. The work is designed to sit comfortably in residential interiors, outdoor landscapes, hotel lobbies, office entries and branded environments where a memorable focal point matters.': 'Creamos esculturas metálicas low-poly con una sensación tanto técnica como artística. El trabajo está diseñado para integrarse en interiores residenciales, paisajes exteriores, lobbies de hoteles, entradas de oficinas y espacios de marca donde importa un punto focal memorable.',
    'Low-poly planes give every sculpture a clean silhouette and strong modern identity.': 'Los planos low-poly aportan a cada escultura una silueta limpia y una identidad moderna fuerte.',
    'Steel construction and durable finishes make the work suitable for long-term display.': 'La construcción en acero y los acabados duraderos hacen que la obra sea adecuada para una exhibición a largo plazo.',
    'Pieces are created for places where art must be seen, remembered and photographed.': 'Las piezas se crean para lugares donde el arte debe verse, recordarse y fotografiarse.',
    'The process begins with choosing or developing the model. The form is modeled and translated into buildable drawings. Once the drawing stage is complete, steel parts are laser-cut, shaped into the correct angles, welded, refined and finished for indoor or outdoor use.': 'El proceso comienza con la elección o el desarrollo del modelo. La forma se modela y se traduce en planos construibles. Una vez terminada la fase de dibujo, las piezas de acero se cortan con láser, se conforman en los ángulos correctos, se sueldan, se refinan y se terminan para uso interior o exterior.',
    'Eagle, panther, wolf, horse, stag, lion or a custom symbol.': 'Águila, pantera, lobo, caballo, ciervo, león o un símbolo personalizado.',
    'Wall, freestanding, garden, lobby or brand installation.': 'Mural, exenta, jardín, lobby o instalación de marca.',
    'Matte black, raw steel look, powder coating and outdoor coatings.': 'Negro mate, aspecto de acero crudo, pintura en polvo y recubrimientos para exterior.',
    'Send Inquiry': 'Enviar Consulta'
  });

  function getLang() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (supported.includes(saved)) return saved;
    } catch (_) { /* Language switching also works without browser storage. */ }
    return document.documentElement.dataset.defaultLanguage === 'tr' ? 'tr' : 'en';
  }

  function translateString(text, lang) {
    if (lang === 'en') return text;
    return translations[lang] && translations[lang][text] ? translations[lang][text] : text;
  }

  function translateTextNodes(lang) {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        const tag = parent.tagName;
        if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT' || tag === 'SVG') return NodeFilter.FILTER_REJECT;
        if (parent.closest('svg')) return NodeFilter.FILTER_REJECT;
        return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });

    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach((node) => {
      if (!node.__ironformOriginal) node.__ironformOriginal = node.nodeValue;
      const original = node.__ironformOriginal;
      const leading = (original.match(/^\s*/) || [''])[0];
      const trailing = (original.match(/\s*$/) || [''])[0];
      const key = original.trim().replace(/\s+/g, ' ');
      const translated = translateString(key, lang);
      node.nodeValue = leading + translated + trailing;
    });
  }

  function translateAttributes(lang) {
    document.documentElement.lang = lang;
    if (!document.documentElement.dataset.originalTitle) document.documentElement.dataset.originalTitle = document.title;
    document.title = translateString(document.documentElement.dataset.originalTitle, lang);
    document.querySelectorAll('[placeholder]').forEach((el) => {
      if (!el.dataset.originalPlaceholder) el.dataset.originalPlaceholder = el.getAttribute('placeholder') || '';
      const original = el.dataset.originalPlaceholder;
      el.setAttribute('placeholder', lang === 'en' ? original : (placeholders[lang]?.[original] || original));
    });
    document.querySelectorAll('[aria-label], [title]').forEach((el) => {
      ['aria-label', 'title'].forEach((attr) => {
        if (!el.hasAttribute(attr)) return;
        const dataKey = 'original' + attr.replace(/(^|-)([a-z])/g, (_, __, c) => c.toUpperCase());
        if (!el.dataset[dataKey]) el.dataset[dataKey] = el.getAttribute(attr) || '';
        const original = el.dataset[dataKey];
        el.setAttribute(attr, translateString(original, lang));
      });
    });
  }

  function applyLanguage(lang) {
    if (!supported.includes(lang)) lang = 'en';
    translateTextNodes(lang);
    translateAttributes(lang);
    const label = document.getElementById('currentLanguage');
    if (label) label.textContent = lang.toUpperCase();
    document.querySelectorAll('[data-language]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.language === lang));
    });
    document.dispatchEvent(new Event('ironform:languagechange'));
  }

  document.addEventListener('DOMContentLoaded', () => {
    const picker = document.getElementById('languagePicker');
    const lang = getLang();
    applyLanguage(lang);
    document.querySelectorAll('[data-language]').forEach(button => {
      button.addEventListener('click', () => {
        const next = button.dataset.language;
        try { localStorage.setItem(STORAGE_KEY, next); } catch (_) {}
        applyLanguage(next);
        if (picker) {
          picker.open = false;
          picker.querySelector('summary').focus();
        }
      });
    });
    document.addEventListener('click', event => {
      if (picker && !picker.contains(event.target)) picker.open = false;
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && picker?.open) {
        picker.open = false;
        picker.querySelector('summary').focus();
      }
    });
  });
})();
