import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Map, Users, Briefcase, ArrowRight, Target, Compass, Zap } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function SourcingTour() {
  return (
    <div className="flex flex-col bg-[#f8fafc]">
      {/* Hero Section - Centered Typography */}
      <section className="relative overflow-hidden bg-white py-24 lg:py-32 border-b border-slate-200">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl"
          >
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-semibold text-primary mb-8 tracking-wide uppercase">
              Yiwu Business Tour
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl leading-[1.15] mb-8">
              결과를 만드는 <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">1:1 맞춤 소싱투어</span>
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-slate-600 mb-10 max-w-2xl mx-auto">
              이우 현장에서 '보고 끝나는 투어'가 아니라, 필요한 품목을 '결정'하는 투어를 설계합니다. 목적과 조건에 맞춰 동선과 미팅을 구성하고, 후속 실행까지 완벽하게 연결합니다.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className={buttonVariants({ size: "lg", className: "h-14 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-full text-lg shadow-lg shadow-primary/20" })}>
                투어 일정 문의하기 <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 이런 분께 적합합니다 (Target Audience) - Bento Grid */}
      <section className="py-24 bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16 lg:mb-24">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl mb-6">
              이런 분들께 <span className="text-primary">강력히 추천</span>합니다
            </h2>
            <p className="text-lg text-slate-600">
              단순 관광이 아닌, 비즈니스 성과를 목표로 하는 대표님과 실무진을 위한 프로그램입니다.
            </p>
          </div>
          
          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Target,
                  title: "명확한 목적 달성",
                  desc: "이우 방문 목적이 명확하고 실제 발주 및 제작까지 다이렉트로 연결하고 싶은 분",
                  color: "text-primary",
                  bg: "bg-primary/10"
                },
                {
                  icon: Compass,
                  title: "효율적인 동선 설계",
                  desc: "찾아야 할 품목이 많아 방대한 이우 시장 내에서 동선과 우선순위 정리가 필요한 분",
                  color: "text-blue-600",
                  bg: "bg-blue-100"
                },
                {
                  icon: Zap,
                  title: "OEM 제작 검토",
                  desc: "단순 기성품 소싱을 넘어, 로고 인쇄나 패키지 변경 등 OEM 가능성까지 확인해야 하는 분",
                  color: "text-indigo-600",
                  bg: "bg-indigo-100"
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full border-slate-200 bg-white hover:border-primary/30 hover:shadow-xl transition-all duration-300 rounded-[2rem] overflow-hidden group">
                    <CardContent className="p-8">
                      <div className={`w-16 h-16 rounded-2xl ${item.bg} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300`}>
                        <item.icon className={`w-8 h-8 ${item.color}`} />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h3>
                      <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 진행 흐름 (Process Timeline) */}
      <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[1000px] rounded-full bg-primary/5 opacity-50 blur-[120px]"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16 lg:mb-24">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl mb-6">
              체계적인 투어 진행 흐름
            </h2>
            <p className="text-lg text-slate-600">
              출국 전부터 귀국 후까지, 빈틈없는 일정 관리로 소싱 성공률을 높입니다.
            </p>
          </div>
          
          <div className="mx-auto max-w-4xl relative">
            {/* Vertical Line */}
            <div className="absolute left-[28px] sm:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/20 via-blue-400/40 to-primary/20 sm:-translate-x-1/2 rounded-full"></div>
            
            <div className="space-y-12 sm:space-y-24">
              {[
                {
                  step: "01",
                  title: "사전 기획 및 미팅",
                  desc: "출국 전 목표 품목, 예산, 수량, 필수 조건을 명확히 확인하고 최적의 시장 및 공장 방문 리스트를 확정합니다.",
                  icon: Briefcase,
                  align: "right"
                },
                {
                  step: "02",
                  title: "현장 가이드 및 통역",
                  desc: "이우 현지에서 전담 매니저가 동행하여 매장 및 공장 미팅을 주도하고, 샘플 확인과 단가 협상을 지원합니다.",
                  icon: Map,
                  align: "left"
                },
                {
                  step: "03",
                  title: "귀국 후 후속 실행",
                  desc: "투어 중 확인한 샘플을 수배하고, 견적을 최종 정리하여 실제 발주 및 생산 관리(OEM)로 매끄럽게 연결합니다.",
                  icon: Users,
                  align: "right"
                },
              ].map((process, index) => (
                <motion.div
                  key={process.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`relative flex flex-col sm:flex-row items-start sm:items-center gap-8 ${process.align === 'left' ? 'sm:flex-row-reverse' : ''}`}
                >
                  {/* Center Node */}
                  <div className="absolute left-0 sm:left-1/2 w-14 h-14 rounded-full bg-white border-4 border-primary shadow-lg flex items-center justify-center z-10 sm:-translate-x-1/2">
                    <span className="text-primary font-black text-lg">{process.step}</span>
                  </div>
                  
                  {/* Content Box */}
                  <div className={`w-full sm:w-1/2 pl-20 sm:pl-0 ${process.align === 'left' ? 'sm:pr-16 text-left sm:text-right' : 'sm:pl-16 text-left'}`}>
                    <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 group">
                      <div className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 ${process.align === 'left' ? 'sm:ml-auto' : ''}`}>
                        <process.icon className="h-8 w-8" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-4">{process.title}</h3>
                      <p className="text-slate-600 leading-relaxed text-lg">{process.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 하단 CTA */}
      <section className="relative overflow-hidden bg-slate-900 py-24 text-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        <div className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] bg-primary/30 rounded-full blur-[120px]"></div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl mb-8">
            이우 소싱투어를 계획 중이신가요?
          </h2>
          <p className="mt-6 text-xl leading-relaxed text-slate-300 max-w-2xl mx-auto mb-10">
            방문 목적과 원하시는 품목을 남겨주시면 <br className="hidden sm:block" />
            가장 효율적인 맞춤 일정을 제안해드립니다.
          </p>
          <div className="mt-10">
            <Link to="/contact" className={buttonVariants({ size: "lg", className: "h-14 px-10 bg-white text-slate-900 hover:bg-slate-100 font-bold rounded-full text-lg shadow-xl hover:scale-105 transition-transform border-none" })}>
              투어 일정 문의하기 <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
