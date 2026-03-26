import { motion } from "motion/react";
import { 
  Package, 
  Settings, 
  Users, 
  Factory, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Lightbulb,
  PenTool
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { ServicesSubnav } from "@/components/layout/ServicesSubnav";
import { Link } from "react-router-dom";

export function OemOdm() {
  return (
    <div className="flex flex-col bg-background">
      <ServicesSubnav />
      {/* Hero Section - Centered Typography Layout */}
      <section className="relative overflow-hidden bg-background py-24 lg:py-32 border-b border-border/40">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute right-0 top-0 -z-10 translate-x-1/3 -translate-y-1/4 h-[600px] w-[600px] rounded-full bg-primary/10 opacity-50 blur-[120px]"></div>
        <div className="absolute left-0 bottom-0 -z-10 -translate-x-1/3 translate-y-1/4 h-[400px] w-[400px] rounded-full bg-blue-500/10 opacity-50 blur-[100px]"></div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-4xl text-center"
          >
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-semibold text-primary mb-8 tracking-wide uppercase">
              End-to-End Production
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-7xl leading-[1.1] mb-8">
              아이디어를 현실로, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">굿즈 OEM·ODM</span>
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-muted-foreground max-w-2xl mx-auto mb-10">
              브랜드의 가치를 담은 고품질 제품을 기획부터 양산, 패키징까지 원스톱으로 제공합니다.<br className="hidden md:block" />
              복잡한 생산 과정은 밴티지웍스에 맡기고 비즈니스 성장에만 집중하세요.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className={buttonVariants({ size: "lg", className: "h-14 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-full text-lg shadow-lg shadow-primary/20" })}>
                제작 의뢰하기 <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 주요 제작 카테고리 - Bento Grid */}
      <section className="py-24 bg-muted/30 border-b border-border/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              어떤 제품이든 제작 가능합니다
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              수많은 레퍼런스와 검증된 공장 네트워크를 통해 다양한 카테고리의 제품을 생산합니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Settings, title: "전자기기 및 소형 가전", desc: "보조배터리, 가습기, 블루투스 스피커 등 KC 인증이 필요한 전자기기" },
              { icon: Users, title: "패션 잡화 및 어패럴", desc: "에코백, 파우치, 티셔츠, 모자 등 브랜드 로고가 적용된 패션 아이템" },
              { icon: Factory, title: "생활용품 및 리빙", desc: "텀블러, 머그컵, 다이어리, 우산 등 일상생활에서 활용도 높은 굿즈" },
              { icon: Package, title: "맞춤형 패키징 및 지류", desc: "제품의 가치를 높이는 커스텀 박스, 쇼핑백, 스티커 및 지류 인쇄물" },
            ].map((cat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-background rounded-[2rem] p-8 border border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div className="h-16 w-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <cat.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-4">{cat.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{cat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* OEM/ODM 프로세스 - Text/Icon Centric */}
      <section className="py-24 lg:py-32 bg-background border-b border-border/40 overflow-hidden relative">
        <div className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[1000px] rounded-full bg-primary/5 opacity-50 blur-[120px]"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16 lg:mb-24">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl mb-6">
              빈틈없는 <span className="text-primary">제작 프로세스</span>
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              단순히 공장에 발주만 넣는 것이 아닙니다. 기획 단계부터 참여하여 최적의 소재와 공법을 제안하고, 철저한 품질 관리를 통해 불량률 0%에 도전합니다.
            </p>
          </div>
          
          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Lightbulb, step: "01", title: "기획 및 디자인 컨설팅", desc: "고객사의 아이디어를 바탕으로 양산 가능한 디자인 및 소재 제안" },
                { icon: PenTool, step: "02", title: "샘플 제작 및 보완", desc: "본 생산 전 샘플을 제작하여 형태, 색상, 기능 등을 꼼꼼히 테스트" },
                { icon: Factory, step: "03", title: "본 생산 (양산)", desc: "검증된 공장에서 생산 시작, 현지 인력의 실시간 공정 모니터링" },
                { icon: ShieldCheck, step: "04", title: "품질 검수 (QC)", desc: "생산 완료 후 자체 기준에 따른 전수/샘플링 검수 및 리포트 제공" },
                { icon: Package, step: "05", title: "패키징 및 납품", desc: "안전한 포장 및 통관을 거쳐 지정된 장소까지 완벽하게 배송" },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative bg-muted/30 p-8 rounded-3xl border border-border/50 hover:border-primary/30 transition-all group"
                >
                  <div className="absolute top-6 right-8 text-6xl font-black text-primary/5 group-hover:text-primary/10 transition-colors duration-500">
                    {step.step}
                  </div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-background shadow-sm text-primary border border-border/50 mb-6 relative z-10">
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
      <section className="relative overflow-hidden bg-primary py-24 text-primary-foreground">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute right-0 bottom-0 -z-10 translate-x-1/3 translate-y-1/3 h-[500px] w-[500px] rounded-full bg-blue-600 opacity-30 blur-[100px]"></div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl mb-8">
            만들고 싶은 굿즈가 있으신가요?
          </h2>
          <p className="text-xl leading-relaxed text-primary-foreground/80 max-w-2xl mx-auto mb-10">
            대략적인 아이디어만 있어도 좋습니다. 전문가가 최적의 솔루션을 제안해 드립니다.
          </p>
          <Link to="/contact" className={buttonVariants({ size: "lg", variant: "secondary", className: "h-14 px-10 text-primary font-bold rounded-full text-lg shadow-xl hover:scale-105 transition-transform" })}>
            제작 문의하기 <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
