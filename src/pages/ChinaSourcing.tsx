import { motion } from "motion/react";
import { 
  Search, 
  Globe, 
  TrendingDown, 
  ShieldCheck, 
  Clock, 
  ArrowRight,
  Database,
  Building2,
  FileText,
  CheckCircle2
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { ServicesSubnav } from "@/components/layout/ServicesSubnav";
import { Link } from "react-router-dom";

export function ChinaSourcing() {
  return (
    <div className="flex flex-col bg-background">
      <ServicesSubnav />
      {/* Hero Section - Centered Typography Layout */}
      <section className="relative overflow-hidden bg-background py-24 lg:py-32 border-b border-border/40">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute right-0 top-0 -z-10 translate-x-1/3 -translate-y-1/4 h-[600px] w-[600px] rounded-full bg-blue-500/10 opacity-50 blur-[120px]"></div>
        <div className="absolute left-0 bottom-0 -z-10 -translate-x-1/3 translate-y-1/4 h-[400px] w-[400px] rounded-full bg-indigo-500/10 opacity-50 blur-[100px]"></div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-4xl text-center"
          >
            <div className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/5 px-4 py-1.5 text-sm font-semibold text-blue-600 mb-8 tracking-wide uppercase dark:text-blue-400">
              Global Sourcing Network
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-7xl leading-[1.1] mb-8">
              최적의 단가와 품질, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">글로벌 소싱 솔루션</span>
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-muted-foreground max-w-2xl mx-auto mb-10">
              방대한 데이터베이스와 현지 네트워크를 활용하여, 기성 제품부터 특수 부품까지 완벽한 공급처를 발굴합니다.<br className="hidden md:block" />
              언어 장벽과 정보 비대칭의 한계를 넘어 성공적인 소싱을 경험하세요.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className={buttonVariants({
                  size: "lg",
                  // default variant의 `bg-primary/text-primary-foreground`가 커스텀 컬러를 덮는 케이스를 방지
                  variant: "ghost",
                  className:
                    "h-14 px-8 !bg-blue-600 hover:!bg-blue-700 !text-white font-bold rounded-full text-lg shadow-lg shadow-blue-600/20",
                })}
              >
                소싱 의뢰하기 <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 핵심 강점 - Bento Grid */}
      <section className="py-24 bg-muted/30 border-b border-border/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              왜 밴티지웍스의 소싱인가요?
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              단순히 알리바바에서 검색하는 수준을 넘어, 진짜 경쟁력 있는 공장을 찾아냅니다.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: TrendingDown, title: "원가 절감 극대화", desc: "중간 유통 마진을 없애고 직거래 공장을 발굴하여, 동일 품질 대비 10~30% 이상의 원가 절감을 실현합니다." },
              { icon: ShieldCheck, title: "리스크 최소화", desc: "현지 실사 및 레퍼런스 체크를 통해 유령 공장, 사기 업체를 사전에 필터링하고 안전한 거래를 보장합니다." },
              { icon: Clock, title: "압도적인 속도", desc: "수년간 축적된 DB와 현지 인프라를 통해, 고객사가 원하는 스펙의 제품을 가장 빠르게 찾아 제안합니다." },
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-background rounded-[2rem] p-8 border border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div className="h-16 w-16 rounded-2xl bg-blue-500/5 flex items-center justify-center text-blue-600 mb-8 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 dark:text-blue-400">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 체계적인 소싱 프로세스 - Text/Icon Centric */}
      <section className="py-24 lg:py-32 bg-background border-b border-border/40 overflow-hidden relative">
        <div className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[1000px] rounded-full bg-blue-500/5 opacity-50 blur-[120px]"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16 lg:mb-24">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl mb-6">
              실패 없는 <span className="text-blue-600 dark:text-blue-400">소싱 프로세스</span>
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              수많은 변수가 존재하는 글로벌 무역 시장. 밴티지웍스의 체계적인 4단계 검증 프로세스를 통해 리스크를 줄이고 성공률을 높입니다.
            </p>
          </div>
          
          <div className="mx-auto max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { icon: FileText, step: "01", title: "요구사항 정밀 분석", desc: "타겟 단가, 필수 사양, 인증 필요 여부, 목표 수량 등 고객사의 니즈를 정확히 파악합니다." },
                { icon: Database, step: "02", title: "공급처 리스트업 및 필터링", desc: "알리바바, 1688 등 온라인 플랫폼 및 오프라인 공장 네트워크를 총동원하여 후보군을 도출합니다." },
                { icon: Building2, step: "03", title: "단가 협상 및 공장 실사", desc: "현지 언어와 문화를 바탕으로 한 유리한 단가 협상 진행 및 필요시 공장 실사를 통해 생산 능력을 검증합니다." },
                { icon: Search, step: "04", title: "샘플 수배 및 최종 확정", desc: "샘플을 수입하여 품질 테스트를 진행한 후, 고객사의 최종 승인을 거쳐 양산 공장을 확정합니다." },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative bg-muted/30 p-8 rounded-3xl border border-border/50 hover:border-blue-500/30 transition-all group"
                >
                  <div className="absolute top-6 right-8 text-6xl font-black text-blue-500/5 group-hover:text-blue-500/10 transition-colors duration-500">
                    {step.step}
                  </div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-background shadow-sm text-blue-600 border border-border/50 mb-6 relative z-10 dark:text-blue-400">
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
      <section className="relative overflow-hidden bg-blue-600 py-24 text-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] bg-indigo-500/30 rounded-full blur-[120px]"></div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl mb-8">
            찾고 있는 제품이 있으신가요?
          </h2>
          <p className="text-xl leading-relaxed text-blue-100 max-w-2xl mx-auto mb-10">
            사진 한 장, 대략적인 스펙만 주셔도 좋습니다. 가장 경쟁력 있는 단가로 찾아드리겠습니다.
          </p>
          <Link
            to="/contact"
            className={buttonVariants({
              size: "lg",
              variant: "ghost",
              className:
                "h-14 px-10 !bg-white !text-blue-600 hover:!bg-slate-100 hover:!text-blue-600 font-bold rounded-full text-lg shadow-xl hover:scale-105 transition-transform",
            })}
          >
            소싱 의뢰하기 <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
