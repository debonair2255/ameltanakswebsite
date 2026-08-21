import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // =========================
  // HANDLE INPUT
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  // =========================
  // HANDLE LOGIN
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!formData.email.trim() || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
     const response = await fetch(
  `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email.trim().toLowerCase(),
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      console.log("LOGIN RESPONSE:", data);

      if (!response.ok) {
        setError(data.message || "Login failed.");
        return;
      }

      if (!data.user) {
        setError(
          "Login succeeded, but no user information was returned."
        );
        return;
      }

     // Save user + JWT in AuthContext
const result = login(
  data.user,
  data.token,
  rememberMe
);

if (!result.success) {
  setError(
    result.message || "Unable to complete login."
  );
  return;
}

console.log("AUTH USER:", result.user);
console.log("JWT TOKEN:", result.token);

      // =========================
      // REDIRECT
      // =========================
      if (data.user.role === "admin") {
        navigate("/admin/announcements");
      } else {
        navigate("/dashboard");
      }

    } catch (error) {
      console.error("Login error:", error);

      setError(
        "Unable to connect to the server. Please make sure the backend is running."
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
              Member Access
            </span>

            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Welcome Back
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base">
              Sign in to access your AMELTAN member account.
            </p>

          </div>

          {/* LOGIN CARD */}
          <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow-sm">

            <div className="h-2 bg-ameltan" />

            <div className="p-6 sm:p-8">

              {/* ERROR */}
              {error && (
                <div className="mb-6 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {error}
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
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                    className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-ameltan focus:ring-2 focus:ring-ameltan/10"
                  />

                </div>

                {/* PASSWORD */}
                <div>

                  <div className="flex items-center justify-between">

                    <label
                      htmlFor="password"
                      className="text-sm font-semibold text-gray-700"
                    >
                      Password
                    </label>

                    <Link
                      to="/forgot-password"
                      className="text-xs font-bold text-ameltan hover:underline sm:text-sm"
                    >
                      Forgot password?
                    </Link>

                  </div>

                  <div className="relative mt-2">

                    <input
                      id="password"
                      name="password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      required
                      className="w-full rounded-lg border border-gray-200 px-4 py-3 pr-20 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-ameltan focus:ring-2 focus:ring-ameltan/10"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      className="absolute right-3 top-1/2 !m-0 !w-auto -translate-y-1/2 !bg-transparent px-2 py-1 text-xs font-bold text-ameltan hover:!bg-transparent"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>

                  </div>

                </div>

                {/* REMEMBER ME */}
                <div className="flex items-center">

                  <input
                    id="rememberMe"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) =>
                      setRememberMe(e.target.checked)
                    }
                    className="h-4 w-4 accent-[#1f6f54]"
                  />

                  <label
                    htmlFor="rememberMe"
                    className="ml-3 text-sm text-gray-600"
                  >
                    Remember me
                  </label>

                </div>

                {/* LOGIN BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-lg bg-ameltan px-6 py-3.5 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-ameltan-dark hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading
                    ? "Signing In..."
                    : "Sign In"}

                  {!loading && (
                    <span className="ml-2">
                      →
                    </span>
                  )}
                </button>

              </form>

              {/* REGISTER */}
              <div className="mt-8 border-t border-gray-100 pt-7 text-center">

                <p className="text-sm text-gray-600">
                  Don't have an AMELTAN account?
                </p>

                <Link
                  to="/register"
                  className="mt-2 inline-block text-sm font-bold text-ameltan hover:underline"
                >
                  Create an account →
                </Link>

              </div>

            </div>

          </div>

          {/* SECURITY NOTE */}
          <p className="mt-6 text-center text-xs leading-5 text-gray-500">
            Member access is intended for registered AMELTAN members.
          </p>

        </div>

      </div>

    </main>
  );
};

export default Login;