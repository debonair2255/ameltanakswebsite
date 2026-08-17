import { Link } from "react-router-dom";

const Events = () => {
  const events = [
    {
      title: "Professional Training & Development",
      type: "Training",
      description:
        "Professional learning opportunities designed to strengthen knowledge, practical skills, and continuous development.",
      status: "Upcoming",
    },
    {
      title: "AMELTAN Professional Conference",
      type: "Conference",
      description:
        "An opportunity for professionals to connect, learn, share experiences, and discuss issues affecting the profession.",
      status: "Upcoming",
    },
    {
      title: "Community Health Outreach",
      type: "Community",
      description:
        "Community-focused activities that promote health awareness and meaningful engagement beyond the laboratory.",
      status: "Upcoming",
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
              Stay Connected
            </span>

            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Events & Activities
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
              Discover professional activities, learning opportunities,
              conferences, meetings, and community initiatives.
            </p>

          </div>

        </div>
      </section>

      {/* =========================
          FEATURED EVENT
      ========================= */}
      <section className="bg-ameltan-pale py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">

            {/* LEFT */}
            <div>

              <span className="inline-flex rounded-full bg-ameltan-light px-4 py-2 text-xs font-bold uppercase tracking-wider text-ameltan">
                Featured Activity
              </span>

              <h2 className="mt-5 text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl">
                Learn. Connect. Grow.
              </h2>

              <p className="mt-5 text-base leading-7 text-gray-600 sm:text-lg">
                AMELTAN activities provide opportunities for professionals
                to strengthen their skills, exchange knowledge, build
                relationships, and contribute to the development of the
                profession.
              </p>

              <Link
                to="/register"
                className="mt-7 inline-flex items-center rounded-lg bg-ameltan px-6 py-3.5 text-sm font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-ameltan-dark hover:shadow-lg"
              >
                Become a Member
                <span className="ml-2">→</span>
              </Link>

            </div>

            {/* RIGHT FEATURE CARD */}
            <div className="rounded-2xl bg-ameltan p-7 sm:p-10">

              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white text-ameltan">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
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

              <h3 className="mt-6 text-2xl font-bold text-white sm:text-3xl">
                Professional activities that matter.
              </h3>

              <p className="mt-4 leading-7 text-white/80">
                From educational activities to community engagement,
                every activity creates an opportunity for connection
                and professional growth.
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* =========================
          UPCOMING EVENTS
      ========================= */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

            <div>
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-ameltan">
                What's Happening
              </span>

              <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Upcoming Events
              </h2>
            </div>

          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {events.map((event) => (
              <article
                key={event.title}
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >

                {/* TOP */}
                <div className="h-2 bg-ameltan" />

                <div className="p-7 sm:p-8">

                  <div className="flex items-center justify-between gap-3">

                    <span className="rounded-full bg-ameltan-light px-3 py-1.5 text-xs font-bold text-ameltan">
                      {event.type}
                    </span>

                    <span className="text-xs font-semibold text-gray-400">
                      {event.status}
                    </span>

                  </div>

                  <h3 className="mt-6 text-xl font-bold leading-snug text-gray-900">
                    {event.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-gray-600">
                    {event.description}
                  </p>

                  <div className="mt-7 border-t border-gray-100 pt-5">

                    <Link
                      to="/register"
                      className="inline-flex items-center text-sm font-bold text-ameltan"
                    >
                      Register / Learn More
                      <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </Link>

                  </div>

                </div>

              </article>
            ))}

          </div>

        </div>
      </section>

      {/* =========================
          EVENT PARTICIPATION
      ========================= */}
      <section className="bg-ameltan-pale py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

          <div className="grid gap-6 md:grid-cols-3">

            {[
              {
                title: "Learn",
                text: "Take part in activities that support continuous professional learning.",
              },
              {
                title: "Connect",
                text: "Meet colleagues, exchange ideas, and build professional relationships.",
              },
              {
                title: "Contribute",
                text: "Participate in activities that support the profession and wider community.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-white p-7 shadow-sm sm:p-8"
              >
                <h3 className="text-xl font-bold text-gray-900">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-600 sm:text-base">
                  {item.text}
                </p>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* =========================
          CTA
      ========================= */}
      <section className="bg-ameltan py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">

          <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            Don't miss what's happening.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
            Become part of the AMELTAN community and stay connected
            with professional activities and opportunities.
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

export default Events;