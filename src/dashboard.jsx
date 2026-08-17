import { Link } from "react-router-dom";

const Dashboard = () => {
  const dashboardItems = [
    {
      title: "My Profile",
      description: "View and manage your personal membership information.",
      icon: "👤",
      link: "/profile",
    },
    {
      title: "Membership",
      description: "View your membership status and professional information.",
      icon: "🪪",
      link: "/membership",
    },
    {
      title: "Events",
      description: "Stay updated with upcoming AMELTAN programmes and events.",
      icon: "📅",
      link: "/events",
    },
    {
      title: "Announcements",
      description: "Read important updates and announcements from AMELTAN.",
      icon: "📢",
      link: "/announcements",
    },
    {
      title: "Resources",
      description: "Access useful materials and professional resources.",
      icon: "📚",
      link: "/resources",
    },
    {
      title: "State Chapters",
      description: "Access your state chapter information and activities.",
      icon: "🔒",
      link: "/state-chapters",
      locked: true,
    },
  ];

  return (
    <main className="min-h-screen bg-ameltan-pale px-5 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">

        {/* =========================
            WELCOME SECTION
        ========================= */}
        <section className="rounded-2xl bg-ameltan p-6 text-white shadow-sm sm:p-8 lg:p-10">

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-white/70">
                Member Dashboard
              </p>

              <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">
                Welcome Back 👋
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/80 sm:text-base">
                Welcome to your AMELTAN member area. Manage your membership,
                stay informed and access association resources from one place.
              </p>
            </div>

            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white/15 text-2xl backdrop-blur-sm">
              👤
            </div>

          </div>

        </section>

        {/* =========================
            QUICK STATUS
        ========================= */}
        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              Membership Status
            </p>

            <div className="mt-3 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-green-500" />

              <span className="font-bold text-gray-900">
                Active
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              Member Number
            </p>

            <p className="mt-3 font-bold tracking-wide text-gray-900">
              MLT12345
            </p>
          </div>

          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              Account
            </p>

            <p className="mt-3 font-bold text-ameltan">
              Verified Member
            </p>
          </div>

        </section>

        {/* =========================
            DASHBOARD FEATURES
        ========================= */}
        <section className="mt-10">

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Member Services
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Everything you need in one place.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {dashboardItems.map((item) => (

              <div
                key={item.title}
                className={`group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 ${
                  item.locked
                    ? "opacity-90"
                    : "hover:-translate-y-1 hover:shadow-lg"
                }`}
              >

                {/* ICON */}
                <div className="flex items-center justify-between">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ameltan/10 text-xl">
                    {item.icon}
                  </div>

                  {item.locked && (
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-500">
                      Members Only
                    </span>
                  )}

                </div>

                {/* CONTENT */}
                <h3 className="mt-5 text-lg font-bold text-gray-900">
                  {item.title}
                </h3>

                <p className="mt-2 min-h-[48px] text-sm leading-6 text-gray-500">
                  {item.description}
                </p>

                {/* ACTION */}
                {item.locked ? (

                  <div className="mt-5 flex items-center gap-2 text-sm font-bold text-gray-400">
                    🔒
                    <span>Authentication Required</span>
                  </div>

                ) : (

                  <Link
                    to={item.link}
                    className="mt-5 inline-flex items-center text-sm font-bold text-ameltan transition hover:gap-2"
                  >
                    Open
                    <span className="ml-1">
                      →
                    </span>
                  </Link>

                )}

              </div>

            ))}

          </div>

        </section>

        {/* =========================
            NOTICE
        ========================= */}
        <section className="mt-10 rounded-2xl border border-ameltan/10 bg-white p-6 shadow-sm">

          <div className="flex gap-4">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ameltan/10">
              📢
            </div>

            <div>
              <h3 className="font-bold text-gray-900">
                Member Notice
              </h3>

              <p className="mt-1 text-sm leading-6 text-gray-600">
                Keep your membership information up to date to ensure you
                receive important AMELTAN announcements and communications.
              </p>
            </div>

          </div>

        </section>

      </div>
    </main>
  );
};

export default Dashboard;