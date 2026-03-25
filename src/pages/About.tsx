import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, MapPin, Globe, Truck, ArrowRight, Target, ShieldCheck, Zap } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function About() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background py-24 lg:py-32 border-b border-border/40">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute right-0 top-0 -z-10 translate-x-1/3 -translate-y-1/4 h-[600px] w-[600px] rounded-full bg-primary/10 opacity-50 blur-[120px]"></div>
        <div className="absolute left-0 bottom-0 -z-10 -translate-x-1/3 translate-y-1/4 h-[400px] w-[400px] rounded-full bg-secondary/10 opacity-50 blur-[100px]"></div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-4xl text-center"
          >
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-semibold text-primary mb-8 tracking-wide uppercase">
              About Vantage Works
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-7xl leading-[1.1] mb-8">
              운영으로 완성되는 <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">중국 제작 파트너</span>
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-muted-foreground max-w-2xl mx-auto">
              밴티지웍스는 굿즈 OEM을 중심으로 중국 소싱, 구매대행, 현장 소싱투어까지 제공합니다.<br className="hidden md:block" />
              한국 사무실에서 기획과 커뮤니케이션을 정리하고, 중국 현지 조직이 실행을 맡아 프로젝트를 안정적으로 운영합니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Brand Story - Split Layout */}
      <section className="py-24 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl mb-6">
                단순한 공장 연결이 아닌, <br />
                <span className="text-primary">프로젝트 운영</span>입니다.
              </h2>
              <div className="w-20 h-1.5 bg-gradient-to-r from-primary to-secondary rounded-full mb-8"></div>
              <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
                <p>
                  굿즈 제작은 작은 선택들이 겹치며 결과가 달라집니다. 재질, 인쇄, 포장, 납기 같은 결정이 흔들리면 프로젝트 전체가 불안정해집니다.
                </p>
                <p>
                  밴티지웍스는 샘플부터 출고까지 명확한 기준과 기록을 남기며 진행합니다. 같은 방식으로, 예측 가능한 결과를 만들어내는 것이 가장 강한 신뢰라고 믿습니다.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {[
                { icon: Target, title: "정확한 타겟팅", desc: "요구사항에 맞는 최적의 공장 매칭" },
                { icon: ShieldCheck, title: "안전한 품질", desc: "현지 검수를 통한 불량률 최소화" },
                { icon: Zap, title: "빠른 실행력", desc: "한국-중국 실시간 커뮤니케이션" },
                { icon: CheckCircle2, title: "투명한 기록", desc: "모든 과정을 데이터로 남겨 관리" },
              ].map((feature, idx) => (
                <div key={idx} className="bg-background p-6 rounded-2xl border border-border/50 shadow-sm hover:shadow-md transition-all hover:border-primary/30 group">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors text-primary">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 조직 구조 (3축 운영) */}
      <section className="py-24 lg:py-32 bg-background relative overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[1000px] rounded-full bg-secondary/5 opacity-50 blur-[120px]"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16 lg:mb-24">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl mb-6">
              글로벌 3축 운영 시스템
            </h2>
            <p className="text-lg text-muted-foreground">
              한국과 중국의 핵심 거점을 연결하여 빈틈없는 소싱 네트워크를 구축했습니다.
            </p>
          </div>
          
          <div className="relative mx-auto grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-1/2 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-primary/20 via-secondary/40 to-primary/20 -translate-y-1/2 z-0"></div>
            
            {[
              {
                title: "한국 사무실",
                subtitle: "기획 & 커뮤니케이션",
                desc: "프로젝트 요건 정리, 일정 확정, 고객 커뮤니케이션을 전담하여 언어와 문화의 장벽을 없앱니다.",
                icon: MapPin,
                color: "from-blue-500 to-primary"
              },
              {
                title: "이우 사무실",
                subtitle: "소싱 & 생산 관리",
                desc: "세계 최대 도매시장 이우를 거점으로 공급처 선별, 샘플/양산 커뮤니케이션, 현장 이슈에 즉각 대응합니다.",
                icon: Globe,
                color: "from-primary to-secondary"
              },
              {
                title: "웨이하이 사무실",
                subtitle: "물류 & 품질 검수",
                desc: "한국과 가장 가까운 웨이하이에서 구매대행, 꼼꼼한 검수, 안전한 포장 및 출고 운영을 책임집니다.",
                icon: Truck,
                color: "from-secondary to-teal-400"
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative z-10"
              >
                <Card className="h-full border-border/50 bg-background/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                  <div className={`h-2 w-full bg-gradient-to-r ${item.color}`}></div>
                  <CardHeader className="pt-8 pb-4 text-center">
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-muted group-hover:scale-110 transition-transform duration-300 shadow-inner">
                      <item.icon className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-bold mb-1">{item.title}</CardTitle>
                    <p className="text-sm font-semibold text-secondary-foreground/70 uppercase tracking-wider">{item.subtitle}</p>
                  </CardHeader>
                  <CardContent className="text-center pb-8">
                    <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 일하는 방식 (프로세스) */}
      <section className="py-24 lg:py-32 bg-foreground text-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16 lg:mb-24">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl mb-6 text-white">
              체계적인 업무 프로세스
            </h2>
            <p className="text-lg text-muted-foreground/80">
              감에 의존하지 않습니다. 명확한 단계와 기준으로 프로젝트를 성공으로 이끕니다.
            </p>
          </div>
          
          <div className="mx-auto max-w-4xl">
            <div className="space-y-6">
              {[
                {
                  step: "01",
                  title: "요건 정리",
                  desc: "목적, 수량, 예산, 납기, 필수 옵션 등 프로젝트의 뼈대를 확정합니다.",
                },
                {
                  step: "02",
                  title: "샘플링",
                  desc: "기준이 될 샘플을 제작하고, 고객의 승인을 거쳐 양산 기준을 세웁니다.",
                },
                {
                  step: "03",
                  title: "양산",
                  desc: "승인된 샘플을 바탕으로 대량 생산을 진행하며, 변경 사항은 철저한 승인 절차로 관리합니다.",
                },
                {
                  step: "04",
                  title: "검수",
                  desc: "사전에 합의된 OK/NG 기준으로 전수 또는 샘플링 검수를 진행하고 증빙을 남깁니다.",
                },
                {
                  step: "05",
                  title: "출고",
                  desc: "안전한 포장, 필요한 부자재 동봉 후 최종 선적 자료를 공유하고 출고합니다.",
                },
              ].map((process, index) => (
                <motion.div
                  key={process.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group relative flex flex-col sm:flex-row gap-6 sm:gap-8 items-start sm:items-center bg-background/5 p-6 sm:p-8 rounded-3xl border border-white/10 hover:bg-white/5 transition-colors"
                >
                  <div className="flex-none">
                    <div className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white/20 to-white/5 group-hover:from-secondary group-hover:to-primary transition-all duration-500">
                      {process.step}
                    </div>
                  </div>
                  <div className="flex-auto">
                    <h3 className="text-2xl font-bold text-white mb-3">{process.title}</h3>
                    <p className="text-lg text-muted-foreground/80 leading-relaxed">{process.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 하단 CTA */}
      <section className="relative overflow-hidden bg-primary py-24 text-primary-foreground">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute right-0 bottom-0 -z-10 translate-x-1/3 translate-y-1/3 h-[500px] w-[500px] rounded-full bg-secondary opacity-30 blur-[100px]"></div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl mb-8">
            성공적인 소싱, <br className="sm:hidden" />
            밴티지웍스와 시작하세요.
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/contact" className={buttonVariants({ size: "lg", variant: "secondary", className: "h-14 px-10 text-primary font-bold rounded-full text-lg shadow-xl hover:scale-105 transition-transform" })}>
              프로젝트 문의하기
            </Link>
            <Link to="/services" className={buttonVariants({ variant: "outline", size: "lg", className: "h-14 px-10 rounded-full font-bold bg-background/10 border-background/20 hover:bg-background/20 text-primary-foreground backdrop-blur-sm" })}>
              서비스 자세히 보기 <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
