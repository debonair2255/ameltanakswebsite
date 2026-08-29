import { useState } from "react";
import { useAuth } from "./context/AuthContext";

const Contact = () => {
  const { isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Contact form:", formData);

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });

    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <main className="overflow-hidden">

      {/* =========================
          PAGE HEADER
      ========================= */}
      <section className="bg-white py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

          <div className="max-w-3xl">

            <span className="text-sm font-bold uppercase tracking-[0.2em] text-ameltan">
              Get In Touch
            </span>

            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Contact Us
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
              Have a question, enquiry, or something you'd like to share?
              We would be glad to hear from you.
            </p>

          </div>

        </div>
      </section>

      {/* =========================
          CONTACT AREA
      ========================= */}
      <section className="bg-ameltan-pale py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

          <div className="grid gap-8 lg:grid-cols-5 lg:gap-10">

            {/* =========================
                CONTACT INFORMATION
            ========================= */}
            <div className="lg:col-span-2">

              <div className="rounded-2xl bg-ameltan p-7 sm:p-9">

                <span className="text-sm font-bold uppercase tracking-[0.2em] text-white/70">
                  Contact Information
                </span>

                <h2 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl">
                  We'd love to hear from you.
                </h2>

                <p className="mt-4 leading-7 text-white/80">
                  Reach out to AMELTAN for professional enquiries,
                  membership information, activities, partnerships,
                  or general questions.
                </p>

                {/* PHONE */}
                <div className="mt-8 flex items-start gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 5a2 2 0 012-2h2.28a2 2 0 011.94 1.515l.57 2.28a2 2 0 01-.45 1.86l-1.5 1.5a16 16 0 006 6l1.5-1.5a2 2 0 011.86-.45l2.28.57A2 2 0 0121 16.72V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-white/60">
                      Phone
                    </p>

                    <p className="mt-1 text-sm font-medium text-white">
                      08067488551
                    </p>
                  </div>

                </div>

                {/* EMAIL */}
                <div className="mt-6 flex items-start gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 8l9 6 9-6"
                      />

                      <rect
                        width="18"
                        height="14"
                        x="3"
                        y="5"
                        rx="2"
                      />
                    </svg>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-white/60">
                      Email
                    </p>

                    <p className="mt-1 text-sm font-medium text-white">
                      info.ameltanaks.org@gmail.com
                    </p>
                  </div>

                </div>

                {/* LOCATION */}
                <div className="mt-6 flex items-start gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 21s7-4.35 7-11a7 7 0 10-14 0c0 6.65 7 11 7 11z"
                      />

                      <circle
                        cx="12"
                        cy="10"
                        r="2.5"
                      />
                    </svg>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-white/60">
                      Location
                    </p>

                    <p className="mt-1 text-sm font-medium text-white">
                      Medical and Health Workers Union Building, Ring Road 2, Uyo, Akwa Ibom State, Nigeria
                    </p>
                  </div>

                </div>

                {/* HOURS */}
                <div className="mt-8 border-t border-white/10 pt-7">

                  <p className="text-sm font-bold text-white">
                    Office Hours
                  </p>

                  <p className="mt-2 text-sm leading-6 text-white/70">
                    Monday – Friday
                    <br />
                    Professional enquiries are handled during working hours.
                  </p>

                </div>

              </div>

            </div>

            {/* =========================
                CONTACT FORM
            ========================= */}
            <div className="rounded-2xl bg-white p-7 shadow-sm sm:p-9 lg:col-span-3">

              <div>

                <span className="text-sm font-bold uppercase tracking-[0.2em] text-ameltan">
                  Send a Message
                </span>

                <h2 className="mt-3 text-2xl font-extrabold text-gray-900 sm:text-3xl">
                  How can we help?
                </h2>

                <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base">
                  Complete the form below and we'll get back to you.
                </p>

              </div>

              {/* SUCCESS MESSAGE */}
              {submitted && (
                <div className="mt-6 rounded-xl border border-green-100 bg-green-50 px-4 py-4 text-sm font-medium text-green-700">
                  Your message has been received. Thank you for contacting
                  AMELTAN.
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-5"
              >

                {/* NAME + EMAIL */}
                <div className="grid gap-5 sm:grid-cols-2">

                  <div>
                    <label
                      htmlFor="name"
                      className="text-sm font-semibold text-gray-700"
                    >
                      Full Name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                      className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-ameltan focus:ring-2 focus:ring-ameltan/10"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="text-sm font-semibold text-gray-700"
                    >
                      Email Address
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                      className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-ameltan focus:ring-2 focus:ring-ameltan/10"
                    />
                  </div>

                </div>

                {/* PHONE + SUBJECT */}
                <div className="grid gap-5 sm:grid-cols-2">

                  <div>
                    <label
                      htmlFor="phone"
                      className="text-sm font-semibold text-gray-700"
                    >
                      Phone Number
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your phone number"
                      className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-ameltan focus:ring-2 focus:ring-ameltan/10"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="text-sm font-semibold text-gray-700"
                    >
                      Subject
                    </label>

                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-ameltan focus:ring-2 focus:ring-ameltan/10"
                    >
                      <option value="">
                        Select a subject
                      </option>

                      <option value="membership">
                        Membership
                      </option>

                      <option value="professional-development">
                        Professional Development
                      </option>

                      <option value="events">
                        Events & Activities
                      </option>

                      <option value="partnership">
                        Partnership / Collaboration
                      </option>

                      <option value="general">
                        General Enquiry
                      </option>
                    </select>
                  </div>

                </div>

                {/* MESSAGE */}
                <div>
                  <label
                    htmlFor="message"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message..."
                    required
                    className="mt-2 w-full resize-none rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-ameltan focus:ring-2 focus:ring-ameltan/10"
                  />
                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  className="w-full rounded-lg bg-ameltan px-6 py-3.5 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-ameltan-dark hover:shadow-md sm:w-auto"
                >
                  Send Message
                  <span className="ml-2">→</span>
                </button>

              </form>

            </div>

          </div>

        </div>
      </section>

      {/* =========================
          MAP / LOCATION AREA
      ========================= */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

          <div className="grid items-center gap-8 lg:grid-cols-2">

            <div>

              <span className="text-sm font-bold uppercase tracking-[0.2em] text-ameltan">
                Find Us
              </span>

              <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Our Location
              </h2>

              <p className="mt-4 max-w-xl text-base leading-7 text-gray-600">
                Our office location and map information will be displayed
                here once the official AMELTAN address is provided.
              </p>

            </div>

            {/* MAP PLACEHOLDER */}
            <div className="flex min-h-[280px] items-center justify-center rounded-2xl bg-ameltan-pale p-8 text-center sm:min-h-[340px]">

              <div>

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-ameltan text-white">

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21s7-4.35 7-11a7 7 0 10-14 0c0 6.65 7 11 7 11z"
                    />

                    <circle
                      cx="12"
                      cy="10"
                      r="2.5"
                    />
                  </svg>

                </div>

                <p className="mt-4 font-bold text-gray-900">
                  AMELTAN Office Location
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Official address to be added
                </p>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =========================
          FINAL CTA
      ========================= */}
      {!isAuthenticated && (
        <section className="bg-ameltan py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">

            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Become part of AMELTAN.
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
              Connect with professionals, participate in activities, and
              contribute to the continued growth of the profession.
            </p>

            <a
              href="/register"
              className="mt-8 inline-flex items-center rounded-lg bg-white px-7 py-3.5 text-sm font-bold text-ameltan shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:text-base"
            >
              Join AMELTAN
              <span className="ml-2">→</span>
            </a>

          </div>
        </section>
      )}

    </main>
  );
};

export default Contact;
