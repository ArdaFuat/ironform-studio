import { SUPABASE_URL, SUPABASE_ANON_KEY, isSupabaseConfigured } from './config.js';

let client = null;
let sdkPromise = null;
const SUPABASE_CDN = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';

function timeout(ms, message = 'Supabase bağlantısı zaman aşımına uğradı.') {
  return new Promise((_, reject) => setTimeout(() => reject(new Error(message)), ms));
}

function loadSupabaseSdk() {
  if (window.supabase) return Promise.resolve(window.supabase);
  if (sdkPromise) return sdkPromise;

  sdkPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-supabase-sdk="true"]');
    if (existing) {
      existing.addEventListener('load', () => resolve(window.supabase), { once: true });
      existing.addEventListener('error', () => reject(new Error('Supabase SDK yüklenemedi.')), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = SUPABASE_CDN;
    script.async = true;
    script.defer = true;
    script.dataset.supabaseSdk = 'true';
    script.onload = () => window.supabase ? resolve(window.supabase) : reject(new Error('Supabase SDK hazır değil.'));
    script.onerror = () => reject(new Error('Supabase SDK yüklenemedi.'));
    document.head.appendChild(script);
  });

  return sdkPromise;
}

export async function getSupabase(options = {}) {
  const { timeoutMs = 3500, silent = true } = options;
  if (!isSupabaseConfigured()) return null;
  if (client) return client;

  try {
    await Promise.race([loadSupabaseSdk(), timeout(timeoutMs)]);
    if (!window.supabase) return null;
    client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    });
    return client;
  } catch (error) {
    if (!silent) console.warn(error);
    return null;
  }
}

export async function configured() {
  return !!(await getSupabase());
}
