
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mltNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  /* =========================
      HANDLE INPUT
  ========================= */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "mltNumber"
          ? value.toUpperCase()
          : value,
    }));

    setError("");
    setSuccess("");
  };

  /* =========================
      HANDLE REGISTER
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    /* =========================
        VALIDATION
    ========================= */

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.mltNumber.trim() ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    /* =========================
        MLT NUMBER VALIDATION
    ========================= */

    const mltNumber = formData.mltNumber
      .trim()
      .toUpperCase();

    if (!/^MLT\d{5}$/.test(mltNumber)) {
      setError(
        "MLT/MLA number must be in the format MLT12345."
      );
      return;
    }

    /* =========================
        PASSWORD VALIDATION
    ========================= */

    if (formData.password.length < 6) {
      setError(
        "Password must be at least 6 characters long."
      );
      return;
    }

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      setError("Passwords do not match.");
      return;
    }

    /* =========================
        SEND TO BACKEND
    ========================= */

    setLoading(true);

    try {
    const response = await fetch(
  `${import.meta.env.VITE_BACKEND_URL}/api/auth/register`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
      mltNumber,
    }),
  }
);
      const data = await response.json();

      /* =========================
          BACKEND ERROR
      ========================= */

      if (!response.ok) {
        setError(
          data.message ||
            "Registration failed. Please try again."
        );

        return;
      }

      /* =========================
          SUCCESS
      ========================= */

      setSuccess(
        data.message ||
          "Registration successful."
      );

      setFormData({
        name: "",
        email: "",
        mltNumber: "",
        password: "",
        confirmPassword: "",
      });

      /* =========================
          REDIRECT
      ========================= */

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error(
        "Registration error:",
        error
      );

      setError(
        "Unable to connect to the AMELTAN server. Please make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-ameltan-pale px-5 py-12 sm:px-8 sm:py-16">

      <div className="mx-auto flex min-h-[80vh] max-w-6xl items-center justify-center">

        <div className="w-full max-w-md">

          {/* =========================
              HEADER
          ========================= */}

          <div className="text-center">

            <span className="text-sm font-bold uppercase tracking-[0.2em] text-ameltan">
              Membership
            </span>

            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Create Your Account
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base">
              Register as an AMELTAN member to access your account.
            </p>

          </div>

          {/* =========================
              CARD
          ========================= */}

          <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow-sm">

            <div className="h-2 bg-ameltan" />

            <div className="p-6 sm:p-8">

              {/* =========================
                  ERROR
              ========================= */}

              {error && (
                <div className="mb-6 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {error}
                </div>
              )}

              {/* =========================
                  SUCCESS
              ========================= */}

              {success && (
                <div className="mb-6 rounded-lg border border-green-100 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                  {success}
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* NAME */}

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
                    placeholder="Enter your full name"
                    autoComplete="name"
                    required
                    className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-ameltan focus:ring-2 focus:ring-ameltan/10"
                  />

                </div>

                {/* EMAIL */}

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
                    autoComplete="email"
                    required
                    className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-ameltan focus:ring-2 focus:ring-ameltan/10"
                  />

                </div>

                {/* MLT NUMBER */}

                <div>

                  <label
                    htmlFor="mltNumber"
                    className="text-sm font-semibold text-gray-700"
                  >
                    MLT/MLA Number
                  </label>

                  <input
                    id="mltNumber"
                    name="mltNumber"
                    type="text"
                    value={formData.mltNumber}
                    onChange={handleChange}
                    placeholder="MLT12345"
                    maxLength={8}
                    required
                    className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm uppercase text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-ameltan focus:ring-2 focus:ring-ameltan/10"
                  />

                  <p className="mt-2 text-xs text-gray-500">
                    Format: MLT12345
                  </p>

                </div>

                {/* PASSWORD */}

                <div>

                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Password
                  </label>

                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    autoComplete="new-password"
                    required
                    className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-ameltan focus:ring-2 focus:ring-ameltan/10"
                  />

                  <p className="mt-2 text-xs text-gray-500">
                    Minimum 6 characters.
                  </p>

                </div>

                {/* CONFIRM PASSWORD */}

                <div>

                  <label
                    htmlFor="confirmPassword"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Confirm Password
                  </label>

                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    required
                    className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-ameltan focus:ring-2 focus:ring-ameltan/10"
                  />

                </div>

                {/* SUBMIT */}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-lg bg-ameltan px-6 py-3.5 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-ameltan-dark hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading
                    ? "Creating Account..."
                    : "Create Account"}

                  {!loading && (
                    <span className="ml-2">
                      →
                    </span>
                  )}
                </button>

              </form>

              {/* =========================
                  LOGIN LINK
              ========================= */}

              <div className="mt-8 border-t border-gray-100 pt-7 text-center">

                <p className="text-sm text-gray-600">
                  Already have an AMELTAN account?
                </p>

                <Link
                  to="/login"
                  className="mt-2 inline-block text-sm font-bold text-ameltan hover:underline"
                >
                  Sign in →
                </Link>

              </div>

            </div>

          </div>

          {/* SECURITY NOTE */}

          <p className="mt-6 text-center text-xs leading-5 text-gray-500">
            Your registration information is securely processed by the AMELTAN server.
          </p>

        </div>

      </div>

    </main>
  );
};

export default Register;

