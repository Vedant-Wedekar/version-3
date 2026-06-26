import axios from "axios";
import { auth } from "./firebase";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 15000,
});

// Attach Firebase ID token to every request, if a user is signed in.
api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    try {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    } catch {
      // ignore — request will go through unauthenticated
    }
  }
  return config;
});

// Friendly error normalization — turns axios errors into thrown Errors with
// the API's `error` message, so callers can `try { ... } catch (e) { e.message }`.
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const msg =
      err.response?.data?.error ||
      err.message ||
      "Network error";
    return Promise.reject(new Error(msg));
  }
);

export default api;