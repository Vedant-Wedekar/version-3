import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  Mail,
  Phone,
  User,
  MessageSquare,
  Calendar,
  Users,
  Heart,
  Eye,
} from "lucide-react";
import toast from "react-hot-toast";
import { listAllInquiries, updateInquiry } from "../../services/admin";

const STATUS_FILTERS = [
  { value: "all", label: "All" },
  { value: "new", label: "New" },
  { value: "in-progress", label: "In Progress" },
  { value: "handled", label: "Handled" },
  { value: "spam", label: "Spam" },
];

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const load = () => {
    setLoading(true);
    listAllInquiries(statusFilter === "all" ? {} : { status: statusFilter })
      .then(setInquiries)
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

  const filtered = useMemo(() => {
    if (!search.trim()) return inquiries;
    const q = search.toLowerCase();
    return inquiries.filter(
      (i) =>
        i.name?.toLowerCase().includes(q) ||
        i.email?.toLowerCase().includes(q) ||
        i.phone?.includes(q) ||
        i.message?.toLowerCase().includes(q)
    );
  }, [inquiries, search]);

  const handleStatusChange = async (id, status) => {
    try {
      const updated = await updateInquiry(id, { status });
      setInquiries((prev) => prev.map((i) => (i.id === id ? updated : i)));
      if (selected?.id === id) setSelected(updated);
      toast.success(`Marked as ${status}`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-slate-900">Inquiries</h1>
        <p className="mt-1 text-sm text-slate-500">
          {filtered.length} {filtered.length === 1 ? "inquiry" : "inquiries"}
          {statusFilter !== "all" && ` · ${statusFilter}`}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-white p-3 ring-1 ring-slate-100">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, message…"
            className="w-full rounded-xl border border-slate-200 bg-slate-50/60 py-2 pl-9 pr-3 text-sm focus:border-teal-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-100"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {STATUS_FILTERS.map((s) => (
            <button
              key={s.value}
              onClick={() => setStatusFilter(s.value)}
              className={
                "rounded-full px-3 py-1.5 text-xs font-semibold transition-colors " +
                (statusFilter === s.value
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200")
              }
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-100">
        {loading ? (
          <div className="p-10 text-center text-sm text-slate-500">Loading…</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <MessageSquare className="mx-auto h-10 w-10 text-slate-300" />
            <p className="mt-3 font-semibold text-slate-900">No inquiries yet</p>
            <p className="mt-1 text-sm text-slate-500">
              Contact form submissions will show up here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filtered.map((i) => (
              <div
                key={i.id}
                className="flex flex-wrap items-center gap-4 p-4 transition-colors hover:bg-slate-50/60 sm:p-5"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3">
                    <p className="font-semibold text-slate-900">{i.name}</p>
                    <StatusPill status={i.status} />
                  </div>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {i.email} · {i.phone}
                  </p>
                  <p className="mt-2 line-clamp-2 text-sm text-slate-600">
                    {i.message || (
                      <span className="italic text-slate-400">No message provided</span>
                    )}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
                    {i.travelers && <span>👥 {i.travelers} traveler(s)</span>}
                    {i.interest && <span>💭 {i.interest}</span>}
                    {i.travelDate && <span>📅 {i.travelDate}</span>}
                  </div>
                </div>
                <button
                  onClick={() => setSelected(i)}
                  className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-teal-700"
                >
                  <Eye className="h-3 w-3" /> View
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selected && (
          <InquiryDrawer
            inquiry={selected}
            onClose={() => setSelected(null)}
            onStatusChange={handleStatusChange}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function StatusPill({ status }) {
  const cfg =
    {
      new: { cls: "bg-amber-50 text-amber-700" },
      "in-progress": { cls: "bg-cyan-50 text-cyan-700" },
      handled: { cls: "bg-teal-50 text-teal-700" },
      spam: { cls: "bg-red-50 text-red-700" },
    }[status] || { cls: "bg-slate-100 text-slate-600" };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${cfg.cls}`}>
      {status}
    </span>
  );
}

function InquiryDrawer({ inquiry, onClose, onStatusChange }) {
  const ACTIONS = [
    { status: "in-progress", label: "Mark In Progress", cls: "bg-cyan-600 hover:bg-cyan-700" },
    { status: "handled", label: "Mark Handled", cls: "bg-teal-600 hover:bg-teal-700" },
    { status: "spam", label: "Mark as Spam", cls: "bg-red-600 hover:bg-red-700" },
  ];

  const whatsappUrl = `https://wa.me/${inquiry.phone?.replace(/\D/g, "")}?text=Hi%20${encodeURIComponent(inquiry.name || "")}`;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-40 bg-slate-900/50"
      />
      <motion.aside
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 250 }}
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-lg flex-col bg-white shadow-2xl"
      >
        <header className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h3 className="font-display text-lg font-bold text-slate-900">Inquiry details</h3>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-slate-100">
            <X className="h-4 w-4" />
          </button>
        </header>

        <div className="flex-1 space-y-5 overflow-y-auto p-6">
          <div>
            <StatusPill status={inquiry.status} />
            <h4 className="mt-3 font-display text-xl font-bold text-slate-900">{inquiry.name}</h4>
            <p className="text-sm text-slate-500">
              Received {inquiry.createdAt?._seconds ? new Date(inquiry.createdAt._seconds * 1000).toLocaleString("en-IN") : ""}
            </p>
          </div>

          <div className="space-y-3 rounded-2xl bg-slate-50 p-4 text-sm">
            <Row icon={User} label="Name" value={inquiry.name} />
            <Row icon={Mail} label="Email" value={inquiry.email} />
            <Row icon={Phone} label="Phone" value={inquiry.phone} />
            {inquiry.travelers && <Row icon={Users} label="Travelers" value={inquiry.travelers} />}
            {inquiry.travelDate && <Row icon={Calendar} label="Travel date" value={inquiry.travelDate} />}
            {inquiry.interest && <Row icon={Heart} label="Interest" value={inquiry.interest} />}
          </div>

          {inquiry.message && (
            <div>
              <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">Message</h4>
              <div className="rounded-2xl bg-amber-50/50 p-4 text-sm text-slate-700 ring-1 ring-amber-100">
                {inquiry.message}
              </div>
            </div>
          )}

          {/* Quick contact */}
          <div>
            <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">Quick contact</h4>
            <div className="grid grid-cols-3 gap-2">
              <a
                href={`tel:${inquiry.phone}`}
                className="flex flex-col items-center gap-1 rounded-2xl bg-slate-100 py-3 text-xs font-semibold text-slate-700 hover:bg-slate-200"
              >
                <Phone className="h-4 w-4" /> Call
              </a>
              <a    
                href={`mailto:${inquiry.email}`}
                className="flex flex-col items-center gap-1 rounded-2xl bg-slate-100 py-3 text-xs font-semibold text-slate-700 hover:bg-slate-200"
              >
                <Mail className="h-4 w-4" /> Email
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1 rounded-2xl bg-emerald-100 py-3 text-xs font-semibold text-emerald-700 hover:bg-emerald-200"
              >
                <MessageSquare className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">Update status</h4>
            <div className="grid gap-2">
              {ACTIONS.filter((a) => a.status !== inquiry.status).map((a) => (
                <button
                  key={a.status}
                  onClick={() => onStatusChange(inquiry.id, a.status)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold text-white transition-colors ${a.cls}`}
                >
                  {a.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
}

function Row({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
        <p className="break-words text-sm font-semibold text-slate-900">{value || "—"}</p>
      </div>
    </div>
  );
}