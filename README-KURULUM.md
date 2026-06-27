# Ironform Studio - Cloudflare Fix v3

Bu sürümde `_redirects` tamamen kaldırıldı. Cloudflare'ın clean URL yönlendirmesi ile çakışıp `/catalog` gibi sayfalarda `ERR_TOO_MANY_REDIRECTS` hatası verebildiği için site artık doğrudan `.html` sayfalarına link veriyor.

## Deploy

1. GitHub repo içindeki eski dosyaları silip bu ZIP'in içindekileri köke koyun.
2. Özellikle eski `_redirects` dosyasının repo'da kalmadığından emin olun.
3. `.assetsignore` dosyasını repo'da bırakın. Bu dosya `.git`, `.wrangler`, `node_modules`, `sql` gibi gereksiz şeylerin Cloudflare'a asset olarak yüklenmesini engeller.
4. Cloudflare'da tekrar deploy edin.
5. Tarayıcıda `https://ironformstudio.com/catalog.html` gibi `.html` adresleriyle test edin. Menü linkleri zaten bu adreslere gider.

## Not

Eğer hâlâ `/catalog` adresinde hata görürseniz bu eski Cloudflare cache'i veya eski redirect kuralıdır. Cloudflare dashboard > Rules > Redirect Rules / Page Rules kısmında `/catalog` veya `.html` kaldırma yönlendirmesi varsa kapatın, sonra Cache > Purge Everything yapın.
