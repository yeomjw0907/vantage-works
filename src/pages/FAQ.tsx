import { motion } from "motion/react";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MessageCircleQuestion } from "lucide-react";

type Faq = {
  question: string;
  answer: string;
};

const mockFaqs: Faq[] = [
  {
    question: "Q1. MOQ(최소수량)는 어떻게 되나요?",
    answer: "품목/공정/옵션에 따라 달라집니다. 기성 소싱은 비교적 유연하며, OEM·ODM은 금형/공정 여부에 따라 최소수량이 설정됩니다.",
  },
  {
    question: "Q2. 샘플 제작 기간은 어느 정도인가요?",
    answer: "일반적으로 2~3주 범위에서 산정되며, 공정/자재/인쇄 난이도에 따라 변동될 수 있습니다.",
  },
  {
    question: "Q3. 양산 리드타임은 보통 어느 정도인가요?",
    answer: "품목과 수량에 따라 상이하며, 샘플 승인 이후 양산 일정은 마일스톤 기준으로 역산하여 안내드립니다.",
  },
  {
    question: "Q4. 납기는 어떤 기준으로 산정하나요?",
    answer: "납기일을 기준으로 선적/검수/포장/샘플 승인 등의 마일스톤을 역산해 일정표를 구성합니다.",
  },
  {
    question: "Q5. 검수는 어떤 범위까지 진행하나요?",
    answer: "OK/NG 기준에 따라 외관/수량/포장 상태 등 합의된 범위 내에서 진행하며, 필요 시 증빙을 공유합니다.",
  },
  {
    question: "Q6. 포장/동봉/라벨 작업도 가능한가요?",
    answer: "가능합니다. 다만 구성과 공정에 따라 작업 범위와 일정이 달라지므로 사전에 확정이 필요합니다.",
  },
  {
    question: "Q7. 중국 소싱만 의뢰할 수도 있나요?",
    answer: "가능합니다. 후보 리스트 및 비교 정보를 제공하며, 필요 시 샘플 수배까지 연결 가능합니다.",
  },
  {
    question: "Q8. 구매대행은 어떤 방식으로 진행되나요?",
    answer: "웨이하이 운영팀이 발주–검수–출고까지 관리합니다. 품목/수량/출고 방식에 따라 진행 범위를 협의합니다.",
  },
  {
    question: "Q9. 1:1 소싱투어는 어떤 고객에게 적합한가요?",
    answer: "이우 현장에서 '결정'이 필요한 고객에게 적합합니다. 목적/품목/예산을 기반으로 동선을 맞춤 설계합니다.",
  },
  {
    question: "Q10. 진행 중 변경/추가 요청은 어떻게 관리되나요?",
    answer: "납기와 품질에 영향을 주는 변경은 승인 절차로 관리합니다. 변경 시 일정/비용 영향까지 함께 안내드립니다.",
  },
];

export function FAQ() {
  const [faqItems, setFaqItems] = useState<Faq[]>(mockFaqs);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      // Supabase 설정이 없으면 기존 mock 데이터를 그대로 사용합니다.
      const { hasSupabaseConfig, getSupabase } = await import("@/lib/supabaseClient");
      if (!hasSupabaseConfig) return;

      const supabase = getSupabase();
      const { data, error } = await supabase
        .from("faq_items")
        .select("question,answer")
        .order("sort_order", { ascending: true });

      if (error) return;
      if (cancelled) return;
      // DB에 FAQ가 비어 있으면 기존 기본 FAQ(mock)를 유지합니다.
      if (!data || data.length === 0) return;
      setFaqItems(data as Faq[]);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background py-24 lg:py-32 border-b border-border/40">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute right-0 top-0 -z-10 translate-x-1/3 -translate-y-1/4 h-[600px] w-[600px] rounded-full bg-primary/10 opacity-50 blur-[120px]"></div>
        <div className="absolute left-0 bottom-0 -z-10 -translate-x-1/3 translate-y-1/4 h-[400px] w-[400px] rounded-full bg-secondary/10 opacity-50 blur-[100px]"></div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-4xl"
          >
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-semibold text-primary mb-8 tracking-wide uppercase">
              Frequently Asked Questions
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-7xl leading-[1.1] mb-8">
              자주 묻는 <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">질문과 답변</span>
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-muted-foreground max-w-2xl mx-auto">
              프로젝트 진행과 관련하여 가장 많이 궁금해하시는 내용을 정리했습니다.<br className="hidden md:block" />
              추가적인 문의사항은 언제든 편하게 남겨주세요.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-24 lg:py-32 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Accordion type="single" className="w-full space-y-6">
                {faqItems.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`} 
                    className="border border-border/50 rounded-[2rem] px-6 sm:px-10 bg-background shadow-sm hover:shadow-xl transition-all duration-500 data-[state=open]:border-primary/30 data-[state=open]:shadow-lg overflow-hidden group"
                  >
                    <AccordionTrigger className="text-left text-lg sm:text-xl font-bold hover:no-underline hover:text-primary py-8 transition-colors">
                      <span className="flex items-start gap-6">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-black text-xl group-data-[state=open]:bg-primary group-data-[state=open]:text-white transition-colors duration-300">
                          Q
                        </span>
                        <span className="mt-1.5 leading-snug">{faq.question.replace(/^Q\d+\.\s*/, '')}</span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-8 pt-2">
                      <div className="flex items-start gap-6">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground font-black text-xl">
                          A
                        </span>
                        <div className="mt-1.5 text-base sm:text-lg text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 하단 CTA */}
      <section className="relative overflow-hidden bg-primary py-24 text-primary-foreground">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute right-0 bottom-0 -z-10 translate-x-1/3 translate-y-1/3 h-[500px] w-[500px] rounded-full bg-secondary opacity-30 blur-[100px]"></div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-md mb-8 border border-white/20">
            <MessageCircleQuestion className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl mb-8">
            원하시는 답변을 찾지 못하셨나요?
          </h2>
          <p className="mt-6 text-xl leading-relaxed text-primary-foreground/90 max-w-2xl mx-auto">
            프로젝트 문의하기를 통해 남겨주시면 <br className="hidden sm:block" />
            담당자가 확인 후 상세히 안내해 드리겠습니다.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link to="/contact" className={buttonVariants({ size: "lg", variant: "secondary", className: "h-14 px-12 text-primary font-bold rounded-full text-lg shadow-xl hover:scale-105 transition-transform" })}>
              프로젝트 문의하기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
