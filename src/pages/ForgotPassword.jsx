import { useState } from "react";
import { Link } from "react-router-dom";

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL ||
  "http://localhost:10000";

console.log("BACKEND URL:", BACKEND_URL);

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${BACKEND_URL}/api/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim().toLowerCase(),
          }),
        }
      );

      const data = await response.json();

      console.log("FORGOT PASSWORD RESPONSE:", data);

      if (!response.ok) {
        setError(
          data.message ||
            "Unable to process your request."
        );
        return;
      }

      setMessage(
        data.message ||
          "If an account exists with that email, a password reset link has been sent."
      );

      setEmail("");
    } catch (error) {
      console.error(
        "Forgot password error:",
        error
      );

      setError(
        "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-ameltan-pale px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto flex min-h-[80vh] max-w-6xl items-center justify-center">
        <div className="w-full max-w-md">

          {/* HEADER */}
          <div className="text-center">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-ameltan">
              Account Recovery
            </span>

            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Forgot Password?
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base">
              Enter the email address associated with
              your AMELTAN account and we'll send you
              instructions to reset your password.
            </p>
          </div>

          {/* CARD */}
          <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow-sm">
            <div className="h-2 bg-ameltan" />

            <div className="p-6 sm:p-8">

              {/* ERROR */}
              {error && (
                <div className="mb-6 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {error}
                </div>
              )}

              {/* SUCCESS */}
              {message && (
                <div className="mb-6 rounded-lg border border-green-100 bg-green-50 px-4 py-3 text-sm font-medium leading-6 text-green-700">
                  {message}
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >

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
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                      setMessage("");
                    }}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                    className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-ameltan focus:ring-2 focus:ring-ameltan/10"
                  />
                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-lg bg-ameltan px-6 py-3.5 text-sm font-bold text-white transition hover:bg-ameltan-dark disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading
                    ? "Sending..."
                    : "Send Reset Link"}
                </button>

              </form>

              {/* BACK TO LOGIN */}
              <div className="mt-8 border-t border-gray-100 pt-7 text-center">
                <Link
                  to="/login"
                  className="text-sm font-bold text-ameltan hover:underline"
                >
                  ← Back to Login
                </Link>
              </div>

            </div>
          </div>

          <p className="mt-6 text-center text-xs text-gray-500">
            For your security, we don't reveal whether
            an email address is registered.
          </p>

        </div>
      </div>
    </main>
  );
};

export default ForgotPassword;