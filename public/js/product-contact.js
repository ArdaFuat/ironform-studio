(function () {
  const button = document.getElementById('copyProductEmail');
  const address = document.getElementById('productEmailAddress');
  const status = document.getElementById('emailCopyStatus');
  if (!button || !address || !status) return;

  const messages = {
    tr: { copied: 'E-posta adresi kopyalandı.', manual: 'Adresi seçtik. Kopyalamak için basılı tutun veya Ctrl+C kullanın.' },
    en: { copied: 'Email address copied.', manual: 'Address selected. Press and hold or use Ctrl+C to copy.' },
    es: { copied: 'Dirección de email copiada.', manual: 'Dirección seleccionada. Mantén pulsado o usa Ctrl+C para copiar.' }
  };
  button.addEventListener('click', async () => {
    const text = messages[document.documentElement.lang] || messages.en;
    status.textContent = '';
    try {
      await navigator.clipboard.writeText(address.value);
      status.textContent = text.copied;
    } catch (_) {
      address.focus();
      address.select();
      address.setSelectionRange(0, address.value.length);
      const copied = document.execCommand('copy');
      status.textContent = copied ? text.copied : text.manual;
      if (copied) button.focus();
    }
  });
  document.addEventListener('ironform:languagechange', () => { status.textContent = ''; });
})();
