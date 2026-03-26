import { motion } from "motion/react";
import { useState, type FormEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Mail, Send, Building2, Clock, CheckCircle2 } from "lucide-react";
import { getSupabase } from "@/lib/supabaseClient";

export function Contact() {
  const [company, setCompany] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [inquiryType, setInquiryType] = useState<string>(""); // oem | sourcing | purchasing | tour | other
  const [details, setDetails] = useState("");

  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setSubmitError(null);
    setSubmitStatus("submitting");

    // Edge Function 입력 스키마에 맞춘 payload
    const payload = {
      inquiry_type: inquiryType,
      company,
      contact_name: contactName,
      email,
      phone,
      details,
    };

    try {
      const supabase = getSupabase();
      const { error } = await supabase.functions.invoke("create-lead", {
        body: payload,
      });
      if (error) throw new Error(error.message);

      setSubmitStatus("success");

      // 입력 초기화
      setCompany("");
      setContactName("");
      setEmail("");
      setPhone("");
      setInquiryType("");
      setDetails("");
    } catch (err) {
      setSubmitStatus("error");
      setSubmitError(err instanceof Error ? err.message : "전송 중 오류가 발생했습니다.");
    }
  }

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
              Contact Us
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-7xl leading-[1.1] mb-8">
              성공적인 프로젝트의 <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">첫 걸음</span>
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-muted-foreground max-w-2xl mx-auto">
              프로젝트 조건에 맞춰 가능 범위와 일정부터 명확하게 정리해 드립니다.<br className="hidden md:block" />
              아래 폼을 통해 문의를 남겨주시면 담당자가 신속하게 회신드리겠습니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24 lg:py-32 bg-muted/20 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl bg-gradient-to-tr from-primary/5 via-transparent to-secondary/5 blur-3xl -z-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 grid grid-cols-1 gap-4 lg:grid-cols-3">
            {[
              {
                title: "1. 문의 접수",
                desc: "요구사항, 예상 수량, 희망 일정 등 핵심 정보를 접수합니다.",
              },
              {
                title: "2. 1차 검토",
                desc: "프로젝트 난이도와 실행 가능 범위를 내부 운영팀이 빠르게 검토합니다.",
              },
              {
                title: "3. 회신 및 제안",
                desc: "영업일 기준 24시간 이내 우선 회신 후, 상세 제안을 안내드립니다.",
              },
            ].map((step) => (
              <div
                key={step.title}
                className="rounded-2xl border border-border/50 bg-background/80 p-5 shadow-sm ring-1 ring-foreground/[0.04]"
              >
                <p className="text-sm font-extrabold text-primary">{step.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
            
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-4 space-y-8"
            >
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight text-foreground mb-4">Contact Information</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  궁금한 점이 있으시거나 빠른 상담이 필요하시다면 언제든지 아래 연락처로 문의해 주세요.
                </p>
              </div>
              
              <div className="space-y-4">
                {[
                  { icon: MapPin, title: "Headquarters", desc: "인천시 동구 금곡로 40 3층" },
                  { icon: Phone, title: "Phone", desc: "010-3325-9611\n(평일 09:00 - 18:00)" },
                  { icon: Mail, title: "Email", desc: "kainwoong@gmail.com\n(24시간 접수 가능)" },
                  { icon: Building2, title: "Global Offices", desc: "중국 이우 (Yiwu) 지사\n중국 웨이하이 (Weihai) 물류센터" }
                ].map((info, idx) => (
                  <div key={idx} className="flex items-start gap-5 p-6 rounded-2xl bg-background border border-border/50 shadow-sm hover:shadow-md hover:border-primary/30 transition-all group">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <info.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground text-lg">{info.title}</h3>
                      <p className="mt-2 text-muted-foreground leading-relaxed whitespace-pre-line">{info.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-8"
            >
              <Card className="border-border/50 bg-background shadow-2xl rounded-[2rem] overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary"></div>
                <CardHeader className="pb-8 pt-12 px-8 sm:px-12">
                  <CardTitle className="text-3xl font-bold">프로젝트 문의하기</CardTitle>
                  <p className="text-muted-foreground mt-3 text-lg">
                    상세한 내용을 남겨주실수록 더 정확하고 빠른 견적 안내가 가능합니다.
                  </p>
                </CardHeader>
                <CardContent className="p-8 sm:p-12 pt-0">
                  <form className="space-y-8" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                      <div className="space-y-3">
                        <Label htmlFor="company" className="text-sm font-semibold text-foreground/80">회사명 <span className="text-destructive">*</span></Label>
                        <Input
                          id="company"
                          placeholder="회사명을 입력해주세요"
                          className="h-14 rounded-xl bg-muted/50 border-border/50 focus-visible:ring-primary/20 focus-visible:border-primary"
                          value={company}
                          onChange={(e) => setCompany(e.currentTarget.value)}
                          required
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="name" className="text-sm font-semibold text-foreground/80">담당자명 <span className="text-destructive">*</span></Label>
                        <Input
                          id="name"
                          placeholder="담당자 성함을 입력해주세요"
                          className="h-14 rounded-xl bg-muted/50 border-border/50 focus-visible:ring-primary/20 focus-visible:border-primary"
                          value={contactName}
                          onChange={(e) => setContactName(e.currentTarget.value)}
                          required
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="email" className="text-sm font-semibold text-foreground/80">이메일 <span className="text-destructive">*</span></Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="이메일 주소를 입력해주세요"
                          className="h-14 rounded-xl bg-muted/50 border-border/50 focus-visible:ring-primary/20 focus-visible:border-primary"
                          value={email}
                          onChange={(e) => setEmail(e.currentTarget.value)}
                          required
                        />
                      </div>
                      <div className="space-y-3">
                        <Label htmlFor="phone" className="text-sm font-semibold text-foreground/80">연락처 <span className="text-destructive">*</span></Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="연락처를 입력해주세요"
                          className="h-14 rounded-xl bg-muted/50 border-border/50 focus-visible:ring-primary/20 focus-visible:border-primary"
                          value={phone}
                          onChange={(e) => setPhone(e.currentTarget.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="type" className="text-sm font-semibold text-foreground/80">문의 유형 <span className="text-destructive">*</span></Label>
                      <Select value={inquiryType} onValueChange={setInquiryType}>
                        <SelectTrigger id="type" className="h-14 rounded-xl bg-muted/50 border-border/50 focus:ring-primary/20 focus:border-primary">
                          <SelectValue placeholder="서비스 유형을 선택해주세요" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-border/50 shadow-xl">
                          <SelectItem value="oem" className="py-3">굿즈 OEM/ODM 제작</SelectItem>
                          <SelectItem value="sourcing" className="py-3">중국 소싱 및 단가 조사</SelectItem>
                          <SelectItem value="purchasing" className="py-3">웨이하이 구매대행 및 물류</SelectItem>
                          <SelectItem value="tour" className="py-3">이우 1:1 소싱투어</SelectItem>
                          <SelectItem value="other" className="py-3">기타 문의</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="details" className="text-sm font-semibold text-foreground/80">상세 내용 <span className="text-destructive">*</span></Label>
                      <Textarea
                        id="details"
                        placeholder="예상 수량, 목표 단가 범위, 희망 납기, 필수 옵션 등 상세 내용을 자유롭게 입력해주세요."
                        className="min-h-[200px] resize-y rounded-xl bg-muted/50 border-border/50 focus-visible:ring-primary/20 focus-visible:border-primary p-5 text-base"
                        value={details}
                        onChange={(e) => setDetails(e.currentTarget.value)}
                        required
                      />
                    </div>

                    <div className="pt-4">
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full h-16 rounded-full font-bold text-lg shadow-xl hover:shadow-primary/25 hover:-translate-y-1 transition-all"
                        disabled={submitStatus === "submitting"}
                      >
                        <Send className="mr-2 h-5 w-5" /> 문의 접수하기
                      </Button>
                      {submitStatus === "success" && (
                        <div className="mt-4 rounded-xl border border-primary/30 bg-primary/5 p-3 text-sm text-primary">
                          <p className="flex items-center gap-2 font-semibold">
                            <CheckCircle2 className="h-4 w-4" />
                            문의 접수가 완료되었습니다.
                          </p>
                          <p className="mt-1 text-primary/90">담당자가 영업일 기준 24시간 이내 우선 회신드립니다.</p>
                        </div>
                      )}
                      {submitStatus === "error" && (
                        <div className="mt-4 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                          전송에 실패했습니다. 잠시 후 다시 시도해 주세요.
                          {submitError ? <p className="mt-1 text-xs text-destructive/90">{submitError}</p> : null}
                        </div>
                      )}
                      <p className="text-center text-sm text-muted-foreground mt-4 flex items-center justify-center gap-2">
                        <Clock className="w-4 h-4" /> 영업일 기준 24시간 이내에 담당자가 회신드립니다.
                      </p>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
