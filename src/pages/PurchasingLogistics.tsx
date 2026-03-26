import { motion } from "motion/react";
import { 
  Truck, 
  PackageCheck, 
  MapPin, 
  ShieldAlert, 
  BarChart4, 
  ArrowRight,
  Box,
  ClipboardCheck,
  Ship
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { ServicesSubnav } from "@/components/layout/ServicesSubnav";
import { Link } from "react-router-dom";

export function PurchasingLogistics() {
  return (
    <div className="flex flex-col bg-background">
      <ServicesSubnav />
      {/* Hero Section - Centered Typography Layout */}
      <section className="relative overflow-hidden bg-background py-24 lg:py-32 border-b border-border/40">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute right-0 top-0 -z-10 translate-x-1/3 -translate-y-1/4 h-[600px] w-[600px] rounded-full bg-slate-500/10 opacity-50 blur-[120px]"></div>
        <div className="absolute left-0 bottom-0 -z-10 -translate-x-1/3 translate-y-1/4 h-[400px] w-[400px] rounded-full bg-slate-400/10 opacity-50 blur-[100px]"></div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-4xl text-center"
          >
            <div className="inline-flex items-center rounded-full border border-slate-500/20 bg-slate-500/5 px-4 py-1.5 text-sm font-semibold text-slate-600 mb-8 tracking-wide uppercase dark:text-slate-400">
              Logistics & Fulfillment
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-7xl leading-[1.1] mb-8">
              끊김 없는 물류 인프라, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-slate-900 dark:from-slate-300 dark:to-slate-500">구매대행 및 물류</span>
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-muted-foreground max-w-2xl mx-auto mb-10">
              중국 웨이하이(Weihai) 현지 직영 센터를 기반으로, 발주부터 정밀 검수,<br className="hidden md:block" />
              재포장, 통관, 국내 배송까지 안전하고 신속한 물류 솔루션을 제공합니다.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className={buttonVariants({ size: "lg", className: "h-14 px-8 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-full text-lg shadow-lg shadow-slate-800/20 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-slate-300" })}>
                물류 의뢰하기 <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 웨이하이 직영 센터의 강점 - Bento Grid */}
      <section className="py-24 bg-muted/30 border-b border-border/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              왜 웨이하이(Weihai) 센터인가요?
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              한국과 가장 가까운 지리적 이점과 체계적인 시스템으로 물류 효율을 극대화합니다.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: MapPin, title: "최단 거리 해운 물류", desc: "한국(인천/평택)과 가장 가까운 중국 항구 도시로, 해운 운송 시 익일 도착이 가능한 지리적 이점을 갖추고 있습니다." },
              { icon: Box, title: "안전한 보관 및 재고 관리", desc: "넓고 쾌적한 직영 창고를 운영하여, 대량의 화물도 안전하게 보관하며 체계적인 WMS(창고관리시스템)를 지원합니다." },
              { icon: BarChart4, title: "비용 절감 효과", desc: "내륙 운송비 절감 및 최적화된 해운/항공 요율을 적용하여 전체적인 물류 비용을 크게 낮출 수 있습니다." },
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-background rounded-[2rem] p-8 border border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div className="h-16 w-16 rounded-2xl bg-slate-500/5 flex items-center justify-center text-slate-600 mb-8 group-hover:bg-slate-800 group-hover:text-white transition-colors duration-300 dark:text-slate-400 dark:group-hover:bg-slate-200 dark:group-hover:text-slate-900">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 핵심 서비스 - Text/Icon Centric */}
      <section className="py-24 lg:py-32 bg-background border-b border-border/40 overflow-hidden relative">
        <div className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[1000px] rounded-full bg-slate-500/5 opacity-50 blur-[120px]"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16 lg:mb-24">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl mb-6">
              단순 배송을 넘어선 <span className="text-slate-600 dark:text-slate-400">통합 풀필먼트</span>
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              중국 내 공장에서 출고된 제품이 한국의 최종 목적지에 도착하기까지, 모든 과정을 밴티지웍스가 직접 컨트롤합니다.
            </p>
          </div>
          
          <div className="mx-auto max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { icon: ClipboardCheck, step: "01", title: "정밀 검수 (QC)", desc: "단순 수량 확인을 넘어, 외관 불량, 스크래치, 작동 여부 등 고객사의 기준에 맞춘 맞춤형 검수를 진행합니다." },
                { icon: PackageCheck, step: "02", title: "재포장 및 라벨링", desc: "파손 방지를 위한 보강 포장, 국내 유통 규격에 맞춘 바코드 부착 및 원산지(Made in China) 라벨 작업을 수행합니다." },
                { icon: ShieldAlert, step: "03", title: "불량품 반품 및 교환 처리", desc: "중국 현지에서 불량을 사전에 걸러내어, 공장으로 즉각적인 반품 및 교환을 진행해 시간과 비용을 절약합니다." },
                { icon: Ship, step: "04", title: "맞춤형 운송 솔루션", desc: "화물의 부피와 긴급도에 따라 LCL/FCL 해운 운송, 항공 특송 등 가장 효율적인 운송 방식을 제안합니다." },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative bg-muted/30 p-8 rounded-3xl border border-border/50 hover:border-slate-500/30 transition-all group"
                >
                  <div className="absolute top-6 right-8 text-6xl font-black text-slate-500/5 group-hover:text-slate-500/10 transition-colors duration-500">
                    {step.step}
                  </div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-background shadow-sm text-slate-600 border border-border/50 mb-6 relative z-10 dark:text-slate-400">
                    <step.icon className="h-7 w-7" />
                  </div>
                  <h4 className="font-bold text-foreground text-xl mb-3 relative z-10">{step.title}</h4>
                  <p className="text-muted-foreground leading-relaxed relative z-10">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 하단 CTA */}
      <section className="relative overflow-hidden bg-slate-900 py-24 text-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] bg-slate-700/30 rounded-full blur-[120px]"></div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl mb-8">
            안전하고 빠른 물류 파트너가 필요하신가요?
          </h2>
          <p className="text-xl leading-relaxed text-slate-300 max-w-2xl mx-auto mb-10">
            복잡한 수입 통관과 물류 과정, 밴티지웍스의 현지 직영 센터가 완벽하게 해결해 드립니다.
          </p>
          <Link to="/contact" className={buttonVariants({ size: "lg", className: "h-14 px-10 bg-white text-slate-900 hover:bg-slate-100 font-bold rounded-full text-lg shadow-xl hover:scale-105 transition-transform" })}>
            물류/구매대행 문의하기 <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
