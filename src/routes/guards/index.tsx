import { Navigate, Outlet, useLocation } from "react-router";
import { useAuthStore } from "@/shared/hooks/use-auth-store";
import type { Role } from "@/shared/types";

// ─── ProtectedRoute ────────────────────────────────────────
// Hanya user yang sudah login. Redirect ke /login jika belum.
// Menyimpan halaman asal di location.state.from untuk redirect balik setelah login.
export function ProtectedRoute() {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

// ─── PublicRoute ───────────────────────────────────────────
// Hanya user yang BELUM login (login, register).
// Jika sudah login → redirect ke /dashboard.
export function PublicRoute() {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

// ─── RoleRoute ─────────────────────────────────────────────
// Hanya user dengan role tertentu.
// Contoh: <RoleRoute roles={["admin"]} />
interface RoleRouteProps {
  roles: Role[];
}

export function RoleRoute({ roles }: RoleRouteProps) {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user || !roles.includes(user.role)) {
    return <Navigate to="/403" replace />;
  }

  return <Outlet />;
}
