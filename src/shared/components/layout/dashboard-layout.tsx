import { NavLink, Outlet } from "react-router";
import {
  LayoutDashboard,
  User,
  Settings,
  Shield,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "@/shared/hooks/use-auth-store";
import { useLogout } from "@/features/auth/hooks/use-auth.hooks";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";

interface NavItem {
  to: string;
  label: string;
  icon: React.ReactNode;
  end?: boolean;
  roles?: string[];
}

const NAV_ITEMS: NavItem[] = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard className="h-4 w-4" />,
    end: true,
  },
  {
    to: "/dashboard/profile",
    label: "Profile",
    icon: <User className="h-4 w-4" />,
  },
  {
    to: "/dashboard/settings",
    label: "Settings",
    icon: <Settings className="h-4 w-4" />,
  },
  {
    to: "/admin",
    label: "Admin Panel",
    icon: <Shield className="h-4 w-4" />,
    roles: ["admin"],
  },
];

export default function DashboardLayout() {
  const { user } = useAuthStore();
  const logoutMutation = useLogout();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const visibleNav = NAV_ITEMS.filter(
    (item) => !item.roles || (user && item.roles.includes(user.role)),
  );

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
      isActive
        ? "bg-primary text-primary-foreground"
        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
    );

  const Sidebar = () => (
    <aside className="flex h-full flex-col gap-2 bg-card p-4 border-r">
      {/* Brand */}
      <div className="mb-4 flex items-center gap-2 px-2 pt-2">
        <div className="h-7 w-7 rounded-lg bg-primary" />
        <span className="font-semibold text-sm">MyApp</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1">
        {visibleNav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={navLinkClass}
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* User + Logout */}
      <div className="border-t pt-4">
        <div className="mb-3 flex items-center gap-3 px-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
            {user?.name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{user?.name}</p>
            <p className="truncate text-xs text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-muted-foreground hover:text-destructive"
          onClick={() => logoutMutation.mutate()}
          disabled={logoutMutation.isPending}
        >
          <LogOut className="mr-2 h-4 w-4" />
          {logoutMutation.isPending ? "Keluar..." : "Keluar"}
        </Button>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden w-60 shrink-0 md:flex md:flex-col">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-60 z-50">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile topbar */}
        <header className="flex items-center gap-4 border-b bg-card px-4 py-3 md:hidden">
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className="text-muted-foreground"
          >
            {sidebarOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
          <span className="font-semibold text-sm">MyApp</span>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
