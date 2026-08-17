import { Link, Navigate } from "react-router-dom";

const StateChapters = () => {
  /*
    TEMPORARY AUTHENTICATION CHECK

    Later this will come from your real authentication system.
    Change this to false to test the locked page.
  */
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const chapters = [
    {
      name: "Akwa Ibom Chapter",
      status: "Active",
      description:
        "Connect with members, leadership and activities within the state chapter.",
      members: "Members Only",
    },
    {
      name: "Chapter Information",
      status: "Available",
      description:
        "View chapter information, leadership details and official updates.",
      members: "Member Access",
    },
    {
      name: "Chapter Announcements",
      status: "Available",
      description:
        "Stay informed about important chapter meetings, notices and activities.",
      members: "Member Access",
    },
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

            <div className="flex flex-wrap items-center gap-3">

              <p className="text-sm font-bold uppercase tracking-[0.15em] text-ameltan">
                Member Area
              </p>

              <span className="rounded-full bg-ameltan/10 px-3 py-1 text-xs font-bold text-ameltan">
                🔒 Members Only
              </span>

            </div>

            <h1 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              State Chapters
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
              Access chapter information, activities and official
              communications available to registered members.
            </p>

          </div>

        </div>

        {/* =========================
            MEMBER ACCESS BANNER
        ========================= */}
        <section className="mb-8 overflow-hidden rounded-2xl bg-ameltan p-6 text-white shadow-sm sm:p-8">

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

            <div className="max-w-2xl">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-xl">
                🔐
              </div>

              <h2 className="mt-5 text-2xl font-bold">
                Your Member Chapter Area
              </h2>

              <p className="mt-2 text-sm leading-6 text-white/75 sm:text-base">
                This section is reserved for registered AMELTAN members.
                Access chapter information and participate in member
                activities through your account.
              </p>

            </div>

            <div className="shrink-0 rounded-xl bg-white/10 p-5 backdrop-blur-sm">

              <p className="text-xs font-bold uppercase tracking-wider text-white/60">
                Access
              </p>

              <p className="mt-2 font-bold">
                Authenticated Member
              </p>

              <div className="mt-3 flex items-center gap-2 text-xs text-white/75">
                <span className="h-2 w-2 rounded-full bg-green-300" />
                Access Granted
              </div>

            </div>

          </div>

        </section>

        {/* =========================
            CHAPTER CARDS
        ========================= */}
        <section>

          <div className="mb-5">

            <h2 className="text-xl font-bold text-gray-900">
              Chapter Services
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Access services available to registered members.
            </p>

          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

            {chapters.map((chapter) => (

              <article
                key={chapter.name}
                className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >

                {/* ICON */}
                <div className="flex items-center justify-between">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ameltan/10 text-xl">
                    🏛️
                  </div>

                  <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
                    {chapter.status}
                  </span>

                </div>

                {/* CONTENT */}
                <h3 className="mt-5 text-lg font-bold text-gray-900 transition group-hover:text-ameltan">
                  {chapter.name}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {chapter.description}
                </p>

                {/* ACCESS */}
                <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-5">

                  <span className="text-xs font-semibold text-gray-400">
                    {chapter.members}
                  </span>

                  <button
                    type="button"
                    className="text-sm font-bold text-ameltan transition hover:translate-x-1"
                  >
                    View →
                  </button>

                </div>

              </article>

            ))}

          </div>

        </section>

        {/* =========================
            FUTURE CHAPTER FEATURES
        ========================= */}
        <section className="mt-10 rounded-2xl bg-white p-6 shadow-sm sm:p-8">

          <div className="flex gap-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ameltan/10">
              💡
            </div>

            <div>

              <h3 className="font-bold text-gray-900">
                Chapter Features
              </h3>

              <p className="mt-1 text-sm leading-6 text-gray-600">
                This area can later be connected to individual chapter
                accounts, allowing authorized chapter officers to publish
                announcements, manage activities and communicate with members.
              </p>

            </div>

          </div>

        </section>

      </div>
    </main>
  );
};

export default StateChapters;