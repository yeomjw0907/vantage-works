import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { fetchCurrentUserRole, type AdminRole } from "@/lib/adminRole";

export function AdminRouteGuard() {
  const location = useLocation();
  const [role, setRole] = useState<AdminRole | null | "loading">("loading");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const currentRole = await fetchCurrentUserRole();
        if (!cancelled) setRole(currentRole);
      } catch (e) {
        if (!cancelled) setRole(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (role === "loading") return null;

  if (role !== "admin") {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ from: location.pathname, reason: role ? "unauthorized" : "not_authenticated" }}
      />
    );
  }

  return <Outlet />;
}

