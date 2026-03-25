import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <h3 className="text-xl font-extrabold tracking-tight text-primary">VANTAGE WORKS</h3>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-sm">
              굿즈 제작부터 중국 소싱, OEM·ODM까지 한 팀으로 운영합니다.<br />
              성공적인 비즈니스를 위한 든든한 파트너가 되겠습니다.
            </p>
            <div className="mt-8 space-y-3 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <span className="font-semibold text-foreground">주소</span>
                서울특별시 강남구 테헤란로 123, 밴티지웍스 빌딩
              </p>
              <p className="flex items-center gap-2">
                <span className="font-semibold text-foreground">연락처</span>
                02-1234-5678
              </p>
              <p className="flex items-center gap-2">
                <span className="font-semibold text-foreground">이메일</span>
                contact@vantageworks.com
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">서비스</h3>
            <ul className="mt-6 space-y-4">
              <li>
                <Link to="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  굿즈 OEM·ODM
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  중국 소싱
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  구매대행(웨이하이)
                </Link>
              </li>
              <li>
                <Link to="/sourcing-tour" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  1:1 소싱투어(이우)
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">고객 지원</h3>
            <ul className="mt-6 space-y-4">
              <li>
                <Link to="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  자주 묻는 질문 (FAQ)
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  프로젝트 문의
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  이용약관
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  개인정보처리방침
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-16 border-t border-border/40 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Vantage Works. All rights reserved.
          </p>
          <div className="flex gap-4">
            {/* Social Links Placeholders */}
            <div className="h-8 w-8 rounded-full bg-muted/50 flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer">
              <span className="sr-only">Instagram</span>
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
