import { type DragEvent, useEffect, useMemo, useState } from "react";
import { getSupabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { invalidateSiteSettingsCache } from "@/lib/useSiteSettings";
import { GripVertical, Images, Pencil, Trash2 } from "lucide-react";

type FaqItem = {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
  published: boolean;
};

type PortfolioItem = {
  id: string;
  client: string;
  type: string;
  items: string;
  qty: string;
  lead_time: string;
  point: string;
  image_url: string;
  gallery_urls: string[];
  description: string;
  sort_order: number;
  published: boolean;
};

type TabKey = "portfolio" | "faq" | "settings";

function toNumberOrZero(v: string) {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function normalizeGalleryUrls(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter((u): u is string => typeof u === "string" && u.trim().length > 0);
}

function emptyPortfolioForm() {
  return {
    id: "",
    client: "",
    type: "",
    items: "",
    qty: "",
    lead_time: "",
    point: "",
    image_url: "",
    gallery_urls: [] as string[],
    description: "",
    sort_order: "0",
    published: true,
  };
}

/** 표시용: 01063334649·+8210… 입력 → 010-6333-4649 */
function formatKrMobileDisplay(input: string): string {
  let d = input.replace(/\D/g, "");
  if (d.startsWith("82") && d.length >= 10) {
    d = `0${d.slice(2)}`;
  }
  d = d.slice(0, 11);
  if (d.length <= 3) return d;
  if (d.length <= 7) return `${d.slice(0, 3)}-${d.slice(3)}`;
  return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`;
}

function adminPhoneDigitsForDb(displayOrRaw: string): string | null {
  const d = displayOrRaw.replace(/\D/g, "");
  if (!d) return null;
  if (d.startsWith("82") && d.length >= 10) {
    return `0${d.slice(2, 13)}`.slice(0, 11);
  }
  return d.slice(0, 11);
}

export function AdminContent() {
  const [tab, setTab] = useState<TabKey>("portfolio");

  const [faqItems, setFaqItems] = useState<FaqItem[]>([]);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadingPortfolioImage, setUploadingPortfolioImage] = useState(false);
  const [portfolioDragActive, setPortfolioDragActive] = useState(false);
  const [draggingFaqId, setDraggingFaqId] = useState<string | null>(null);
  const [draggingPortfolioId, setDraggingPortfolioId] = useState<string | null>(null);

  const [faqForm, setFaqForm] = useState({
    id: "",
    question: "",
    answer: "",
    sort_order: "0",
    published: true,
  });

  const [portfolioForm, setPortfolioForm] = useState(() => emptyPortfolioForm());

  const defaultNavItemsForSettings = [
    { name: "홈", href: "/" },
    { name: "회사소개", href: "/about" },
    {
      name: "서비스",
      href: "/services/oem",
      subItems: [
        { name: "굿즈 OEM·ODM", href: "/services/oem" },
        { name: "글로벌 소싱", href: "/services/sourcing" },
        { name: "구매대행 및 물류", href: "/services/purchasing" },
        { name: "1:1 소싱투어", href: "/sourcing-tour" },
      ],
    },
    { name: "포트폴리오", href: "/portfolio" },
    { name: "FAQ", href: "/faq" },
  ];

  const defaultFooterServiceLinksForSettings = [
    { label: "굿즈 OEM·ODM", href: "/services/oem" },
    { label: "중국 소싱", href: "/services/sourcing" },
    { label: "구매대행(웨이하이)", href: "/services/purchasing" },
    { label: "1:1 소싱투어(이우)", href: "/sourcing-tour" },
  ];

  const defaultFooterSupportLinksForSettings = [
    { label: "자주 묻는 질문 (FAQ)", href: "/faq" },
    { label: "프로젝트 문의", href: "/contact" },
    { label: "이용약관", href: "#" },
    { label: "개인정보처리방침", href: "#" },
  ];
  const defaultCustomerLogosForSettings = [
    "SAMSUNG",
    "NAVER",
    "KAKAO",
    "TOSS",
    "LINE",
    "NEXON",
    "NCSOFT",
    "WOOWA",
  ];

  const [siteSettingsRowId, setSiteSettingsRowId] = useState<string | null>(null);
  const [settingsForm, setSettingsForm] = useState({
    admin_email: "",
    admin_phone: "",
    address: "",
    email: "",
    customer_logos: JSON.stringify(defaultCustomerLogosForSettings, null, 2),
  });

  const isEditingFaq = Boolean(faqForm.id);
  const isEditingPortfolio = Boolean(portfolioForm.id);

  async function refreshSiteSettings() {
    const supabase = getSupabase();
    const { data, error: fetchError } = await supabase
      .from("site_settings")
      .select("id,admin_email,admin_phone,address,email,customer_logos")
      .order("updated_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (fetchError) throw fetchError;

    if (!data) {
      setSiteSettingsRowId(null);
      setSettingsForm((s) => ({
        ...s,
        customer_logos: JSON.stringify(defaultCustomerLogosForSettings, null, 2),
      }));
      return;
    }

    setSiteSettingsRowId(data.id);
    setSettingsForm({
      admin_email: data.admin_email ?? "",
      admin_phone: formatKrMobileDisplay(data.admin_phone ?? ""),
      address: data.address ?? "",
      email: data.email ?? "",
      customer_logos: JSON.stringify(data.customer_logos ?? defaultCustomerLogosForSettings, null, 2),
    });
  }

  async function handleSaveSiteSettings() {
    setError(null);
    setLoading(true);
    try {
      const supabase = getSupabase();
      const parseJson = <T,>(value: string) => {
        try {
          return JSON.parse(value) as T;
        } catch {
          throw new Error("JSON 형식이 올바르지 않습니다. 다시 확인해 주세요.");
        }
      };

      const customer_logos = parseJson<string[]>(settingsForm.customer_logos).filter(
        (logo) => typeof logo === "string" && logo.trim().length > 0,
      );

      const inputBase = {
        admin_email: settingsForm.admin_email.trim() || null,
        admin_phone: adminPhoneDigitsForDb(settingsForm.admin_phone),
        address: settingsForm.address.trim() || null,
        email: settingsForm.email.trim() || null,
      };

      if (siteSettingsRowId) {
        const { error: updateError } = await supabase
          .from("site_settings")
          .update({ ...inputBase, customer_logos })
          .eq("id", siteSettingsRowId);
        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase.from("site_settings").insert({
          ...inputBase,
          footer_service_links: defaultFooterServiceLinksForSettings,
          nav_items: defaultNavItemsForSettings,
          footer_support_links: defaultFooterSupportLinksForSettings,
          customer_logos,
        });
        if (insertError) throw insertError;
      }

      await refreshSiteSettings();
      invalidateSiteSettingsCache();
    } catch (e) {
      setError(e instanceof Error ? e.message : "설정 저장 실패");
    } finally {
      setLoading(false);
    }
  }

  async function refreshFaq() {
    const supabase = getSupabase();
    const { data, error: fetchError } = await supabase
      .from("faq_items")
      .select("*")
      .order("sort_order", { ascending: true });
    if (fetchError) throw fetchError;
    setFaqItems((data ?? []) as FaqItem[]);
  }

  async function refreshPortfolio() {
    const supabase = getSupabase();
    const { data, error: fetchError } = await supabase
      .from("portfolio_items")
      .select("*")
      .order("sort_order", { ascending: true });
    if (fetchError) throw fetchError;
    setPortfolioItems(
      (data ?? []).map((row) => ({
        ...(row as PortfolioItem),
        gallery_urls: normalizeGalleryUrls((row as { gallery_urls?: unknown }).gallery_urls),
      })),
    );
  }

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      try {
        await Promise.all([refreshFaq(), refreshPortfolio(), refreshSiteSettings()]);
      } catch (e) {
        setError(e instanceof Error ? e.message : "데이터를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const tabButtonClass = (active: boolean) =>
    `px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
      active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent hover:text-foreground"
    }`;

  const formErrorText = error ? <div className="text-sm text-destructive">{error}</div> : null;

  async function handleSaveFaq() {
    setError(null);
    setLoading(true);
    try {
      const supabase = getSupabase();
      const sort_order = isEditingFaq
        ? faqItems.find((i) => i.id === faqForm.id)?.sort_order ?? 0
        : faqItems.length;
      const input = {
        question: faqForm.question,
        answer: faqForm.answer,
        sort_order,
        published: true,
      };

      if (isEditingFaq) {
        const { error: updateError } = await supabase
          .from("faq_items")
          .update(input)
          .eq("id", faqForm.id);
        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase.from("faq_items").insert(input);
        if (insertError) throw insertError;
      }

      setFaqForm({ id: "", question: "", answer: "", sort_order: "0", published: true });
      await refreshFaq();
    } catch (e) {
      setError(e instanceof Error ? e.message : "FAQ 저장 실패");
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteFaq(id: string) {
    setError(null);
    setLoading(true);
    try {
      const supabase = getSupabase();
      const { error: deleteError } = await supabase.from("faq_items").delete().eq("id", id);
      if (deleteError) throw deleteError;
      await refreshFaq();
      if (faqForm.id === id) setFaqForm({ id: "", question: "", answer: "", sort_order: "0", published: true });
    } catch (e) {
      setError(e instanceof Error ? e.message : "FAQ 삭제 실패");
    } finally {
      setLoading(false);
    }
  }

  async function handleSavePortfolio() {
    setError(null);
    setLoading(true);
    try {
      const supabase = getSupabase();
      const sort_order = isEditingPortfolio
        ? portfolioItems.find((i) => i.id === portfolioForm.id)?.sort_order ?? 0
        : portfolioItems.length;
      let gallery = [...portfolioForm.gallery_urls];
      let cover = portfolioForm.image_url.trim();
      if (cover && !gallery.includes(cover)) gallery = [cover, ...gallery];
      if (!cover && gallery.length > 0) cover = gallery[0] ?? "";
      if (cover && gallery.length === 0) gallery = [cover];

      if (!cover) {
        setError("포트폴리오 이미지를 최소 1장 업로드해 주세요.");
        setLoading(false);
        return;
      }

      const input = {
        client: portfolioForm.client,
        type: portfolioForm.type,
        items: portfolioForm.items,
        qty: portfolioForm.qty,
        lead_time: portfolioForm.lead_time,
        point: portfolioForm.point,
        image_url: cover,
        gallery_urls: gallery,
        description: portfolioForm.description,
        sort_order,
        published: true,
      };

      if (isEditingPortfolio) {
        const { error: updateError } = await supabase
          .from("portfolio_items")
          .update(input)
          .eq("id", portfolioForm.id);
        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase.from("portfolio_items").insert(input);
        if (insertError) throw insertError;
      }

      setPortfolioForm(emptyPortfolioForm());

      await refreshPortfolio();
    } catch (e) {
      setError(e instanceof Error ? e.message : "포트폴리오 저장 실패");
    } finally {
      setLoading(false);
    }
  }

  async function handleDeletePortfolio(id: string) {
    setError(null);
    setLoading(true);
    try {
      const supabase = getSupabase();
      const { error: deleteError } = await supabase.from("portfolio_items").delete().eq("id", id);
      if (deleteError) throw deleteError;
      await refreshPortfolio();
      if (portfolioForm.id === id) {
        setPortfolioForm(emptyPortfolioForm());
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "포트폴리오 삭제 실패");
    } finally {
      setLoading(false);
    }
  }

  async function uploadPortfolioFilesToBucket(files: File[]) {
    const supabase = getSupabase();
    const newUrls: string[] = [];
    for (const file of files) {
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const filePath = `portfolio/${Date.now()}-${Math.random().toString(36).slice(2, 9)}-${safeName}`;
      const { error: uploadError } = await supabase.storage
        .from("portfolio-images")
        .upload(filePath, file, { upsert: false });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("portfolio-images").getPublicUrl(filePath);
      newUrls.push(data.publicUrl);
    }
    return newUrls;
  }

  async function handleUploadPortfolioFiles(fileList: FileList | File[]) {
    const files = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
    if (files.length === 0) return;

    setError(null);
    setUploadingPortfolioImage(true);
    try {
      const newUrls = await uploadPortfolioFilesToBucket(files);
      setPortfolioForm((s) => {
        const gallery = [...s.gallery_urls, ...newUrls];
        const cover = s.image_url.trim() || newUrls[0] || "";
        return { ...s, gallery_urls: gallery, image_url: cover };
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "이미지 업로드 실패");
    } finally {
      setUploadingPortfolioImage(false);
    }
  }

  function removeGalleryUrl(url: string) {
    setPortfolioForm((s) => {
      const gallery = s.gallery_urls.filter((u) => u !== url);
      let cover = s.image_url;
      if (cover === url) cover = gallery[0] ?? "";
      return { ...s, gallery_urls: gallery, image_url: cover };
    });
  }

  function setCoverUrl(url: string) {
    setPortfolioForm((s) => {
      const gallery = s.gallery_urls.includes(url) ? s.gallery_urls : [url, ...s.gallery_urls];
      return { ...s, gallery_urls: gallery, image_url: url };
    });
  }

  async function persistFaqOrder(next: FaqItem[]) {
    const supabase = getSupabase();
    await Promise.all(
      next.map((item, index) => supabase.from("faq_items").update({ sort_order: index }).eq("id", item.id)),
    );
  }

  async function persistPortfolioOrder(next: PortfolioItem[]) {
    const supabase = getSupabase();
    await Promise.all(
      next.map((item, index) =>
        supabase.from("portfolio_items").update({ sort_order: index }).eq("id", item.id),
      ),
    );
  }

  async function handleFaqDrop(targetId: string) {
    if (!draggingFaqId || draggingFaqId === targetId) return;

    const from = faqItems.findIndex((i) => i.id === draggingFaqId);
    const to = faqItems.findIndex((i) => i.id === targetId);
    if (from < 0 || to < 0) return;

    const next = [...faqItems];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);

    setFaqItems(next.map((i, idx) => ({ ...i, sort_order: idx })));
    setDraggingFaqId(null);
    setLoading(true);
    setError(null);
    try {
      await persistFaqOrder(next);
      await refreshFaq();
    } catch (e) {
      setError(e instanceof Error ? e.message : "FAQ 순서 저장 실패");
    } finally {
      setLoading(false);
    }
  }

  async function handlePortfolioDrop(targetId: string) {
    if (!draggingPortfolioId || draggingPortfolioId === targetId) return;

    const from = portfolioItems.findIndex((i) => i.id === draggingPortfolioId);
    const to = portfolioItems.findIndex((i) => i.id === targetId);
    if (from < 0 || to < 0) return;

    const next = [...portfolioItems];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);

    setPortfolioItems(next.map((i, idx) => ({ ...i, sort_order: idx })));
    setDraggingPortfolioId(null);
    setLoading(true);
    setError(null);
    try {
      await persistPortfolioOrder(next);
      await refreshPortfolio();
    } catch (e) {
      setError(e instanceof Error ? e.message : "포트폴리오 순서 저장 실패");
    } finally {
      setLoading(false);
    }
  }

  const leadTimePreview = useMemo(() => portfolioForm.lead_time, [portfolioForm.lead_time]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <button
          type="button"
          className={tabButtonClass(tab === "portfolio")}
          onClick={() => setTab("portfolio")}
        >
          포트폴리오
        </button>
        <button type="button" className={tabButtonClass(tab === "faq")} onClick={() => setTab("faq")}>
          FAQ
        </button>
        <button
          type="button"
          className={tabButtonClass(tab === "settings")}
          onClick={() => setTab("settings")}
        >
          설정
        </button>
      </div>

      {formErrorText}

      {tab === "faq" && (
        <Card className="rounded-[2rem] border-border/50">
          <CardHeader>
            <CardTitle className="text-xl font-extrabold">FAQ 관리</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>질문</Label>
                <Input
                  value={faqForm.question}
                  onChange={(e) => {
                    const v = e.target.value;
                    setFaqForm((s) => ({ ...s, question: v }));
                  }}
                  placeholder="예: Q1. MOQ는 어떻게 되나요?"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>답변</Label>
              <Textarea
                value={faqForm.answer}
                onChange={(e) => {
                  const v = e.target.value;
                  setFaqForm((s) => ({ ...s, answer: v }));
                }}
                placeholder="FAQ 답변을 입력하세요."
              />
            </div>
            <div className="flex items-center gap-3">
              <Button type="button" onClick={handleSaveFaq} disabled={loading}>
                {isEditingFaq ? "수정 저장" : "추가"}
              </Button>
              {isEditingFaq && (
                <Button
                  type="button"
                  variant="outline"
                  disabled={loading}
                  onClick={() =>
                    setFaqForm({ id: "", question: "", answer: "", sort_order: "0", published: true })
                  }
                >
                  취소
                </Button>
              )}
            </div>

            <div className="overflow-x-auto rounded-[1rem] border border-border/50">
              <table className="min-w-full text-sm">
                <thead className="bg-muted/30">
                  <tr>
                    <th className="px-4 py-3 text-left font-bold w-12">순서</th>
                    <th className="px-4 py-3 text-left font-bold">질문</th>
                    <th className="px-4 py-3 text-left font-bold">액션</th>
                  </tr>
                </thead>
                <tbody>
                  {faqItems.map((item) => (
                    <tr
                      key={item.id}
                      className="border-t border-border/30"
                      draggable={!loading}
                      onDragStart={() => setDraggingFaqId(item.id)}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => void handleFaqDrop(item.id)}
                      onDragEnd={() => setDraggingFaqId(null)}
                    >
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          aria-label="순서 변경"
                          className="rounded-md bg-muted p-1 text-muted-foreground"
                        >
                          <GripVertical className="h-4 w-4" />
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-semibold">{item.question}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                              setFaqForm({
                                id: item.id,
                                question: item.question,
                                answer: item.answer,
                                sort_order: String(item.sort_order),
                                published: item.published,
                              })
                            }
                            disabled={loading}
                          >
                            수정
                          </Button>
                          <Button
                            type="button"
                            variant="destructive"
                            onClick={() => handleDeleteFaq(item.id)}
                            disabled={loading}
                          >
                            삭제
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {faqItems.length === 0 && (
                    <tr>
                      <td colSpan={3} className="px-4 py-6 text-center text-muted-foreground">
                        표시할 FAQ가 없습니다.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {tab === "portfolio" && (
        <Card className="rounded-[2rem] border-border/50">
          <CardHeader>
            <CardTitle className="text-xl font-extrabold">포트폴리오 관리</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>클라이언트</Label>
                <Input
                  value={portfolioForm.client}
                  onChange={(e) => {
                    const v = e.target.value;
                    setPortfolioForm((s) => ({ ...s, client: v }));
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label>타입</Label>
                <Input
                  value={portfolioForm.type}
                  onChange={(e) => {
                    const v = e.target.value;
                    setPortfolioForm((s) => ({ ...s, type: v }));
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label>품목(제작 항목)</Label>
                <Input
                  value={portfolioForm.items}
                  onChange={(e) => {
                    const v = e.target.value;
                    setPortfolioForm((s) => ({ ...s, items: v }));
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label>수량 범위</Label>
                <Input
                  value={portfolioForm.qty}
                  onChange={(e) => {
                    const v = e.target.value;
                    setPortfolioForm((s) => ({ ...s, qty: v }));
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label>리드타임</Label>
                <Input
                  value={portfolioForm.lead_time}
                  onChange={(e) => {
                    const v = e.target.value;
                    setPortfolioForm((s) => ({ ...s, lead_time: v }));
                  }}
                />
              </div>
            </div>
            <div className="space-y-3">
              <Label>포트폴리오 이미지 (드래그 앤 드롭 / 다중 선택)</Label>
              <div
                className={`rounded-2xl border-2 border-dashed px-4 py-10 text-center transition-colors ${
                  portfolioDragActive
                    ? "border-primary bg-primary/5"
                    : "border-border/70 bg-muted/10 hover:border-border"
                }`}
                onDragEnter={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setPortfolioDragActive(true);
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDragLeave={(e: DragEvent<HTMLDivElement>) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (!e.currentTarget.contains(e.relatedTarget as Node)) setPortfolioDragActive(false);
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setPortfolioDragActive(false);
                  const dropped = e.dataTransfer.files;
                  if (dropped?.length) void handleUploadPortfolioFiles(dropped);
                }}
              >
                <p className="text-sm font-semibold text-foreground">
                  이미지를 여기로 드래그하거나 파일을 선택하세요
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  여러 장을 한 번에 올릴 수 있습니다 (이미지 파일만).
                </p>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  className="mx-auto mt-4 max-w-xs cursor-pointer"
                  onChange={(e) => {
                    const input = e.target;
                    const list = input.files;
                    if (list?.length) void handleUploadPortfolioFiles(list);
                    input.value = "";
                  }}
                  disabled={uploadingPortfolioImage || loading}
                />
                <p className="mt-3 text-xs text-muted-foreground">
                  {uploadingPortfolioImage ? "업로드 중..." : "권장: JPG/PNG/WebP. 용량이 크면 업로드가 느릴 수 있습니다."}
                </p>
              </div>

              {portfolioForm.gallery_urls.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground">
                    갤러리 ({portfolioForm.gallery_urls.length}장) — 대표 이미지는 카드·목록 썸네일에 사용됩니다.
                  </p>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                    {portfolioForm.gallery_urls.map((url) => {
                      const isCover = portfolioForm.image_url === url;
                      return (
                        <div
                          key={url}
                          className={`relative overflow-hidden rounded-xl border bg-muted/30 ${
                            isCover ? "border-primary ring-2 ring-primary/30" : "border-border/50"
                          }`}
                        >
                          <img src={url} alt="" className="aspect-square w-full object-cover" />
                          {isCover && (
                            <span className="absolute left-2 top-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
                              대표
                            </span>
                          )}
                          <div className="flex flex-col gap-1 border-t border-border/40 bg-background/95 p-2">
                            {!isCover && (
                              <Button
                                type="button"
                                variant="secondary"
                                size="sm"
                                className="h-8 text-xs"
                                disabled={loading || uploadingPortfolioImage}
                                onClick={() => setCoverUrl(url)}
                              >
                                대표로
                              </Button>
                            )}
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="h-8 text-xs text-destructive hover:text-destructive"
                              disabled={loading || uploadingPortfolioImage}
                              onClick={() => removeGalleryUrl(url)}
                            >
                              제거
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label>관리 항목</Label>
              <p className="text-xs text-muted-foreground">
                포트폴리오 카드에 표시되는 항목입니다. 줄바꿈으로 구분해 입력할 수 있습니다.
              </p>
              <Textarea
                value={portfolioForm.point}
                placeholder="예: 샘플 검수 · 생산 일정 · 출고 검수"
                onChange={(e) => {
                  const v = e.target.value;
                  setPortfolioForm((s) => ({ ...s, point: v }));
                }}
              />
            </div>
            <div className="space-y-2">
              <Label>상세 설명</Label>
              <Textarea
                value={portfolioForm.description}
                onChange={(e) => {
                  const v = e.target.value;
                  setPortfolioForm((s) => ({ ...s, description: v }));
                }}
              />
            </div>
            <div className="flex items-center gap-3">
              <Button type="button" onClick={handleSavePortfolio} disabled={loading}>
                {isEditingPortfolio ? "수정 저장" : "추가"}
              </Button>
              {isEditingPortfolio && (
                <Button
                  type="button"
                  variant="outline"
                  disabled={loading}
                  onClick={() => setPortfolioForm(emptyPortfolioForm())}
                >
                  취소
                </Button>
              )}
              {portfolioForm.lead_time && (
                <span className="text-xs text-muted-foreground">
                  미리보기: {leadTimePreview}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              {portfolioItems.map((item) => (
                <div
                  key={item.id}
                  className={`group relative overflow-hidden rounded-2xl border border-border/50 bg-card shadow-sm ring-1 ring-foreground/[0.06] transition-[box-shadow,transform] duration-200 hover:shadow-md ${
                    draggingPortfolioId === item.id ? "opacity-60 ring-2 ring-primary/40" : ""
                  }`}
                  draggable={!loading}
                  onDragStart={() => setDraggingPortfolioId(item.id)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => void handlePortfolioDrop(item.id)}
                  onDragEnd={() => setDraggingPortfolioId(null)}
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted/40">
                    <button
                      type="button"
                      aria-label="순서 변경 (드래그)"
                      className="absolute left-3 top-3 z-20 flex h-9 w-9 cursor-grab items-center justify-center rounded-xl border border-border/70 bg-background/90 text-muted-foreground shadow-sm backdrop-blur-md transition-colors hover:bg-background active:cursor-grabbing"
                    >
                      <GripVertical className="h-4 w-4" />
                    </button>
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.client}
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center gap-1 text-center text-muted-foreground">
                        <Images className="h-8 w-8 opacity-40" />
                        <span className="text-xs font-medium">대표 이미지 없음</span>
                      </div>
                    )}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/80 to-transparent" />
                    {item.gallery_urls.length > 1 && (
                      <span className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-1 rounded-full border border-border/50 bg-background/95 px-2.5 py-1 text-[11px] font-semibold tabular-nums shadow-sm backdrop-blur-sm">
                        <Images className="h-3 w-3 opacity-70" />+{item.gallery_urls.length - 1}
                      </span>
                    )}
                  </div>

                  <div className="space-y-3 p-4 sm:p-5">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <h4 className="min-w-0 flex-1 text-lg font-bold leading-snug tracking-tight text-foreground">
                        {item.client}
                      </h4>
                      <span
                        className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                          item.published
                            ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {item.published ? "공개" : "비공개"}
                      </span>
                    </div>

                    {item.items ? (
                      <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">{item.items}</p>
                    ) : null}

                    <div className="flex flex-wrap gap-1.5">
                      {[item.type, item.qty, item.lead_time].map((meta, idx) =>
                        meta?.trim() ? (
                          <span
                            key={`${item.id}-m-${idx}`}
                            className="rounded-md border border-border/60 bg-muted/40 px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                          >
                            {meta}
                          </span>
                        ) : null,
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 border-t border-border/40 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="gap-1.5 font-medium"
                        onClick={() =>
                          setPortfolioForm({
                            id: item.id,
                            client: item.client,
                            type: item.type,
                            items: item.items,
                            qty: item.qty,
                            lead_time: item.lead_time,
                            point: item.point,
                            image_url: item.image_url,
                            gallery_urls:
                              item.gallery_urls.length > 0
                                ? item.gallery_urls
                                : item.image_url
                                  ? [item.image_url]
                                  : [],
                            description: item.description,
                            sort_order: String(item.sort_order),
                            published: item.published,
                          })
                        }
                        disabled={loading}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        수정
                      </Button>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="gap-1.5 font-medium"
                        onClick={() => handleDeletePortfolio(item.id)}
                        disabled={loading}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        삭제
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              {portfolioItems.length === 0 && (
                <div className="rounded-2xl border border-dashed border-border/70 p-8 text-center text-muted-foreground">
                  표시할 포트폴리오가 없습니다.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {tab === "settings" && (
        <Card className="rounded-[2rem] border-border/50">
          <CardHeader>
            <CardTitle className="text-xl font-extrabold">사이트 설정</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>알림 이메일 (admin_email)</Label>
                <Input
                  value={settingsForm.admin_email}
                  onChange={(e) => {
                    const v = e.target.value;
                    setSettingsForm((s) => ({ ...s, admin_email: v }));
                  }}
                  placeholder="admin@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label>알림 전화번호 (admin_phone)</Label>
                <Input
                  value={settingsForm.admin_phone}
                  onChange={(e) => {
                    const v = formatKrMobileDisplay(e.target.value);
                    setSettingsForm((s) => ({ ...s, admin_phone: v }));
                  }}
                  placeholder="010-0000-0000"
                  inputMode="numeric"
                  autoComplete="tel"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>주소 (address)</Label>
                <Input
                  value={settingsForm.address}
                  onChange={(e) => {
                    const v = e.target.value;
                    setSettingsForm((s) => ({ ...s, address: v }));
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label>회사 이메일 (email)</Label>
                <Input
                  value={settingsForm.email}
                  onChange={(e) => {
                    const v = e.target.value;
                    setSettingsForm((s) => ({ ...s, email: v }));
                  }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>고객사 로고 텍스트 목록 (customer_logos JSON)</Label>
              <Textarea
                value={settingsForm.customer_logos}
                onChange={(e) => {
                  const v = e.target.value;
                  setSettingsForm((s) => ({ ...s, customer_logos: v }));
                }}
                className="min-h-[120px] font-mono text-xs"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button type="button" onClick={handleSaveSiteSettings} disabled={loading}>
                저장
              </Button>
              <Button
                type="button"
                variant="outline"
                disabled={loading}
                onClick={() => refreshSiteSettings()}
              >
                새로고침
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              Navbar·Footer 링크는 사이트 기본값을 사용합니다. 고객사 로고 목록만 JSON으로 수정할 수 있으며 형식이 잘못되면 저장이 실패합니다.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

