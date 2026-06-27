// Ironform Studio Supabase configuration
// 1) Create a Supabase project
// 2) Run sql/schema.sql in Supabase SQL Editor
// 3) Copy Project URL and anon public key here
export const SUPABASE_URL = "https://glzcayauggpligbkrcmo.supabase.co";
export const SUPABASE_ANON_KEY = "sb_publishable_AzoS1-9ZHRgMPUJBttfvUA_5wuWEeO8";
export const STORAGE_BUCKET = "site-assets";

export const isSupabaseConfigured = () =>
  SUPABASE_URL.startsWith("https://") &&
  SUPABASE_ANON_KEY.length > 40;
