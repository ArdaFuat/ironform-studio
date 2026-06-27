# Ironform Studio - Hızlı Cloudflare paketi

Bu sürümde public site tamamen statik açılır. Ana sayfa, katalog ve diğer sayfalar Supabase beklemez; bu yüzden ilk ekran pat diye gelir.

## Cloudflare ayarı

Build command:

```bash
npx wrangler deploy
```

Output directory boş kalabilir. `wrangler.toml` dosyası `public` klasörünü asset olarak deploy eder.

## Önemli

- Eski repodaki `_redirects` dosyasını sil.
- Bu pakette public sayfalar root path ile çalışır: `/catalog`, `/projects`, `/admin`.
- Admin panel hâlâ Supabase ile çalışır ve `/admin` adresindedir.
- Normal ziyaretçiler için Supabase/CDN bekleme yoktur.
- Deploy sonrası Cloudflare > Caching > Purge Everything yap.

## Dosya yapısı

- `public/` ziyaretçiye giden site dosyaları
- `src/index.js` Cloudflare Worker router
- `wrangler.toml` Cloudflare deploy config

## v5 Notu
- Üst menüye EN / TR / ES dil seçici eklendi.
- Seçilen dil tarayıcıda saklanır, sayfalar arasında korunur.
- Public sayfalar hâlâ statik ve hızlı açılacak şekilde kalır.
