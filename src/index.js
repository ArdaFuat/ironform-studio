const STATIC_ROUTES = new Map([
  ['/', '/index.html'],
  ['/index', '/index.html'],
  ['/index.html', '/index.html'],
  ['/catalog', '/catalog.html'],
  ['/catalog/', '/catalog.html'],
  ['/catalog.html', '/catalog.html'],
  ['/custom-orders', '/custom-orders.html'],
  ['/custom-orders/', '/custom-orders.html'],
  ['/custom-orders.html', '/custom-orders.html'],
  ['/about', '/about.html'],
  ['/about/', '/about.html'],
  ['/about.html', '/about.html'],
  ['/contact', '/contact.html'],
  ['/contact/', '/contact.html'],
  ['/contact.html', '/contact.html'],
]);

function cleanSlug(value) {
  return String(value || '').toLowerCase().replace(/[^a-z0-9-]/g, '');
}

function assetPathFor(url) {
  const p = url.pathname;
  if (STATIC_ROUTES.has(p)) return STATIC_ROUTES.get(p);

  if (p === '/product' || p === '/product.html') {
    const slug = cleanSlug(url.searchParams.get('slug')) || 'illuminated-floor-eagle';
    return `/products/${slug}.html`;
  }
  if (p.startsWith('/product/')) {
    const slug = cleanSlug(p.split('/').filter(Boolean)[1]);
    return `/products/${slug}.html`;
  }

  return p;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (['/product/eagle-wall-sculpture', '/product/eagle-wall-sculpture/', '/products/eagle-wall-sculpture.html'].includes(url.pathname) ||
        (['/product', '/product.html'].includes(url.pathname) && url.searchParams.get('slug') === 'eagle-wall-sculpture')) {
      return Response.redirect(new URL('/product/illuminated-floor-eagle', url.origin).href, 301);
    }
    // Keep existing bookmarks useful after consolidating the site navigation.
    if (/^\/what-we-do(?:\/|\.html)?$/.test(url.pathname)) {
      return Response.redirect(new URL('/about', url.origin).href, 301);
    }
    if (/^\/(?:projects|project)(?:\/|\.html|$)/.test(url.pathname) || url.pathname.startsWith('/project-details/')) {
      return Response.redirect(new URL('/catalog', url.origin).href, 301);
    }
    if (!['GET', 'HEAD'].includes(request.method)) {
      return env.ASSETS.fetch(request);
    }

    const targetPath = assetPathFor(url);
    const assetUrl = new URL(request.url);
    assetUrl.pathname = targetPath;
    const response = await env.ASSETS.fetch(new Request(assetUrl, request));

    if (response.status !== 404) {
      const headers = new Headers(response.headers);
      if (targetPath.startsWith('/js/') || targetPath === '/style.css') {
        headers.set('Cache-Control', 'no-cache');
      } else if (targetPath.startsWith('/assets/')) {
        headers.set('Cache-Control', 'public, max-age=31536000, immutable');
      } else if (targetPath.endsWith('.html')) {
        headers.set('Cache-Control', 'private, no-store');
      }
      const result = new Response(response.body, { status: response.status, statusText: response.statusText, headers });
      return withDefaultLanguage(result, request);
    }

    const nfUrl = new URL(request.url);
    nfUrl.pathname = '/404.html';
    const nf = await env.ASSETS.fetch(new Request(nfUrl, request));
    const headers = new Headers(nf.headers);
    headers.set('Cache-Control', 'private, no-store');
    return withDefaultLanguage(new Response(nf.body, { status: 404, headers }), request);
  }
};

function withDefaultLanguage(response, request) {
  if (!response.headers.get('Content-Type')?.includes('text/html')) return response;
  const language = request.cf?.country === 'TR' ? 'tr' : 'en';
  return new HTMLRewriter().on('html', {
    element(element) {
      element.setAttribute('data-default-language', language);
    }
  }).transform(response);
}
