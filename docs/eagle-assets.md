# Kartal modeli ve görselleri

## Kullanılan 3D model

Ana sayfa yalnızca kullanıcının sağladığı **faceted eagle 3d model.glb** dosyasını kullanır. Kaynak dosya değiştirilmez. Altın sürüm: public/assets/products/floor-eagle/floor-eagle-gold.glb.

scripts/prepare-gold-eagle.mjs yalnızca malzeme tanımını değiştirir. Tepe noktaları, normaller, indeksler ve düğüm dönüşümleri korunur; ikili geometri verisi kaynakla bayt bayt aynıdır. Malzeme metalik altın, düşük pürüzlülük ve ince parlak kaplama kullanır.

Yeniden üretim: npm run build:model. Kaynak .local/faceted-eagle-source.glb konumunda olmalıdır veya node scripts/prepare-gold-eagle.mjs komutuna kaynak dosya yolu verilmelidir.

## Sahne

public/js/eagle-scene.js modeli GLTFLoader ile açar. Tamamen siyah duvarlı oda, altın yansımaları için stüdyo ışıkları, gölge alan zemin ve kısık düzlemsel yansıma içerir. Dönüş yalnızca kaydırmaya bağlıdır. Kaydırma açısı +0.48 ile -0.48 radyan arasındadır; model arka tarafını göstermez.

Eski prosedürel model, eski GLB ve üretilmiş açı görseli silinmiştir. Yükleme sırasında veya WebGL hatasında eski model/fotoğraf gösterilmez. JavaScript ve CSS cevapları yeniden doğrulanır; HTML önbelleğe alınmaz.

## Gerçek ürün fotoğrafları

Katalog ve ürün galerisindeki fotoğraflar kullanıcının iCloud Photos (3).zip arşivindendir. Işıklı model ve isteğe bağlı ışıksız üretim bilgisi kullanıcının açıklamasına dayanır.

- angle.jpg: 04662820-4f54-4d62-8023-8f66b4aef8b5.jpg
- front.jpg: 8009dfac-0a80-4685-961c-5219bed6eb03.jpg
- illuminated.jpg: bd2134b2-52a6-4085-9feb-52499bfd049f.jpg
- detail.jpg: 6baa97a6-01f1-4bc1-8ead-f038fa3e3637.jpg
