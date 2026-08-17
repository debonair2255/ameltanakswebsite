import Hero from "./components/hero";

const Home = () => {
  const features = [
    {
      title: "Professional Development",
      description:
        "Supporting continuous learning, practical skills, and professional growth for medical laboratory technicians and assistants.",
    },
    {
      title: "Certification & Advocacy",
      description:
        "Promoting professional standards, ethical practice, recognition, and the interests of medical laboratory professionals.",
    },
    {
      title: "Community Outreach",
      description:
        "Connecting laboratory professionals with communities through health awareness, education, and meaningful engagement.",
    },
  ];

  return (
    <main className="w-full overflow-hidden">

      {/* =========================
          HERO
      ========================= */}
      <Hero />

      {/* =========================
          INTRODUCTION
      ========================= */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">

          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">

            {/* LEFT */}
            <div>
              <span className="inline-block text-sm font-bold uppercase tracking-[0.2em] text-ameltan">
                Who We Are
              </span>

              <h2 className="mt-3 text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
                Building stronger laboratory professionals.
              </h2>

              <p className="mt-5 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
                AMELTAN is committed to supporting Medical Laboratory
                Technicians and Assistants by creating opportunities for
                professional development, collaboration, advocacy, and
                community service.
              </p>

              <p className="mt-4 max-w-xl text-base leading-7 text-gray-600">
                Through knowledge sharing and professional engagement, we
                strive to contribute to a stronger and more respected
                medical laboratory profession.
              </p>
            </div>

            {/* RIGHT */}
            <div className="w-full">
              <div className="rounded-2xl bg-ameltan-light p-6 sm:p-8 lg:p-10">

                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-ameltan text-2xl font-bold text-white shadow-lg">
                  +
                </div>

                <h3 className="mt-6 text-2xl font-bold text-gray-900">
                  Excellence in Laboratory Practice
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
                  We encourage professionalism, continuous improvement,
                  ethical conduct, and collaboration among laboratory
                  professionals.
                </p>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================
          OUR FOCUS
      ========================= */}
      <section className="w-full bg-ameltan-pale py-16 sm:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">

          {/* SECTION HEADER */}
          <div className="mx-auto max-w-2xl text-center">

            <span className="text-sm font-bold uppercase tracking-[0.2em] text-ameltan">
              What We Do
            </span>

            <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Our Professional Focus
            </h2>

            <p className="mt-4 text-base leading-7 text-gray-600 sm:text-lg">
              We focus on areas that strengthen our members and contribute
              positively to healthcare and society.
            </p>

          </div>

          {/* FEATURE CARDS */}
          <div className="mt-12 grid w-full gap-6 md:grid-cols-3">

            {features.map((feature) => (
              <div
                key={feature.title}
                className="group w-full rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-ameltan/20 hover:shadow-xl sm:p-8"
              >

                <div className="h-px w-16 bg-gray-200 transition-all duration-300 group-hover:w-24 group-hover:bg-ameltan" />

                <h3 className="mt-7 text-xl font-bold text-gray-900">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-600 sm:text-base">
                  {feature.description}
                </p>

                <div className="mt-6 text-sm font-bold text-ameltan">
                  Learn more →
                </div>

              </div>
            ))}

          </div>
        </div>
      </section>

      {/* =========================
          CALL TO ACTION
      ========================= */}
      <section className="w-full bg-ameltan py-16 sm:py-20">
        <div className="mx-auto w-full max-w-5xl px-5 text-center sm:px-8">

          <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            Be part of a stronger professional community.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/85 sm:text-lg">
            Connect with fellow professionals, grow your skills, and
            contribute to the advancement of medical laboratory practice.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

            <a
              href="/register"
              className="inline-flex items-center justify-center rounded-lg bg-white px-7 py-3.5 text-sm font-bold text-ameltan transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:text-base"
            >
              Join AMELTAN
            </a>

            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg border border-white/60 px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-white hover:text-ameltan sm:text-base"
            >
              Contact Us
            </a>

          </div>

        </div>
      </section>

    </main>
  );
};

export default Home;