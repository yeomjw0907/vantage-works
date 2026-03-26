import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, X, Building2 } from "lucide-react";
import { useSiteSettings } from "@/lib/useSiteSettings";
import { PortfolioShowcaseCard } from "@/components/portfolio/PortfolioShowcaseCard";
import { Seo } from "@/components/seo/Seo";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Mock data for portfolio items
type PortfolioItem = {
  id: string | number;
  client: string;
  type: string;
  items: string;
  qty: string;
  leadTime: string;
  point: string;
  image: string;
  gallery: string[];
  description: string;
};

const mockPortfolioItems: PortfolioItem[] = [
  {
    id: 1,
    client: "글로벌 게임사 N사",
    type: "리테일 굿즈",
    items: "키링·뱃지·마그넷 등",
    qty: "수천~수만 EA",
    leadTime: "샘플 2~3주 / 양산 3~5주",
    point: "색상 기준 / 포장 동봉 / QC 기준",
    image: "https://picsum.photos/seed/port1/800/600",
    gallery: ["https://picsum.photos/seed/port1/800/600"],
    description: "유명 캐릭터 IP를 활용한 리테일용 굿즈 제작 사례입니다. 팬톤 컬러 매칭을 통해 캐릭터의 고유 색상을 정확하게 구현하는 데 집중했습니다. 또한, 개별 포장 및 바코드 라벨링 작업을 포함하여 납품 즉시 판매가 가능하도록 처리했습니다.",
  },
  {
    id: 2,
    client: "국내 대형 F&B 브랜드",
    type: "프로모션 굿즈",
    items: "에코백·파우치·패키징 등",
    qty: "수천~수만 EA",
    leadTime: "샘플 2주 / 양산 3주",
    point: "인쇄 품질 / 원단 스펙 / 납기 준수",
    image: "https://picsum.photos/seed/port2/800/600",
    gallery: ["https://picsum.photos/seed/port2/800/600"],
    description: "신제품 출시 기념 프로모션을 위한 에코백 및 파우치 세트입니다. 지정된 예산 내에서 최적의 원단 두께와 인쇄 방식을 제안하여 가성비와 품질을 동시에 만족시켰습니다. 촉박한 행사 일정에 맞춰 항공 운송을 병행하여 납기를 준수했습니다.",
  },
  {
    id: 3,
    client: "IT 스타트업 T사",
    type: "브랜드 굿즈",
    items: "문구류·사무용품 세트",
    qty: "수천 EA",
    leadTime: "샘플 3주 / 양산 4주",
    point: "브랜드 컬러 매칭 / 패키징 디테일",
    image: "https://picsum.photos/seed/port3/800/600",
    gallery: ["https://picsum.photos/seed/port3/800/600"],
    description: "기업 임직원 웰컴 키트용 사무용품 세트 제작 사례입니다. 다이어리, 펜, 캘린더 등 여러 품목을 하나의 패키지에 담는 과정에서 각 품목의 톤앤매너를 일치시키는 데 주력했습니다. 고급스러운 패키징 디자인으로 브랜드 가치를 높였습니다.",
  },
  {
    id: 4,
    client: "스트릿 패션 브랜드",
    type: "리테일 굿즈",
    items: "의류·모자·양말",
    qty: "수천 EA",
    leadTime: "샘플 3주 / 양산 4주",
    point: "사이즈 스펙 / 자수 퀄리티 / 라벨링",
    image: "https://picsum.photos/seed/port4/800/600",
    gallery: ["https://picsum.photos/seed/port4/800/600"],
    description: "패션 브랜드의 시즌 기획 상품으로 제작된 의류 및 잡화입니다. 복잡한 자수 도안을 깔끔하게 구현하기 위해 여러 차례 샘플링을 진행했습니다. 한국인의 체형에 맞는 사이즈 스펙을 적용하고, 케어라벨 및 브랜드 택 부착 작업을 꼼꼼하게 진행했습니다.",
  },
  {
    id: 5,
    client: "글로벌 커피 프랜차이즈",
    type: "프로모션 굿즈",
    items: "텀블러·머그컵",
    qty: "수천~수만 EA",
    leadTime: "샘플 2주 / 양산 4주",
    point: "인쇄 내구성 / 식품검역 / 개별 포장",
    image: "https://picsum.photos/seed/port5/800/600",
    gallery: ["https://picsum.photos/seed/port5/800/600"],
    description: "카페 프랜차이즈의 시즌 한정 MD 상품 제작 사례입니다. 식기류에 해당하는 품목이므로 수입 시 필요한 식품 검역 절차를 대행하여 원활한 통관을 지원했습니다. 세척 후에도 인쇄가 벗겨지지 않도록 인쇄 내구성 테스트를 거쳤습니다.",
  },
  {
    id: 6,
    client: "국내 핀테크 기업 K사",
    type: "브랜드 굿즈",
    items: "디지털 기기 액세서리",
    qty: "수천 EA",
    leadTime: "샘플 3주 / 양산 5주",
    point: "금형 제작 / KC 인증 / 패키징",
    image: "https://picsum.photos/seed/port6/800/600",
    gallery: ["https://picsum.photos/seed/port6/800/600"],
    description: "IT 기업의 VIP 고객 사은품으로 제작된 무선 충전기 및 보조배터리입니다. 독자적인 디자인을 위해 신규 금형을 제작했으며, 국내 전파인증(KC) 및 배터리 안전 인증 절차를 완벽하게 처리했습니다. 프리미엄 느낌을 주는 하드케이스 패키징을 적용했습니다.",
  },
];

