import { z } from "zod";
// import { axiosInstance } from "@/shared/lib/axios";

// ─── Schemas ───────────────────────────────────────────────
export const dashboardStatsSchema = z.object({
  totalUsers: z.number(),
  activeToday: z.number(),
  revenue: z.number(),
  growth: z.number(),
});

export type DashboardStats = z.infer<typeof dashboardStatsSchema>;

export const activitySchema = z.object({
  id: z.string(),
  user: z.string(),
  action: z.string(),
  time: z.string(),
});

export type Activity = z.infer<typeof activitySchema>;

// ─── API Functions ─────────────────────────────────────────
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function getDashboardStatsApi(): Promise<DashboardStats> {
  // PRODUCTION: const res = await axiosInstance.get("/dashboard/stats");
  // return dashboardStatsSchema.parse(res.data);
  await delay(600);
  return dashboardStatsSchema.parse({
    totalUsers: 1284,
    activeToday: 47,
    revenue: 124_000_000,
    growth: 8.2,
  });
}

export async function getRecentActivityApi(): Promise<Activity[]> {
  await delay(400);
  return z.array(activitySchema).parse([
    {
      id: "1",
      user: "John Doe",
      action: "Login dari Jakarta",
      time: "2 menit lalu",
    },
    {
      id: "2",
      user: "Admin User",
      action: "Menambah produk baru",
      time: "15 menit lalu",
    },
    {
      id: "3",
      user: "Jane Smith",
      action: "Update profil",
      time: "1 jam lalu",
    },
    {
      id: "4",
      user: "Budi Santoso",
      action: "Upload dokumen",
      time: "3 jam lalu",
    },
  ]);
}
