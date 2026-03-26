import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { useSiteSettings } from "@/lib/useSiteSettings";

const defaultNavItems = [
  { name: "회사소개", href: "/about" },
  { 
    name: "서비스", 
    href: "/services/oem",
    subItems: [
      { name: "굿즈 OEM·ODM", href: "/services/oem" },
      { name: "글로벌 소싱", href: "/services/sourcing" },
      { name: "구매대행 및 물류", href: "/services/purchasing" },
      { name: "1:1 소싱투어", href: "/sourcing-tour" },
    ]
  },
  { name: "포트폴리오", href: "/portfolio" },
  { name: "FAQ", href: "/faq" },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const location = useLocation();
  const siteSettings = useSiteSettings();
  const navItemsRaw = siteSettings?.nav_items?.length ? siteSettings.nav_items : defaultNavItems;
  const navItems = navItemsRaw.filter((item) => item.href !== "/" && item.name !== "홈");

  const isServiceActive = location.pathname.startsWith("/services") || location.pathname === "/sourcing-tour";

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl font-extrabold tracking-tight text-primary">VANTAGE WORKS</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navItems.map((link) => (
                <div key={link.name} className="relative group">
                  <Link
                    to={link.href}
                    className={`text-sm font-semibold transition-colors hover:text-primary flex items-center gap-1 py-8 ${
                      (link.href.startsWith("/services") && link.subItems && isServiceActive) ||
                      location.pathname === link.href ||
                      (link.subItems?.some((sub) => sub.href === location.pathname) ?? false)
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {link.name}
                    {link.subItems && <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />}
                  </Link>
                  
                  {link.subItems && (
                    <div className="absolute left-0 top-full hidden w-48 flex-col rounded-2xl border border-border/50 bg-background/95 backdrop-blur-xl p-2 shadow-xl group-hover:flex animate-in fade-in slide-in-from-top-2">
                      {link.subItems.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          className={`block rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:bg-primary/5 hover:text-primary ${
                            location.pathname === subItem.href ? "bg-primary/5 text-primary" : "text-muted-foreground"
                          }`}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link to="/contact" className={buttonVariants({ variant: "default", size: "lg", className: "ml-4 font-bold rounded-full px-6" })}>
                문의하기
              </Link>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-md absolute w-full h-screen overflow-y-auto pb-24">
          <div className="space-y-1 px-4 pb-4 pt-2">
            {navItems.map((link) => (
              <div key={link.name}>
                {link.subItems ? (
                  <div>
                    <button
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      className={`flex w-full items-center justify-between rounded-md px-3 py-3 text-base font-semibold ${
                        isServiceActive ? "text-primary" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      }`}
                    >
                      {link.name}
                      <ChevronDown className={`h-5 w-5 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} />
                    </button>
                    {mobileServicesOpen && (
                      <div className="mt-1 space-y-1 pl-6 pr-3">
                        {link.subItems.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.href}
                            className={`block rounded-md px-3 py-2.5 text-sm font-medium ${
                              location.pathname === subItem.href
                                ? "bg-primary/10 text-primary"
                                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                            }`}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={link.href}
                    className={`block rounded-md px-3 py-3 text-base font-semibold ${
                      location.pathname === link.href
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-6 pb-2">
              <Link
                to="/contact"
                className={buttonVariants({ variant: "default", size: "lg", className: "w-full justify-center font-bold rounded-full h-14" })}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                문의하기
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
