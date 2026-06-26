import { Routes, Route } from "react-router-dom";
import Layout from "../components/layout/Layout";
import AdminLayout from "../components/admin/AdminLayout";

import Home from "../pages/Home";
import Packages from "../pages/Packages";
import PackageDetails from "../pages/PackageDetails";
import About from "../pages/About";
import Gallery from "../pages/Gallery";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import Checkout from "../pages/Checkout";
import BookingConfirmed from "../pages/BookingConfirmed";
import MyBookings from "../pages/MyBookings";
import IslandStory from "../pages/IslandStory";

import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminBookings from "../pages/admin/AdminBookings";
import AdminInquiries from "../pages/admin/AdminInquiries";
import AdminPackages from "../pages/admin/AdminPackages";
import AdminTestimonials from "../pages/admin/AdminTestimonials";

import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/packages/:slug" element={<PackageDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/islands/:id" element={<IslandStory />} />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/booking-confirmed/:id"
          element={
            <ProtectedRoute>
              <BookingConfirmed />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route
        path="/admin"
        element={
          <ProtectedRoute adminOnly>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="bookings" element={<AdminBookings />} />
        <Route path="inquiries" element={<AdminInquiries />} />
        <Route path="packages" element={<AdminPackages />} />
        <Route path="testimonials" element={<AdminTestimonials />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}