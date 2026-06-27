import { languages, getLang, setLang, tr, pick } from './i18n.js';
import { loadSettings, loadSections, loadProducts, loadProjects, processSteps, fallbackSettings } from './data.js';
import { getSupabase } from './supabaseClient.js';

const $ = (s, r=document) => r.querySelector(s);
const abs = (path) => new URL(path, document.baseURI).href;
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));
const esc = (v='') => String(v).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const imgOf = (arr, fallback='assets/placeholders/eagle.svg') => Array.isArray(arr) && arr.length ? arr[0] : fallback;
const lang = () => getLang();

let settings = fallbackSettings;

function navLinks(){
  return [
    ['index.html','home',tr('home')],
    ['catalog.html','catalog',tr('catalog')],
    ['what-we-do.html','what',tr('what')],
    ['projects.html','projects',tr('projects')],
    ['custom-orders.html','custom',tr('custom')],
    ['about.html','about',tr('about')],
    ['contact.html','contact',tr('contact')]
  ].map(([href,key,label]) => [abs(href), key, label]);
}

function header(active){
  const langOptions = Object.entries(languages).map(([code,name]) => `<option value="${code}" ${getLang()===code?'selected':''}>${name}</option>`).join('');
  return `
    <div class="noise"></div>
    <header class="site-header">
      <div class="container nav">
        <a class="brand" href="${abs('index.html')}" aria-label="Ironform Studio home">
          <img src="${esc(settings.logo_url || 'assets/logo.webp')}" alt="Ironform Studio logo">
          <span><strong>IRONFORM</strong><span>STUDIO</span></span>
        </a>
        <nav class="nav-links" id="navLinks" aria-label="Main navigation">
          ${navLinks().map(([href,key,label]) => `<a class="${active===key?'active':''}" href="${href}">${label}</a>`).join('')}
        </nav>
        <div class="nav-actions">
          <select class="lang-select" id="languageSelect" aria-label="Language">${langOptions}</select>
          <a class="btn small accent" href="${abs('contact.html')}">${tr('contactCta')}</a>
          <a class="admin-login-icon" href="${abs('admin.html')}" aria-label="Admin panel giriş" title="Admin panel">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z"/></svg>
          </a>
          <button class="mobile-toggle" id="mobileToggle" aria-label="Open menu"><span></span></button>
        </div>
      </div>
    </header>`;
}

function footer(){
  return `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <a class="brand" href="${abs('index.html')}">
              <img src="${esc(settings.logo_url || 'assets/logo.webp')}" alt="Ironform Studio logo">
              <span><strong>IRONFORM</strong><span>STUDIO</span></span>
            </a>
            <p>${tr('footerText')}</p>
            <p class="pill">${tr('madeFor')}</p>
          </div>
          <div><h4>${tr('quickLinks')}</h4>${navLinks().slice(0,4).map(([h,_,l])=>`<a href="${h}">${l}</a>`).join('')}</div>
          <div><h4>${tr('studio')}</h4>${navLinks().slice(4).map(([h,_,l])=>`<a href="${h}">${l}</a>`).join('')}<a href="${abs('admin.html')}">${tr('admin')}</a></div>
          <div><h4>${tr('getInTouch')}</h4><a href="mailto:${esc(settings.email||'hello@ironformstudio.com')}">${esc(settings.email||'hello@ironformstudio.com')}</a>${settings.phone?`<a href="tel:${esc(settings.phone)}">${esc(settings.phone)}</a>`:''}${settings.instagram?`<a href="${esc(settings.instagram)}" target="_blank" rel="noreferrer">Instagram</a>`:''}</div>
        </div>
        <div class="copyright"><span>© ${new Date().getFullYear()} Ironform Studio. ${tr('rights')}</span><span>Low-poly metal sculpture studio</span></div>
      </div>
    </footer>`;
}

function bindShell(){
  $('#mobileToggle')?.addEventListener('click',()=>$('#navLinks')?.classList.toggle('open'));
  $('#languageSelect')?.addEventListener('change',(e)=>{ setLang(e.target.value); location.reload(); });
}

function setShell(active){
  const root = $('#shell');
  if(root) root.innerHTML = header(active);
  const foot = $('#footer');
  if(foot) foot.innerHTML = footer();
  bindShell();
}

