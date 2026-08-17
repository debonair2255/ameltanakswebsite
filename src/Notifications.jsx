import { Link } from "react-router-dom";
import { useNotifications } from "./context/NotificationContext";

const Notifications = () => {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    removeNotification,
  } = useNotifications();

  const formatDate = (date) => {
    const notificationDate = new Date(date);

    return notificationDate.toLocaleString("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <main className="min-h-screen bg-ameltan-pale px-5 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-4xl">

        {/* HEADER */}
        <div className="mb-8">

          <Link
            to="/dashboard"
            className="text-sm font-semibold text-ameltan transition hover:underline"
          >
            ← Back to Dashboard
          </Link>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <p className="text-sm font-bold uppercase tracking-[0.15em] text-ameltan">
                Member Updates
              </p>

              <h1 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Notifications
              </h1>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Stay updated with important AMELTAN information and
                membership notifications.
              </p>

            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllAsRead}
                className="w-fit rounded-lg bg-ameltan px-4 py-2.5 text-sm font-bold text-white transition hover:bg-ameltan-dark"
              >
                Mark all as read
              </button>
            )}

          </div>

        </div>

        {/* SUMMARY */}
        <div className="mb-6 grid grid-cols-2 gap-4">

          <div className="rounded-2xl bg-white p-5 shadow-sm">

            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Total
            </p>

            <p className="mt-2 text-2xl font-extrabold text-gray-900">
              {notifications.length}
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Notifications
            </p>

          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">

            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Unread
            </p>

            <p className="mt-2 text-2xl font-extrabold text-ameltan">
              {unreadCount}
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Require your attention
            </p>

          </div>

        </div>

        {/* NOTIFICATIONS */}
        <section className="overflow-hidden rounded-2xl bg-white shadow-sm">

          {notifications.length === 0 ? (

            <div className="px-6 py-16 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-ameltan/10 text-2xl">
                🔔
              </div>

              <h2 className="mt-5 text-lg font-bold text-gray-900">
                You're all caught up
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                You don't have any notifications at the moment.
                New updates will appear here.
              </p>

            </div>

          ) : (

            <div>

              {notifications.map((notification) => (

                <div
                  key={notification.id}
                  className={`border-b border-gray-100 p-5 transition sm:p-6 ${
                    !notification.read
                      ? "bg-ameltan/5"
                      : "bg-white"
                  }`}
                >

                  <div className="flex gap-4">

                    {/* ICON */}
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                        notification.read
                          ? "bg-gray-100"
                          : "bg-ameltan/10"
                      }`}
                    >
                      📢
                    </div>

                    {/* CONTENT */}
                    <div className="min-w-0 flex-1">

                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">

                        <div className="flex items-center gap-2">

                          <h3 className="font-bold text-gray-900">
                            {notification.title}
                          </h3>

                          {!notification.read && (
                            <span className="h-2 w-2 rounded-full bg-red-500" />
                          )}

                        </div>

                        <span className="shrink-0 text-xs text-gray-400">
                          {formatDate(notification.createdAt)}
                        </span>

                      </div>

                      <p className="mt-2 text-sm leading-6 text-gray-600">
                        {notification.message}
                      </p>

                      {/* ACTIONS */}
                      <div className="mt-4 flex flex-wrap items-center gap-4">

                        <Link
                          to={notification.link}
                          onClick={() => markAsRead(notification.id)}
                          className="text-sm font-bold text-ameltan hover:underline"
                        >
                          View update →
                        </Link>

                        {!notification.read && (
                          <button
                            type="button"
                            onClick={() => markAsRead(notification.id)}
                            className="text-sm font-semibold text-gray-500 hover:text-gray-900"
                          >
                            Mark as read
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() =>
                            removeNotification(notification.id)
                          }
                          className="text-sm font-semibold text-gray-400 hover:text-red-600"
                        >
                          Remove
                        </button>

                      </div>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

        {/* SECURITY / INFO */}
        <div className="mt-6 rounded-xl border border-ameltan/10 bg-white p-5">

          <div className="flex gap-3">

            <span className="text-lg">
              🔒
            </span>

            <p className="text-xs leading-5 text-gray-500">
              Notifications shown in your member account are intended for
              your personal AMELTAN membership information.
            </p>

          </div>

        </div>

      </div>
    </main>
  );
};

export default Notifications;