import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes";
import ScrollToTop from "./components/common/ScrollToTop";
import SmoothScroll from "./components/common/SmoothScroll";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AuthProvider>
          <SmoothScroll>
            <ScrollToTop />
            <AppRoutes />
            <Toaster
              position="top-center"
              toastOptions={{
                duration: 4000,
                style: {
                  borderRadius: "12px",
                  background: "#0F172A",
                  color: "#fff",
                },
              }}
            />
          </SmoothScroll>
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;