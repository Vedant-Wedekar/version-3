import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Briefcase,
  IndianRupee,
  TrendingUp,
  MessageSquare,
  Calendar,
  ArrowUpRight,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { getDashboardStats } from "../../services/admin";

const inr = (n) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n || 0);

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getDashboardStats()
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Skeleton />;
  if (error) {
    return (
      <div className="rounded-2xl bg-red-50 p-6 ring-1 ring-red-100">
        <p className="font-semibold text-red-700">{error}</p>
      </div>
    );
  }

  const { stats, recentBookings } = data;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-bold text-slate-900">
          Welcome back 👋
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Here's what's happening with your bookings today.
        </p>
      </div>

      {/* Stat tiles */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Revenue · this month"
          value={inr(stats.revenueThisMonth)}
          sub={`${inr(stats.revenue)} all time`}
          icon={IndianRupee}
          accent="teal"
        />
        <StatCard
          label="Bookings · today"
          value={stats.bookingsToday}
          sub={`${stats.bookingsThisWeek} this week`}
          icon={TrendingUp}
          accent="cyan"
        />
        <StatCard
          label="Pending bookings"
          value={stats.pendingBookings}
          sub={`${stats.confirmedBookings} confirmed`}
          icon={Briefcase}
          accent="amber"
        />
        <StatCard
          label="New inquiries"
          value={stats.newInquiries}
          sub={`${stats.totalInquiries} total`}
          icon={MessageSquare}
          accent="slate"
        />
      </div>

      {/* Recent bookings */}
      <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-100">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <h2 className="font-display text-lg font-bold text-slate-900">
              Recent bookings
            </h2>
            <p className="text-xs text-slate-500">Latest 5 across all status</p>
          </div>
          <Link
            to="/admin/bookings"
            className="flex items-center gap-1 text-sm font-semibold text-teal-700 hover:text-teal-800"
          >
            View all
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {recentBookings.length === 0 ? (
          <div className="px-6 py-10 text-center text-sm text-slate-500">
            No bookings yet — once travelers start booking, they'll show up here.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {recentBookings.map((b, i) => (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="flex flex-wrap items-center gap-4 px-6 py-4 transition-colors hover:bg-slate-50/60"
              >
                {/* Package thumb */}
                <img
                  src={b.packageSnapshot?.image}
                  alt=""
                  className="h-12 w-16 shrink-0 rounded-lg object-cover ring-1 ring-slate-200"
                />

                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-slate-900">
                    {b.packageSnapshot?.title}
                  </p>
                  <p className="mt-0.5 flex items-center gap-2 text-xs text-slate-500">
                    <span>{b.contact?.name}</span>
                    <span className="h-1 w-1 rounded-full bg-slate-300" />
                    <Calendar className="h-3 w-3" />
                    {new Date(b.travelDate).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                    })}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-semibold text-slate-900">{inr(b.totalAmount)}</p>
                  <StatusPill status={b.bookingStatus} payment={b.paymentStatus} />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---- helpers ---- */

function StatCard({ label, value, sub, icon: Icon, accent }) {
  const accentClasses = {
    teal: "from-teal-500/10 to-teal-600/5 text-teal-700",
    cyan: "from-cyan-500/10 to-cyan-600/5 text-cyan-700",
    amber: "from-amber-500/10 to-amber-600/5 text-amber-700",
    slate: "from-slate-500/10 to-slate-600/5 text-slate-700",
  }[accent];

  return (
    <div className="relative overflow-hidden rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100 transition-all hover:shadow-md">
      <div className={`absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br ${accentClasses} opacity-40 blur-xl`} />
      <div className="relative">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {label}
          </p>
          <span className={`flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${accentClasses}`}>
            <Icon className="h-4 w-4" />
          </span>
        </div>
        <p className="mt-3 font-display text-2xl font-bold text-slate-900 sm:text-3xl">
          {value}
        </p>
        {sub && <p className="mt-1 text-xs text-slate-400">{sub}</p>}
      </div>
    </div>
  );
}

function StatusPill({ status, payment }) {
  const config = {
    pending: { label: "Pending", cls: "bg-amber-50 text-amber-700", icon: Clock },
    confirmed: { label: "Confirmed", cls: "bg-teal-50 text-teal-700", icon: CheckCircle2 },
    completed: { label: "Completed", cls: "bg-slate-100 text-slate-600", icon: CheckCircle2 },
    cancelled: { label: "Cancelled", cls: "bg-red-50 text-red-600", icon: Clock },
  }[status] || { label: status, cls: "bg-slate-100 text-slate-600", icon: Clock };

  const Icon = config.icon;
  return (
    <span className={`mt-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${config.cls}`}>
      <Icon className="h-2.5 w-2.5" />
      {config.label}
      {payment === "paid" && <span className="text-[8px]">· paid</span>}
    </span>
  );
}

function Skeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-8 w-1/3 rounded-lg bg-slate-200" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 rounded-3xl bg-white ring-1 ring-slate-100" />
        ))}
      </div>
      <div className="h-96 rounded-3xl bg-white ring-1 ring-slate-100" />
    </div>
  );
}