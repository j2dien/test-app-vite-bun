import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { loginApi, registerApi, getMeApi, logoutApi } from "../api/auth.api";
import { useAuthStore } from "@/shared/hooks/use-auth-store";
import type { LoginInput, RegisterInput } from "../schemas/auth.schema";

// ─── useLogin ──────────────────────────────────────────────
export function useLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setSession } = useAuthStore();

  const from =
    (location.state as { from?: { pathname: string } })?.from?.pathname ??
    "/dashboard";

  return useMutation({
    mutationFn: (data: LoginInput) => loginApi(data),
    onSuccess: ({ user, token }) => {
      setSession(user, token);
      navigate(from, { replace: true });
    },
  });
}

// ─── useRegister ───────────────────────────────────────────
export function useRegister() {
  const navigate = useNavigate();
  const { setSession } = useAuthStore();

  return useMutation({
    mutationFn: ({ confirmPassword: _, ...data }: RegisterInput) =>
      registerApi(data),
    onSuccess: ({ user, token }) => {
      setSession(user, token);
      navigate("/dashboard", { replace: true });
    },
  });
}

// ─── useLogout ─────────────────────────────────────────────
export function useLogout() {
  const navigate = useNavigate();
  const { clearSession } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutApi,
    onSettled: () => {
      // Bersihkan semua cache query setelah logout
      queryClient.clear();
      clearSession();
      navigate("/login", { replace: true });
    },
  });
}

// ─── useMe ─────────────────────────────────────────────────
// Gunakan untuk memverifikasi sesi saat app pertama kali load
export function useMe() {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: getMeApi,
    enabled: isAuthenticated, // hanya fetch jika sudah ada token
    staleTime: Infinity, // data user jarang berubah
    retry: false,
  });
}
