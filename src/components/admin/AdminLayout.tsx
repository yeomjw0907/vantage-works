import { PropsWithChildren } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getSupabase } from "@/lib/supabaseClient";

export function AdminLayout({ children }: PropsWithChildren) {
  const navigate = useNavigate();
  const location = useLocation();

  async function handleSignOut() {
    const supabase = getSupabase();
    await supabase.auth.signOut();
    navigate("/admin/login");
  }

  const linkClass = (active: boolean) =>
    `px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
      active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent hover:text-foreground"
    }`;

  return (
    <div className="min-h-screen bg-muted/20">
      <header className="sticky top-0 z-10 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-lg font-extrabold text-primary">ADMIN</span>
            <span className="text-xs text-muted-foreground">Vantage Works</span>
          </div>
          <div className="flex items-center gap-3">
            <nav className="hidden sm:flex items-center gap-2">
              <Link
                to="/admin/leads"
                className={linkClass(location.pathname.startsWith("/admin/leads"))}
              >
                리드
              </Link>
              <Link
                to="/admin/content"
                className={linkClass(location.pathname.startsWith("/admin/content"))}
              >
                콘텐츠
              </Link>
            </nav>
            <button
              type="button"
              onClick={handleSignOut}
              className="text-sm font-semibold rounded-lg px-3 py-2 hover:bg-accent hover:text-foreground transition-colors"
            >
              로그아웃
            </button>
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</div>
    </div>
  );
}

