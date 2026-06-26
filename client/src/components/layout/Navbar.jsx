import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, Palmtree, LogOut, User, Briefcase } from "lucide-react";
import toast from "react-hot-toast";
import { NAV_LINKS, SITE } from "../../utils/constants";
import { cn } from "../../utils/cn";
import { useAuth } from "../../context/AuthContext";
import { logout } from "../../services/auth";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();

  // Close user dropdown on outside click
  useEffect(() => {
    const onClick = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenu(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setUserMenu(false);
      setOpen(false);
      toast.success("Signed out");
      navigate("/");
    } catch {
      toast.error("Could not sign out — try again.");
    }
  };

  const initial = (user?.displayName || user?.email || "?")
    .charAt(0)
    .toUpperCase();

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto w-full max-w-7xl px-4 py-3 sm:px-6 lg:px-8">


        <nav className="flex items-center justify-between rounded-full border border-white/60 bg-white/70 px-4 py-2.5 shadow-lg shadow-slate-900/5 backdrop-blur-xl sm:px-6">
          {/* Logo */}


        <Link to="/" className="group flex shrink-0 items-center gap-2.5">
  <span className="flex h-14 w-25 items-center justify-center   transition-transform duration-300 group-hover:scale-105">
    <img
      src="https://res.cloudinary.com/dduri4zfq/image/upload/v1780130999/he-removebg-preview_hxsgfw.png"
      alt="Logo"
      className="h-full w-full object-cover"
    />
  </span>

  <span className="font-display text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
    {/* {SITE.name} */}
  </span>
</Link>

          {/* Centered nav links (desktop) */}
          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    cn(
                      "rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200",
                      isActive
                        ? "bg-white text-cyan-700 shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    )
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Right actions (desktop) */}
          <div className="hidden shrink-0 items-center gap-2 lg:flex">
            {user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenu((v) => !v)}
                  className="flex items-center gap-2 rounded-full bg-slate-100 py-1.5 pl-1.5 pr-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-200"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt=""
                      className="h-7 w-7 rounded-full object-cover"
                    />
                  ) : (
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-teal-700 text-xs font-bold text-white">
                      {initial}
                    </span>
                  )}
                  <span className="max-w-[120px] truncate">
                    {user.displayName || user.email.split("@")[0]}
                  </span>
                </button>

                {userMenu && (
                  <div className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-2xl bg-white py-2 shadow-xl ring-1 ring-slate-100">
                    <div className="border-b border-slate-100 px-4 py-3">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        {user.displayName || "Traveler"}
                      </p>
                      <p className="truncate text-xs text-slate-500">
                        {user.email}
                      </p>
                    </div>
                    <Link
                      to="/my-bookings"
                      onClick={() => setUserMenu(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      <Briefcase className="h-4 w-4" /> My Bookings
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => setUserMenu(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      <User className="h-4 w-4" /> Profile
                    </Link>
                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setUserMenu(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-teal-700 hover:bg-teal-50"
                      >
                        <span className="h-4 w-4 rounded-full bg-teal-500" />
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 border-t border-slate-100 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      <LogOut className="h-4 w-4" /> Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:text-slate-900"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="rounded-full bg-gradient-to-r from-teal-600 to-cyan-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-teal-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-slate-700 hover:bg-slate-100 lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {/* Mobile drawer */}
        <div
          className={cn(
            "mt-2 overflow-hidden rounded-3xl border border-white/60 bg-white/90 backdrop-blur-xl transition-all duration-300 lg:hidden",
            open
              ? "max-h-[520px] opacity-100 shadow-lg"
              : "max-h-0 border-transparent opacity-0"
          )}
        >
          <div className="p-3">
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "block rounded-2xl px-4 py-3 text-base font-semibold transition-colors",
                        isActive
                          ? "bg-cyan-50 text-cyan-700"
                          : "text-slate-700 hover:bg-slate-100"
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}

              {user ? (
                <>
                  <li className="mt-2 flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt=""
                        className="h-9 w-9 rounded-full object-cover"
                      />
                    ) : (
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-teal-700 text-sm font-bold text-white">
                        {initial}
                      </span>
                    )}
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        {user.displayName || "Traveler"}
                      </p>
                      <p className="truncate text-xs text-slate-500">
                        {user.email}
                      </p>
                    </div>
                  </li>
                  <li>
                    <Link
                      to="/my-bookings"
                      onClick={() => setOpen(false)}
                      className="block rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      My Bookings
                    </Link>
                  </li>
                  {isAdmin && (
                    <li>
                      <Link
                        to="/admin"
                        onClick={() => setOpen(false)}
                        className="block rounded-2xl px-4 py-3 text-sm font-semibold text-teal-700 hover:bg-teal-50"
                      >
                        Admin Panel
                      </Link>
                    </li>
                  )}
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block w-full rounded-2xl px-4 py-3 text-left text-sm font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      Sign out
                    </button>
                  </li>
                </>
              ) : (
                <li className="mt-2 grid grid-cols-2 gap-2 border-t border-slate-100 pt-3">
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="rounded-2xl bg-slate-100 px-4 py-3 text-center text-sm font-semibold text-slate-700"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setOpen(false)}
                    className="rounded-2xl bg-gradient-to-r from-teal-600 to-cyan-700 px-4 py-3 text-center text-sm font-semibold text-white shadow-md"
                  >
                    Sign up
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}