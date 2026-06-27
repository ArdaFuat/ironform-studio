const STATIC_ROUTES = new Map([
  ['/', '/index.html'],
  ['/index', '/index.html'],
  ['/index.html', '/index.html'],
  ['/catalog', '/catalog.html'],
  ['/catalog/', '/catalog.html'],
  ['/catalog.html', '/catalog.html'],
  ['/projects', '/projects.html'],
  ['/projects/', '/projects.html'],
  ['/projects.html', '/projects.html'],
  ['/what-we-do', '/what-we-do.html'],
  ['/what-we-do/', '/what-we-do.html'],
  ['/what-we-do.html', '/what-we-do.html'],
  ['/custom-orders', '/custom-orders.html'],
  ['/custom-orders/', '/custom-orders.html'],
  ['/custom-orders.html', '/custom-orders.html'],
  ['/about', '/about.html'],
  ['/about/', '/about.html'],
  ['/about.html', '/about.html'],
  ['/contact', '/contact.html'],
  ['/contact/', '/contact.html'],
  ['/contact.html', '/contact.html'],
  ['/admin', '/admin.html'],
  ['/admin/', '/admin.html'],
  ['/admin.html', '/admin.html']
]);

function cleanSlug(value) {
  return String(value || '').toLowerCase().replace(/[^a-z0-9-]/g, '');
}

function assetPathFor(url) {
  const p = url.pathname;
  if (STATIC_ROUTES.has(p)) return STATIC_ROUTES.get(p);

  if (p === '/product' || p === '/product.html') {
    const slug = cleanSlug(url.searchParams.get('slug')) || 'eagle-wall-sculpture';
    return `/products/${slug}.html`;
  }
  if (p.startsWith('/product/')) {
    const slug = cleanSlug(p.split('/').filter(Boolean)[1]);
    return `/products/${slug}.html`;
  }

  if (p === '/project' || p === '/project.html') {
    const slug = cleanSlug(url.searchParams.get('slug')) || 'signature-eagle-brand-wall';
    return `/project-details/${slug}.html`;
  }
  if (p.startsWith('/project/')) {
    const slug = cleanSlug(p.split('/').filter(Boolean)[1]);
    return `/project-details/${slug}.html`;
  }

  return p;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (!['GET', 'HEAD'].includes(request.method)) {
      return env.ASSETS.fetch(request);
    }

    const targetPath = assetPathFor(url);
    const assetUrl = new URL(request.url);
    assetUrl.pathname = targetPath;
    const response = await env.ASSETS.fetch(new Request(assetUrl, request));

    if (response.status !== 404) {
      const headers = new Headers(response.headers);
      if (targetPath.startsWith('/assets/') || targetPath.startsWith('/js/') || targetPath === '/style.css') {
        headers.set('Cache-Control', 'public, max-age=31536000, immutable');
      } else if (targetPath.endsWith('.html')) {
        headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
      }
      return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
    }

    const nfUrl = new URL(request.url);
    nfUrl.pathname = '/404.html';
    const nf = await env.ASSETS.fetch(new Request(nfUrl, request));
    return new Response(nf.body, { status: 404, headers: nf.headers });
  }
};
