import { Link } from "react-router-dom";

const Community = () => {
  const communityAreas = [
    {
      title: "Professional Network",
      description:
        "Connect with Medical Laboratory Technicians and Assistants, share experiences, and build meaningful professional relationships.",
    },
    {
      title: "Knowledge Sharing",
      description:
        "Create opportunities for members to exchange ideas, practical experiences, and professional knowledge.",
    },
    {
      title: "Community Engagement",
      description:
        "Participate in activities that connect laboratory professionals with the communities they serve.",
    },
  ];

  return (
    <main className="overflow-hidden">

      {/* =========================
          PAGE HEADER
      ========================= */}
      <section className="bg-white py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

          <div className="max-w-3xl">

            <span className="text-sm font-bold uppercase tracking-[0.2em] text-ameltan">
              Our Community
            </span>

            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Connecting Professionals
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
              A professional community built around connection,
              collaboration, learning, and meaningful contribution.
            </p>

          </div>

        </div>
      </section>

      {/* =========================
          COMMUNITY INTRO
      ========================= */}
      <section className="bg-ameltan-pale py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">

            {/* LEFT */}
            <div>

              <span className="text-sm font-bold uppercase tracking-[0.2em] text-ameltan">
                Together We Grow
              </span>

              <h2 className="mt-3 text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl">
                A community where professionals connect and grow.
              </h2>

              <p className="mt-5 text-base leading-7 text-gray-600 sm:text-lg">
                AMELTAN provides a platform where Medical Laboratory
                Technicians and Assistants can connect with colleagues,
                exchange knowledge, participate in professional activities,
                and contribute to the development of the profession.
              </p>

              <p className="mt-4 text-base leading-7 text-gray-600">
                Strong professional communities are built through
                collaboration, shared knowledge, mutual support, and
                active participation.
              </p>

            </div>

            {/* RIGHT */}
            <div className="rounded-2xl bg-ameltan p-7 sm:p-10">

              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white text-2xl font-bold text-ameltan">
                +
              </div>

              <h3 className="mt-6 text-2xl font-bold text-white sm:text-3xl">
                Be part of the conversation.
              </h3>

              <p className="mt-4 leading-7 text-white/80">
                Connect with fellow professionals, participate in
                activities, and stay engaged with the AMELTAN community.
              </p>

              <Link
                to="/register"
                className="mt-7 inline-flex items-center rounded-lg bg-white px-6 py-3 text-sm font-bold text-ameltan transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                Join the Community
                <span className="ml-2">→</span>
              </Link>

            </div>

          </div>

        </div>
      </section>

      {/* =========================
          COMMUNITY AREAS
      ========================= */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

          <div className="mx-auto max-w-2xl text-center">

            <span className="text-sm font-bold uppercase tracking-[0.2em] text-ameltan">
              Get Involved
            </span>

            <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              What Community Means to Us
            </h2>

            <p className="mt-4 text-base leading-7 text-gray-600 sm:text-lg">
              Our community is built around opportunities for connection,
              knowledge, and meaningful participation.
            </p>

          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">

            {communityAreas.map((area) => (
              <article
                key={area.title}
                className="group rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-ameltan/20 hover:shadow-xl sm:p-8"
              >

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ameltan-light text-ameltan transition-all duration-300 group-hover:bg-ameltan group-hover:text-white">

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"
                    />

                    <circle
                      cx="9"
                      cy="7"
                      r="4"
                    />

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
                    />
                  </svg>

                </div>

                <h3 className="mt-7 text-xl font-bold text-gray-900">
                  {area.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-600 sm:text-base">
                  {area.description}
                </p>

              </article>
            ))}

          </div>

        </div>
      </section>

      {/* =========================
          COMMUNITY PARTICIPATION
      ========================= */}
      <section className="bg-ameltan-pale py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

          <div className="grid gap-6 md:grid-cols-2">

            {/* EVENTS */}
            <div className="rounded-2xl bg-white p-7 shadow-sm sm:p-9">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ameltan-light text-ameltan">

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <rect
                    width="18"
                    height="18"
                    x="3"
                    y="4"
                    rx="2"
                  />

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 2v4M8 2v4M3 10h18"
                  />
                </svg>

              </div>

              <h3 className="mt-6 text-2xl font-bold text-gray-900">
                Events & Activities
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                Stay connected with professional activities, meetings,
                training opportunities, conferences, and community
                initiatives.
              </p>

              <Link
                to="/events"
                className="mt-6 inline-flex items-center text-sm font-bold text-ameltan"
              >
                View Events
                <span className="ml-2 transition-transform duration-300 hover:translate-x-1">
                  →
                </span>
              </Link>

            </div>

            {/* ANNOUNCEMENTS */}
            <div className="rounded-2xl bg-white p-7 shadow-sm sm:p-9">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ameltan-light text-ameltan">

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 00-12 0v3.2a2 2 0 01-.6 1.4L4 17h5"
                  />

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 21h4"
                  />

                </svg>

              </div>

              <h3 className="mt-6 text-2xl font-bold text-gray-900">
                Announcements
              </h3>

              <p className="mt-3 leading-7 text-gray-600">
                Keep up with important information, professional updates,
                activities, and announcements from the association.
              </p>

              <Link
                to="/announcements"
                className="mt-6 inline-flex items-center text-sm font-bold text-ameltan"
              >
                View Announcements
                <span className="ml-2">
                  →
                </span>
              </Link>

            </div>

          </div>

        </div>
      </section>

      {/* =========================
          FINAL CTA
      ========================= */}
      <section className="bg-ameltan py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">

          <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            Your profession. Your community. Your future.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
            Become part of a professional community committed to learning,
            collaboration, and excellence.
          </p>

          <Link
            to="/register"
            className="mt-8 inline-flex items-center rounded-lg bg-white px-7 py-3.5 text-sm font-bold text-ameltan shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:text-base"
          >
            Join AMELTAN
            <span className="ml-2">→</span>
          </Link>

        </div>
      </section>

    </main>
  );
};

export default Community;