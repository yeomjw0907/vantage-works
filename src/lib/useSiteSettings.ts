import { useEffect, useState } from "react";
import { getSupabase, hasSupabaseConfig } from "./supabaseClient";

export type NavSubItem = { name: string; href: string };
export type NavItem = { name: string; href: string; subItems?: NavSubItem[] };
export type FooterLink = { label: string; href: string };
export type CustomerLogo = string;

export type SiteSettings = {
  admin_email?: string | null;
  admin_phone?: string | null;

  company_name?: string | null;
  company_description?: string | null;
  address?: string | null;
  phone?: string | null;
  email?: string | null;

  nav_items?: NavItem[] | null;
  footer_service_links?: FooterLink[] | null;
  footer_support_links?: FooterLink[] | null;
  customer_logos?: CustomerLogo[] | null;
};

let cachedSettings: SiteSettings | null = null;
let cachedPromise: Promise<SiteSettings | null> | null = null;

export function invalidateSiteSettingsCache() {
  cachedSettings = null;
  cachedPromise = null;
}

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings | null>(cachedSettings);

  useEffect(() => {
    if (!hasSupabaseConfig) return;
    if (cachedSettings) return;

    if (!cachedPromise) {
      cachedPromise = (async () => {
        const supabase = getSupabase();
        const { data, error } = await supabase
          .from("site_settings")
          .select("*")
          .order("updated_at", { ascending: false })
          .limit(1)
          .maybeSingle();

        if (error) return null;

        // jsonb 필드는 supabase-js에서 객체로 복원됩니다.
        return (data as SiteSettings) ?? null;
      })();
    }

    cachedPromise.then((s) => {
      cachedSettings = s;
      setSettings(s);
    });
  }, []);

  return settings;
}

