import { useQuery } from "@tanstack/react-query";
import {
  getDashboardStatsApi,
  getRecentActivityApi,
} from "../api/dashboard.api";

export const dashboardKeys = {
  all: ["dashboard"] as const,
  stats: () => [...dashboardKeys.all, "stats"] as const,
  activity: () => [...dashboardKeys.all, "activity"] as const,
};

export function useDashboardStats() {
  return useQuery({
    queryKey: dashboardKeys.stats(),
    queryFn: getDashboardStatsApi,
    staleTime: 60 * 1000, // 1 menit
  });
}

export function useRecentActivity() {
  return useQuery({
    queryKey: dashboardKeys.activity(),
    queryFn: getRecentActivityApi,
    staleTime: 30 * 1000,
  });
}
