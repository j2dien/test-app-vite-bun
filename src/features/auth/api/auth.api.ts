// import { axiosInstance } from "@/shared/lib/axios";
import {
  authResponseSchema,
  userSchema,
  type AuthResponse,
  type LoginInput,
  type RegisterInput,
} from "../schemas/auth.schema";
import type { User } from "@/shared/types";

// Simulasi delay — hapus di production
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

const FAKE_USERS = [
  {
    id: "1",
    email: "admin@example.com",
    password: "Admin123!",
    name: "Admin User",
    role: "admin" as const,
  },
  {
    id: "2",
    email: "user@example.com",
    password: "User1234!",
    name: "John Doe",
    role: "user" as const,
  },
];

// ─── Login ─────────────────────────────────────────────────
export async function loginApi(body: LoginInput): Promise<AuthResponse> {
  // PRODUCTION: uncomment ini dan hapus simulasi di bawah
  // const res = await axiosInstance.post("/auth/login", body);
  // return authResponseSchema.parse(res.data);

  await delay(800);
  const found = FAKE_USERS.find(
    (u) => u.email === body.email && u.password === body.password,
  );
  if (!found) throw new Error("Email atau password salah.");
  const { password: _, ...user } = found;
  const raw = { user, token: "fake-jwt-" + Date.now() };
  return authResponseSchema.parse(raw);
}

// ─── Register ──────────────────────────────────────────────
export async function registerApi(
  body: Omit<RegisterInput, "confirmPassword">,
): Promise<AuthResponse> {
  // PRODUCTION:
  // const res = await axiosInstance.post("/auth/register", body);
  // return authResponseSchema.parse(res.data);

  await delay(800);
  const user = {
    id: String(Date.now()),
    name: body.name,
    email: body.email,
    role: "user" as const,
  };
  return authResponseSchema.parse({ user, token: "fake-jwt-" + Date.now() });
}

// ─── Get Me ────────────────────────────────────────────────
// Dipanggil saat app load untuk validasi token yang tersimpan
export async function getMeApi(): Promise<User> {
  // PRODUCTION:
  // const res = await axiosInstance.get("/auth/me");
  // return userSchema.parse(res.data);

  await delay(400);
  const saved = localStorage.getItem("user");
  if (!saved) throw new Error("Sesi tidak ditemukan.");
  return userSchema.parse(JSON.parse(saved));
}

// ─── Logout ────────────────────────────────────────────────
export async function logoutApi(): Promise<void> {
  // PRODUCTION: await axiosInstance.post("/auth/logout");
  await delay(200);
}
