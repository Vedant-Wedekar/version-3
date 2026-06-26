// Global error handler — must be registered LAST in app.js
export function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const message = err.message || "Internal server error";

  // Log full error in dev, just status + message in prod
  if (process.env.NODE_ENV !== "production") {
    console.error(`[${status}]`, err);
  } else {
    console.error(`[${status}] ${message}`);
  }

  res.status(status).json({ error: message });
}