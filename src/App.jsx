import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";

import Home from "./home";
import About from "./about";
import Services from "./components/services";
import Contact from "./components/contact";
import Register from "./components/register";
import Success from "./success";
import Community from "./community";
import Events from "./components/events";
import Login from "./components/login";
import Dashboard from "./dashboard";
import Profile from "./profile";
import Membership from "./member/membership";
import VerifyMembership from "./member/VerifyMembership";
import Announcements from "./Announcements";
import StateChapters from "./stateChapters";
import Notifications from "./Notifications";
import AdminAnnouncement from "./AdminAnnouncement";
import ProtectedRoute from "./context/ProtectedRoute";
import AdminRoute from "./context/AdminRoute";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import EditProfile from "./components/Editprofile";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>

          {/* =========================
              PUBLIC ROUTES
          ========================= */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/success" element={<Success />} />
          <Route path="/community" element={<Community />} />
          <Route path="/events" element={<Events />} />
          <Route path="/login" element={<Login />} />

          {/* =========================
              MEMBER ROUTES
          ========================= */}

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        
          <Route
            path="/membership"
            element={
              <ProtectedRoute>
                <Membership />
              </ProtectedRoute>
            }
          />

          <Route
            path="/verify-membership"
            element={
              <ProtectedRoute>
                <VerifyMembership />
              </ProtectedRoute>
            }
          />

          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            }
          />

          <Route
            path="/state-chapters"
            element={
              <ProtectedRoute>
                <StateChapters />
              </ProtectedRoute>
            }
          />

          {/* =========================
              MEMBER ANNOUNCEMENTS
              Members can view them
          ========================= */}

          <Route
            path="/announcements"
            element={
              <ProtectedRoute>
                <Announcements />
              </ProtectedRoute>
            }
          />

          {/* =========================
              ADMIN ANNOUNCEMENTS
              Only admins
          ========================= */}

          <Route
            path="/admin/announcements"
            element={
              <AdminRoute>
                <AdminAnnouncement />
              </AdminRoute>
            }
          />
        <Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>

<Route
  path="/reset-password/:token"
  element={<ResetPassword />}
/>

<Route
  path="/edit-profile"
  element={
    <ProtectedRoute>
      <EditProfile />
    </ProtectedRoute>
  }
/>

        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;