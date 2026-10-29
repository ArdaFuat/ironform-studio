# Ironform Studio

Site statik HTML, CSS ve JavaScript dosyalarından oluşur. Giriş sistemi, admin paneli ve veritabanı bağlantısı yoktur.

## Yerel çalıştırma

```bash
npm install
npm run dev
```

Site: http://127.0.0.1:8787

## İçerik güncelleme

Ürün bilgileri ve görseller kullanıcı tarafından sağlanır ve site dosyalarına eklenir:

- Katalog: public/catalog.html
- Ürün detayları: public/products/
- Ana sayfadaki öne çıkan ürünler: public/index.html
- Hakkımızda ve üretim süreci: public/about.html
- Görseller: public/assets/
- Çeviriler: public/js/lang-switcher.js

Ana sayfadaki kartal, kullanıcının sağladığı GLB modelini kullanır. Sahne kodu public/js/eagle-scene.js dosyasındadır. npm run build:model kaynak GLB dosyasının geometrisini koruyarak altın malzemeli sürümünü üretir. Kaynaklar ve sahne ayarları docs/eagle-assets.md dosyasında açıklanır.

Teklif formu kullanıcının e-posta uygulamasında bir taslak açar. Gönderim e-posta uygulamasından tamamlanır; sitede kayıt tutulmaz.

## Başlangıç dili

Cloudflare Worker, request.cf.country ülke bilgisini kullanır. Türkiye (TR) Türkçe; Amerika kıtasının tamamı ve diğer ülkeler İngilizce başlar. Ülke bilinmiyorsa İngilizce kullanılır. Tarayıcı dili ülke yerine kullanılmaz.

Menüden yapılan dil seçimi tarayıcıda saklanır ve sonraki ziyaretlerde önceliklidir. Otomatik ülke seçimi kalıcı tercih olarak kaydedilmez. Yerel sunucudaki ülke bilgisi canlı ziyaretçileri temsil etmeyebilir.

## Cloudflare dağıtımı

```bash
npm run deploy
```

wrangler.toml, public klasörünü ve src/index.js yönlendiricisini kullanır. Ülkeye bağlı HTML cevapları ortak önbelleğe alınmaz. Mevcut kurulumdan geçişte Cloudflare önbelleğini temizleyin.