function sectionBy(sections,key){ return sections.find(s=>s.section_key===key) || sections[0]; }
function sectionCard(s){
  return `<div class="split">
    <div>
      <span class="kicker">Ironform Studio</span>
      <h2>${esc(pick(s.content?.title))}</h2>
      <p>${esc(pick(s.content?.subtitle))}</p>
      <div class="feature-list">
        <div class="feature-item"><span>1</span><div><strong>Architectural presence</strong><small>${esc(pick(s.content?.body))}</small></div></div>
        <div class="feature-item"><span>2</span><div><strong>Premium metal finish</strong><small>${tr('madeFor')}</small></div></div>
      </div>
    </div>
    <div class="split-media"><img src="${esc(imgOf(s.images,'assets/placeholders/workshop.svg'))}" alt="${esc(pick(s.content?.title))}" loading="lazy"></div>
  </div>`;
}

function renderPageHero({eyebrow='Ironform Studio',title,subtitle,actions=''}){
  return `<section class="page-hero"><div class="container page-title"><span class="kicker">${esc(eyebrow)}</span><h1>${esc(title)}</h1>${subtitle?`<p>${esc(subtitle)}</p>`:''}${actions?`<div class="actions">${actions}</div>`:''}</div></section>`;
}

function productCard(p){
  return `<article class="card item-card" data-category="${esc(p.category||'')}">
    <a href="product.html?slug=${encodeURIComponent(p.slug)}" class="card-media"><img src="${esc(imgOf(p.images,'assets/placeholders/eagle.svg'))}" alt="${esc(pick(p.title))}" loading="lazy"></a>
    <div class="card-body">
      <span class="tag">${esc(p.category||'Sculpture')}</span>
      <h3>${esc(pick(p.title))}</h3>
      <p>${esc(pick(p.description)).slice(0,145)}${pick(p.description).length>145?'...':''}</p>
      <div class="meta"><span>${esc(p.dimensions||'Custom')}</span><span>•</span><span class="price">${esc(p.price_text||'Price on request')}</span></div>
      <div class="admin-actions"><a class="btn small ghost" href="product.html?slug=${encodeURIComponent(p.slug)}">${tr('viewDetails')}</a></div>
    </div>
  </article>`;
}
function projectCard(p){
  return `<article class="card item-card" data-category="${esc(p.category||'')}">
    <a href="project.html?slug=${encodeURIComponent(p.slug)}" class="card-media"><img src="${esc(imgOf(p.images,'assets/placeholders/stag.svg'))}" alt="${esc(pick(p.title))}" loading="lazy"></a>
    <div class="card-body">
      <span class="tag">${esc(p.category||'Project')}</span>
      <h3>${esc(pick(p.title))}</h3>
      <p>${esc(pick(p.description)).slice(0,145)}${pick(p.description).length>145?'...':''}</p>
      <div class="meta"><span>${esc(p.location||'United States')}</span><span>•</span><span>${esc(p.status||'Planning')}</span></div>
      <div class="admin-actions"><a class="btn small ghost" href="project.html?slug=${encodeURIComponent(p.slug)}">${tr('viewProject')}</a></div>
    </div>
  </article>`;
}

function bindFilters(items, containerSel){
  const container = $(containerSel);
  if(!container) return;
  const category = new Set(items.map(i=>i.category).filter(Boolean));
  const filters = $('#filters');
  const search = $('#searchBox');
  if(filters){
    filters.innerHTML = `<button class="filter-btn active" data-filter="all">${tr('all')}</button>` + [...category].map(c=>`<button class="filter-btn" data-filter="${esc(c)}">${esc(c)}</button>`).join('');
    filters.addEventListener('click', e=>{
      const btn=e.target.closest('button'); if(!btn) return;
      $$('.filter-btn',filters).forEach(b=>b.classList.remove('active')); btn.classList.add('active'); apply();
    });
  }
  search?.addEventListener('input', apply);
  function apply(){
    const filter = $('.filter-btn.active',filters)?.dataset.filter || 'all';
    const q = (search?.value || '').toLowerCase().trim();
    let visible = 0;
    $$('.item-card',container).forEach((card,idx)=>{
      const item = items[idx];
      const text = `${pick(item.title)} ${pick(item.description)} ${item.category||''} ${item.material||''}`.toLowerCase();
      const ok = (filter==='all'||item.category===filter) && (!q || text.includes(q));
      card.style.display = ok ? '' : 'none';
      if(ok) visible++;
    });
    $('#emptyState')?.classList.toggle('hidden', visible!==0);
  }
}

