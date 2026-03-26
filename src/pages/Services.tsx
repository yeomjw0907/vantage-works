import { useEffect, useState, type ComponentType } from "react";
import { motion } from "motion/react";
import { 
  Package, 
  Search, 
  Truck, 
  MapPin, 
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

export function Services() {
  type ServiceUi = {
    id: string;
    title: string;
    desc: string;
    icon: ComponentType<{ className?: string }>;
    link: string;
    color: string;
    textColor: string;
    bgLight: string;
    image: string;
  };

  const mockServices: ServiceUi[] = [
    {
      id: "01",
      title: "굿즈 OEM·ODM",
      desc: "아이디어를 현실로 만듭니다. 브랜드의 가치를 담은 고품질 굿즈를 기획부터 양산, 패키징까지 원스톱으로 제공합니다.",
      icon: Package,
      link: "/services/oem",
      color: "from-primary to-blue-600",
      textColor: "text-primary",
      bgLight: "bg-primary/10",
      image: "https://picsum.photos/seed/oem/800/600"
    },
    {
      id: "02",
      title: "글로벌 소싱",
      desc: "방대한 데이터베이스와 현지 네트워크를 활용하여, 기성 제품부터 특수 부품까지 최적의 단가와 품질을 갖춘 공급처를 발굴합니다.",
      icon: Search,
      link: "/services/sourcing",
      color: "from-secondary to-teal-500",
      textColor: "text-secondary",
      bgLight: "bg-secondary/10",
      image: "https://picsum.photos/seed/sourcing/800/600"
    },
    {
      id: "03",
      title: "구매대행 및 물류",
      desc: "중국 웨이하이 현지 직영 센터를 기반으로, 발주부터 통관, 국내 배송까지 끊김 없는 물류 인프라를 제공합니다.",
      icon: Truck,
      link: "/services/purchasing",
      color: "from-slate-700 to-slate-900",
      textColor: "text-slate-700",
      bgLight: "bg-slate-200",
      image: "https://picsum.photos/seed/delivery/800/600"
    },
    {
      id: "04",
      title: "1:1 맞춤 소싱투어",
      desc: "세계 최대 도매시장 중국 이우(Yiwu). 방문 목적과 품목에 맞춰 동선 설계부터 매장 미팅, 통역까지 완벽하게 지원하는 VVIP 투어입니다.",
      icon: MapPin,
      link: "/sourcing-tour",
      color: "from-orange-500 to-red-500",
      textColor: "text-orange-500",
      bgLight: "bg-orange-500/10",
      image: "https://picsum.photos/seed/tour/800/600"
    }
  ];

  const [services, setServices] = useState<ServiceUi[]>(mockServices);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const { hasSupabaseConfig, getSupabase } = await import("@/lib/supabaseClient");
      if (!hasSupabaseConfig) return;

      type ServiceCardRow = {
        title: string;
        description: string;
        image_url: string;
        link_path: string;
        sort_order: number;
      };

      const supabase = getSupabase();
      const { data, error } = await supabase
        .from("service_cards")
        .select("title,description,image_url,link_path,sort_order")
        .order("sort_order", { ascending: true });

      if (error) return;
      if (cancelled) return;

      const buildService = (row: ServiceCardRow, idx: number): ServiceUi => {
        const id = String(idx + 1).padStart(2, "0");
        const link = row.link_path;

        if (link === "/services/oem") {
          return {
            id,
            title: row.title,
            desc: row.description,
            icon: Package,
            link,
            color: "from-primary to-blue-600",
            textColor: "text-primary",
            bgLight: "bg-primary/10",
            image: row.image_url,
          };
        }
        if (link === "/services/sourcing") {
          return {
            id,
            title: row.title,
            desc: row.description,
            icon: Search,
            link,
            color: "from-secondary to-teal-500",
            textColor: "text-secondary",
            bgLight: "bg-secondary/10",
            image: row.image_url,
          };
        }
        if (link === "/services/purchasing") {
          return {
            id,
            title: row.title,
            desc: row.description,
            icon: Truck,
            link,
            color: "from-slate-700 to-slate-900",
            textColor: "text-slate-700",
            bgLight: "bg-slate-200",
            image: row.image_url,
          };
        }
        if (link === "/sourcing-tour") {
          return {
            id,
            title: row.title,
            desc: row.description,
            icon: MapPin,
            link,
            color: "from-orange-500 to-red-500",
            textColor: "text-orange-500",
            bgLight: "bg-orange-500/10",
            image: row.image_url,
          };
        }

        // 알 수 없는 링크 경로(추가 카테고리)일 때 기본 스타일
        return {
          id,
          title: row.title,
          desc: row.description,
          icon: Package,
          link,
          color: "from-primary to-secondary",
          textColor: "text-primary",
          bgLight: "bg-primary/10",
          image: row.image_url,
        };
      };

      setServices((data ?? []).map((row, idx) => buildService(row as ServiceCardRow, idx)));
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background py-24 lg:py-32 border-b border-border/40">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 h-[800px] w-[1000px] rounded-full bg-primary/10 opacity-60 blur-[150px]"></div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-4xl"
          >
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-semibold text-primary mb-8 tracking-wide uppercase">
              Our Services
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-7xl leading-[1.1] mb-8">
              비즈니스 확장을 위한 <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">완벽한 SCM 파트너</span>
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-muted-foreground max-w-2xl mx-auto mb-12">
              단순한 구매대행을 넘어, 제품 기획부터 소싱, 생산 관리, 글로벌 물류까지.<br className="hidden md:block" />
              고객사의 성공적인 비즈니스를 위한 맞춤형 통합 솔루션을 제공합니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {services.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative bg-background rounded-[2.5rem] overflow-hidden border border-border/50 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full"
              >
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500 z-10"></div>
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-6 left-6 z-20">
                    <div className={`h-14 w-14 rounded-2xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg ${service.textColor}`}>
                      <service.icon className="h-7 w-7" />
                    </div>
                  </div>
                  <div className="absolute top-4 right-6 text-6xl font-black text-white/30 z-20 select-none">
                    {service.id}
                  </div>
                </div>
                
                <div className="p-8 lg:p-10 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-8 flex-grow">
                    {service.desc}
                  </p>
                  
                  <Link 
                    to={service.link}
                    className="inline-flex items-center font-bold text-foreground group-hover:text-primary transition-colors mt-auto"
                  >
                    자세히 보기
                    <div className="ml-3 flex h-10 w-10 items-center justify-center rounded-full bg-muted group-hover:bg-primary/10 transition-colors">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 하단 CTA */}
      <section className="relative overflow-hidden bg-primary py-32 text-primary-foreground">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        <div className="absolute left-0 bottom-0 -z-10 -translate-x-1/3 translate-y-1/3 h-[600px] w-[600px] rounded-full bg-secondary opacity-40 blur-[120px]"></div>
        <div className="absolute right-0 top-0 -z-10 translate-x-1/3 -translate-y-1/3 h-[400px] w-[400px] rounded-full bg-blue-400 opacity-30 blur-[100px]"></div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-8">
              성공적인 프로젝트를 위한 <br className="hidden sm:block" />
              첫 걸음을 시작하세요
            </h2>
            <p className="text-xl leading-relaxed text-primary-foreground/90 max-w-2xl mx-auto mb-12">
              구체적인 내용이 없어도 괜찮습니다. <br className="hidden sm:block" />
              전문 컨설턴트가 가능 범위와 일정부터 명확하게 정리해드립니다.
            </p>
            <Link to="/contact" className="inline-flex items-center justify-center whitespace-nowrap text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-16 px-12 text-primary font-bold rounded-full text-lg shadow-2xl hover:scale-105 transition-transform">
              프로젝트 문의하기
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
