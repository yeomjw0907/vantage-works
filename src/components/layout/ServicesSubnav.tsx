import { Link, useLocation } from "react-router-dom";

const items = [
  { label: "굿즈 OEM·ODM", href: "/services/oem" },
  { label: "글로벌 소싱", href: "/services/sourcing" },
  { label: "구매대행 및 물류", href: "/services/purchasing" },
  { label: "1:1 소싱투어", href: "/sourcing-tour" },
] as const;

export function ServicesSubnav() {
  const location = useLocation();

  return (
    <nav className="sticky top-20 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-2 overflow-x-auto py-3">
          {items.map((item) => {
            const isActive = location.pathname === item.href;

            return (
              <Link
                key={item.href}
                to={item.href}
                aria-current={isActive ? "page" : undefined}
                className={[
                  "shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                  isActive
                    ? "border border-primary/30 bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-primary/5 hover:text-primary",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

