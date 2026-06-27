(function(){
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
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = data.get('name') || '';
      const email = data.get('email') || '';
      const phone = data.get('phone') || '';
      const interest = data.get('interest') || '';
      const message = data.get('message') || '';
      const subject = encodeURIComponent('Ironform Studio inquiry - ' + interest);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nInterest: ${interest}\n\nMessage:\n${message}`);
      window.location.href = `mailto:hello@ironformstudio.com?subject=${subject}&body=${body}`;
      const msg = document.getElementById('formMsg');
      if(msg) msg.innerHTML = '<div class="notice success">Your email app is opening. You can send the inquiry from there.</div>';
    });
  }
})();
