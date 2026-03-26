import { getSupabase } from "./supabaseClient";

export type AdminRole = "admin" | "user";

export async function fetchCurrentUserRole(): Promise<AdminRole | null> {
  const supabase = getSupabase();
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) {
    throw sessionError;
  }

  const user = session?.user;
  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  const role = data?.role as AdminRole | undefined;
  return role ?? null;
}

