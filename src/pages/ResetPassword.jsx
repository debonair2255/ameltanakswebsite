import { useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!token) {
      setError(
        "This password reset link is invalid."
      );
      return;
    }

    if (!password || !confirmPassword) {
      setError(
        "Please enter and confirm your new password."
      );
      return;
    }

    if (password.length < 6) {
      setError(
        "Password must be at least 6 characters long."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError(
        "Passwords do not match."
      );
      return;
    }

    setLoading(true);

    try {
      const backendUrl =
        import.meta.env.VITE_BACKEND_URL;

      if (!backendUrl) {
        throw new Error(
          "Backend URL is not configured."
        );
      }

      const response = await fetch(
        `${backendUrl}/api/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message ||
            "Unable to reset your password."
        );
        return;
      }

      setSuccess(
        data.message ||
          "Your password has been reset successfully."
      );

      setPassword("");
      setConfirmPassword("");

      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error) {
      console.error(
        "Reset password error:",
        error
      );

      setError(
        error.message ===
          "Backend URL is not configured."
          ? "The backend URL is not configured."
          : "Unable to connect to the server. Please try again."
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
              Account Security
            </span>

            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Reset Password
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base">
              Create a new password for your AMELTAN
              member account.
            </p>
          </div>

          {/* CARD */}

          <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow-sm">
            <div className="h-2 bg-ameltan" />

            <div className="p-6 sm:p-8">

              {/* ERROR */}

              {error && (
                <div className="mb-6 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium leading-6 text-red-700">
                  {error}
                </div>
              )}

              {/* SUCCESS */}

              {success && (
                <div className="mb-6 rounded-lg border border-green-100 bg-green-50 px-4 py-3 text-sm font-medium leading-6 text-green-700">
                  {success}
                  <p className="mt-2 text-xs">
                    Redirecting you to login...
                  </p>
                </div>
              )}

              {!success && (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >

                  {/* PASSWORD */}

                  <div>
                    <label
                      htmlFor="password"
                      className="text-sm font-semibold text-gray-700"
                    >
                      New Password
                    </label>

                    <div className="relative mt-2">
                      <input
                        id="password"
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        value={password}
                        onChange={(e) => {
                          setPassword(
                            e.target.value
                          );
                          setError("");
                        }}
                        placeholder="Enter new password"
                        autoComplete="new-password"
                        required
                        className="w-full rounded-lg border border-gray-200 px-4 py-3 pr-20 text-sm outline-none transition focus:border-ameltan focus:ring-2 focus:ring-ameltan/10"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword(
                            !showPassword
                          )
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-ameltan"
                      >
                        {showPassword
                          ? "Hide"
                          : "Show"}
                      </button>
                    </div>

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
                      Confirm New Password
                    </label>

                    <div className="relative mt-2">
                      <input
                        id="confirmPassword"
                        type={
                          showConfirmPassword
                            ? "text"
                            : "password"
                        }
                        value={
                          confirmPassword
                        }
                        onChange={(e) => {
                          setConfirmPassword(
                            e.target.value
                          );
                          setError("");
                        }}
                        placeholder="Confirm new password"
                        autoComplete="new-password"
                        required
                        className="w-full rounded-lg border border-gray-200 px-4 py-3 pr-20 text-sm outline-none transition focus:border-ameltan focus:ring-2 focus:ring-ameltan/10"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(
                            !showConfirmPassword
                          )
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-ameltan"
                      >
                        {showConfirmPassword
                          ? "Hide"
                          : "Show"}
                      </button>
                    </div>
                  </div>

                  {/* BUTTON */}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-ameltan px-6 py-3.5 text-sm font-bold text-white transition hover:bg-ameltan-dark disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading
                      ? "Resetting Password..."
                      : "Reset Password"}
                  </button>

                </form>
              )}

              {/* LOGIN */}

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

        </div>
      </div>
    </main>
  );
};

export default ResetPassword;