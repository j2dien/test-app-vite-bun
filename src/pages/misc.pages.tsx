import { useAuthStore } from "@/shared/hooks/use-auth-store";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

export function ProfilePage() {
  const { user } = useAuthStore();
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle className="text-base">Informasi Akun</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
              {user?.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold">{user?.name}</p>
              <p className="text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <div className="rounded-lg border p-3">
            <span className="text-xs text-muted-foreground">Role</span>
            <p className="mt-0.5 font-medium capitalize">{user?.role}</p>
          </div>
          <div className="rounded-lg border p-3">
            <span className="text-xs text-muted-foreground">ID</span>
            <p className="mt-0.5 font-mono text-xs">{user?.id}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle className="text-base">Pengaturan Aplikasi</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Halaman pengaturan — implementasi sesuai kebutuhan.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export function AdminPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Admin Panel</h1>
      <Card className="max-w-md border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
        <CardContent className="pt-6">
          <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
            Halaman ini hanya bisa diakses oleh role <strong>admin</strong>.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export function ForbiddenPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 text-center">
      <p className="text-6xl font-black text-muted-foreground/30">403</p>
      <h1 className="text-2xl font-bold">Akses Ditolak</h1>
      <p className="text-muted-foreground">
        Anda tidak memiliki izin untuk mengakses halaman ini.
      </p>
    </div>
  );
}

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 text-center">
      <p className="text-6xl font-black text-muted-foreground/30">404</p>
      <h1 className="text-2xl font-bold">Halaman Tidak Ditemukan</h1>
      <p className="text-muted-foreground">
        URL yang Anda minta tidak tersedia.
      </p>
    </div>
  );
}
