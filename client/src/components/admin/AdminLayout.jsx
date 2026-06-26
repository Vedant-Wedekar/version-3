import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  Package,
  MessageSquare,
  Star,
  LogOut,
  Menu,
  X,
  Palmtree,
  ExternalLink,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { logout } from "../../services/auth";
import { cn } from "../../utils/cn";

const NAV = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/bookings", label: "Bookings", icon: Briefcase },
  { to: "/admin/inquiries", label: "Inquiries", icon: MessageSquare },
  { to: "/admin/packages", label: "Packages", icon: Package },
  { to: "/admin/testimonials", label: "Testimonials", icon: Star },
];

export default function AdminLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const initial = (user?.displayName || user?.email || "?")
    .charAt(0)
    .toUpperCase();

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar (desktop) */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-slate-200 bg-white lg:flex lg:flex-col">
        <SidebarBody onNavClick={() => {}} onLogout={handleLogout} user={user} initial={initial} />
      </aside>

      {/* Sidebar (mobile drawer) */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-white shadow-xl transition-transform duration-300 lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <SidebarBody
          onNavClick={() => setMobileOpen(false)}
          onLogout={handleLogout}
          user={user}
          initial={initial}
        />
      </aside>

      {/* Main area */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-slate-200 bg-white/85 px-4 py-3 backdrop-blur sm:px-6 lg:px-8">
          <button
            onClick={() => setMobileOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex-1" />

          <Link
            to="/"
            target="_blank"
            className="hidden items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 hover:border-teal-300 hover:text-teal-700 sm:inline-flex"
          >
            View site
            <ExternalLink className="h-3 w-3" />
          </Link>

          <div className="flex items-center gap-2 rounded-full bg-slate-100 py-1 pl-1 pr-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-teal-700 text-xs font-bold text-white">
              {initial}
            </span>
            <span className="text-sm font-semibold text-slate-800">
              {user?.displayName || "Admin"}
            </span>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function SidebarBody({ onNavClick, onLogout, user, initial }) {
  return (
    <>
      {/* Logo */}
      <div className="border-b border-slate-100 p-5">
        <Link to="/admin" className="flex items-center gap-2.5" onClick={onNavClick}>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-teal-700 text-white shadow-md">
            <Palmtree className="h-5 w-5" />
          </span>
          <div>
            <p className="font-display text-base font-bold leading-tight text-slate-900">
              Andaman Travel
            </p>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-teal-600">
              Admin Console
            </p>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 p-3">
        {NAV.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavClick}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors",
                isActive
                  ? "bg-teal-50 text-teal-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )
            }
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* User block */}
      <div className="border-t border-slate-100 p-3">
        <div className="mb-2 flex items-center gap-3 rounded-xl bg-slate-50 px-3 py-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-teal-700 text-xs font-bold text-white">
            {initial}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900">
              {user?.displayName || "Admin"}
            </p>
            <p className="truncate text-[11px] text-slate-500">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </>
  );
}