function renderGallery(images, title){
  const imgs = images?.length ? images : ['assets/placeholders/eagle.svg'];
  return `<div class="gallery">
    <button class="gallery-main" data-lightbox="${esc(imgs[0])}"><img id="mainGalleryImage" src="${esc(imgs[0])}" alt="${esc(title)}"></button>
    <div class="thumbs">${imgs.map((src,i)=>`<button data-gallery-src="${esc(src)}" aria-label="Image ${i+1}"><img src="${esc(src)}" alt="${esc(title)} thumbnail ${i+1}"></button>`).join('')}</div>
  </div>`;
}

function bindGallery(){
  $$('[data-gallery-src]').forEach(b=>b.addEventListener('click',()=>{ const src=b.dataset.gallerySrc; const main=$('#mainGalleryImage'); if(main) main.src=src; $('.gallery-main')?.setAttribute('data-lightbox',src); }));
  $$('[data-lightbox]').forEach(b=>b.addEventListener('click',()=>openLightbox(b.dataset.lightbox)));
}
function openLightbox(src){
  let lb=$('#lightbox');
  if(!lb){
    lb=document.createElement('div'); lb.id='lightbox'; lb.className='lightbox'; lb.innerHTML='<button aria-label="Close">×</button><img alt="Expanded image">'; document.body.appendChild(lb);
    lb.addEventListener('click',e=>{ if(e.target===lb||e.target.tagName==='BUTTON') closeLightbox(); });
    document.addEventListener('keydown',e=>{if(e.key==='Escape') closeLightbox();});
  }
  $('img',lb).src=src; lb.classList.add('open'); document.body.classList.add('lightbox-open');
}
function closeLightbox(){ $('#lightbox')?.classList.remove('open'); document.body.classList.remove('lightbox-open'); }

async function renderHome(){
  const sections = await loadSections('home');
  const hero = sectionBy(sections,'hero');
  const intro = sectionBy(sections,'intro');
  const products = (await loadProducts()).filter(p=>p.featured).slice(0,3);
  const projects = (await loadProjects()).filter(p=>p.featured).slice(0,2);
  $('#main').innerHTML = `
    <section class="hero">
      <div class="container hero-grid">
        <div>
          <span class="pill">${esc(pick(hero.content?.eyebrow)||'Industrial art studio')}</span>
          <h1>${esc(pick(hero.content?.title))}</h1>
          <p class="lead">${esc(pick(hero.content?.subtitle))}</p>
          <p class="hero-copy">${esc(pick(hero.content?.body))}</p>
          <div class="hero-actions"><a class="btn accent" href="catalog.html">${tr('catalogCta')}</a><a class="btn dark" href="custom-orders.html">${tr('customSoon')}</a></div>
          <div class="trust-row"><span class="tag">${tr('madeFor')}</span><span class="tag">Laser-cut steel</span><span class="tag">Custom scale concepts</span></div>
        </div>
        <div class="hero-card">
          <div class="hero-logo-wrap"><img src="${esc(settings.logo_url||'assets/logo.webp')}" alt="Ironform Studio logo"></div>
          <div class="hero-stat"><div><strong>${tr('stat1')}</strong><span>${tr('stat1s')}</span></div><div><strong>${tr('stat2')}</strong><span>${tr('stat2s')}</span></div><div><strong>${tr('stat3')}</strong><span>${tr('stat3s')}</span></div></div>
        </div>
      </div>
    </section>
    <section class="section"><div class="container">${sectionCard(intro)}</div></section>
    <section class="section tight"><div class="container"><div class="section-head"><div><span class="kicker">Process</span><h2>${tr('processTitle')}</h2><p>${tr('processLead')}</p></div><a class="btn ghost" href="what-we-do.html">${tr('what')}</a></div><div class="process">${processSteps.map(s=>`<div class="step"><h3>${esc(pick(s.title))}</h3><p>${esc(pick(s.text))}</p></div>`).join('')}</div></div></section>
    <section class="section tight"><div class="container"><div class="section-head"><div><span class="kicker">Catalog</span><h2>${tr('featured')}</h2><p>${tr('madeFor')}</p></div><a class="btn ghost" href="catalog.html">${tr('catalogCta')}</a></div><div class="cards">${products.map(productCard).join('')}</div></div></section>
    <section class="section"><div class="container"><div class="section-head"><div><span class="kicker">Projects</span><h2>${tr('projects')}</h2><p>Concepts and installation ideas for commercial spaces, homes and outdoor environments.</p></div><a class="btn ghost" href="projects.html">${tr('viewProject')}</a></div><div class="project-grid">${projects.map(projectCard).join('')}</div></div></section>
  `;
}

