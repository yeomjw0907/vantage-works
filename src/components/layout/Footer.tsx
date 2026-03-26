import { Link } from "react-router-dom";
import { useSiteSettings, type FooterLink } from "@/lib/useSiteSettings";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function Footer() {
  const siteSettings = useSiteSettings();

  const defaultCompanyName = "VANTAGE WORKS";
  const defaultCompanyDescription =
    "굿즈 제작부터 중국 소싱, OEM·ODM까지 한 팀으로 운영합니다.\n성공적인 비즈니스를 위한 든든한 파트너가 되겠습니다.";
  const defaultAddress = "인천광역시 동구 금곡로 40, 3층(금곡동)";
  const defaultPhone = "010-3213-1319";
  const defaultEmail = "vantageworks@naver.com";

  const defaultServiceLinks: FooterLink[] = [
    { label: "굿즈 OEM·ODM", href: "/services/oem" },
    { label: "중국 소싱", href: "/services/sourcing" },
    { label: "구매대행(웨이하이)", href: "/services/purchasing" },
    { label: "1:1 소싱투어(이우)", href: "/sourcing-tour" },
  ];

  const defaultSupportLinks: FooterLink[] = [
    { label: "자주 묻는 질문 (FAQ)", href: "/faq" },
    { label: "프로젝트 문의", href: "/contact" },
    { label: "이용약관", href: "#" },
    { label: "개인정보처리방침", href: "#" },
  ];

  const companyName = siteSettings?.company_name ?? defaultCompanyName;
  const companyDescription = siteSettings?.company_description ?? defaultCompanyDescription;
  const companyDescriptionLines = companyDescription
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith("대표자:") && !line.startsWith("대표자 :"));
  const address = siteSettings?.address ?? defaultAddress;
  const phone = siteSettings?.phone ?? defaultPhone;
  const email = siteSettings?.email ?? defaultEmail;
  const representative = "가인웅";
  const businessRegistrationNumber = "503-87-02060";

  const serviceLinks = siteSettings?.footer_service_links?.length
    ? siteSettings.footer_service_links
    : defaultServiceLinks;
  const supportLinks = siteSettings?.footer_support_links?.length
    ? siteSettings.footer_support_links
    : defaultSupportLinks;

  const termsEffectiveDate = "2026-03-26";
  const privacyEffectiveDate = "2026-03-26";

  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <h3 className="text-xl font-extrabold tracking-tight text-primary">{companyName}</h3>
            {companyDescriptionLines.length > 0 && (
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-sm">
                {companyDescriptionLines.map((line, idx, arr) => (
                  <span key={idx}>
                    {line}
                    {idx < arr.length - 1 ? <br /> : null}
                  </span>
                ))}
              </p>
            )}
            <div className="mt-8 space-y-3 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <span className="font-semibold text-foreground">대표자</span>
                {representative}
              </p>
              <p className="flex items-center gap-2">
                <span className="font-semibold text-foreground">사업자번호</span>
                {businessRegistrationNumber}
              </p>
              <p className="flex items-center gap-2">
                <span className="font-semibold text-foreground">주소</span>
                {address}
              </p>
              <p className="flex items-center gap-2">
                <span className="font-semibold text-foreground">연락처</span>
                {phone}
              </p>
              <p className="flex items-center gap-2">
                <span className="font-semibold text-foreground">이메일</span>
                {email}
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">서비스</h3>
            <ul className="mt-6 space-y-4">
              {serviceLinks.map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">고객 지원</h3>
            <ul className="mt-6 space-y-4">
              {supportLinks.map((l) => (
                <li key={`${l.label}-${l.href}`}>
                  {l.label === "이용약관" ? (
                    <Dialog>
                      <DialogTrigger className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                        이용약관
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-3xl max-h-[80vh] overflow-y-auto p-6 sm:p-8">
                        <DialogHeader>
                          <DialogTitle className="text-xl font-bold">이용약관</DialogTitle>
                        </DialogHeader>
                        <div className="mt-2 space-y-4 text-sm leading-6 text-muted-foreground">
                          <p>시행일: {termsEffectiveDate}</p>
                          <p>
                            본 약관은 밴티지웍스(이하 "회사")가 운영하는 웹사이트 및 관련 서비스의
                            이용조건과 절차, 회사와 이용자의 권리 및 의무, 책임사항을 규정함을
                            목적으로 합니다.
                          </p>

                          <section className="space-y-2">
                            <h4 className="font-semibold text-foreground">제1조 (용어의 정의)</h4>
                            <p>
                              "서비스"란 회사가 웹사이트를 통해 제공하는 OEM/ODM, 소싱, 구매대행,
                              프로젝트 상담 및 관련 부가 기능 일체를 의미합니다.
                            </p>
                          </section>

                          <section className="space-y-2">
                            <h4 className="font-semibold text-foreground">제2조 (약관의 효력 및 변경)</h4>
                            <p>
                              회사는 관련 법령을 위반하지 않는 범위에서 약관을 개정할 수 있으며,
                              개정 시 시행일과 개정 사유를 서비스 내에 공지합니다.
                            </p>
                          </section>

                          <section className="space-y-2">
                            <h4 className="font-semibold text-foreground">제3조 (서비스의 제공 및 변경)</h4>
                            <p>
                              회사는 프로젝트 상담, 문의 접수, 포트폴리오 안내 등 서비스를 제공하며,
                              운영상 필요에 따라 서비스의 전부 또는 일부를 변경할 수 있습니다.
                            </p>
                          </section>

                          <section className="space-y-2">
                            <h4 className="font-semibold text-foreground">제4조 (이용자의 의무)</h4>
                            <p>
                              이용자는 관계 법령, 본 약관, 서비스 이용 안내를 준수해야 하며, 타인의
                              권리를 침해하거나 서비스 운영을 방해하는 행위를 해서는 안 됩니다.
                            </p>
                          </section>

                          <section className="space-y-2">
                            <h4 className="font-semibold text-foreground">제5조 (지식재산권)</h4>
                            <p>
                              서비스 내 텍스트, 디자인, 로고, 콘텐츠의 저작권 및 지식재산권은 회사
                              또는 정당한 권리자에게 귀속됩니다.
                            </p>
                          </section>

                          <section className="space-y-2">
                            <h4 className="font-semibold text-foreground">제6조 (면책)</h4>
                            <p>
                              회사는 천재지변, 통신 장애, 제3자 귀책사유 등 불가항력으로 인한 서비스
                              중단에 대해 책임을 지지 않으며, 이용자 과실로 인한 손해에 대해서도
                              책임이 제한될 수 있습니다.
                            </p>
                          </section>

                          <section className="space-y-2">
                            <h4 className="font-semibold text-foreground">제7조 (분쟁 해결 및 관할)</h4>
                            <p>
                              본 약관과 관련한 분쟁은 대한민국 법령을 준거법으로 하며, 관할 법원은
                              관련 법령에 따릅니다.
                            </p>
                          </section>

                          <section className="space-y-2">
                            <h4 className="font-semibold text-foreground">제8조 (사업자 정보)</h4>
                            <p>상호: {companyName}</p>
                            <p>대표자: {representative}</p>
                            <p>사업자등록번호: {businessRegistrationNumber}</p>
                            <p>주소: {address}</p>
                            <p>연락처: {phone}</p>
                            <p>이메일: {email}</p>
                          </section>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ) : l.label === "개인정보처리방침" ? (
                    <Dialog>
                      <DialogTrigger className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                        개인정보처리방침
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-3xl max-h-[80vh] overflow-y-auto p-6 sm:p-8">
                        <DialogHeader>
                          <DialogTitle className="text-xl font-bold">개인정보처리방침</DialogTitle>
                        </DialogHeader>
                        <div className="mt-2 space-y-4 text-sm leading-6 text-muted-foreground">
                          <p>시행일: {privacyEffectiveDate}</p>
                          <p>
                            밴티지웍스(이하 "회사")는 개인정보보호법 등 관련 법령을 준수하며,
                            이용자의 개인정보를 안전하게 처리하고 보호하기 위해 다음과 같이
                            개인정보처리방침을 수립·공개합니다.
                          </p>

                          <section className="space-y-2">
                            <h4 className="font-semibold text-foreground">1. 수집하는 개인정보 항목</h4>
                            <p>
                              프로젝트 문의 과정에서 회사명, 담당자명, 이메일, 연락처, 문의내용을
                              수집할 수 있습니다.
                            </p>
                          </section>

                          <section className="space-y-2">
                            <h4 className="font-semibold text-foreground">2. 개인정보의 처리 목적</h4>
                            <p>
                              문의 접수 및 회신, 서비스 제공 관련 상담, 계약 검토 및 고객 응대,
                              분쟁 대응 및 법령상 의무 이행을 위해 개인정보를 처리합니다.
                            </p>
                          </section>

                          <section className="space-y-2">
                            <h4 className="font-semibold text-foreground">3. 개인정보의 보유 및 이용기간</h4>
                            <p>
                              수집 목적 달성 시 지체 없이 파기하며, 관계 법령에 따라 보존이 필요한
                              경우 해당 기간 동안 안전하게 보관 후 파기합니다.
                            </p>
                          </section>

                          <section className="space-y-2">
                            <h4 className="font-semibold text-foreground">4. 제3자 제공</h4>
                            <p>
                              회사는 원칙적으로 이용자의 개인정보를 외부에 제공하지 않으며, 법령에
                              근거가 있거나 이용자의 별도 동의가 있는 경우에만 제공합니다.
                            </p>
                          </section>

                          <section className="space-y-2">
                            <h4 className="font-semibold text-foreground">5. 처리 위탁</h4>
                            <p>
                              서비스 운영을 위해 필요한 경우 관련 법령에 따라 개인정보 처리업무를
                              위탁할 수 있으며, 위탁 시 수탁자에 대한 관리·감독을 수행합니다.
                            </p>
                          </section>

                          <section className="space-y-2">
                            <h4 className="font-semibold text-foreground">6. 파기 절차 및 방법</h4>
                            <p>
                              보유기간 경과 또는 처리 목적 달성 시 전자적 파일은 복구 불가능한 방법으로
                              삭제하며, 종이 문서는 분쇄 또는 소각합니다.
                            </p>
                          </section>

                          <section className="space-y-2">
                            <h4 className="font-semibold text-foreground">7. 이용자 권리 및 행사 방법</h4>
                            <p>
                              이용자는 개인정보 열람, 정정·삭제, 처리정지 요구 등 권리를 행사할 수
                              있으며, 회사는 지체 없이 필요한 조치를 합니다.
                            </p>
                          </section>

                          <section className="space-y-2">
                            <h4 className="font-semibold text-foreground">8. 안전성 확보조치</h4>
                            <p>
                              접근권한 관리, 접근통제, 보안 업데이트, 내부 관리계획 수립 등 합리적
                              보호조치를 통해 개인정보를 안전하게 관리합니다.
                            </p>
                          </section>

                          <section className="space-y-2">
                            <h4 className="font-semibold text-foreground">9. 개인정보 보호책임자 및 문의처</h4>
                            <p>담당자: {representative}</p>
                            <p>이메일: {email}</p>
                            <p>연락처: {phone}</p>
                            <p>주소: {address}</p>
                          </section>

                          <section className="space-y-2">
                            <h4 className="font-semibold text-foreground">10. 권익침해 구제방법</h4>
                            <p>
                              개인정보 침해에 대한 신고나 상담이 필요하신 경우 개인정보침해신고센터,
                              개인정보분쟁조정위원회 등 관계기관을 통해 도움을 받으실 수 있습니다.
                            </p>
                          </section>

                          <section className="space-y-2">
                            <h4 className="font-semibold text-foreground">11. 방침 변경</h4>
                            <p>
                              본 방침 내용의 추가, 삭제 및 수정이 있는 경우 시행일 이전에 서비스 내
                              공지사항 또는 본 페이지를 통해 안내합니다.
                            </p>
                          </section>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <Link to={l.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-16 border-t border-border/40 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Vantage Works. All rights reserved.
          </p>
          <div className="flex gap-4">
            {/* Social Links Placeholders */}
          </div>
        </div>
      </div>
    </footer>
  );
}
