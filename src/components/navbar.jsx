import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ameltanLogo from "../assets/ameltan-logo.jpg";
import { useAuth } from "../context/AuthContext";
import { useNotifications } from "../context/NotificationContext";

const Navbar = () => {
  const navigate = useNavigate();

  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
  } = useNotifications();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Community", path: "/community" },
    { name: "Contact", path: "/contact" },
  ];

  /* =========================
      LOGOUT
  ========================= */
  const handleLogout = () => {
    logout();

    setShowProfileMenu(false);
    setShowNotifications(false);
    setMobileMenuOpen(false);

    navigate("/login");
  };

  /* =========================
      OPEN NOTIFICATION
  ========================= */
  const handleNotificationClick = (notification) => {
    markAsRead(notification.id);

    setShowNotifications(false);

    if (notification.link) {
      navigate(notification.link);
    } else {
      navigate("/notifications");
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur-md">
      <nav className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* =========================
            MAIN NAVBAR
        ========================= */}
        <div className="flex h-[76px] items-center justify-between">

          {/* =========================
              LOGO / BRAND
          ========================= */}
          <Link
            to="/"
            onClick={() => {
              setMobileMenuOpen(false);
              setShowNotifications(false);
              setShowProfileMenu(false);
            }}
            className="flex items-center gap-3"
          >
            <img
              src={ameltanLogo}
              alt="AMELTAN logo"
              className="h-12 w-12 rounded-full object-contain"
            />

            <div className="flex flex-col leading-tight">
              <span className="text-lg font-extrabold tracking-wide text-ameltan">
                AMELTAN
              </span>

              <span className="text-[11px] font-medium text-gray-500 sm:text-xs">
                Accurate Diagnosis
              </span>
            </div>
          </Link>

          {/* =========================
              RIGHT SIDE
          ========================= */}
          <div className="flex items-center gap-2">

            {/* =========================
                DESKTOP NAVIGATION
            ========================= */}
            <div className="hidden items-center gap-1 md:flex">

              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-600 transition-all duration-200 hover:bg-ameltan-light hover:text-ameltan"
                >
                  {link.name}
                </Link>
              ))}

            </div>

            {/* =========================
                LOGGED-IN USER
            ========================= */}
            {isAuthenticated ? (
              <>

                {/* =========================
                    NOTIFICATION BUTTON
                ========================= */}
                <div className="relative">

                  <button
                    type="button"
                    onClick={() => {
                      setShowNotifications(!showNotifications);
                      setShowProfileMenu(false);
                    }}
                    className="relative !m-0 !w-auto !bg-transparent p-2.5 text-gray-600 transition hover:!bg-gray-100 hover:text-ameltan"
                    aria-label="Notifications"
                    aria-expanded={showNotifications}
                  >

                    <span className="text-xl">
                      🔔
                    </span>

                    {unreadCount > 0 && (
                      <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                        {unreadCount > 99
                          ? "99+"
                          : unreadCount}
                      </span>
                    )}

                  </button>

                  {/* =========================
                      NOTIFICATION DROPDOWN
                  ========================= */}
                  {showNotifications && (
                    <div className="absolute right-0 top-12 z-50 w-[calc(100vw-2rem)] max-w-sm overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">

                      {/* HEADER */}
                      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">

                        <div>
                          <h3 className="font-bold text-gray-900">
                            Notifications
                          </h3>

                          <p className="text-xs text-gray-500">
                            {unreadCount > 0
                              ? `${unreadCount} unread notification${
                                  unreadCount > 1 ? "s" : ""
                                }`
                              : "You're all caught up"}
                          </p>
                        </div>

                        {unreadCount > 0 && (
                          <button
                            type="button"
                            onClick={markAllAsRead}
                            className="!m-0 !w-auto !bg-transparent px-2 py-1 text-xs font-bold text-ameltan hover:!bg-transparent"
                          >
                            Mark all read
                          </button>
                        )}

                      </div>

                      {/* =========================
                          NOTIFICATION LIST
                      ========================= */}
                      <div className="max-h-96 overflow-y-auto">

                        {notifications.length === 0 ? (

                          <div className="px-5 py-10 text-center">

                            <div className="text-3xl">
                              🔔
                            </div>

                            <p className="mt-3 text-sm font-semibold text-gray-900">
                              No notifications
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                              New updates will appear here.
                            </p>

                          </div>

                        ) : (

                          notifications
                            .slice(0, 5)
                            .map((notification) => (

                              <button
                                key={notification.id}
                                type="button"
                                onClick={() =>
                                  handleNotificationClick(
                                    notification
                                  )
                                }
                                className={`w-full border-b border-gray-100 px-5 py-4 text-left transition hover:bg-gray-50 ${
                                  !notification.read
                                    ? "bg-ameltan/5"
                                    : "bg-white"
                                }`}
                              >

                                <div className="flex gap-3">

                                  {/* ICON */}
                                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ameltan/10">
                                    📢
                                  </div>

                                  {/* CONTENT */}
                                  <div className="min-w-0 flex-1">

                                    <div className="flex items-start gap-2">

                                      <h4 className="text-sm font-bold text-gray-900">
                                        {notification.title}
                                      </h4>

                                      {!notification.read && (
                                        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-red-500" />
                                      )}

                                    </div>

                                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-gray-500">
                                      {notification.message}
                                    </p>

                                    {notification.date && (
                                      <p className="mt-2 text-[11px] font-medium text-gray-400">
                                        {notification.date}
                                      </p>
                                    )}

                                  </div>

                                </div>

                              </button>

                            ))

                        )}

                      </div>

                      {/* =========================
                          VIEW ALL
                      ========================= */}
                      <Link
                        to="/notifications"
                        onClick={() =>
                          setShowNotifications(false)
                        }
                        className="block border-t border-gray-100 bg-gray-50 px-5 py-3 text-center text-sm font-bold text-ameltan transition hover:bg-ameltan/5"
                      >
                        View all notifications →
                      </Link>

                    </div>
                  )}

                </div>

                {/* =========================
                    PROFILE MENU
                ========================= */}
                <div className="relative">

                  <button
                    type="button"
                    onClick={() => {
                      setShowProfileMenu(!showProfileMenu);
                      setShowNotifications(false);
                    }}
                    className="flex items-center gap-2 rounded-full border border-gray-100 bg-white px-2 py-1.5 transition hover:bg-gray-50"
                  >

                    {/* PROFILE INITIAL */}
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ameltan text-sm font-bold text-white">
                      {user?.name
                        ?.charAt(0)
                        ?.toUpperCase() || "U"}
                    </div>

                    {/* USER DETAILS */}
                    <div className="hidden text-left xl:block">

                      <p className="max-w-[120px] truncate text-xs font-bold text-gray-900">
                        {user?.name || "Member"}
                      </p>

                      <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                        {isAdmin
                          ? "Administrator"
                          : "Member"}
                      </p>

                    </div>

                    <span className="hidden text-xs text-gray-400 xl:block">
                      ▾
                    </span>

                  </button>

                  {/* =========================
                      PROFILE DROPDOWN
                  ========================= */}
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-2xl bg-white py-2 shadow-xl ring-1 ring-black/5">

                      {/* USER INFORMATION */}
                      <div className="border-b border-gray-100 px-4 py-3">

                        <p className="text-sm font-bold text-gray-900">
                          {user?.name || "Member"}
                        </p>

                        <p className="mt-1 truncate text-xs text-gray-500">
                          {user?.email || ""}
                        </p>

                      </div>

                      {/* DASHBOARD */}
                      <Link
                        to="/dashboard"
                        onClick={() =>
                          setShowProfileMenu(false)
                        }
                        className="block px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                      >
                        Dashboard
                      </Link>

                      {/* PROFILE */}
                      <Link
                        to="/profile"
                        onClick={() =>
                          setShowProfileMenu(false)
                        }
                        className="block px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                      >
                        My Profile
                      </Link>

                      {/* MEMBERSHIP */}
                      <Link
                        to="/membership"
                        onClick={() =>
                          setShowProfileMenu(false)
                        }
                        className="block px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                      >
                        Membership
                      </Link>

                      {/* ADMIN */}
                      {isAdmin && (
                        <Link
                          to="/admin/announcements"
                          onClick={() =>
                            setShowProfileMenu(false)
                          }
                          className="block px-4 py-2.5 text-sm font-bold text-ameltan hover:bg-ameltan/5"
                        >
                          Admin Announcements
                        </Link>
                      )}

                      <div className="my-1 border-t border-gray-100" />

                      {/* LOGOUT */}
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full px-4 py-2.5 text-left text-sm font-bold text-red-600 hover:bg-red-50"
                      >
                        Logout
                      </button>

                    </div>
                  )}

                </div>

              </>
            ) : (

              /* =========================
                  LOGGED-OUT USER
              ========================= */
              <>

                <Link
                  to="/login"
                  className="hidden rounded-lg px-4 py-2.5 text-sm font-bold text-gray-700 transition hover:bg-gray-50 sm:block"
                >
                  Sign In
                </Link>

                <Link
                  to="/register"
                  className="hidden rounded-lg bg-ameltan px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-ameltan-dark hover:shadow-md sm:block"
                >
                  Join AMELTAN
                </Link>

              </>
            )}

            {/* =========================
                MOBILE MENU BUTTON
            ========================= */}
            <button
              type="button"
              onClick={() =>
                setMobileMenuOpen(!mobileMenuOpen)
              }
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-ameltan transition hover:bg-ameltan-light md:hidden"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >

              {mobileMenuOpen ? (

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>

              ) : (

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>

              )}

            </button>

          </div>

        </div>

        {/* =========================
            MOBILE NAVIGATION
        ========================= */}
        <div
          className={`overflow-hidden transition-all duration-300 md:hidden ${
            mobileMenuOpen
              ? "max-h-[600px] pb-5"
              : "max-h-0"
          }`}
        >

          <div className="flex flex-col gap-1 border-t border-gray-100 pt-3">

            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 hover:text-ameltan"
              >
                {link.name}
              </Link>
            ))}

            {isAuthenticated ? (
              <>

                <div className="my-2 border-t border-gray-100" />

                {/* DASHBOARD */}
                <Link
                  to="/dashboard"
                  onClick={() =>
                    setMobileMenuOpen(false)
                  }
                  className="rounded-lg px-4 py-3 text-sm font-bold text-ameltan hover:bg-ameltan/5"
                >
                  Dashboard
                </Link>

                {/* NOTIFICATIONS */}
                <Link
                  to="/notifications"
                  onClick={() =>
                    setMobileMenuOpen(false)
                  }
                  className="flex items-center justify-between rounded-lg px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >

                  <span>
                    Notifications
                  </span>

                  {unreadCount > 0 && (
                    <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
                      {unreadCount}
                    </span>
                  )}

                </Link>

                {/* PROFILE */}
                <Link
                  to="/profile"
                  onClick={() =>
                    setMobileMenuOpen(false)
                  }
                  className="rounded-lg px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  My Profile
                </Link>

                {/* MEMBERSHIP */}
                <Link
                  to="/membership"
                  onClick={() =>
                    setMobileMenuOpen(false)
                  }
                  className="rounded-lg px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Membership
                </Link>

                {/* ADMIN */}
               {isAdmin && (
                  <Link
                    to="/admin/announcements"
                    onClick={() =>
                      setShowProfileMenu(false)
                    }
                    className="block px-4 py-2.5 text-sm font-bold text-ameltan hover:bg-ameltan/5"
                  >
                    Admin Announcements
                  </Link>
                )}

                {/* LOGOUT */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-2 rounded-lg bg-red-50 px-4 py-3 text-left text-sm font-bold text-red-600 hover:bg-red-100"
                >
                  Logout
                </button>

              </>
            ) : (
              <>

                <div className="my-2 border-t border-gray-100" />

                {/* SIGN IN */}
                <Link
                  to="/login"
                  onClick={() =>
                    setMobileMenuOpen(false)
                  }
                  className="rounded-lg px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50"
                >
                  Sign In
                </Link>

                {/* JOIN */}
                <Link
                  to="/register"
                  onClick={() =>
                    setMobileMenuOpen(false)
                  }
                  className="mt-1 rounded-lg bg-ameltan px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-ameltan-dark"
                >
                  Join AMELTAN
                </Link>

              </>
            )}

          </div>

        </div>

      </nav>
    </header>
  );
};

export default Navbar;