import { getSupabase } from './supabaseClient.js';
import { STORAGE_BUCKET } from './config.js';
import { fallbackSettings, fallbackProducts, fallbackProjects, fallbackSections } from './data.js';

const $ = (s,r=document)=>r.querySelector(s);
const $$ = (s,r=document)=>Array.from(r.querySelectorAll(s));
const esc = (v='')=>String(v??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const slugify = (v='')=>String(v).toLowerCase().trim().replace(/[ı]/g,'i').replace(/[ğ]/g,'g').replace(/[ü]/g,'u').replace(/[ş]/g,'s').replace(/[ö]/g,'o').replace(/[ç]/g,'c').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const lines = (txt='')=>String(txt).split('\n').map(s=>s.trim()).filter(Boolean);
const jsonLang = (prefix, data={})=>({en:$(`[name="${prefix}_en"]`)?.value||data?.en||'',tr:$(`[name="${prefix}_tr"]`)?.value||data?.tr||'',es:$(`[name="${prefix}_es"]`)?.value||data?.es||''});
const field = (name,val='',type='text')=>`<div class="field"><label>${name}</label><input name="${name}" type="${type}" value="${esc(val)}"></div>`;
const textField = (name,val='')=>`<div class="field"><label>${name}</label><textarea name="${name}">${esc(val)}</textarea></div>`;

let supabase=null, session=null, settings=null;
let products=[], projects=[], sections=[], admins=[], inquiries=[];
let currentView='dashboard';
let editing = { product:null, project:null, section:null };

function msg(text,type='notice'){
  const box=$('#adminMsg'); if(!box) return;
  box.innerHTML = `<div class="notice ${type==='error'?'danger-msg':type==='success'?'success':''}">${esc(text)}</div>`;
  setTimeout(()=>{ if(box) box.innerHTML=''; },5000);
}

function friendlyError(error, fallback='Bir bağlantı hatası oluştu.'){
  const message = error?.message || '';
  if (/Failed to fetch/i.test(message)) return 'Supabase bağlantısı kurulamadı. İnternet bağlantısını, js/config.js ayarlarını ve Supabase projesini kontrol et.';
  if (/is_admin/i.test(message)) return 'Supabase SQL kurulumu eksik görünüyor. README-KURULUM.md içindeki SQL adımlarını tekrar uygula.';
  if (/Invalid API key|JWT|permission|not admin/i.test(message)) return 'Admin yetkisi veya Supabase anahtarı ile ilgili bir sorun var. Kurulumu kontrol et.';
  return message || fallback;
}

function authScreen(reason=''){
  $('#adminRoot').innerHTML = `<div class="auth-card">
    <img src="assets/logo.webp" alt="Ironform Studio logo">
    <h1>Ironform Studio Admin</h1>
    <p>Admin paneli tamamen Türkçedir. Önce Supabase kurulumunu yapıp ilk admin mailini SQL içinde eklemelisin.</p>
    ${reason?`<div class="notice danger-msg">${esc(reason)}</div>`:''}
    <form id="authForm" class="form">
      <div class="field"><label>E-posta</label><input name="email" type="email" required></div>
      <div class="field"><label>Şifre</label><input name="password" type="password" required minlength="6"></div>
      <div class="admin-actions"><button class="btn accent" data-auth="login" type="submit">Giriş Yap</button><button class="btn ghost" data-auth="signup" type="button">Hesap Oluştur</button></div>
      <p class="mini">Hesap oluşturma sadece admin listesine eklenmiş e-postalar için işe yarar. İlk admin için README dosyasındaki SQL adımını izle.</p>
    </form>
  </div>`;
  $('#authForm').addEventListener('submit',async e=>{e.preventDefault(); await login(new FormData(e.currentTarget));});
  $('[data-auth="signup"]').addEventListener('click',async()=>{ await signup(new FormData($('#authForm'))); });
}

async function login(fd){
  try{
    const {data,error}=await supabase.auth.signInWithPassword({email:fd.get('email'),password:fd.get('password')});
    if(error){ authScreen(error.message); return; }
    session=data.session; await loadAll(); renderShell(); renderView('dashboard');
  }catch(error){ authScreen(friendlyError(error)); }
}
async function signup(fd){
  try{
    const {error}=await supabase.auth.signUp({email:fd.get('email'),password:fd.get('password')});
    if(error){ authScreen(error.message); return; }
    authScreen('Hesap oluşturuldu. Supabase e-posta onayı açıksa mailini onayla, sonra giriş yap.');
  }catch(error){ authScreen(friendlyError(error)); }
}
async function signout(){ await supabase.auth.signOut(); session=null; authScreen(); }

async function isAdmin(){
  try{
    const {data,error}=await supabase.rpc('is_admin');
    if(error) throw error;
    return data === true;
  }catch(error){
    throw new Error(error?.message || 'is_admin kontrolü başarısız oldu.');
  }
}

async function loadAll(){
  const ok = await isAdmin();
  if(!ok){
    authScreen('Bu e-posta admin listesinde değil. İlk admin mailini Supabase SQL içinde admin_users tablosuna ekle veya başka adminin seni eklemesini iste.');
    throw new Error('not admin');
  }
  await Promise.all([loadSettings(),loadProducts(),loadProjects(),loadSections(),loadAdmins(),loadInquiries()]);
}
async function loadSettings(){
  try{
    const {data}=await supabase.from('site_settings').select('*').eq('id','main').maybeSingle();
    settings = data || fallbackSettings;
  }catch(_e){ settings = fallbackSettings; }
}
async function loadProducts(){
  try{
    const {data,error}=await supabase.from('products').select('*').order('sort_order',{ascending:true});
    products = error || !data ? fallbackProducts : data;
  }catch(_e){ products = fallbackProducts; }
}
async function loadProjects(){
  try{
    const {data,error}=await supabase.from('projects').select('*').order('sort_order',{ascending:true});
    projects = error || !data ? fallbackProjects : data;
  }catch(_e){ projects = fallbackProjects; }
}
async function loadSections(){
  try{
    const {data,error}=await supabase.from('page_sections').select('*').order('page').order('sort_order',{ascending:true});
    sections = error || !data ? fallbackSections : data;
  }catch(_e){ sections = fallbackSections; }
}
async function loadAdmins(){
  try{
    const {data,error}=await supabase.from('admin_users').select('*').order('created_at',{ascending:false});
    admins = error || !data ? [] : data;
  }catch(_e){ admins = []; }
}
async function loadInquiries(){
  try{
    const {data,error}=await supabase.from('order_inquiries').select('*').order('created_at',{ascending:false}).limit(200);
    inquiries = error || !data ? [] : data;
  }catch(_e){ inquiries = []; }
}

function renderShell(){
  $('#adminRoot').innerHTML = `<div class="admin-shell">
    <aside class="admin-sidebar">
      <div class="admin-logo"><img src="${esc(settings?.logo_url || 'assets/logo.webp')}" alt="Logo"><div><strong>IRONFORM</strong><span>Yönetim Paneli</span></div></div>
      <nav class="admin-nav">
        <button data-view="dashboard">Genel Bakış</button>
        <button data-view="settings">Site Ayarları</button>
        <button data-view="sections">Sayfa Yazıları / Görseller</button>
        <button data-view="products">Katalog Ürünleri</button>
        <button data-view="projects">Projeler</button>
        <button data-view="media">Görsel Yükle</button>
        <button data-view="inquiries">Sipariş Talepleri</button>
        <button data-view="admins">Adminler</button>
        <a href="index.html" target="_blank">Siteyi Aç</a>
        <button id="logoutBtn">Çıkış Yap</button>
      </nav>
    </aside>
    <main class="admin-main">
      <div class="admin-top"><div><h1 id="adminTitle">Genel Bakış</h1><p class="mini">Değişiklikler Supabase'e kaydedilir ve sitede herkese görünür.</p></div><div id="adminMsg"></div></div>
      <div id="adminContent"></div>
    </main>
  </div>`;
  $$('.admin-nav [data-view]').forEach(b=>b.addEventListener('click',()=>renderView(b.dataset.view)));
  $('#logoutBtn').addEventListener('click',signout);
}
function setActive(view,title){
  currentView=view; $('#adminTitle').textContent=title;
  $$('.admin-nav [data-view]').forEach(b=>b.classList.toggle('active',b.dataset.view===view));
}
async function refresh(){ await loadAll(); renderView(currentView); }

function renderView(view){
  if(view==='dashboard') return renderDashboard();
  if(view==='settings') return renderSettings();
  if(view==='sections') return renderSections();
  if(view==='products') return renderProducts();
  if(view==='projects') return renderProjects();
  if(view==='media') return renderMedia();
  if(view==='inquiries') return renderInquiries();
  if(view==='admins') return renderAdmins();
}

function renderDashboard(){
  setActive('dashboard','Genel Bakış');
  $('#adminContent').innerHTML = `<div class="cards">
    <div class="card pad"><span class="kicker">Katalog</span><h3>${products.length} ürün</h3><p>Ürün ekle, sil, gizle, görsellerini değiştir.</p><div class="admin-actions"><button class="btn small" data-go="products">Ürünleri Yönet</button></div></div>
    <div class="card pad"><span class="kicker">Projeler</span><h3>${projects.length} proje</h3><p>Projeleri ve detay sayfalarını düzenle.</p><div class="admin-actions"><button class="btn small" data-go="projects">Projeleri Yönet</button></div></div>
    <div class="card pad"><span class="kicker">Talepler</span><h3>${inquiries.length} talep</h3><p>İletişim/sipariş formundan gelen talepler.</p><div class="admin-actions"><button class="btn small" data-go="inquiries">Talepleri Gör</button></div></div>
  </div>
  <div class="admin-panel"><h2>Kurulum Kontrolü</h2><p class="mini">Supabase bağlı. RLS güvenliği için <b>sql/schema.sql</b> dosyasını Supabase SQL Editor'de çalıştırmış olman gerekiyor. Görseller için <b>${STORAGE_BUCKET}</b> bucket public olmalı.</p></div>`;
  $$('[data-go]').forEach(b=>b.addEventListener('click',()=>renderView(b.dataset.go)));
}

function renderSettings(){
  setActive('settings','Site Ayarları');
  $('#adminContent').innerHTML = `<div class="admin-panel"><h2>Genel Ayarlar</h2>
    <form id="settingsForm" class="form">
      <div class="admin-grid">
        <div class="field"><label>Marka adı</label><input name="brand_name" value="${esc(settings.brand_name||'IRONFORM STUDIO')}"></div>
        <div class="field"><label>Logo URL</label><input name="logo_url" value="${esc(settings.logo_url||'assets/logo.webp')}"></div>
        <div class="field"><label>E-posta</label><input name="email" value="${esc(settings.email||'')}"></div>
        <div class="field"><label>Telefon</label><input name="phone" value="${esc(settings.phone||'')}"></div>
        <div class="field"><label>Instagram URL</label><input name="instagram" value="${esc(settings.instagram||'')}"></div>
        <div class="field"><label>Adres / Pazar</label><input name="address" value="${esc(settings.address||'United States')}"></div>
      </div>
      <div class="admin-actions"><button class="btn accent" type="submit">Kaydet</button></div>
    </form>
  </div>`;
  $('#settingsForm').addEventListener('submit',saveSettings);
}
async function saveSettings(e){
  e.preventDefault(); const fd=new FormData(e.currentTarget); const payload=Object.fromEntries(fd.entries()); payload.id='main';
  const {error}=await supabase.from('site_settings').upsert(payload);
  if(error) msg(error.message,'error'); else {msg('Site ayarları kaydedildi.','success'); await loadSettings(); renderShell(); renderSettings();}
}

function multiLangInputs(prefix,label,data={}){
  return `<div class="admin-tabs"><button type="button" class="active">${label}</button></div><div class="admin-grid three">
    <div class="field"><label>${label} - İngilizce</label><textarea name="${prefix}_en">${esc(data?.en||'')}</textarea></div>
    <div class="field"><label>${label} - Türkçe</label><textarea name="${prefix}_tr">${esc(data?.tr||'')}</textarea></div>
    <div class="field"><label>${label} - İspanyolca</label><textarea name="${prefix}_es">${esc(data?.es||'')}</textarea></div>
  </div>`;
}

function renderSections(){
  setActive('sections','Sayfa Yazıları / Görseller');
  const form = editing.section ? sectionForm(editing.section) : '';
  $('#adminContent').innerHTML = `<div class="admin-panel"><div class="admin-actions"><button class="btn accent" id="newSection">Yeni Bölüm Ekle</button><button class="btn ghost" id="seedSections">Örnek Bölümleri Yükle</button></div><p class="mini">Buradan ana sayfa, hakkımızda, neler yapıyoruz, iletişim ve özel sipariş sayfalarındaki metinleri/görselleri değiştirebilirsin. Yeni bölüm eklediğinde ileride sayfaya özel içerik olarak kullanılabilir.</p></div>${form}
  <div class="admin-panel"><h2>Mevcut Bölümler</h2><table class="admin-table"><thead><tr><th>Sayfa</th><th>Anahtar</th><th>Başlık</th><th>Görünür</th><th>İşlem</th></tr></thead><tbody>${sections.map(s=>`<tr><td>${esc(s.page)}</td><td>${esc(s.section_key)}</td><td><strong>${esc(s.content?.title?.tr || s.content?.title?.en || '')}</strong></td><td>${s.visible?'Evet':'Hayır'}</td><td><button class="btn small ghost" data-edit-section="${esc(s.id||s.section_key)}">Düzenle</button> <button class="btn small danger" data-del-section="${esc(s.id||s.section_key)}">Sil</button></td></tr>`).join('')}</tbody></table></div>`;
  $('#newSection').addEventListener('click',()=>{editing.section={page:'home',section_key:'new-section',sort_order:99,kind:'text',visible:true,content:{title:{},subtitle:{},body:{}},images:[]};renderSections();});
  $('#seedSections').addEventListener('click',seedSections);
  $$('[data-edit-section]').forEach(b=>b.addEventListener('click',()=>{editing.section=sections.find(s=>(s.id||s.section_key)==b.dataset.editSection);renderSections();}));
  $$('[data-del-section]').forEach(b=>b.addEventListener('click',()=>deleteSection(b.dataset.delSection)));
  $('#sectionForm')?.addEventListener('submit',saveSection);
  $('#cancelSection')?.addEventListener('click',()=>{editing.section=null;renderSections();});
}
function sectionForm(s){
  return `<div class="admin-panel"><h2>${s.id?'Bölümü Düzenle':'Yeni Bölüm'}</h2><form id="sectionForm" class="form">
    <input type="hidden" name="id" value="${esc(s.id||'')}">
    <div class="admin-grid three"><div class="field"><label>Sayfa</label><select name="page">${['home','what-we-do','about','custom-orders','contact'].map(p=>`<option ${s.page===p?'selected':''}>${p}</option>`).join('')}</select></div><div class="field"><label>Bölüm anahtarı</label><input name="section_key" value="${esc(s.section_key||'')}"></div><div class="field"><label>Sıra</label><input name="sort_order" type="number" value="${esc(s.sort_order||1)}"></div></div>
    <div class="admin-grid"><div class="field"><label>Tip</label><input name="kind" value="${esc(s.kind||'text')}"></div><div class="field"><label>Görünür</label><select name="visible"><option value="true" ${s.visible!==false?'selected':''}>Evet</option><option value="false" ${s.visible===false?'selected':''}>Hayır</option></select></div></div>
    ${multiLangInputs('title','Başlık',s.content?.title)}${multiLangInputs('subtitle','Alt başlık',s.content?.subtitle)}${multiLangInputs('body','Açıklama',s.content?.body)}
    <div class="field"><label>Görsel URL'leri - her satıra bir URL</label><textarea name="images">${esc((s.images||[]).join('\n'))}</textarea></div>
    <div class="admin-actions"><button class="btn accent" type="submit">Kaydet</button><button class="btn ghost" type="button" id="cancelSection">İptal</button></div>
  </form></div>`;
}
async function saveSection(e){
  e.preventDefault(); const fd=new FormData(e.currentTarget); const id=fd.get('id');
  const payload={page:fd.get('page'),section_key:fd.get('section_key'),sort_order:Number(fd.get('sort_order')||1),kind:fd.get('kind'),visible:fd.get('visible')==='true',images:lines(fd.get('images')),content:{title:jsonLang('title'),subtitle:jsonLang('subtitle'),body:jsonLang('body')}};
  const q = id ? supabase.from('page_sections').update(payload).eq('id',id) : supabase.from('page_sections').insert(payload);
  const {error}=await q; if(error) msg(error.message,'error'); else {editing.section=null;msg('Bölüm kaydedildi.','success');await loadSections();renderSections();}
}
async function deleteSection(id){
  if(!confirm('Bu bölümü silmek istiyor musun?')) return;
  const {error}=await supabase.from('page_sections').delete().eq('id',id);
  if(error) msg(error.message,'error'); else {msg('Bölüm silindi.','success');await loadSections();renderSections();}
}
async function seedSections(){
  const rows = fallbackSections.map(s=>({page:s.page,section_key:s.section_key,sort_order:s.sort_order,kind:s.kind,visible:s.visible,images:s.images,content:s.content}));
  const {error}=await supabase.from('page_sections').upsert(rows,{onConflict:'page,section_key'});
  if(error) msg(error.message,'error'); else {msg('Örnek bölümler yüklendi.','success');await loadSections();renderSections();}
}

function renderProducts(){
  setActive('products','Katalog Ürünleri');
  const form = editing.product ? itemForm('product',editing.product) : '';
  $('#adminContent').innerHTML = `<div class="admin-panel"><div class="admin-actions"><button class="btn accent" id="newProduct">Yeni Ürün Ekle</button><button class="btn ghost" id="seedProducts">Örnek Ürünleri Yükle</button></div></div>${form}
  <div class="admin-panel"><h2>Ürün Listesi</h2><table class="admin-table"><thead><tr><th>Görsel</th><th>Ürün</th><th>Kategori</th><th>Durum</th><th>Görünür</th><th>İşlem</th></tr></thead><tbody>${products.map(p=>`<tr><td><img class="admin-thumb" src="${esc((p.images||[])[0]||'assets/placeholders/eagle.svg')}"></td><td><strong>${esc(p.title?.tr||p.title?.en||'')}</strong><br><span class="mini">${esc(p.slug)}</span></td><td>${esc(p.category||'')}</td><td>${esc(p.status||'')}</td><td>${p.visible?'Evet':'Hayır'}</td><td><button class="btn small ghost" data-edit-product="${esc(p.id||p.slug)}">Düzenle</button> <button class="btn small danger" data-del-product="${esc(p.id||p.slug)}">Sil</button></td></tr>`).join('')}</tbody></table></div>`;
  $('#newProduct').addEventListener('click',()=>{editing.product=newItem('product');renderProducts();});
  $('#seedProducts').addEventListener('click',seedProducts);
  $$('[data-edit-product]').forEach(b=>b.addEventListener('click',()=>{editing.product=products.find(p=>(p.id||p.slug)==b.dataset.editProduct);renderProducts();}));
  $$('[data-del-product]').forEach(b=>b.addEventListener('click',()=>deleteItem('products',b.dataset.delProduct,renderProducts)));
  $('#productForm')?.addEventListener('submit',e=>saveItem(e,'products','product'));
  $('#cancelProduct')?.addEventListener('click',()=>{editing.product=null;renderProducts();});
}
function renderProjects(){
  setActive('projects','Projeler');
  const form = editing.project ? itemForm('project',editing.project) : '';
  $('#adminContent').innerHTML = `<div class="admin-panel"><div class="admin-actions"><button class="btn accent" id="newProject">Yeni Proje Ekle</button><button class="btn ghost" id="seedProjects">Örnek Projeleri Yükle</button></div></div>${form}
  <div class="admin-panel"><h2>Proje Listesi</h2><table class="admin-table"><thead><tr><th>Görsel</th><th>Proje</th><th>Kategori</th><th>Durum</th><th>Görünür</th><th>İşlem</th></tr></thead><tbody>${projects.map(p=>`<tr><td><img class="admin-thumb" src="${esc((p.images||[])[0]||'assets/placeholders/stag.svg')}"></td><td><strong>${esc(p.title?.tr||p.title?.en||'')}</strong><br><span class="mini">${esc(p.slug)}</span></td><td>${esc(p.category||'')}</td><td>${esc(p.status||'')}</td><td>${p.visible?'Evet':'Hayır'}</td><td><button class="btn small ghost" data-edit-project="${esc(p.id||p.slug)}">Düzenle</button> <button class="btn small danger" data-del-project="${esc(p.id||p.slug)}">Sil</button></td></tr>`).join('')}</tbody></table></div>`;
  $('#newProject').addEventListener('click',()=>{editing.project=newItem('project');renderProjects();});
  $('#seedProjects').addEventListener('click',seedProjects);
  $$('[data-edit-project]').forEach(b=>b.addEventListener('click',()=>{editing.project=projects.find(p=>(p.id||p.slug)==b.dataset.editProject);renderProjects();}));
  $$('[data-del-project]').forEach(b=>b.addEventListener('click',()=>deleteItem('projects',b.dataset.delProject,renderProjects)));
  $('#projectForm')?.addEventListener('submit',e=>saveItem(e,'projects','project'));
  $('#cancelProject')?.addEventListener('click',()=>{editing.project=null;renderProjects();});
}
function newItem(type){return {title:{},description:{},slug:'',category:type==='product'?'Wall Art':'Project',status:'Concept',visible:true,featured:false,sort_order:99,images:[],specs:{},price_text:'Price on request',dimensions:'Custom',material:'Laser-cut steel',location:'United States'};}
function itemForm(type,item){
  const isProduct=type==='product'; const formId=isProduct?'productForm':'projectForm'; const cancelId=isProduct?'cancelProduct':'cancelProject';
  return `<div class="admin-panel"><h2>${item.id?'Düzenle':'Yeni'} ${isProduct?'Ürün':'Proje'}</h2><form id="${formId}" class="form">
    <input type="hidden" name="id" value="${esc(item.id||'')}">
    ${multiLangInputs('title','Başlık',item.title)}${multiLangInputs('description','Açıklama',item.description)}
    <div class="admin-grid three"><div class="field"><label>Slug / URL adı</label><input name="slug" value="${esc(item.slug||'')}"></div><div class="field"><label>Kategori</label><input name="category" value="${esc(item.category||'')}"></div><div class="field"><label>Sıra</label><input name="sort_order" type="number" value="${esc(item.sort_order||1)}"></div></div>
    <div class="admin-grid three"><div class="field"><label>Durum</label><input name="status" value="${esc(item.status||'')}"></div><div class="field"><label>Görünür</label><select name="visible"><option value="true" ${item.visible!==false?'selected':''}>Evet</option><option value="false" ${item.visible===false?'selected':''}>Hayır</option></select></div><div class="field"><label>Öne çıkan</label><select name="featured"><option value="false" ${!item.featured?'selected':''}>Hayır</option><option value="true" ${item.featured?'selected':''}>Evet</option></select></div></div>
    ${isProduct?`<div class="admin-grid three"><div class="field"><label>Fiyat yazısı</label><input name="price_text" value="${esc(item.price_text||'')}"></div><div class="field"><label>Ölçü</label><input name="dimensions" value="${esc(item.dimensions||'')}"></div><div class="field"><label>Malzeme</label><input name="material" value="${esc(item.material||'')}"></div></div><div class="field"><label>Ek özellikler JSON</label><textarea name="specs">${esc(JSON.stringify(item.specs||{},null,2))}</textarea></div>`:`<div class="field"><label>Konum</label><input name="location" value="${esc(item.location||'United States')}"></div>`}
    <div class="field"><label>Görsel URL'leri - her satıra bir URL</label><textarea name="images">${esc((item.images||[]).join('\n'))}</textarea></div>
    <div class="admin-actions"><button class="btn accent" type="submit">Kaydet</button><button class="btn ghost" type="button" id="${cancelId}">İptal</button></div>
  </form></div>`;
}
async function saveItem(e,table,type){
  e.preventDefault(); const fd=new FormData(e.currentTarget); const id=fd.get('id'); const isProduct=type==='product';
  let slug = fd.get('slug') || slugify(fd.get('title_en') || fd.get('title_tr') || 'item');
  const payload={slug,category:fd.get('category'),status:fd.get('status'),visible:fd.get('visible')==='true',featured:fd.get('featured')==='true',sort_order:Number(fd.get('sort_order')||1),title:jsonLang('title'),description:jsonLang('description'),images:lines(fd.get('images'))};
  if(isProduct){ payload.price_text=fd.get('price_text'); payload.dimensions=fd.get('dimensions'); payload.material=fd.get('material'); try{payload.specs=JSON.parse(fd.get('specs')||'{}')}catch{msg('Ek özellikler JSON formatı hatalı.','error');return;} }
  else payload.location=fd.get('location');
  const q = id ? supabase.from(table).update(payload).eq('id',id) : supabase.from(table).insert(payload);
  const {error}=await q;
  if(error) msg(error.message,'error'); else {msg('Kaydedildi.','success'); editing[type]=null; await (isProduct?loadProducts():loadProjects()); isProduct?renderProducts():renderProjects();}
}
async function deleteItem(table,id,rerender){
  if(!confirm('Silmek istediğine emin misin?')) return;
  const {error}=await supabase.from(table).delete().eq('id',id);
  if(error) msg(error.message,'error'); else {msg('Silindi.','success'); await (table==='products'?loadProducts():loadProjects()); rerender();}
}
async function seedProducts(){
  const rows=fallbackProducts.map(p=>({...p})); const {error}=await supabase.from('products').upsert(rows,{onConflict:'slug'});
  if(error) msg(error.message,'error'); else {msg('Örnek ürünler yüklendi.','success');await loadProducts();renderProducts();}
}
async function seedProjects(){
  const rows=fallbackProjects.map(p=>({...p})); const {error}=await supabase.from('projects').upsert(rows,{onConflict:'slug'});
  if(error) msg(error.message,'error'); else {msg('Örnek projeler yüklendi.','success');await loadProjects();renderProjects();}
}

function renderMedia(){
  setActive('media','Görsel Yükle');
  $('#adminContent').innerHTML = `<div class="admin-panel"><h2>Supabase Storage Görsel Yükleme</h2><p class="mini">Yüklenen görsel public URL olarak verilir. Bu URL'yi ürün/proje/sayfa görsel alanlarına yapıştırabilirsin.</p><form id="uploadForm" class="form"><div class="field"><label>Görsel dosyası</label><input name="file" type="file" accept="image/*" required></div><button class="btn accent" type="submit">Yükle</button><div id="uploadResult"></div></form></div>`;
  $('#uploadForm').addEventListener('submit',uploadMedia);
}
async function uploadMedia(e){
  e.preventDefault(); const file=new FormData(e.currentTarget).get('file'); if(!file) return;
  const safe=file.name.replace(/[^a-zA-Z0-9._-]/g,'-'); const path=`uploads/${Date.now()}-${safe}`;
  const {error}=await supabase.storage.from(STORAGE_BUCKET).upload(path,file,{cacheControl:'3600',upsert:false});
  if(error){ $('#uploadResult').innerHTML=`<div class="notice danger-msg">${esc(error.message)}</div>`; return; }
  const {data}=supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
  $('#uploadResult').innerHTML=`<div class="notice success"><b>Yüklendi:</b><br><input style="width:100%;margin-top:8px" value="${esc(data.publicUrl)}" onclick="this.select()"><p class="mini">Bu URL'yi kopyalayıp görsel alanına yapıştır.</p></div>`;
}

function renderInquiries(){
  setActive('inquiries','Sipariş Talepleri');
  $('#adminContent').innerHTML = `<div class="admin-panel"><div class="admin-actions"><button class="btn ghost" id="refreshInq">Yenile</button></div></div><div class="admin-panel"><h2>Gelen Talepler</h2>${inquiries.length?`<table class="admin-table"><thead><tr><th>Tarih</th><th>İsim</th><th>İletişim</th><th>İlgi</th><th>Mesaj</th></tr></thead><tbody>${inquiries.map(i=>`<tr><td>${esc(new Date(i.created_at).toLocaleString('tr-TR'))}</td><td><strong>${esc(i.name)}</strong></td><td>${esc(i.email)}<br>${esc(i.phone||'')}</td><td>${esc(i.interest||'')}</td><td>${esc(i.message||'')}</td></tr>`).join('')}</tbody></table>`:`<p class="mini">Henüz talep yok.</p>`}</div>`;
  $('#refreshInq').addEventListener('click',async()=>{await loadInquiries();renderInquiries();});
}

function renderAdmins(){
  setActive('admins','Adminler');
  $('#adminContent').innerHTML = `<div class="admin-panel"><h2>Yeni Admin Ekle</h2><form id="adminAddForm" class="form"><div class="field"><label>Admin e-posta</label><input name="email" type="email" required placeholder="ornek@mail.com"></div><button class="btn accent">Admin Listesine Ekle</button><p class="mini">Bu işlem o e-postayı yetkili yapar. Kişi admin.html üzerinden hesap oluşturup giriş yapabilir.</p></form></div><div class="admin-panel"><h2>Admin Listesi</h2><table class="admin-table"><thead><tr><th>E-posta</th><th>Eklenme</th><th>İşlem</th></tr></thead><tbody>${admins.map(a=>`<tr><td><strong>${esc(a.email)}</strong></td><td>${a.created_at?esc(new Date(a.created_at).toLocaleString('tr-TR')):''}</td><td><button class="btn small danger" data-del-admin="${esc(a.email)}">Sil</button></td></tr>`).join('')}</tbody></table></div>`;
  $('#adminAddForm').addEventListener('submit',addAdmin);
  $$('[data-del-admin]').forEach(b=>b.addEventListener('click',()=>deleteAdmin(b.dataset.delAdmin)));
}
async function addAdmin(e){
  e.preventDefault(); const email=new FormData(e.currentTarget).get('email').toLowerCase().trim();
  const {error}=await supabase.from('admin_users').insert({email});
  if(error) msg(error.message,'error'); else {msg('Admin eklendi.','success');await loadAdmins();renderAdmins();}
}
async function deleteAdmin(email){
  if(!confirm(`${email} admin listesinden silinsin mi?`)) return;
  const {error}=await supabase.from('admin_users').delete().eq('email',email);
  if(error) msg(error.message,'error'); else {msg('Admin silindi.','success');await loadAdmins();renderAdmins();}
}

async function init(){
  try{
    supabase=await getSupabase({ timeoutMs: 8000, silent: false });
    if(!supabase){
      $('#adminRoot').innerHTML=`<div class="auth-card"><img src="assets/logo.webp" alt="Logo"><h1>Supabase bağlantısı kurulamadı</h1><p><b>js/config.js</b> içindeki Supabase bilgilerini ve internet bağlantısını kontrol etmelisin.</p><div class="notice">Kurulum için ZIP içindeki <b>README-KURULUM.md</b> dosyasını aç.</div></div>`;
      return;
    }
    const res=await supabase.auth.getSession();
    session=res?.data?.session || null;
    if(!session){ authScreen(); return; }
    await loadAll();
    renderShell();
    renderView('dashboard');
  }catch(error){
    $('#adminRoot').innerHTML=`<div class="auth-card"><img src="assets/logo.webp" alt="Logo"><h1>Admin paneli açılamadı</h1><p>${esc(friendlyError(error))}</p><div class="notice">Kurulum için ZIP içindeki <b>README-KURULUM.md</b> dosyasını aç.</div></div>`;
  }
}

init();
