import { Link } from "react-router-dom";
import { ArrowUpRight, Building2, Clock, Package } from "lucide-react";
import { cn } from "@/lib/utils";

export type PortfolioShowcaseCardData = {
  id: string | number;
  client: string;
  type: string;
  items: string;
  qty: string;
  leadTime: string;
  point: string;
  image: string;
};

type PortfolioShowcaseCardProps = {
  item: PortfolioShowcaseCardData;
  /** 포트폴리오 페이지: 카드 클릭 시 모달 */
  onOpen?: () => void;
  /** 홈 등: 카드 전체를 링크로 (예: `/portfolio`) */
  linkTo?: string;
  className?: string;
};

function PointChips({ point }: { point: string }) {
  const parts = point
    .split("/")
    .map((s) => s.trim())
    .filter(Boolean);
  if (parts.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        {point.trim() || "—"}
      </p>
    );
  }
  return (
    <div className="flex flex-wrap gap-1.5">
      {parts.map((p, i) => (
        <span
          key={`${p}-${i}`}
          className="rounded-lg border border-border/60 bg-muted/40 px-2 py-1 text-[11px] font-medium leading-snug text-muted-foreground"
        >
          {p}
        </span>
      ))}
    </div>
  );
}

function CardInner({ item }: { item: PortfolioShowcaseCardData }) {
  return (
    <>
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-muted">
        <img
          src={item.image}
          alt=""
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover/card:scale-[1.04]"
          referrerPolicy="no-referrer"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
        <span className="absolute left-3 top-3 z-10 max-w-[calc(100%-1.5rem)] truncate rounded-full border border-border/60 bg-background/90 px-3 py-1 text-[11px] font-bold text-primary shadow-sm backdrop-blur-md">
          {item.type}
        </span>
        <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between gap-2 opacity-0 translate-y-1 transition-all duration-300 group-hover/card:translate-y-0 group-hover/card:opacity-100">
          <span className="text-xs font-semibold text-foreground drop-shadow-sm">
            자세히 보기
          </span>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border/50 bg-background/90 text-foreground shadow-md backdrop-blur-md">
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </span>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-4 p-5 sm:p-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Building2 className="h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden />
            <span className="text-xs font-semibold uppercase tracking-wide">
              클라이언트
            </span>
          </div>
          <p className="text-base font-bold leading-snug text-foreground">
            {item.client}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">
            프로젝트 · 품목
          </p>
          <h3 className="text-lg font-extrabold leading-snug tracking-tight text-foreground transition-colors group-hover/card:text-primary sm:text-xl line-clamp-2">
            {item.items}
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          <div className="flex gap-2.5 rounded-xl border border-border/50 bg-muted/25 px-3 py-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Package className="h-4 w-4" aria-hidden />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                수량 범위
              </p>
              <p className="text-sm font-semibold text-foreground">{item.qty}</p>
            </div>
          </div>
          <div className="flex gap-2.5 rounded-xl border border-border/50 bg-muted/25 px-3 py-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-500/10 text-sky-700 dark:text-sky-400">
              <Clock className="h-4 w-4" aria-hidden />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                리드타임
              </p>
              <p className="text-sm font-semibold text-foreground leading-snug">
                {item.leadTime}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-auto space-y-2 rounded-xl border border-border/40 bg-muted/15 p-3">
          <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
            관리 포인트
          </p>
          <PointChips point={item.point} />
        </div>
      </div>
    </>
  );
}

export function PortfolioShowcaseCard({ item, onOpen, linkTo, className }: PortfolioShowcaseCardProps) {
  const shell = cn(
    "group/card flex h-full w-full flex-col overflow-hidden rounded-[2rem] border border-border/50 bg-card text-left text-sm text-card-foreground shadow-sm ring-1 ring-foreground/[0.06] transition-[box-shadow,transform,border-color] duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-xl",
    (onOpen || linkTo) && "cursor-pointer",
    className,
  );

  if (onOpen) {
    return (
      <button
        type="button"
        onClick={onOpen}
        className={cn(
          shell,
          "m-0 appearance-none p-0 text-left font-sans focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        )}
      >
        <CardInner item={item} />
      </button>
    );
  }

  if (linkTo) {
    return (
      <Link
        to={linkTo}
        className={cn(
          shell,
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        )}
      >
        <CardInner item={item} />
      </Link>
    );
  }

  return (
    <div className={shell}>
      <CardInner item={item} />
    </div>
  );
}
