import { useNotifications } from "./context/NotificationContext";

const Announcements = () => {
  const { notifications, markAsRead } = useNotifications();

  // Only show announcement-related notifications
  const announcements = notifications.filter(
    (notification) =>
      notification.type === "announcement" ||
      notification.type === "membership" ||
      notification.type === "event" ||
      notification.type === "important"
  );

  // Format notification date
  const formatDate = (date) => {
    if (!date) return "";

    const announcementDate = new Date(date);

    if (Number.isNaN(announcementDate.getTime())) {
      return "";
    }

    return announcementDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get announcement label
  const getTypeLabel = (type) => {
    switch (type) {
      case "membership":
        return "Membership Update";

      case "event":
        return "Event Update";

      case "important":
        return "Important Notice";

      case "announcement":
      default:
        return "General Announcement";
    }
  };

  // Get announcement icon
  const getTypeIcon = (type) => {
    switch (type) {
      case "membership":
        return "🪪";

      case "event":
        return "📅";

      case "important":
        return "⚠️";

      case "announcement":
      default:
        return "📢";
    }
  };

  // Handle opening an announcement
  const handleAnnouncementClick = (id) => {
    markAsRead(id);
  };

  return (
    <main className="min-h-screen w-full bg-ameltan-pale">

      <div className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-14">

        {/* =========================
            PAGE HEADER
        ========================= */}
        <section className="mb-10">

          <span className="text-sm font-bold uppercase tracking-[0.2em] text-ameltan">
            Member Communication
          </span>

          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Announcements
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
            Stay informed with the latest AMELTAN announcements,
            membership updates, events, and important notices.
          </p>

        </section>

        {/* =========================
            ANNOUNCEMENT COUNT
        ========================= */}
        <section className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Latest Updates
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {announcements.length === 0
                ? "No announcements available."
                : `${announcements.length} announcement${
                    announcements.length !== 1 ? "s" : ""
                  } available`}
            </p>
          </div>

        </section>

        {/* =========================
            EMPTY STATE
        ========================= */}
        {announcements.length === 0 ? (
          <section className="w-full bg-white p-8 text-center shadow-sm sm:p-12">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-ameltan/10 text-2xl">
              📢
            </div>

            <h2 className="mt-6 text-xl font-bold text-gray-900">
              No announcements yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              There are currently no announcements from AMELTAN.
              New updates will appear here when they are published.
            </p>

          </section>
        ) : (

          /* =========================
              ANNOUNCEMENT LIST
          ========================= */
          <section className="space-y-5">

            {announcements.map((announcement) => (

              <article
                key={announcement.id}
                onClick={() =>
                  handleAnnouncementClick(announcement.id)
                }
                className={`group cursor-pointer bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-8 ${
                  !announcement.read
                    ? "border-l-4 border-ameltan"
                    : "border-l-4 border-transparent"
                }`}
              >

                <div className="flex flex-col gap-5 sm:flex-row">

                  {/* =========================
                      ICON
                  ========================= */}
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-ameltan/10 text-2xl">
                    {getTypeIcon(announcement.type)}
                  </div>

                  {/* =========================
                      CONTENT
                  ========================= */}
                  <div className="min-w-0 flex-1">

                    {/* TOP ROW */}
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">

                      <div>

                        <div className="flex flex-wrap items-center gap-2">

                          <span className="inline-flex rounded-full bg-ameltan/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-ameltan">
                            {getTypeLabel(announcement.type)}
                          </span>

                          {!announcement.read && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-3 py-1 text-[11px] font-bold text-red-600">
                              <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                              New
                            </span>
                          )}

                        </div>

                        <h3 className="mt-3 text-xl font-bold text-gray-900 transition-colors group-hover:text-ameltan sm:text-2xl">
                          {announcement.title}
                        </h3>

                      </div>

                      {/* DATE */}
                      <div className="shrink-0">

                        <p className="text-xs font-medium text-gray-400">
                          {formatDate(announcement.createdAt)}
                        </p>

                      </div>

                    </div>

                    {/* MESSAGE */}
                    <p className="mt-4 max-w-4xl text-sm leading-7 text-gray-600 sm:text-base">
                      {announcement.message}
                    </p>

                    {/* FOOTER */}
                    <div className="mt-6 flex flex-col gap-3 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">

                      <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
                        <span>AMELTAN</span>
                        <span>•</span>
                        <span>
                          {formatDate(announcement.createdAt)}
                        </span>
                      </div>

                      {!announcement.read && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            markAsRead(announcement.id);
                          }}
                          className="text-left text-xs font-bold text-ameltan hover:underline sm:text-right"
                        >
                          Mark as read →
                        </button>
                      )}

                    </div>

                  </div>

                </div>

              </article>

            ))}

          </section>

        )}

      </div>

    </main>
  );
};

export default Announcements;