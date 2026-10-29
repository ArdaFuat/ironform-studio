(function () {
  const controls = document.getElementById('eagleFinishes');
  const figure = document.getElementById('piece-photo-1');
  const preview = figure?.querySelector('img');
  if (!controls || !preview) return;

  const buttons = Array.from(controls.querySelectorAll('[data-finish]'));
  const name = document.getElementById('finishName');
  const status = document.getElementById('finishStatus');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let selected = buttons.find(button => button.getAttribute('aria-pressed') === 'true');
  let requestId = 0;

  function updateLabel() {
    const label = selected.querySelector('.finish-label').textContent;
    name.textContent = label;
    preview.alt = document.getElementById('pieceTitle').textContent + ' — ' + label;
  }

  function revealPreview() {
    const rect = figure.getBoundingClientRect();
    if (rect.top < 70 || rect.top > window.innerHeight || rect.bottom < 120) {
      figure.scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'start', inline: 'start' });
    }
    // The mobile gallery may have been swiped to a different photograph.
    const stack = figure.parentElement;
    if (stack.scrollLeft > 0) stack.scrollTo({ left: 0, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
  }

  buttons.forEach(button => {
    button.addEventListener('click', async () => {
      const currentRequest = ++requestId;
      status.textContent = '';
      if (button === selected) {
        figure.removeAttribute('aria-busy');
        revealPreview();
        return;
      }
      figure.setAttribute('aria-busy', 'true');
      try {
        const next = new Image();
        next.src = button.dataset.previewSrc;
        await next.decode();
        if (currentRequest !== requestId) return;
        preview.src = next.src;
        preview.dataset.finish = button.dataset.finish;
        selected = button;
        buttons.forEach(option => option.setAttribute('aria-pressed', String(option === button)));
        updateLabel();
        revealPreview();
        if (!reducedMotion.matches && preview.animate) {
          preview.animate([{ opacity: 0.4 }, { opacity: 1 }], { duration: 300, easing: 'ease-out' });
        }
      } catch (_) {
        if (currentRequest !== requestId) return;
        const messages = {
          tr: 'Önizleme yüklenemedi. Lütfen tekrar deneyin.',
          es: 'No se pudo cargar la vista previa. Inténtalo de nuevo.',
          en: 'The preview could not load. Please try again.'
        };
        status.textContent = messages[document.documentElement.lang] || messages.en;
      } finally {
        if (currentRequest === requestId) figure.removeAttribute('aria-busy');
      }
    });
  });

  preview.dataset.finish = 'gold';
  document.addEventListener('ironform:languagechange', updateLabel);
  updateLabel();
})();
