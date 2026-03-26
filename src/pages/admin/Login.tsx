import { useMemo, useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getSupabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const reason = useMemo(() => {
    const state = location.state as { reason?: string } | null;
    return state?.reason ?? null;
  }, [location.state]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const supabase = getSupabase();
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) throw loginError;
      if (!data.user) throw new Error("로그인에 실패했습니다.");

      navigate("/admin/leads", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "로그인 중 오류가 발생했습니다.");
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Card className="w-full max-w-md rounded-[2rem] border-border/50 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-extrabold">관리자 로그인</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {reason === "unauthorized" && (
            <p className="text-sm text-destructive">
              권한이 없습니다. 관리자 계정으로 로그인해 주세요.
            </p>
          )}
          {reason === "not_authenticated" && (
            <p className="text-sm text-muted-foreground">로그인이 필요합니다.</p>
          )}

          <form className="space-y-4" onSubmit={handleLogin}>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground/80">이메일</label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                placeholder="admin@example.com"
                type="email"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground/80">비밀번호</label>
              <Input
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                placeholder="비밀번호"
                type="password"
                required
              />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? "로그인 중..." : "로그인"}
            </Button>

            <div className="pt-2 text-center">
              <Link
                to="/"
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                돌아가기
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

