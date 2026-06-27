(function(){
  const SUPABASE_URL = "https://glzcayauggpligbkrcmo.supabase.co";
  const SUPABASE_ANON_KEY = "sb_publishable_AzoS1-9ZHRgMPUJBttfvUA_5wuWEeO8";
  const messages = {
    en: {
      sent: 'Your inquiry has been sent successfully. We will contact you soon.',
      mail: 'Your email app is opening. You can send the inquiry from there.',
      sending: 'Sending...'
    },
    tr: {
      sent: 'Talebiniz başarıyla gönderildi. En kısa sürede sizinle iletişime geçeceğiz.',
      mail: 'E-posta uygulamanız açılıyor. Talebinizi oradan gönderebilirsiniz.',
      sending: 'Gönderiliyor...'
    },
    es: {
      sent: 'Tu consulta se envió correctamente. Nos pondremos en contacto contigo pronto.',
      mail: 'Tu aplicación de correo se está abriendo. Puedes enviar la consulta desde allí.',
      sending: 'Enviando...'
    }
  };

  function getLang(){
    return localStorage.getItem('ironform_language') || 'en';
  }
  function msg(key){
    const lang = getLang();
    return messages[lang]?.[key] || messages.en[key] || '';
  }
  async function saveInquiry(payload){
    const res = await fetch(`${SUPABASE_URL}/rest/v1/order_inquiries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(text || 'Inquiry save failed');
    }
    return true;
  }

  const toggle = document.getElementById('mobileToggle');
  const nav = document.getElementById('navLinks');
  if(toggle && nav){ toggle.addEventListener('click', () => nav.classList.toggle('open')); }

  const search = document.getElementById('searchBox');
  const grid = document.getElementById('filterGrid');
  const buttons = Array.from(document.querySelectorAll('[data-filter]'));
  function applyFilter(){
    if(!grid) return;
    const q = (search?.value || '').trim().toLowerCase();
    const active = buttons.find(b => b.classList.contains('active'))?.dataset.filter || 'all';
    Array.from(grid.children).forEach(card => {
      const text = card.textContent.toLowerCase();
      const cat = card.querySelector('.tag')?.textContent || '';
      const okCat = active === 'all' || cat === active;
      const okText = !q || text.includes(q);
      card.style.display = okCat && okText ? '' : 'none';
    });
  }
  buttons.forEach(btn => btn.addEventListener('click', () => {
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    applyFilter();
  }));
  if(search) search.addEventListener('input', applyFilter);

  document.querySelectorAll('.thumbs button').forEach(btn => btn.addEventListener('click', () => {
    const main = document.getElementById('galleryMain');
    if(main && btn.dataset.img) main.src = btn.dataset.img;
  }));

  const form = document.getElementById('inquiryForm');
  if(form){
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const payload = {
        name: (data.get('name') || '').toString().trim(),
        email: (data.get('email') || '').toString().trim(),
        phone: (data.get('phone') || '').toString().trim(),
        interest: (data.get('interest') || '').toString().trim(),
        message: (data.get('message') || '').toString().trim()
      };
      const button = form.querySelector('button[type="submit"]');
      const originalText = button ? button.textContent : '';
      if(button){ button.disabled = true; button.textContent = msg('sending'); }
      const out = document.getElementById('formMsg');
      try {
        await saveInquiry(payload);
        if(out) out.innerHTML = `<div class="notice success">${msg('sent')}</div>`;
        form.reset();
      } catch (_error) {
        const subject = encodeURIComponent('Ironform Studio inquiry - ' + payload.interest);
        const body = encodeURIComponent(`Name: ${payload.name}
Email: ${payload.email}
Phone: ${payload.phone}
Interest: ${payload.interest}

Message:
${payload.message}`);
        window.location.href = `mailto:hello@ironformstudio.com?subject=${subject}&body=${body}`;
        if(out) out.innerHTML = `<div class="notice success">${msg('mail')}</div>`;
      } finally {
        if(button){ button.disabled = false; button.textContent = originalText; }
      }
    });
  }
})();