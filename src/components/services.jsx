import { Link } from "react-router-dom";

const Services = () => {
  const services = [
    {
      title: "Professional Development",
      description:
        "Access opportunities designed to strengthen professional knowledge, practical skills, and career growth.",
    },
    {
      title: "Training & Workshops",
      description:
        "Participate in educational programs, workshops, seminars, and practical learning opportunities.",
    },
    {
      title: "Advocacy & Representation",
      description:
        "Promoting the interests, recognition, and professional development of Medical Laboratory Technicians and Assistants.",
    },
    {
      title: "Continuing Education",
      description:
        "Encouraging continuous learning and knowledge development to support quality laboratory practice.",
    },
    {
      title: "Professional Networking",
      description:
        "Connect with colleagues, exchange knowledge, share experiences, and build meaningful professional relationships.",
    },
    {
      title: "Community Outreach",
      description:
        "Supporting health education and community-focused activities that contribute to better healthcare awareness.",
    },
  ];

  return (
    <main className="overflow-hidden">

      {/* =========================
          PAGE HEADER
      ========================= */}
      <section className="bg-white py-14 sm:py-18 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-3xl">

            <span className="text-sm font-bold uppercase tracking-[0.2em] text-ameltan">
              What We Do
            </span>

            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Our Services
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
              Supporting professional growth, collaboration, advocacy, and
              meaningful engagement within the medical laboratory community.
            </p>

          </div>
        </div>
      </section>

      {/* =========================
          SERVICES
      ========================= */}
      <section className="bg-ameltan-pale py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {services.map((service) => (
              <article
                key={service.title}
                className="group rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-ameltan/20 hover:shadow-xl sm:p-8"
              >

                {/* TITLE */}
                <h2 className="mt-7 text-xl font-bold text-gray-900">
                  {service.title}
                </h2>

                {/* DESCRIPTION */}
                <p className="mt-3 text-sm leading-7 text-gray-600 sm:text-base">
                  {service.description}
                </p>

              </article>
            ))}

          </div>

        </div>
      </section>

      {/* =========================
          OUR APPROACH
      ========================= */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">

            {/* LEFT CONTENT */}
            <div>

              <span className="text-sm font-bold uppercase tracking-[0.2em] text-ameltan">
                Our Approach
              </span>

              <h2 className="mt-3 text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl">
                Creating opportunities for professional growth.
              </h2>

              <p className="mt-5 text-base leading-7 text-gray-600 sm:text-lg">
                Our activities are designed to help members continue learning,
                connect with other professionals, and contribute positively to
                the medical laboratory profession.
              </p>

              {/* FEATURES */}
              <div className="mt-8 space-y-4">

                {[
                  "Continuous professional learning",
                  "Collaboration and knowledge sharing",
                  "Professional advocacy",
                  "Community engagement",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >

                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ameltan text-xs font-bold text-white">
                      ✓
                    </span>

                    <span className="text-sm font-medium text-gray-700 sm:text-base">
                      {item}
                    </span>

                  </div>
                ))}

              </div>

            </div>

            {/* RIGHT FEATURE CARD */}
            <div className="rounded-2xl bg-ameltan p-7 sm:p-10">

              <div className="text-4xl font-extrabold tracking-tight text-white/20 sm:text-5xl">
                AMELTAN
              </div>

              <h3 className="mt-6 text-2xl font-bold text-white sm:text-3xl">
                Strengthening the profession together.
              </h3>

              <p className="mt-4 leading-7 text-white/80">
                Professional growth becomes stronger when people learn,
                collaborate, and work toward shared goals.
              </p>

              <Link
                to="/register"
                className="mt-7 inline-flex items-center rounded-lg bg-white px-6 py-3 text-sm font-bold text-ameltan transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                Become a Member

                <span className="ml-2 transition-transform duration-300">
                  →
                </span>
              </Link>

            </div>

          </div>

        </div>
      </section>

      {/* =========================
          CALL TO ACTION
      ========================= */}
      <section className="bg-ameltan-pale py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">

          <span className="text-sm font-bold uppercase tracking-[0.2em] text-ameltan">
            Get Involved
          </span>

          <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
            Be part of the professional community.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
            Connect with fellow Medical Laboratory Technicians and Assistants,
            develop your skills, and contribute to the advancement of the
            profession.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

            <Link
              to="/register"
              className="inline-flex items-center justify-center rounded-lg bg-ameltan px-7 py-3.5 text-sm font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-ameltan-dark hover:shadow-lg sm:text-base"
            >
              Join AMELTAN

              <span className="ml-2">
                →
              </span>
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-lg border border-ameltan px-7 py-3.5 text-sm font-bold text-ameltan transition-all duration-300 hover:bg-ameltan hover:text-white sm:text-base"
            >
              Contact Us
            </Link>

          </div>

        </div>
      </section>

    </main>
  );
};

export default Services;