async function renderCatalog(){
  const products = await loadProducts();
  $('#main').innerHTML = `${renderPageHero({eyebrow:'Ironform Catalog', title:tr('catalog'), subtitle:'Low-poly steel wall art, animal sculptures, commercial concepts and outdoor statement pieces.', actions:`<a class="btn accent" href="contact.html">${tr('contactCta')}</a>`})}
  <section class="section"><div class="container"><div class="toolbar"><div class="filters" id="filters"></div><input id="searchBox" class="search" placeholder="${tr('search')}"></div><div class="catalog-grid" id="catalogGrid">${products.map(productCard).join('')}<div id="emptyState" class="empty hidden">${tr('noItems')}</div></div></div></section>`;
  bindFilters(products,'#catalogGrid');
}

async function renderProjects(){
  const projects = await loadProjects();
  $('#main').innerHTML = `${renderPageHero({eyebrow:'Ironform Projects', title:tr('projects'), subtitle:'Project concepts, installations and sculptural ideas for residential, commercial and outdoor spaces.', actions:`<a class="btn accent" href="contact.html">${tr('contactCta')}</a>`})}
  <section class="section"><div class="container"><div class="toolbar"><div class="filters" id="filters"></div><input id="searchBox" class="search" placeholder="${tr('search')}"></div><div class="project-grid" id="projectGrid">${projects.map(projectCard).join('')}<div id="emptyState" class="empty hidden">${tr('noItems')}</div></div></div></section>`;
  bindFilters(projects,'#projectGrid');
}

async function renderWhat(){
  const sections = await loadSections('what-we-do'); const s = sectionBy(sections,'process-intro');
  $('#main').innerHTML = `${renderPageHero({eyebrow:'Process', title:pick(s.content?.title), subtitle:pick(s.content?.subtitle)})}
  <section class="section"><div class="container"><div class="split"><div class="split-media"><img src="${esc(imgOf(s.images,'assets/placeholders/workshop.svg'))}" alt="Workshop"></div><div><p class="lead">${esc(pick(s.content?.body))}</p><div class="feature-list">${processSteps.map((step,i)=>`<div class="feature-item"><span>${i+1}</span><div><strong>${esc(pick(step.title))}</strong><small>${esc(pick(step.text))}</small></div></div>`).join('')}</div></div></div></div></section>`;
}

async function renderAbout(){
  const sections = await loadSections('about'); const s = sectionBy(sections,'story');
  $('#main').innerHTML = `${renderPageHero({eyebrow:'About Ironform', title:pick(s.content?.title), subtitle:pick(s.content?.subtitle), actions:`<a class="btn accent" href="catalog.html">${tr('catalogCta')}</a>`})}
  <section class="section"><div class="container">${sectionCard(s)}</div></section>
  <section class="section tight"><div class="container"><div class="cards"><div class="card pad"><span class="kicker">01</span><h3>Sharp geometry</h3><p>Low-poly planes give every sculpture a clean silhouette and a strong modern identity.</p></div><div class="card pad"><span class="kicker">02</span><h3>Metal permanence</h3><p>Steel construction and durable finishes make the work suitable for long-term display.</p></div><div class="card pad"><span class="kicker">03</span><h3>Statement placement</h3><p>Pieces are created for places where art must be seen, remembered and photographed.</p></div></div></div></section>`;
}

