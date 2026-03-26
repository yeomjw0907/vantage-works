import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey);

let supabaseClient: SupabaseClient | null = null;

if (hasSupabaseConfig) {
  supabaseClient = createClient(supabaseUrl!, supabaseAnonKey!, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
} else {
  // eslint-disable-next-line no-console
  console.warn("[supabaseClient] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY.");
}

export function getSupabase() {
  if (!supabaseClient) {
    throw new Error("Supabase 설정이 필요합니다. VITE_SUPABASE_URL/VITE_SUPABASE_ANON_KEY를 확인해 주세요.");
  }
  return supabaseClient;
}


