import { useContext, createContext } from "react";
import type { AuthContextValue } from "@/store/auth.store";

// ─── Context ───────────────────────────────────────────────
export const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Hook ──────────────────────────────────────────────────
export function useAuthStore(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthStore harus dipakai dalam <AuthProvider>");
  return ctx;
}
