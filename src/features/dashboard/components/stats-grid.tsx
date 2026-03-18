import { Users, Activity, TrendingUp, DollarSign } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { useDashboardStats } from "../hooks/use-dashboard.hooks";
import { cn } from "@/shared/lib/utils";

const formatRupiah = (n: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);

interface StatCardProps {
  title: string;
  value: string;
  sub: string;
  icon: React.ReactNode;
  className?: string;
}

function StatCard({ title, value, sub, icon, className }: StatCardProps) {
  return (
    <Card className={cn(className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{value}</p>
        <p className="mt-1 text-xs text-muted-foreground">{sub}</p>
      </CardContent>
    </Card>
  );
}

function StatCardSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="h-4 w-24 animate-pulse rounded bg-muted" />
      </CardHeader>
      <CardContent>
        <div className="h-8 w-32 animate-pulse rounded bg-muted" />
        <div className="mt-2 h-3 w-20 animate-pulse rounded bg-muted" />
      </CardContent>
    </Card>
  );
}

export function StatsGrid() {
  const { data: stats, isLoading } = useDashboardStats();

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Pengguna"
        value={stats.totalUsers.toLocaleString("id-ID")}
        sub="+20 bulan ini"
        icon={<Users className="h-4 w-4" />}
      />
      <StatCard
        title="Aktif Hari Ini"
        value={stats.activeToday.toString()}
        sub="dari total pengguna"
        icon={<Activity className="h-4 w-4" />}
      />
      <StatCard
        title="Pendapatan"
        value={formatRupiah(stats.revenue)}
        sub="bulan berjalan"
        icon={<DollarSign className="h-4 w-4" />}
      />
      <StatCard
        title="Pertumbuhan"
        value={`+${stats.growth}%`}
        sub="dibanding bulan lalu"
        icon={<TrendingUp className="h-4 w-4" />}
      />
    </div>
  );
}
