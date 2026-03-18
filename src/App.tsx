import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router";
import { AuthProvider } from "@/store/auth.store";
import { ProtectedRoute, PublicRoute, RoleRoute } from "@/routes/guards";

// ─── Layouts ───────────────────────────────────────────────
import AuthLayout from "@/shared/components/layout/auth-layout";
import DashboardLayout from "@/shared/components/layout/dashboard-layout";

// ─── Pages — Lazy loaded ───────────────────────────────────
const LoginPage = lazy(() => import("@/pages/auth/login.page"));
const RegisterPage = lazy(() => import("@/pages/auth/register.page"));
const DashboardPage = lazy(() => import("@/pages/dashboard/dashboard.page"));

// Misc pages tidak di-lazy karena ringan
import {
  ProfilePage,
  SettingsPage,
  AdminPage,
  ForbiddenPage,
  NotFoundPage,
} from "@/pages/misc.pages";

// ─── Loading Fallback ──────────────────────────────────────
function PageLoader() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Redirect root */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* ══════════════════════════════════════════════
              PUBLIC ROUTES
              Hanya untuk user yang BELUM login.
              Jika sudah login → redirect /dashboard
          ══════════════════════════════════════════════ */}
          <Route element={<PublicRoute />}>
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>
          </Route>

          {/* ══════════════════════════════════════════════
              PROTECTED ROUTES
              Hanya untuk user yang SUDAH login.
              Jika belum login → redirect /login
          ══════════════════════════════════════════════ */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/dashboard/profile" element={<ProfilePage />} />
              <Route path="/dashboard/settings" element={<SettingsPage />} />
            </Route>
          </Route>

          {/* ══════════════════════════════════════════════
              ROLE-BASED ROUTES
              Hanya untuk role "admin"
          ══════════════════════════════════════════════ */}
          <Route element={<RoleRoute roles={["admin"]} />}>
            <Route element={<DashboardLayout />}>
              <Route path="/admin" element={<AdminPage />} />
            </Route>
          </Route>

          {/* ══════════════════════════════════════════════
              FALLBACK
          ══════════════════════════════════════════════ */}
          <Route path="/403" element={<ForbiddenPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}
