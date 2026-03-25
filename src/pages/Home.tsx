import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Globe, Truck, MapPin, ShieldCheck, Zap, BarChart3, ArrowUpRight, Building2, PlayCircle } from "lucide-react";
import { motion } from "motion/react";

export function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section - Premium & Trustworthy */}
      <section className="relative overflow-hidden bg-background pt-28 pb-20 lg:pt-40 lg:pb-32">
        {/* Architectural Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        
        {/* Glowing Orbs for Primary/Secondary integration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-40 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-secondary/20 to-primary/10 rounded-full blur-[120px] mix-blend-normal"></div>
        </div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-5xl mx-auto"
          >
            {/* Premium Badge */}
            <div className="inline-flex items-center rounded-full border border-primary/30 bg-background/50 backdrop-blur-md px-5 py-2 text-sm font-bold text-primary mb-10 shadow-[0_0_20px_rgba(var(--primary),0.15)]">
              <span className="relative flex h-2.5 w-2.5 mr-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
              </span>
              글로벌 소싱의 새로운 기준, 밴티지웍스
            </div>
            
            {/* Massive Typography */}
            <h1 className="text-5xl sm:text-6xl lg:text-[5.5rem] font-black tracking-tighter text-foreground leading-[1.05] mb-8">
              굿즈 제작부터 중국 소싱까지 <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-secondary">
                한 팀으로 완벽하게.
              </span>
            </h1>
            
            <p className="mt-8 text-xl sm:text-2xl leading-relaxed text-muted-foreground max-w-3xl mx-auto font-medium">
              한국 사무실에서 기획·커뮤니케이션을 정리하고, 중국 현지 조직이 실행을 맡습니다.<br className="hidden md:block" />
              이우 소싱팀과 웨이하이 전담팀이 <span className="text-foreground font-semibold">샘플부터 양산, 검수, 출고까지</span> 끊김 없이 관리합니다.
            </p>
            
            {/* CTA Buttons */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5">
              <Link 
                to="/contact" 
                className={buttonVariants({ 
                  size: "lg", 
                  className: "h-16 px-10 rounded-full font-bold text-lg w-full sm:w-auto shadow-[0_10px_40px_-10px_rgba(var(--primary),0.5)] hover:shadow-[0_10px_40px_-5px_rgba(var(--primary),0.6)] hover:-translate-y-1 transition-all duration-300" 
                })}
              >
                프로젝트 문의하기 <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                to="/portfolio" 
                className={buttonVariants({ 
                  variant: "outline", 
                  size: "lg", 
                  className: "h-16 px-10 rounded-full font-bold text-lg w-full sm:w-auto bg-background/50 backdrop-blur-md border-border/60 hover:bg-muted hover:-translate-y-1 transition-all duration-300" 
                })}
              >
                <PlayCircle className="mr-2 h-5 w-5 text-muted-foreground" />
                납품 사례 보기
              </Link>
            </div>
          </motion.div>

          {/* Hero Image / Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            className="mt-24 relative mx-auto max-w-6xl"
          >
            {/* Outer Glow & Border */}
            <div className="absolute -inset-1.5 rounded-[2.5rem] bg-gradient-to-b from-primary/20 via-secondary/10 to-transparent blur-lg opacity-70"></div>
            <div className="relative rounded-[2rem] p-2 bg-gradient-to-b from-border/60 to-background/20 shadow-2xl backdrop-blur-sm">
              <div className="relative rounded-[1.5rem] overflow-hidden border border-border/50 bg-background">
                <img
                  src="https://picsum.photos/seed/factory/1600/800"
                  alt="제작 프로세스"
                  className="w-full h-[400px] sm:h-[500px] lg:h-[650px] object-cover hover:scale-105 transition-transform duration-1000 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none"></div>
                
                {/* Floating Trust Card */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="absolute bottom-8 left-8 bg-background/95 backdrop-blur-xl border border-border/50 p-5 rounded-2xl shadow-2xl flex items-center gap-5 max-w-xs"
                >
                  <div className="bg-primary/10 p-3.5 rounded-full text-primary">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <div className="text-left">
                    <p className="text-base font-extrabold text-foreground">100% Quality Assured</p>
                    <p className="text-sm text-muted-foreground font-medium mt-0.5">샘플부터 양산까지 완벽한 검수</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trusted By / Logo Marquee - Seamlessly Integrated */}
      <section className="py-16 border-b border-border/40 bg-muted/10 overflow-hidden relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
          <p className="text-sm font-bold text-muted-foreground uppercase tracking-[0.2em]">
            업계를 선도하는 기업들이 선택한 파트너
          </p>
        </div>
        <div className="relative flex overflow-x-hidden group">
          <div className="absolute left-0 top-0 z-10 h-full w-40 bg-gradient-to-r from-background to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 z-10 h-full w-40 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>
          
          <motion.div
            className="flex space-x-20 items-center whitespace-nowrap px-10"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 40,
            }}
          >
            {/* Array duplicated to create a seamless loop */}
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex space-x-20 items-center">
                {["SAMSUNG", "NAVER", "KAKAO", "TOSS", "LINE", "NEXON", "NCSOFT", "WOOWA"].map((logo) => (
                  <span key={logo} className="text-4xl font-black tracking-tighter text-foreground/20 hover:text-primary transition-colors duration-300 cursor-default">
                    {logo}
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3축 운영 체계 */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-semibold text-primary mb-6 tracking-wide uppercase">
              Our System
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl leading-tight">
              한 번 맡기면,<br />각 팀이 역할대로 움직입니다.
            </h2>
            <p className="mt-6 text-xl text-muted-foreground leading-relaxed">
              한국과 중국의 전문가들이 유기적으로 협력하여 최상의 결과를 만듭니다.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3">
            {[
              {
                title: "한국 사무실",
                subtitle: "기획·커뮤니케이션",
                desc: "요구사항 정리, 일정 확정, 진행 상황 공유",
                icon: MapPin,
                color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
                border: "hover:border-blue-500/50",
                glow: "from-blue-500/20"
              },
              {
                title: "이우 사무실",
                subtitle: "전문 소싱·공장 핸들링",
                desc: "공급처 선별, 샘플링, 생산 커뮤니케이션",
                icon: Globe,
                color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
                border: "hover:border-emerald-500/50",
                glow: "from-emerald-500/20"
              },
              {
                title: "웨이하이 사무실",
                subtitle: "구매대행·검수·출고 운영",
                desc: "발주/검수/포장/출고, 리스크 관리",
                icon: Truck,
                color: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
                border: "hover:border-orange-500/50",
                glow: "from-orange-500/20"
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className={`h-full border-border/50 bg-background shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 rounded-[2rem] group overflow-hidden relative`}>
                  <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl ${item.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-full -z-10`}></div>
                  <CardHeader className="p-8 pb-4">
                    <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${item.color} group-hover:scale-110 transition-transform duration-500`}>
                      <item.icon className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-2xl font-bold">{item.title}</CardTitle>
                    <CardDescription className="text-base font-semibold text-foreground/70 mt-2">
                      {item.subtitle}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 pt-0">
                    <p className="text-muted-foreground leading-relaxed text-lg">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 우리가 해결하는 문제 */}
      <section className="py-24 lg:py-32 bg-muted/20 border-y border-border/40 relative overflow-hidden">
        <div className="absolute left-0 top-1/2 -z-10 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px]"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl lg:text-center">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-semibold text-primary mb-6 tracking-wide uppercase">
              Risk Management
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl leading-tight">
              납기와 품질이 흔들리는<br />지점을 먼저 줄입니다.
            </h2>
            <p className="mt-6 text-xl text-muted-foreground leading-relaxed">
              수많은 프로젝트 경험을 바탕으로 리스크를 사전에 관리합니다.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
              {[
                {
                  name: "샘플–양산 차이",
                  description: "스펙 확정·승인 기준으로 관리하여 양산 시 발생할 수 있는 품질 이슈를 사전에 차단합니다.",
                  icon: ShieldCheck
                },
                {
                  name: "납기 변동",
                  description: "마일스톤 기반 역산 타임라인으로 관리하여 약속된 납기일을 철저하게 준수합니다.",
                  icon: Zap
                },
                {
                  name: "커뮤니케이션 누락",
                  description: "현지 실행 조직과 증빙 중심 리포트로 관리하여 소통의 오류나 누락을 방지합니다.",
                  icon: BarChart3
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col bg-background p-10 rounded-[2rem] border border-border/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <dt className="flex items-center gap-x-4 text-xl font-bold leading-7 text-foreground relative z-10">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                      <feature.icon className="h-7 w-7" aria-hidden="true" />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-6 flex flex-auto flex-col text-base leading-relaxed text-muted-foreground relative z-10">
                    <p className="flex-auto text-lg">{feature.description}</p>
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* 서비스 요약 */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-semibold text-primary mb-6 tracking-wide uppercase">
              Our Services
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">제공 서비스</h2>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:max-w-none lg:grid-cols-4">
            {[
              {
                title: "굿즈 OEM·ODM",
                desc: "샘플–양산–검수–출고까지 프로젝트 단위 운영",
              },
              {
                title: "중국 소싱",
                desc: "기성/제작 분기, 공급처 선별, 단가·납기 범위 제안",
              },
              {
                title: "구매대행(웨이하이)",
                desc: "발주–검수–출고 관리(운영팀 기반)",
              },
              {
                title: "1:1 소싱투어(이우)",
                desc: "방문 목적/품목 중심 동선·매장·공장 미팅 맞춤 설계",
              },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="h-full border-border/50 hover:border-primary/50 hover:shadow-lg transition-all duration-300 rounded-3xl bg-muted/10 hover:bg-background">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-bold">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base text-muted-foreground leading-relaxed">{service.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 포트폴리오 프리뷰 */}
      <section className="py-24 lg:py-32 bg-muted/20 border-t border-border/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-semibold text-primary mb-6 tracking-wide uppercase">
              Portfolio
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl leading-tight">
              실제 납품 사례를 기반으로 운영합니다.
            </h2>
            <p className="mt-6 text-xl text-muted-foreground">
              업종·프로젝트 유형별 진행 사례와 결과를 공유합니다.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3">
            {[
              {
                client: "글로벌 게임사 N사",
                type: "리테일 굿즈",
                items: "키링·뱃지·마그넷 등",
                qty: "수천~수만 EA",
                leadTime: "샘플 2~3주 / 양산 3~5주",
                point: "색상 기준 / 포장 동봉 / QC 기준",
                image: "https://picsum.photos/seed/port1/800/600",
              },
              {
                client: "국내 대형 F&B 브랜드",
                type: "프로모션 굿즈",
                items: "에코백·파우치·패키징 등",
                qty: "수천~수만 EA",
                leadTime: "샘플 2주 / 양산 3주",
                point: "인쇄 품질 / 원단 스펙 / 납기 준수",
                image: "https://picsum.photos/seed/port2/800/600",
              },
              {
                client: "IT 스타트업 T사",
                type: "브랜드 굿즈",
                items: "문구류·사무용품 세트",
                qty: "수천 EA",
                leadTime: "샘플 3주 / 양산 4주",
                point: "브랜드 컬러 매칭 / 패키징 디테일",
                image: "https://picsum.photos/seed/port3/800/600",
              },
            ].map((portfolio, index) => (
              <motion.div
                key={portfolio.type}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden h-full flex flex-col group cursor-pointer border-border/50 bg-background shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 rounded-[2rem]">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <img
                      src={portfolio.image}
                      alt={portfolio.type}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-6 left-6 right-6 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 flex justify-between items-center">
                      <span className="text-white font-medium text-sm">자세히 보기</span>
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                  <CardHeader className="pt-8 pb-4 relative">
                    <div className="absolute top-0 right-8 -translate-y-1/2 inline-flex items-center rounded-full border border-primary/20 bg-background px-4 py-1.5 text-xs font-bold text-primary shadow-sm">
                      {portfolio.type}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <Building2 className="w-4 h-4" />
                      <span className="text-sm font-medium">{portfolio.client}</span>
                    </div>
                    <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors">
                      {portfolio.items}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 pb-8">
                    <dl className="space-y-4 text-sm">
                      <div className="flex justify-between border-b border-border/50 pb-3">
                        <dt className="font-semibold text-foreground/80">수량 범위</dt>
                        <dd className="text-foreground font-medium text-right">{portfolio.qty}</dd>
                      </div>
                      <div className="flex justify-between border-b border-border/50 pb-3">
                        <dt className="font-semibold text-foreground/80">리드타임</dt>
                        <dd className="text-foreground font-medium text-right">{portfolio.leadTime}</dd>
                      </div>
                      <div className="flex flex-col pt-2">
                        <dt className="font-semibold text-foreground/80 mb-2">핵심 관리 포인트</dt>
                        <dd className="text-muted-foreground leading-relaxed bg-muted/50 p-3 rounded-xl">{portfolio.point}</dd>
                      </div>
                    </dl>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <Link to="/portfolio" className={buttonVariants({ variant: "outline", size: "lg", className: "h-14 px-8 rounded-full font-bold text-lg hover:bg-primary hover:text-primary-foreground transition-colors" })}>
              포트폴리오 전체 보기 <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 운영 기준 */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-semibold text-primary mb-6 tracking-wide uppercase">
              Operation Standards
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">프로젝트 운영 기준</h2>
          </div>
          <div className="mx-auto mt-16 max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              "마일스톤 기반 일정 관리(역산 타임라인)",
              "OK/NG 기준 검수 및 증빙 관리",
              "이슈 발생 시 즉시 공유 및 대안 제시",
              "현지 실행 조직(소싱/운영) 기반 핸들링",
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center gap-4 rounded-[1.5rem] border border-border/50 bg-muted/10 p-6 shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <span className="text-lg font-semibold text-foreground">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 하단 CTA */}
      <section className="relative overflow-hidden bg-primary py-24 lg:py-32 text-primary-foreground">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute right-0 bottom-0 -z-10 translate-x-1/3 translate-y-1/3 h-[500px] w-[500px] rounded-full bg-secondary opacity-30 blur-[100px]"></div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-6xl mb-8">
            굿즈 OEM 또는 중국 소싱이 필요하신가요?
          </h2>
          <p className="mt-6 text-xl leading-relaxed text-primary-foreground/90 max-w-2xl mx-auto">
            프로젝트 조건에 맞춰 가능 범위와 일정부터 정리해드립니다.<br className="hidden sm:block" />
            지금 바로 밴티지웍스와 상담하세요.
          </p>
          <div className="mt-12 flex justify-center gap-4">
            <Link to="/contact" className={buttonVariants({ size: "lg", variant: "secondary", className: "h-14 px-12 text-primary font-bold rounded-full text-lg shadow-xl hover:scale-105 transition-transform" })}>
              무료 상담 신청하기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
