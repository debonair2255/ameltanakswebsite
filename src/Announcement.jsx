import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useNotifications } from "./context/NotificationContext";
const Announcements = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const { addNotification } = useNotifications();

  // Notify user when Announcements page is loaded
  useEffect(() => {
    addNotification({
      title: "New Announcement",
      message: "A new AMELTAN announcement has been posted.",
      type: "announcement",
      link: "/announcements",
    });
  }, [addNotification]);

  // Temporary announcement data.
  // This will later come from the backend/database.
  const announcements = [
    {
      id: 1,
      title: "AMELTAN General Membership Meeting",
      description:
        "Members are encouraged to attend the upcoming general membership meeting. Important association matters and updates will be discussed.",
      category: "Meeting",
      date: "17 August 2026",
      priority: "Important",
    },
    {
      id: 2,
      title: "Membership Registration and Renewal",
      description:
        "Members are reminded to ensure that their membership information is accurate and up to date.",
      category: "Membership",
      date: "15 August 2026",
      priority: "Normal",
    },
    {
      id: 3,
      title: "Professional Development Programme",
      description:
        "AMELTAN members will receive information about upcoming professional development and training opportunities.",
      category: "Training",
      date: "12 August 2026",
      priority: "Normal",
    },
    {
      id: 4,
      title: "Important Notice to Members",
      description:
        "Members are advised to regularly check the official AMELTAN platform for verified announcements and association updates.",
      category: "Notice",
      date: "10 August 2026",
      priority: "Important",
    },
  ];

  // =========================
  // FILTER ANNOUNCEMENTS
  // =========================
  const filteredAnnouncements = useMemo(() => {
    return announcements.filter((announcement) => {
      const matchesSearch =
        announcement.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        announcement.description
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || announcement.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const categories = [
    "All",
    "Meeting",
    "Membership",
    "Training",
    "Notice",
  ];

  return (
    <main className="min-h-screen bg-ameltan-pale px-5 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">

        {/* =========================
            HEADER
        ========================= */}
        <div className="mb-8">

          <Link
            to="/dashboard"
            className="inline-flex items-center text-sm font-semibold text-ameltan transition hover:gap-2"
          >
            ← Back to Dashboard
          </Link>

          <div className="mt-5">

            <p className="text-sm font-bold uppercase tracking-[0.15em] text-ameltan">
              Member Information
            </p>

            <h1 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Announcements
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
              Stay informed about important AMELTAN activities, meetings,
              programmes and official notices.
            </p>

          </div>

        </div>

        {/* =========================
            SEARCH + FILTER
        ========================= */}
        <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            {/* SEARCH */}
            <div className="relative w-full lg:max-w-md">

              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                🔎
              </span>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search announcements..."
                className="w-full rounded-lg border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-ameltan focus:bg-white focus:ring-2 focus:ring-ameltan/10"
              />

            </div>

            {/* CATEGORY FILTER */}
            <div className="flex gap-2 overflow-x-auto pb-1">

              {categories.map((item) => (

                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={`whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                    category === item
                      ? "bg-ameltan text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-ameltan/10 hover:text-ameltan"
                  }`}
                >
                  {item}
                </button>

              ))}

            </div>

          </div>

        </section>

        {/* =========================
            RESULTS
        ========================= */}
        <div className="mt-8">

          <div className="mb-5 flex items-center justify-between">

            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Latest Updates
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {filteredAnnouncements.length} announcement
                {filteredAnnouncements.length !== 1 ? "s" : ""} found
              </p>
            </div>

          </div>

          {/* =========================
              ANNOUNCEMENT LIST
          ========================= */}
          {filteredAnnouncements.length > 0 ? (

            <div className="grid gap-5 lg:grid-cols-2">

              {filteredAnnouncements.map((announcement) => (

                <article
                  key={announcement.id}
                  className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >

                  {/* TOP */}
                  <div className="flex items-start justify-between gap-4">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ameltan/10 text-lg">
                      📢
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        announcement.priority === "Important"
                          ? "bg-red-50 text-red-600"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {announcement.priority}
                    </span>

                  </div>

                  {/* CATEGORY */}
                  <div className="mt-5 flex items-center gap-3 text-xs font-semibold">

                    <span className="rounded-full bg-ameltan/10 px-3 py-1 text-ameltan">
                      {announcement.category}
                    </span>

                    <span className="text-gray-400">
                      {announcement.date}
                    </span>

                  </div>

                  {/* TITLE */}
                  <h3 className="mt-4 text-lg font-bold leading-7 text-gray-900 transition group-hover:text-ameltan">
                    {announcement.title}
                  </h3>

                  {/* DESCRIPTION */}
                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {announcement.description}
                  </p>

                  {/* ACTION */}
                  <button
                    type="button"
                    className="mt-5 inline-flex items-center text-sm font-bold text-ameltan"
                  >
                    Read announcement
                    <span className="ml-1 transition group-hover:ml-2">
                      →
                    </span>
                  </button>

                </article>

              ))}

            </div>

          ) : (

            /* =========================
                EMPTY STATE
            ========================= */
            <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-2xl">
                🔎
              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-900">
                No announcements found
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                Try changing your search term or selecting another category.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
                className="mt-5 rounded-lg bg-ameltan px-5 py-3 text-sm font-bold text-white transition hover:bg-ameltan-dark"
              >
                Clear Filters
              </button>

            </div>

          )}

        </div>

        {/* =========================
            MEMBER NOTICE
        ========================= */}
        <section className="mt-10 rounded-2xl border border-ameltan/10 bg-white p-6 shadow-sm">

          <div className="flex gap-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ameltan/10">
              🔔
            </div>

            <div>

              <h3 className="font-bold text-gray-900">
                Stay Updated
              </h3>

              <p className="mt-1 text-sm leading-6 text-gray-600">
                Check this section regularly for official AMELTAN
                announcements and important membership information.
              </p>

            </div>

          </div>

        </section>

      </div>
    </main>
  );
};

export default Announcements;