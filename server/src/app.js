import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";

import "./config/firebaseAdmin.js";

import inquiryRoutes from "./routes/inquiries.js";
import userRoutes from "./routes/users.js";
import packageRoutes from "./routes/packages.js";
import bookingRoutes from "./routes/bookings.js";
import paymentRoutes from "./routes/payments.js";
import adminRoutes from "./routes/admin.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(helmet());
app.use(compression());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

// Build the CORS allow-list:
// - localhost for dev
// - the production CLIENT_URL (e.g. https://andaman-travel.vercel.app)
// - any Vercel preview URL for the same project (e.g. https://andaman-travel-abc123.vercel.app)
const productionOrigin = (process.env.CLIENT_URL || "").replace(/\/$/, "");

// Pattern for any preview URL under your Vercel project name.
// "andaman-travel" is the project slug, change here if you renamed it.
const vercelPreviewRegex = /^https:\/\/andaman-travel(-[a-z0-9]+)*-vedant-wedekars-projects\.vercel\.app$/;

const staticAllowlist = [
  "http://localhost:5173",
  productionOrigin,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, cb) => {
      // No origin = server-to-server, curl, mobile apps — allow
      if (!origin) return cb(null, true);

      const cleaned = origin.replace(/\/$/, "");

      if (staticAllowlist.includes(cleaned)) return cb(null, true);
      if (vercelPreviewRegex.test(cleaned)) return cb(null, true);

      cb(new Error(`CORS blocked: ${origin} not in allow list`));
    },
    credentials: true,
  })
);

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.get("/", (req, res) => {
  res.json({ message: "Andaman Travel API is running" });
});

app.use("/api/inquiries", inquiryRoutes);
app.use("/api/users", userRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/admin", adminRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});


app.use(errorHandler);

export default app;