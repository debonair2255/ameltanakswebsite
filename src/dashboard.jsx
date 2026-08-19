import { Link } from "react-router-dom";

const Dashboard = () => {
  const dashboardItems = [
    {
      title: "My Profile",
      description:
        "View and manage your personal membership information.",
      icon: "👤",
      link: "/profile",
    },
    {
      title: "Membership",
      description:
        "View your membership status and professional information.",
      icon: "🪪",
      link: "/membership",
    },
    {
      title: "Events",
      description:
        "Stay updated with upcoming AMELTAN programmes and events.",
      icon: "📅",
      link: "/events",
    },
    {
      title: "Announcements",
      description:
        "Read important updates and announcements from AMELTAN.",
      icon: "📢",
      link: "/announcements",
    },
    {
      title: "State Chapters",
      description:
        "Access your state chapter information and activities.",
      icon: "🏛️",
      link: "/state-chapters",
    },
  ];

  return (
    <main className="min-h-screen w-full bg-ameltan-pale">

      {/* =========================
          DASHBOARD CONTENT
      ========================= */}
      <div className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">

        {/* =========================
            WELCOME SECTION
        ========================= */}
        <section className="w-full bg-ameltan px-6 py-8 text-white sm:px-8 sm:py-10 lg:px-12 lg:py-12">

          <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">

            <div className="max-w-3xl">

              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-white/70">
                Member Dashboard
              </p>

              <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                Welcome Back 
              </h1>

              <p className="mt-4 text-sm leading-7 text-white/80 sm:text-base lg:text-lg">
                Welcome to your AMELTAN member area. Manage your membership,
                stay informed, and access important association services
                from one place.
              </p>

            </div>

            {/* PROFILE ICON */}
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white/15 text-2xl backdrop-blur-sm sm:h-20 sm:w-20">
              👤
            </div>

          </div>

        </section>

        {/* =========================
            QUICK STATUS
        ========================= */}
        <section className="mt-8 grid w-full gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {/* MEMBERSHIP STATUS */}
          <div className="w-full bg-white p-6">

            <p className="text-sm font-medium text-gray-500">
              Membership Status
            </p>

            <div className="mt-4 flex items-center gap-3">

              <span className="h-3 w-3 rounded-full bg-green-500" />

              <span className="font-bold text-gray-900">
                Active
              </span>

            </div>

          </div>

          {/* MEMBER NUMBER */}
          <div className="w-full bg-white p-6">

            <p className="text-sm font-medium text-gray-500">
              Member Number
            </p>

            <p className="mt-4 font-bold tracking-wide text-gray-900">
              MLT12345
            </p>

          </div>

          {/* ACCOUNT */}
          <div className="w-full bg-white p-6">

            <p className="text-sm font-medium text-gray-500">
              Account
            </p>

            <p className="mt-4 font-bold text-ameltan">
              Verified Member
            </p>

          </div>

        </section>

        {/* =========================
            NOTIFICATIONS
        ========================= */}
        <section className="mt-10 w-full bg-white p-6 sm:p-8">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-start gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-ameltan/10 text-xl">
                🔔
              </div>

              <div>

                <div className="flex flex-wrap items-center gap-3">

                  <h2 className="text-xl font-bold text-gray-900">
                    Notifications
                  </h2>

                  <span className="rounded-full bg-ameltan px-2.5 py-1 text-xs font-bold text-white">
                    New
                  </span>

                </div>

                <p className="mt-1 text-sm leading-6 text-gray-500">
                  Check the latest updates, announcements, and important
                  messages from AMELTAN.
                </p>

              </div>

            </div>

            <Link
              to="/notifications"
              className="inline-flex items-center justify-center text-sm font-bold text-ameltan transition hover:translate-x-1"
            >
              View Notifications
              <span className="ml-2">
                →
              </span>
            </Link>

          </div>

        </section>

        {/* =========================
            MEMBER SERVICES
        ========================= */}
        <section className="mt-10 w-full">

          <div className="mb-6">

            <p className="text-sm font-bold uppercase tracking-[0.2em] text-ameltan">
              Member Area
            </p>

            <h2 className="mt-2 text-2xl font-extrabold text-gray-900 sm:text-3xl">
              Member Services
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500 sm:text-base">
              Everything you need to manage your AMELTAN membership.
            </p>

          </div>

          {/* SERVICE CARDS */}
          <div className="grid w-full gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {dashboardItems.map((item) => (

              <Link
                key={item.title}
                to={item.link}
                className="group w-full bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-7"
              >

                {/* ICON */}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ameltan/10 text-xl transition-all duration-300 group-hover:bg-ameltan group-hover:text-white">
                  {item.icon}
                </div>

                {/* TITLE */}
                <h3 className="mt-6 text-lg font-bold text-gray-900">
                  {item.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {item.description}
                </p>

                {/* ACTION */}
                <div className="mt-6 text-sm font-bold text-ameltan transition-all duration-300 group-hover:translate-x-1">
                  Open
                  <span className="ml-2">
                    →
                  </span>
                </div>

              </Link>

            ))}

          </div>

        </section>

        {/* =========================
            MEMBER NOTICE
        ========================= */}
        <section className="mt-10 w-full bg-white p-6 sm:p-8">

          <div className="flex items-start gap-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ameltan/10">
              📢
            </div>

            <div>

              <h3 className="font-bold text-gray-900">
                Member Notice
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600 sm:text-base">
                Keep your membership information up to date to ensure you
                receive important AMELTAN announcements and communications.
              </p>

              <Link
                to="/profile"
                className="mt-4 inline-flex text-sm font-bold text-ameltan hover:underline"
              >
                Update Profile
              </Link>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
};

export default Dashboard;