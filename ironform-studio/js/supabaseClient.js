import { SUPABASE_URL, SUPABASE_ANON_KEY, isSupabaseConfigured } from './config.js';

let client = null;
export function getSupabase() {
  if (!isSupabaseConfigured()) return null;
  if (!window.supabase) {
    console.error('Supabase CDN was not loaded.');
    return null;
  }
  if (!client) client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  return client;
}

export function configured() {
  return !!getSupabase();
}
