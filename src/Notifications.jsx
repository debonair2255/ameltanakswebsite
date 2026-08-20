import { Link } from "react-router-dom";
import { notifications } from "./NotificationData";

const Notifications = () => {
  const unreadNotifications = notifications.filter(
    (notification) => !notification.read
  );

  return (
    <main className="min-h-screen w-full bg-ameltan-pale">

      <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 lg:px-10 lg:py-14">

        {/* HEADER */}
        <div className="mb-10">

          <span className="text-sm font-bold uppercase tracking-[0.2em] text-ameltan">
            Member Area
          </span>

          <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Notifications
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
                Stay informed about important AMELTAN updates,
                announcements, and membership information.
              </p>

            </div>

            {unreadNotifications.length > 0 && (
              <span className="inline-flex w-fit rounded-full bg-ameltan px-4 py-2 text-xs font-bold text-white">
                {unreadNotifications.length} Unread
              </span>
            )}

          </div>

        </div>

        {/* NOTIFICATIONS */}
        <div className="w-full bg-white">

          {notifications.length === 0 ? (

            <div className="px-6 py-16 text-center sm:px-10">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-ameltan/10 text-2xl">
                🔔
              </div>

              <h2 className="mt-5 text-xl font-bold text-gray-900">
                No notifications
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                You don't have any notifications at the moment.
              </p>

            </div>

          ) : (

            <div>

              {notifications.map((notification, index) => (

                <div
                  key={notification.id}
                  className={`flex gap-4 px-5 py-6 transition sm:px-8 ${
                    index !== notifications.length - 1
                      ? "border-b border-gray-100"
                      : ""
                  } ${
                    !notification.read
                      ? "bg-ameltan/5"
                      : "bg-white"
                  }`}
                >

                  {/* ICON */}
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ameltan/10 text-lg">
                    {notification.type === "welcome" && "👋"}

                    {notification.type === "membership" && "🪪"}

                    {notification.type === "announcement" && "📢"}
                  </div>

                  {/* CONTENT */}
                  <div className="min-w-0 flex-1">

                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">

                      <div className="flex items-center gap-2">

                        <h3 className="font-bold text-gray-900">
                          {notification.title}
                        </h3>

                        {!notification.read && (
                          <span className="h-2 w-2 rounded-full bg-ameltan" />
                        )}

                      </div>

                      <span className="text-xs font-medium text-gray-400">
                        {notification.date}
                      </span>

                    </div>

                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      {notification.message}
                    </p>

                    {!notification.read && (
                      <p className="mt-3 text-xs font-bold text-ameltan">
                        New notification
                      </p>
                    )}

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

        {/* BACK TO DASHBOARD */}
        <div className="mt-8">

          <Link
            to="/dashboard"
            className="inline-flex items-center text-sm font-bold text-ameltan transition hover:translate-x-1"
          >
            Back to Dashboard
          </Link>

        </div>

      </div>

    </main>
  );
};

export default Notifications;