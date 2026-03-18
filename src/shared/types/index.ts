// ─── Role ──────────────────────────────────────────────────
export type Role = "admin" | "user";

// ─── User ──────────────────────────────────────────────────
export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

// ─── API ───────────────────────────────────────────────────
export interface ApiError {
  message: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
