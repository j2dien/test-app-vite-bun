import { StatsGrid } from "@/features/dashboard/components/stats-grid";
import { RecentActivity } from "@/features/dashboard/components/recent-activity";
import { useAuthStore } from "@/shared/hooks/use-auth-store";

export default function DashboardPage() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Selamat datang, {user?.name} 👋
        </h1>
        <p className="mt-1 text-muted-foreground">
          Ringkasan aktivitas dan statistik hari ini.
        </p>
      </div>

      <StatsGrid />

      <div className="grid gap-4 md:grid-cols-2">
        <RecentActivity />
        {/* Tambahkan widget lain di sini */}
      </div>
    </div>
  );
}
