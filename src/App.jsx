import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Community from "./community";

import Home from "./home";
import About from "./about";
import Services from "./components/services";
import Contact from "./components/contact";
import Register from "./components/register";
import Success from "./success";
import Events from "./components/events";
import Login from "./components/login";
import Dashboard from "./dashboard";
import Profile from "./profile";
import Membership from "./member/membership";
import VerifyMembership from "./member/VerifyMembership";
import Announcements from "./Announcement";
import StateChapters from "./stateChapters";
import Notifications from "./Notifications";
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/success" element={<Success />} />
          <Route path="/community" element={<Community />} />
          <Route path="/events" element={<Events />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/verify-membership" element={<VerifyMembership />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/state-chapters" element={<StateChapters />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
  
}

export default App;