async function renderCustom(){
  const sections = await loadSections('custom-orders'); const s = sectionBy(sections,'coming-soon');
  $('#main').innerHTML = `${renderPageHero({eyebrow:'Custom Orders', title:pick(s.content?.title), subtitle:pick(s.content?.subtitle), actions:`<a class="btn accent" href="contact.html">${tr('contactCta')}</a>`})}
  <section class="section"><div class="container"><div class="split"><div><div class="notice"><strong>${tr('customSoon')}</strong><br>${tr('soonText')}</div><p style="color:var(--muted);margin-top:22px">${esc(pick(s.content?.body))}</p><div class="feature-list"><div class="feature-item"><span>✓</span><div><strong>Animal / object concept</strong><small>Eagle, panther, wolf, horse, stag, lion or a custom symbol.</small></div></div><div class="feature-item"><span>✓</span><div><strong>Size & placement</strong><small>Wall, freestanding, garden, lobby or brand installation.</small></div></div><div class="feature-item"><span>✓</span><div><strong>Finish options</strong><small>Matte black, raw steel look, powder coating and outdoor coatings.</small></div></div></div></div><div class="split-media"><img src="${esc(imgOf(s.images,'assets/placeholders/stag.svg'))}" alt="Custom order concept"></div></div></div></section>`;
}

async function renderContact(){
  const [sections, products] = await Promise.all([loadSections('contact'), loadProducts()]); const s = sectionBy(sections,'intro');
  $('#main').innerHTML = `${renderPageHero({eyebrow:'Contact', title:pick(s.content?.title), subtitle:pick(s.content?.subtitle)})}
  <section class="section"><div class="container split"><div><p style="color:var(--muted)">${esc(pick(s.content?.body))}</p><div class="feature-list"><div class="feature-item"><span>@</span><div><strong>Email</strong><small>${esc(settings.email||'hello@ironformstudio.com')}</small></div></div>${settings.instagram?`<div class="feature-item"><span>ig</span><div><strong>Instagram</strong><small>${esc(settings.instagram)}</small></div></div>`:''}<div class="feature-item"><span>US</span><div><strong>Market</strong><small>${esc(settings.address||'United States')}</small></div></div></div></div><div class="card pad"><h2>${tr('inquiry')}</h2><form id="inquiryForm" class="form"><div class="form-grid"><div class="field"><label>${tr('name')}</label><input name="name" required></div><div class="field"><label>${tr('email')}</label><input name="email" type="email" required></div></div><div class="form-grid"><div class="field"><label>${tr('phone')}</label><input name="phone"></div><div class="field"><label>${tr('interest')}</label><select name="interest"><option>Catalog piece</option><option>Commercial project</option><option>Outdoor sculpture</option><option>Early custom order</option>${products.map(p=>`<option>${esc(pick(p.title))}</option>`).join('')}</select></div></div><div class="field"><label>${tr('message')}</label><textarea name="message" required placeholder="Tell us the piece, size, location and timing you have in mind."></textarea></div><button class="btn accent" type="submit">${tr('submit')}</button><div id="formMsg"></div></form></div></div></section>`;
  bindInquiryForm();
}

function bindInquiryForm(){
  $('#inquiryForm')?.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const msg = $('#formMsg'); msg.innerHTML='';
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    const supabase = await getSupabase({ timeoutMs: 5000, silent: false });
    if(!supabase){ msg.innerHTML = `<div class="notice danger-msg">${tr('inquiryError')}</div>`; return; }
    const { error } = await supabase.from('order_inquiries').insert(payload);
    if(error) msg.innerHTML = `<div class="notice danger-msg">${tr('inquiryError')}<br><small>${esc(error.message)}</small></div>`;
    else { msg.innerHTML = `<div class="notice success">${tr('inquirySuccess')}</div>`; e.currentTarget.reset(); }
  });
}

