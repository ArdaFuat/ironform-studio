(function(){
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!motionPreference.matches && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
    const sections = document.querySelectorAll('main > .section > .container, main > .page-hero > .container');
    sections.forEach(section => {
      if (section.getBoundingClientRect().top < window.innerHeight) return;
      section.classList.add('motion-ready');
      observer.observe(section);
    });
    motionPreference.addEventListener('change', event => {
      if (!event.matches) return;
      observer.disconnect();
      sections.forEach(section => section.classList.add('is-visible'));
    });
  }
  const messages = {
    en: {
      mail: 'Your email app is opening. You can send the inquiry from there.'
    },
    tr: {
      mail: 'E-posta uygulamanız açılıyor. Talebinizi oradan gönderebilirsiniz.'
    },
    es: {
      mail: 'Tu aplicación de correo se está abriendo. Puedes enviar la consulta desde allí.'
    }
  };

  function getLang(){
    return document.documentElement.lang || document.documentElement.dataset.defaultLanguage || 'en';
  }
  function msg(key){
    const lang = getLang();
    return messages[lang]?.[key] || messages.en[key] || '';
  }
  const toggle = document.getElementById('mobileToggle');
  const nav = document.getElementById('navLinks');
  if(toggle && nav){
    const closeMenu = () => { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); };
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      const picker = document.getElementById('languagePicker');
      if (picker) picker.open = false;
    });
    nav.addEventListener('click', e => { if(e.target.closest('a')) closeMenu(); });
    document.addEventListener('click', e => {
      if(!nav.contains(e.target) && !toggle.contains(e.target)) closeMenu();
    });
    document.addEventListener('keydown', e => {
      if(e.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); toggle.focus(); }
    });
  }

  const search = document.getElementById('searchBox');
  const grid = document.getElementById('filterGrid');
  const buttons = Array.from(document.querySelectorAll('[data-filter]'));
  const categories = new WeakMap();
  const originalText = new WeakMap();
  const count = document.getElementById('catalogCount');
  const empty = document.getElementById('catalogEmpty');
  const normalize = value => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ı/g, 'i');
  if (grid) Array.from(grid.children).forEach(card => {
    categories.set(card, card.querySelector('.tag')?.textContent || '');
    originalText.set(card, card.textContent);
  });
  function applyFilter(){
    if(!grid) return;
    const q = normalize((search?.value || '').trim());
    const active = buttons.find(b => b.classList.contains('active'))?.dataset.filter || 'all';
    let visibleCount = 0;
    Array.from(grid.children).forEach(card => {
      const text = normalize(card.textContent + ' ' + originalText.get(card));
      const cat = categories.get(card);
      const okCat = active === 'all' || cat === active;
      const okText = !q || text.includes(q);
      card.style.display = okCat && okText ? '' : 'none';
      if (okCat && okText) visibleCount++;
    });
    if (count) count.textContent = String(visibleCount);
    if (empty) empty.hidden = visibleCount > 0;
  }
  buttons.forEach(btn => btn.addEventListener('click', () => {
    buttons.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
    btn.classList.add('active');
    btn.setAttribute('aria-pressed', 'true');
    applyFilter();
  }));
  if(search) search.addEventListener('input', applyFilter);
  document.addEventListener('ironform:languagechange', applyFilter);
  document.getElementById('clearFilters')?.addEventListener('click', () => {
    if (search) search.value = '';
    buttons.forEach(button => {
      const active = button.dataset.filter === 'all';
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    applyFilter();
    search?.focus();
  });

  document.querySelectorAll('.thumbs button').forEach(btn => btn.addEventListener('click', () => {
    const main = document.getElementById('galleryMain');
    if(main && btn.dataset.img) {
      main.src = btn.dataset.img;
      if (btn.dataset.alt) main.alt = btn.getAttribute('aria-label') || btn.dataset.alt;
      document.querySelectorAll('.thumbs button').forEach(button => button.setAttribute('aria-pressed', String(button === btn)));
      if (!motionPreference.matches && main.animate) main.animate([{ opacity: 0.45 }, { opacity: 1 }], { duration: 350, easing: 'ease-out' });
    }
  }));

  const form = document.getElementById('inquiryForm');
  if(form){
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const payload = {
        name: (data.get('name') || '').toString().trim(),
        email: (data.get('email') || '').toString().trim(),
        phone: (data.get('phone') || '').toString().trim(),
        interest: (data.get('interest') || '').toString().trim(),
        message: (data.get('message') || '').toString().trim()
      };
      const out = document.getElementById('formMsg');
      const subject = encodeURIComponent('Ironform Studio inquiry - ' + payload.interest);
      const body = encodeURIComponent(`Name: ${payload.name}
Email: ${payload.email}
Phone: ${payload.phone}
Interest: ${payload.interest}

Message:
${payload.message}`);
      window.location.href = `mailto:arda@ironformstudio.com?subject=${subject}&body=${body}`;
      if(out) out.innerHTML = `<div class="notice success">${msg('mail')}</div>`;
    });
  }
})();
