# Ironform Studio Website Kurulumu

Bu paket; İngilizce ana site, Türkçe/İspanyolca dil seçeneği, katalog, projeler, özel sipariş yakında sayfası, iletişim/sipariş formu ve tamamen Türkçe admin paneli içerir.

## 1) Supabase kurulumu

1. Supabase'te yeni proje oluştur.
2. Sol menüden **SQL Editor** aç.
3. `sql/schema.sql` dosyasını aç.
4. Şu satırı kendi admin e-postanla değiştir:

```sql
YOUR_ADMIN_EMAIL@example.com
```

Örnek:

```sql
arda@example.com
```

5. SQL dosyasının tamamını çalıştır.

Bu işlem tabloları, güvenlik kurallarını, ilk admin mailini, storage bucket'ı ve örnek ürün/proje içeriklerini oluşturur.

## 2) Supabase Auth ayarı

Supabase Dashboard > **Authentication > Providers > Email** kısmından Email provider açık olsun.

Geliştirme aşamasında kolaylık için istersen **Confirm email** seçeneğini kapatabilirsin. Kapalı olursa admin hesabı oluşturduktan sonra direkt giriş yapılır. Açık kalırsa Supabase'in gönderdiği mailden hesabı onaylaman gerekir.

## 3) Site dosyasına Supabase bilgilerini girme

`js/config.js` dosyasını aç ve şuraları doldur:

```js
export const SUPABASE_URL = "PASTE_SUPABASE_PROJECT_URL_HERE";
export const SUPABASE_ANON_KEY = "PASTE_SUPABASE_ANON_PUBLIC_KEY_HERE";
```

Supabase Dashboard > Project Settings > API kısmından alacaksın:

- Project URL
- anon public key

**Service role key asla buraya yazılmayacak.** Sadece anon public key kullanılacak.

## 4) İlk admin hesabını oluşturma

1. Siteyi aç.
2. `/admin.html` sayfasına gir.
3. SQL dosyasında eklediğin admin e-postasıyla **Hesap Oluştur** yap.
4. Email confirmation açıksa mailini onayla.
5. Sonra aynı bilgilerle **Giriş Yap**.

## 5) Admin panelinde neler var?

Admin paneli tamamen Türkçedir.

- Site ayarları: logo URL, e-posta, Instagram, adres bilgileri
- Sayfa yazıları/görselleri: ana sayfa, neler yapıyoruz, hakkımızda, özel sipariş, iletişim metinleri
- Katalog ürünleri: ürün ekle/sil/düzenle, fiyat, ölçü, malzeme, kategori, görseller
- Projeler: proje ekle/sil/düzenle, detay sayfası, galeri
- Görsel yükle: Supabase Storage'a görsel yükleyip public URL alma
- Sipariş talepleri: iletişim formundan gelenleri görme
- Adminler: yeni admin e-postası ekleme/silme

## 6) Yeni admin ekleme mantığı

Admin panelinden bir e-posta eklediğinde o mail yetkili olur. O kişi `/admin.html` sayfasından hesap oluşturup giriş yapabilir.

Bu sistem frontend içinde service role key kullanmadığı için güvenlidir.

## 7) Cloudflare Pages'e yükleme

Cloudflare Pages için bu klasörü repo olarak GitHub'a atabilir veya direkt upload edebilirsin.

Build ayarı:

- Framework preset: **None**
- Build command: boş bırak
- Output directory: `/` veya boş bırak

Site statik çalışır. Backend olarak Supabase kullanır.

## 8) Önemli notlar

- Site Supabase bağlanmadan da örnek içeriklerle açılır, ama admin paneli çalışmaz.
- Görseller URL ile çalışır. Admin panelinden Storage'a yükleyip çıkan URL'yi ürün/proje/sayfa görsel alanlarına yapıştırabilirsin.
- Dil seçenekleri: English, Türkçe, Español.
- Özel sipariş sayfası şu an bilinçli olarak pasif/yakında modundadır.

## 9) Dosya yapısı

```text
index.html
catalog.html
projects.html
what-we-do.html
custom-orders.html
about.html
contact.html
product.html
project.html
admin.html
style.css
js/
  app.js
  admin.js
  config.js
  data.js
  i18n.js
  supabaseClient.js
assets/
  logo.png
  placeholders/
sql/
  schema.sql
```