async function renderProductDetail(){
  const slug = new URLSearchParams(location.search).get('slug');
  const products = await loadProducts();
  const p = products.find(x=>x.slug===slug) || products[0];
  if(!p){ $('#main').innerHTML = renderPageHero({title:'Product not found', subtitle:''}); return; }
  $('#main').innerHTML = `${renderPageHero({eyebrow:p.category||'Catalog', title:pick(p.title), subtitle:pick(p.description), actions:`<a class="btn ghost" href="catalog.html">${tr('back')}</a><a class="btn accent" href="contact.html?interest=${encodeURIComponent(pick(p.title))}">${tr('contactCta')}</a>`})}
  <section class="section"><div class="container detail-layout"><div>${renderGallery(p.images,pick(p.title))}</div><aside class="detail-panel"><span class="tag">${esc(p.category||'Sculpture')}</span><h1>${esc(pick(p.title))}</h1><p style="color:var(--muted)">${esc(pick(p.description))}</p><div class="specs"><div><span>${tr('status')}</span><strong>${esc(p.status||'')}</strong></div><div><span>${tr('dimensions')}</span><strong>${esc(p.dimensions||'Custom')}</strong></div><div><span>${tr('material')}</span><strong>${esc(p.material||'Steel')}</strong></div><div><span>${tr('price')}</span><strong>${esc(p.price_text||'Price on request')}</strong></div>${p.specs?Object.entries(p.specs).map(([k,v])=>`<div><span>${esc(k)}</span><strong>${esc(v)}</strong></div>`).join(''):''}</div><a class="btn accent" href="contact.html?interest=${encodeURIComponent(pick(p.title))}">${tr('contactCta')}</a></aside></div></section>`;
  bindGallery();
}

async function renderProjectDetail(){
  const slug = new URLSearchParams(location.search).get('slug');
  const projects = await loadProjects();
  const p = projects.find(x=>x.slug===slug) || projects[0];
  if(!p){ $('#main').innerHTML = renderPageHero({title:'Project not found', subtitle:''}); return; }
  $('#main').innerHTML = `${renderPageHero({eyebrow:p.category||'Project', title:pick(p.title), subtitle:pick(p.description), actions:`<a class="btn ghost" href="projects.html">${tr('back')}</a><a class="btn accent" href="contact.html?interest=${encodeURIComponent(pick(p.title))}">${tr('contactCta')}</a>`})}
  <section class="section"><div class="container detail-layout"><div>${renderGallery(p.images,pick(p.title))}</div><aside class="detail-panel"><span class="tag">${esc(p.category||'Project')}</span><h1>${esc(pick(p.title))}</h1><p style="color:var(--muted)">${esc(pick(p.description))}</p><div class="specs"><div><span>${tr('status')}</span><strong>${esc(p.status||'')}</strong></div><div><span>Location</span><strong>${esc(p.location||'United States')}</strong></div><div><span>${tr('category')}</span><strong>${esc(p.category||'')}</strong></div></div><a class="btn accent" href="contact.html?interest=${encodeURIComponent(pick(p.title))}">${tr('contactCta')}</a></aside></div></section>`;
  bindGallery();
}

function pageFromLocation(){
  const file = location.pathname.split('/').filter(Boolean).pop() || 'index.html';
  const name = file.replace(/\.html$/,'');
  const routes = {
    '':'home', 'index':'home', 'catalog':'catalog', 'projects':'projects',
    'what-we-do':'what', 'about':'about', 'custom-orders':'custom',
    'contact':'contact', 'product':'product', 'project':'project'
  };
  return routes[name] || document.body.dataset.page || 'home';
}

async function init(){
  const page = pageFromLocation();
  const active = {home:'home',catalog:'catalog',product:'catalog',projects:'projects',project:'projects',what:'what',about:'about',custom:'custom',contact:'contact'}[page] || page;
  settings = await loadSettings();
  setShell(active);
  if(page==='home') await renderHome();
  if(page==='catalog') await renderCatalog();
  if(page==='projects') await renderProjects();
  if(page==='what') await renderWhat();
  if(page==='about') await renderAbout();
  if(page==='custom') await renderCustom();
  if(page==='contact') await renderContact();
  if(page==='product') await renderProductDetail();
  if(page==='project') await renderProjectDetail();
}

init().catch(err=>{
  console.error(err);
  $('#main').innerHTML = `<section class="section"><div class="container"><div class="notice danger-msg">Site yüklenirken hata oluştu: ${esc(err.message)}</div></div></section>`;
});
