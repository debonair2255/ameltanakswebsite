import { Link } from "react-router-dom";

const About = () => {
  const values = [
    {
      title: "Professionalism",
      description:
        "Encouraging high standards of professional conduct, competence, and responsibility.",
    },
    {
      title: "Excellence",
      description:
        "Promoting continuous improvement, quality practice, and professional development.",
    },
    {
      title: "Integrity",
      description:
        "Supporting ethical conduct, accountability, honesty, and respect in professional practice.",
    },
    {
      title: "Collaboration",
      description:
        "Building meaningful relationships among members and other stakeholders in healthcare.",
    },
  ];

  return (
    <main>
      {/* =========================
          PAGE HEADER
      ========================= */}
      <section className="bg-ameltan py-16 sm:py-20 lg:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-white/70">
              About Us
            </span>

            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              About AMELTAN
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-white/85 sm:text-lg sm:leading-8">
              Promoting professionalism, excellence, and ethical practice
              among Medical Laboratory Technicians and Assistants.
            </p>
          </div>
        </div>
      </section>

      {/* =========================
          INTRODUCTION
      ========================= */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">

            <div>
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-ameltan">
                Who We Are
              </span>

              <h2 className="mt-3 text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl">
                Supporting the people behind quality laboratory services.
              </h2>

              <div className="mt-6 space-y-4 text-base leading-7 text-gray-600 sm:text-lg">
                <p>
                  AMELTAN represents Medical Laboratory Technicians and
                  Assistants, bringing professionals together around
                  common goals of professional growth, ethical practice,
                  and excellence.
                </p>

                <p>
                  We provide a platform for members to connect, learn,
                  collaborate, and contribute meaningfully to the medical
                  laboratory profession and the wider healthcare system.
                </p>
              </div>
            </div>

            {/* HIGHLIGHT */}
            <div className="rounded-2xl bg-ameltan-light p-7 sm:p-9 lg:p-10">
              
              <h3 className="mt-6 text-2xl font-bold text-gray-900">
                Our Commitment
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                We are committed to strengthening professional capacity,
                encouraging ethical standards, supporting members, and
                promoting the importance of quality medical laboratory
                practice.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* =========================
          MISSION & VISION
      ========================= */}
      <section className="bg-ameltan-pale py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

          <div className="grid gap-6 md:grid-cols-2">

            {/* MISSION */}
            <div className="rounded-2xl bg-white p-7 shadow-sm sm:p-9">
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-ameltan">
                Our Mission
              </span>

              <h2 className="mt-3 text-2xl font-extrabold text-gray-900 sm:text-3xl">
                Advancing professional capacity
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                To promote professional development, ethical practice,
                collaboration, and continuous improvement among Medical
                Laboratory Technicians and Assistants.
              </p>
            </div>

            {/* VISION */}
            <div className="rounded-2xl bg-ameltan p-7 shadow-sm sm:p-9">
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-white/70">
                Our Vision
              </span>

              <h2 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl">
                A stronger and respected profession
              </h2>

              <p className="mt-4 leading-7 text-white/80">
                To contribute to a professional community recognized for
                competence, integrity, excellence, and meaningful
                contribution to healthcare.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* =========================
          CORE VALUES
      ========================= */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-ameltan">
              What Guides Us
            </span>

            <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Our Core Values
            </h2>

            <p className="mt-4 text-base leading-7 text-gray-600 sm:text-lg">
              The principles that guide our professional community and
              our commitment to quality practice.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-ameltan/20 hover:shadow-xl"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-ameltan-light text-sm font-extrabold text-ameltan">
                  0{index + 1}
                </div>

                <h3 className="mt-6 text-xl font-bold text-gray-900">
                  {value.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================
          CALL TO ACTION
      ========================= */}
      <section className="bg-ameltan py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">

          <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            Grow with the professional community.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
            Connect with fellow professionals and take part in the
            continued development of medical laboratory practice.
          </p>

          <Link
            to="/register"
            className="mt-8 inline-flex items-center justify-center rounded-lg bg-white px-7 py-3.5 text-sm font-bold text-ameltan shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:text-base"
          >
            Join AMELTAN
          </Link>

        </div>
      </section>
    </main>
  );
};

export default About;