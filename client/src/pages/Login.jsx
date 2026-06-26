import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Palmtree } from "lucide-react";
import toast from "react-hot-toast";
import SEO from "../components/common/SEO";
import { loginWithEmail, sendResetEmail } from "../services/auth";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter your email and password.");
      return;
    }
    setLoading(true);
    try {
      await loginWithEmail({ email, password });
      toast.success("Welcome back!");
      navigate(redirectTo, { replace: true });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const onForgotPassword = async () => {
    if (!email) {
      toast.error("Enter your email above first, then click Forgot password.");
      return;
    }
    try {
      await sendResetEmail(email);
      toast.success("Reset email sent. Check your inbox!");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <SEO title="Sign in" description="Sign in to your Andaman Travel account." />
      <AuthShell heading="Welcome back" sub="Sign in to plan your next island escape.">
        <form onSubmit={onSubmit} className="space-y-4">
          <Field
            icon={Mail}
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />

          <div>
            <Field
              icon={Lock}
              label="Password"
              type={showPass ? "text" : "password"}
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              suffix={
                <button
                  type="button"
                  onClick={() => setShowPass((s) => !s)}
                  className="text-slate-400 hover:text-slate-700"
                  aria-label={showPass ? "Hide password" : "Show password"}
                >
                  {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              }
            />
            <button
              type="button"
              onClick={onForgotPassword}
              className="mt-1.5 text-xs font-semibold text-teal-700 hover:text-teal-800"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-teal-700 hover:shadow-lg disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
            {!loading && (
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Don't have an account yet?{" "}
          <Link to="/register" className="font-semibold text-teal-700 hover:text-teal-800">
            Create one
          </Link>
        </p>
      </AuthShell>
    </>
  );
}

/* ---------- Shared shell ---------- */

export function AuthShell({ heading, sub, children }) {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-cyan-50/40 to-white pt-28 pb-16 sm:pt-32">
      <div className="pointer-events-none absolute -top-32 -right-24 h-96 w-96 rounded-full bg-teal-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-cyan-200/40 blur-3xl" />

      <div className="relative mx-auto flex max-w-md flex-col items-center px-4 sm:px-6">
        <Link to="/" className="mb-6 inline-flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-teal-700 text-white shadow-md">
            <Palmtree className="h-5 w-5" />
          </span>
          <span className="font-display text-xl font-bold text-slate-900">
            Andaman Travel
          </span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full rounded-3xl bg-white p-7 shadow-xl ring-1 ring-slate-100 sm:p-9"
        >
          <h1 className="font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
            {heading}
          </h1>
          <p className="mt-1.5 text-sm text-slate-500">{sub}</p>

          <div className="mt-7">{children}</div>
        </motion.div>

        <p className="mt-5 text-center text-xs text-slate-400">
          By continuing you agree to our{" "}
          <Link to="/terms" className="underline hover:text-teal-700">Terms</Link>{" "}
          &{" "}
          <Link to="/privacy" className="underline hover:text-teal-700">Privacy Policy</Link>
          .
        </p>
      </div>
    </section>
  );
}

export function Field({ icon: Icon, label, suffix, ...props }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-slate-700">
        {label}
      </label>
      <div className="relative">
        {Icon && <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />}
        <input
          {...props}
          className={
            "w-full rounded-2xl border border-slate-200 bg-slate-50/60 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:border-teal-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-100 " +
            (Icon ? "pl-10 " : "px-4 ") +
            (suffix ? "pr-11" : Icon ? "pr-4" : "")
          }
        />
        {suffix && <span className="absolute right-3.5 top-1/2 -translate-y-1/2">{suffix}</span>}
      </div>
    </div>
  );
}

export function Divider({ children }) {
  return (
    <div className="my-5 flex items-center gap-3">
      <span className="h-px flex-1 bg-slate-200" />
      <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{children}</span>
      <span className="h-px flex-1 bg-slate-200" />
    </div>
  );
}