export function Portfolio() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(mockPortfolioItems);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [dialogImageIndex, setDialogImageIndex] = useState(0);
  const siteSettings = useSiteSettings();
  const defaultCustomerLogos = ["SAMSUNG", "NAVER", "KAKAO", "TOSS", "LINE", "NEXON", "NCSOFT", "WOOWA"];
  const customerLogos =
    siteSettings?.customer_logos?.filter((logo) => typeof logo === "string" && logo.trim().length > 0) ??
    defaultCustomerLogos;

  useEffect(() => {
    if (selectedItem) setDialogImageIndex(0);
  }, [selectedItem?.id]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const { hasSupabaseConfig, getSupabase } = await import("@/lib/supabaseClient");
      if (!hasSupabaseConfig) return;

      const supabase = getSupabase();
      const { data, error } = await supabase
        .from("portfolio_items")
        .select("id,client,type,items,qty,lead_time,point,image_url,gallery_urls,description,sort_order")
        .order("sort_order", { ascending: true });

      if (error) return;
      if (cancelled) return;

      setPortfolioItems(
        (data ?? []).map((d) => {
          const gallery = Array.isArray(d.gallery_urls)
            ? d.gallery_urls.filter((u): u is string => typeof u === "string" && u.length > 0)
            : [];
          const cover =
            (typeof d.image_url === "string" && d.image_url.length > 0 ? d.image_url : null) ??
            gallery[0] ??
            "";
          const imgs = gallery.length > 0 ? gallery : cover ? [cover] : [];
          return {
            id: d.id,
            client: d.client ?? "클라이언트 미정",
            type: d.type ?? "기타 프로젝트",
            items: d.items ?? "품목 정보 준비 중",
            qty: d.qty ?? "협의",
            leadTime: d.lead_time ?? "협의",
            point: d.point ?? "관리 항목 준비 중",
            image: cover || "https://picsum.photos/seed/portfolio-fallback/800/600",
            gallery: imgs,
            description: d.description ?? "상세 설명 준비 중입니다.",
          };
        }) as PortfolioItem[],
      );
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="flex flex-col">
      <Seo
        title="포트폴리오 | 밴티지웍스"
        description="밴티지웍스의 굿즈 제작 및 소싱 프로젝트 사례를 확인하세요. 업종별/목적별 레퍼런스를 통해 예상 품질, 리드타임, 운영 포인트를 빠르게 파악할 수 있습니다."
        path="/portfolio"
      />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background py-24 lg:py-32 border-b border-border/40">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-primary/10 opacity-50 blur-[120px]"></div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-4xl"
          >
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-semibold text-primary mb-8 tracking-wide uppercase">
              Our Portfolio
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-7xl leading-[1.1] mb-8">
              결과로 증명하는 <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">성공적인 소싱 사례</span>
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-muted-foreground max-w-2xl mx-auto">
              업종 및 프로젝트 유형별 진행 사례와 결과를 공유합니다.<br className="hidden md:block" />
              밴티지웍스의 꼼꼼한 운영 능력을 확인해보세요.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Trusted By / Logo Marquee */}
      <section className="py-12 border-b border-border/40 bg-muted/30 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
          <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
            함께 성장하는 파트너
          </p>
        </div>
        <div className="relative flex overflow-hidden group w-full">
          <div className="absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-muted/30 to-transparent"></div>
          <div className="absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-muted/30 to-transparent"></div>
          
          <motion.div
            className="flex space-x-16 items-center whitespace-nowrap px-8"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 30,
            }}
          >
            {/* Array duplicated to create a seamless loop */}
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex space-x-16 items-center">
                {customerLogos.map((logo) => (
                  <span
                    key={`${i}-${logo}`}
                    className="text-3xl font-black text-muted-foreground/30 hover:text-primary/60 transition-colors cursor-default"
                  >
                    {logo}
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-24 lg:py-32 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {portfolioItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="h-full"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <PortfolioShowcaseCard
                  item={item}
                  onOpen={() => setSelectedItem(item)}
                  className="h-full"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 하단 CTA */}
      <section className="relative overflow-hidden bg-primary py-24 text-primary-foreground">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute right-0 bottom-0 -z-10 translate-x-1/3 translate-y-1/3 h-[500px] w-[500px] rounded-full bg-secondary opacity-30 blur-[100px]"></div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl mb-8">
            비슷한 프로젝트를 준비 중이신가요?
          </h2>
          <p className="mt-6 text-xl leading-relaxed text-primary-foreground/90 max-w-2xl mx-auto">
            밴티지웍스의 경험을 바탕으로 <br className="hidden sm:block" />
            가장 안전하고 확실한 제작 방안을 제안해드립니다.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link to="/contact" className={buttonVariants({ size: "lg", variant: "secondary", className: "h-14 px-12 text-primary font-bold rounded-full text-lg shadow-xl hover:scale-105 transition-transform" })}>
              프로젝트 문의하기
            </Link>
          </div>
        </div>
      </section>

      {/* Portfolio Detail Dialog (Premium Modal) */}
      <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
        <DialogContent className="sm:max-w-[900px] w-[95vw] p-0 overflow-hidden rounded-[2.5rem] gap-0 border-border/50 bg-background shadow-2xl">
          {selectedItem && (
            <div className="grid grid-cols-1 md:grid-cols-5 max-h-[90vh] bg-background">
              {/* Image Section (Left) */}
              <div className="relative flex h-64 flex-col md:h-auto md:col-span-2 bg-muted overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 pointer-events-none"></div>
                {(() => {
                  const imgs =
                    selectedItem.gallery.length > 0
                      ? selectedItem.gallery
                      : selectedItem.image
                        ? [selectedItem.image]
                        : [];
                  const safeIdx = imgs.length > 0 ? Math.min(dialogImageIndex, imgs.length - 1) : 0;
                  const mainSrc = imgs[safeIdx] ?? selectedItem.image;
                  return (
                    <>
                      <img
                        src={mainSrc}
                        alt={selectedItem.type}
                        className="min-h-0 flex-1 w-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      {imgs.length > 1 && (
                        <div className="relative z-20 flex gap-2 overflow-x-auto border-t border-white/10 bg-black/40 p-2 backdrop-blur-sm">
                          {imgs.map((src, i) => (
                            <button
                              key={src + i}
                              type="button"
                              onClick={() => setDialogImageIndex(i)}
                              className={`h-14 w-14 shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                                safeIdx === i ? "border-white" : "border-transparent opacity-70 hover:opacity-100"
                              }`}
                            >
                              <img src={src} alt="" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  );
                })()}
                <div className="absolute left-6 top-6 z-20">
                  <div className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-xs font-bold text-white border border-white/30">
                    {selectedItem.type}
                  </div>
                </div>
              </div>
              
              {/* Content Section (Right) */}
              <div className="p-8 md:p-10 flex flex-col overflow-y-auto bg-background md:col-span-3 relative">
                <div className="absolute top-0 right-0 p-6">
                  {/* The Dialog component has its own close button, but we can style around it or hide the default and use our own if we want. For now, we rely on Dialog's default close button which is positioned absolute right-4 top-4. */}
                </div>
                
                <DialogHeader className="text-left mb-8 pr-8 mt-2">
                  <div className="flex items-center gap-2 text-primary mb-3">
                    <Building2 className="w-5 h-5" />
                    <span className="text-sm font-bold tracking-wide">{selectedItem.client}</span>
                  </div>
                  <DialogTitle className="text-3xl font-extrabold text-foreground leading-tight">
                    {selectedItem.items}
                  </DialogTitle>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs font-semibold text-muted-foreground">
                      유형: {selectedItem.type}
                    </span>
                    <span className="rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs font-semibold text-muted-foreground">
                      수량: {selectedItem.qty}
                    </span>
                    <span className="rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs font-semibold text-muted-foreground">
                      리드타임: {selectedItem.leadTime}
                    </span>
                  </div>
                  <div className="h-1 w-12 bg-gradient-to-r from-primary to-secondary rounded-full mt-6"></div>
                </DialogHeader>
                
                <div className="space-y-8 flex-1">
                  <DialogDescription className="text-lg text-muted-foreground leading-relaxed">
                    {selectedItem.description}
                  </DialogDescription>
                  
                  <div className="bg-muted/30 rounded-2xl p-6 border border-border/50">
                    <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-4">Project Overview</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center border-b border-border/50 pb-3">
                        <span className="font-semibold text-foreground text-sm whitespace-nowrap">수량 범위</span>
                        <span className="text-foreground font-medium text-sm text-right ml-4">{selectedItem.qty}</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-border/50 pb-3">
                        <span className="font-semibold text-foreground text-sm whitespace-nowrap">리드타임</span>
                        <span className="text-foreground font-medium text-sm text-right ml-4">{selectedItem.leadTime}</span>
                      </div>
                      <div className="flex flex-col pt-1">
                        <span className="font-semibold text-foreground text-sm mb-2">관리 항목</span>
                        <span className="text-muted-foreground text-sm leading-relaxed bg-background p-3 rounded-xl border border-border/50">{selectedItem.point}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-10 pt-8 border-t border-border/50 flex flex-col sm:flex-row gap-4">
                  <Link 
                    to="/contact" 
                    className={buttonVariants({ size: "lg", className: "w-full rounded-full font-bold text-base h-14 shadow-lg hover:shadow-primary/25 transition-all group" })}
                    onClick={() => setSelectedItem(null)}
                  >
                    유사 프로젝트 문의하기
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
