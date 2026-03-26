import { useEffect, useMemo, useState } from "react";
import { getSupabase } from "@/lib/supabaseClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Lead = {
  id: string;
  created_at: string;
  inquiry_type: string;
  company: string;
  contact_name: string;
  email: string;
  phone: string;
  details: string;
};

const INQUIRY_TYPE_LABELS: Record<string, string> = {
  oem: "굿즈 OEM/ODM 제작",
  sourcing: "중국 소싱 및 단가 조사",
  purchasing: "웨이하이 구매대행 및 물류",
  tour: "이우 1:1 소싱투어",
  other: "기타 문의",
};

export function AdminLeads() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [detailLead, setDetailLead] = useState<Lead | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const supabase = getSupabase();
        const { data, error: fetchError } = await supabase
          .from("leads")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(200);

        if (fetchError) throw fetchError;
        if (!cancelled) setLeads((data ?? []) as Lead[]);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "데이터를 불러오지 못했습니다.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return leads.filter((lead) => {
      const matchesType = typeFilter === "all" ? true : lead.inquiry_type === typeFilter;
      const matchesQuery =
        q.length === 0
          ? true
          : [lead.company, lead.contact_name, lead.email, lead.phone, lead.details, lead.inquiry_type]
              .join(" ")
              .toLowerCase()
              .includes(q);
      return matchesType && matchesQuery;
    });
  }, [leads, query, typeFilter]);

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">문의/리드</h1>
          <p className="text-sm text-muted-foreground">최근 접수부터 최대 200건을 표시합니다.</p>
        </div>
        <Button type="button" variant="outline" onClick={() => window.location.reload()} disabled={loading}>
          새로고침
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Input
          placeholder="회사명/담당자명/이메일/전화/내용 검색"
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
          disabled={loading}
        />
        <div className="sm:col-span-1">
          <select
            className="h-10 w-full rounded-lg border border-border/50 bg-background px-3 text-sm"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.currentTarget.value)}
            disabled={loading}
          >
            <option value="all">모든 문의유형</option>
            {Object.entries(INQUIRY_TYPE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && <div className="text-sm text-destructive">{error}</div>}

      {loading ? (
        <div className="text-sm text-muted-foreground">로딩 중...</div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-[1rem] border border-border/50 bg-background">
            <table className="min-w-full text-sm">
              <thead className="bg-muted/25">
                <tr>
                  <th className="px-4 py-3 text-left font-bold">접수일시</th>
                  <th className="px-4 py-3 text-left font-bold">문의유형</th>
                  <th className="px-4 py-3 text-left font-bold">회사/담당자</th>
                  <th className="px-4 py-3 text-left font-bold">연락</th>
                  <th className="px-4 py-3 text-left font-bold">상세</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead) => (
                  <tr key={lead.id} className="border-t border-border/30 align-top">
                    <td className="px-4 py-3 whitespace-nowrap">
                      {lead.created_at ? new Date(lead.created_at).toLocaleString("ko-KR") : "-"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                        {INQUIRY_TYPE_LABELS[lead.inquiry_type] ?? lead.inquiry_type}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold">{lead.company || "-"}</div>
                      <div className="text-muted-foreground">{lead.contact_name || "-"}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="max-w-[220px] truncate">{lead.email || "-"}</div>
                      <div className="text-muted-foreground">{lead.phone || "-"}</div>
                    </td>
                    <td className="px-4 py-3">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-auto px-2 py-1 font-semibold text-primary hover:text-primary"
                        onClick={() => setDetailLead(lead)}
                      >
                        내용 보기
                      </Button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-6 text-center text-muted-foreground">
                      표시할 결과가 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <Dialog
            open={detailLead !== null}
            onOpenChange={(open) => {
              if (!open) setDetailLead(null);
            }}
          >
            <DialogContent
              showCloseButton
              className="flex max-h-[min(88vh,800px)] max-w-[calc(100%-2rem)] flex-col gap-0 overflow-hidden p-0 sm:max-w-lg md:max-w-2xl"
            >
              {detailLead ? (
                <>
                  <DialogHeader className="gap-3 border-b border-border/50 bg-muted/20 px-6 py-5 text-left">
                    <div className="flex flex-wrap items-center gap-2">
                      <DialogTitle className="text-lg font-extrabold tracking-tight sm:text-xl">문의 상세</DialogTitle>
                      <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                        {INQUIRY_TYPE_LABELS[detailLead.inquiry_type] ?? detailLead.inquiry_type}
                      </span>
                    </div>
                    <DialogDescription className="text-xs sm:text-sm">
                      접수{" "}
                      {detailLead.created_at ? new Date(detailLead.created_at).toLocaleString("ko-KR") : "-"}
                    </DialogDescription>
                    <dl className="grid grid-cols-1 gap-3 pt-1 sm:grid-cols-2 sm:gap-x-6">
                      <div className="rounded-xl border border-border/40 bg-background/80 px-3 py-2.5">
                        <dt className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                          회사 / 담당자
                        </dt>
                        <dd className="mt-1 font-semibold text-foreground">{detailLead.company || "-"}</dd>
                        <dd className="text-sm text-muted-foreground">{detailLead.contact_name || "-"}</dd>
                      </div>
                      <div className="rounded-xl border border-border/40 bg-background/80 px-3 py-2.5">
                        <dt className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">연락</dt>
                        <dd className="mt-1 break-all text-sm font-medium">{detailLead.email || "-"}</dd>
                        <dd className="text-sm text-muted-foreground">{detailLead.phone || "-"}</dd>
                      </div>
                    </dl>
                  </DialogHeader>
                  <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
                    <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">상세 내용</p>
                    <div className="rounded-2xl border border-border/50 bg-muted/20 px-4 py-4 ring-1 ring-foreground/[0.04]">
                      <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-foreground">
                        {detailLead.details?.trim() ? detailLead.details : "내용이 없습니다."}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end border-t border-border/50 bg-muted/10 px-6 py-3">
                    <Button type="button" variant="outline" size="sm" onClick={() => setDetailLead(null)}>
                      닫기
                    </Button>
                  </div>
                </>
              ) : null}
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
}
