import { useState } from "react";
import { NavLink } from "react-router-dom";
import ameltanLogo from "../assets/ameltan-logo.jpg";
import { useNotifications } from "../context/NotificationContext";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Community", path: "/community" },
    { name: "Contact", path: "/contact" },
  ];
const {
  notifications,
  unreadCount,
  markAsRead,
  markAllAsRead,
} = useNotifications();

const [showNotifications, setShowNotifications] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur-md">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[76px] items-center justify-between">

          {/* LOGO / BRAND */}
          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
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
          </NavLink>
<div className="relative">

  <button
    type="button"
    onClick={() => setShowNotifications(!showNotifications)}
    className="relative !m-0 !w-auto !bg-transparent p-2 text-gray-600 transition hover:!bg-gray-100 hover:text-ameltan"
    aria-label="Notifications"
  >

    {/* BELL */}
    <span className="text-xl">
      🔔
    </span>

    {/* UNREAD BADGE */}
    {unreadCount > 0 && (
      <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
        {unreadCount > 99 ? "99+" : unreadCount}
      </span>
    )}

  </button>

  {/* NOTIFICATION DROPDOWN */}
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

      {/* NOTIFICATIONS */}
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

          notifications.map((notification) => (

            <Link
              key={notification.id}
              to={notification.link}
              onClick={() => {
                markAsRead(notification.id);
                setShowNotifications(false);
              }}
              className={`block border-b border-gray-100 px-5 py-4 transition hover:bg-gray-50 ${
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
                <div className="min-w-0">

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

                </div>

              </div>

            </Link>

          ))

        )}

      </div>

    </div>
  )}

</div>
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


    {/* NOTIFICATIONS */}
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

        notifications.map((notification) => (

          <Link
            key={notification.id}
            to={notification.link}
            onClick={() => {
              markAsRead(notification.id);
              setShowNotifications(false);
            }}
            className={`block border-b border-gray-100 px-5 py-4 transition hover:bg-gray-50 ${
              !notification.read
                ? "bg-ameltan/5"
                : "bg-white"
            }`}
          >

            <div className="flex gap-3">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ameltan/10">
                📢
              </div>

              <div className="min-w-0">

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

              </div>

            </div>

          </Link>

        ))

      )}

    </div>


    {/* VIEW ALL NOTIFICATIONS */}
    <Link
      to="/notifications"
      onClick={() => setShowNotifications(false)}
      className="block border-t border-gray-100 bg-gray-50 px-5 py-3 text-center text-sm font-bold text-ameltan hover:bg-ameltan/5"
    >
      View all notifications →
    </Link>

  </div>
)}
          {/* DESKTOP NAVIGATION */}
          <div className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-ameltan-light text-ameltan"
                      : "text-gray-600 hover:bg-ameltan-light hover:text-ameltan"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            {/* JOIN BUTTON */}
            <NavLink
              to="/register"
              className="ml-3 rounded-lg bg-ameltan px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-ameltan-dark hover:shadow-md"
            >
              Join AMELTAN
            </NavLink>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-ameltan transition hover:bg-ameltan-light md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
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



        {/* MOBILE NAVIGATION */}
        <div
          className={`overflow-hidden transition-all duration-300 md:hidden ${
            menuOpen ? "max-h-[500px] pb-5" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-1 border-t border-gray-100 pt-3">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "bg-ameltan-light text-ameltan"
                      : "text-gray-600 hover:bg-gray-50 hover:text-ameltan"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            <NavLink
              to="/register"
              onClick={() => setMenuOpen(false)}
              className="mt-2 rounded-lg bg-ameltan px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-ameltan-dark"
            >
              Join AMELTAN
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;