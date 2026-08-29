import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    state: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =========================
  // LOAD PROFILE
  // =========================

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token =
          localStorage.getItem("ameltan_token") ||
          sessionStorage.getItem("ameltan_token");

        if (!token) {
          setError(
            "Your session has expired. Please login again."
          );
          setLoading(false);
          return;
        }

        const backendUrl =
          import.meta.env.VITE_BACKEND_URL;

        if (!backendUrl) {
          setError(
            "The backend server is not configured correctly."
          );
          setLoading(false);
          return;
        }

        const response = await fetch(
          `${backendUrl.replace(/\/$/, "")}/api/auth/me`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        const responseText = await response.text();

        let data = {};

        try {
          data = responseText
            ? JSON.parse(responseText)
            : {};
        } catch {
          data = {
            message:
              responseText ||
              "The server returned an invalid response.",
          };
        }

        if (!response.ok) {
          if (
            response.status === 401 ||
            response.status === 403
          ) {
            localStorage.removeItem("ameltan_user");
            localStorage.removeItem("ameltan_token");

            sessionStorage.removeItem("ameltan_user");
            sessionStorage.removeItem("ameltan_token");

            navigate("/login");
            return;
          }

          setError(
            data.message ||
              "Unable to load your profile."
          );

          setLoading(false);
          return;
        }

        if (!data.user) {
          setError(
            "Your profile information could not be found."
          );
          setLoading(false);
          return;
        }

        setFormData({
          name: data.user.name || "",
          email: data.user.email || "",
          phone: data.user.phone || "",
          state: data.user.state || "",
        });

      } catch (error) {
        console.error(
          "Edit profile loading error:",
          error
        );

        setError(
          "Unable to connect to the server. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

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
    setSuccess("");
  };

  // =========================
  // SAVE PROFILE
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!formData.email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    setSaving(true);

    try {
      const token =
        localStorage.getItem("ameltan_token") ||
        sessionStorage.getItem("ameltan_token");

      if (!token) {
        setError(
          "Your session has expired. Please login again."
        );
        return;
      }

      const backendUrl =
        import.meta.env.VITE_BACKEND_URL;

      const response = await fetch(
        `${backendUrl.replace(
          /\/$/,
          ""
        )}/api/auth/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim().toLowerCase(),
            phone: formData.phone.trim(),
            state: formData.state.trim(),
          }),
        }
      );

      const responseText = await response.text();

      let data = {};

      try {
        data = responseText
          ? JSON.parse(responseText)
          : {};
      } catch {
        data = {
          message:
            responseText ||
            "The server returned an invalid response.",
        };
      }

      console.log(
        "UPDATE PROFILE RESPONSE:",
        data
      );

      if (!response.ok) {
        setError(
          data.message ||
            "Unable to update your profile."
        );
        return;
      }

      if (data.user) {
        const storage = localStorage.getItem(
          "ameltan_token"
        )
          ? localStorage
          : sessionStorage;

        storage.setItem(
          "ameltan_user",
          JSON.stringify(data.user)
        );
      }

      setSuccess(
        "Your profile has been updated successfully."
      );

      setTimeout(() => {
        navigate("/profile");
      }, 1000);

    } catch (error) {
      console.error(
        "Update profile error:",
        error
      );

      setError(
        "Unable to connect to the server. Please make sure the backend is running."
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-ameltan-pale px-5">
        <div className="text-center">

          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-ameltan/20 border-t-ameltan" />

          <p className="mt-4 text-sm font-semibold text-gray-600">
            Loading your profile...
          </p>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-ameltan-pale px-5 py-10 sm:px-8 lg:px-12">

      <div className="mx-auto max-w-3xl">

        {/* =========================
            PAGE HEADER
        ========================= */}

        <div className="mb-8">

          <Link
            to="/profile"
            className="inline-flex items-center text-sm font-semibold text-ameltan transition hover:gap-2"
          >
            ← Back to Profile
          </Link>

          <div className="mt-5">

            <p className="text-sm font-bold uppercase tracking-[0.15em] text-ameltan">
              Member Area
            </p>

            <h1 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Edit Profile
            </h1>

            <p className="mt-2 text-sm leading-6 text-gray-600 sm:text-base">
              Update your personal contact information.
            </p>

          </div>

        </div>

        {/* =========================
            FORM CARD
        ========================= */}

        <section className="overflow-hidden rounded-2xl bg-white shadow-sm">

          <div className="h-2 bg-ameltan" />

          <div className="p-6 sm:p-8">

            {/* ERROR */}

            {error && (
              <div className="mb-6 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {error}
              </div>
            )}

            {/* SUCCESS */}

            {success && (
              <div className="mb-6 rounded-lg border border-green-100 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                {success}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* FULL NAME */}

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

              {/* PHONE */}

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
                  placeholder="Enter your phone number"
                  autoComplete="tel"
                  className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-ameltan focus:ring-2 focus:ring-ameltan/10"
                />

              </div>

              {/* STATE */}

              <div>

                <label
                  htmlFor="state"
                  className="text-sm font-semibold text-gray-700"
                >
                  State
                </label>

                <input
                  id="state"
                  name="state"
                  type="text"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Enter your state"
                  className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-ameltan focus:ring-2 focus:ring-ameltan/10"
                />

              </div>

              {/* MLT NUMBER NOTICE */}

              <div className="rounded-xl border border-ameltan/10 bg-ameltan/5 p-5">

                <div className="flex gap-4">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ameltan/10">
                    🔐
                  </div>

                  <div>

                    <h4 className="font-bold text-gray-900">
                      Professional Information
                    </h4>

                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Your MLT/MLA number is part of
                      your professional membership
                      record and cannot be changed
                      from your profile.
                    </p>

                  </div>

                </div>

              </div>

              {/* ACTIONS */}

              <div className="flex flex-col gap-3 pt-2 sm:flex-row">

                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 rounded-lg bg-ameltan px-6 py-3.5 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-ameltan-dark hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving
                    ? "Saving Changes..."
                    : "Save Changes"}
                </button>

                <Link
                  to="/profile"
                  className="flex-1 rounded-lg border border-gray-200 px-6 py-3.5 text-center text-sm font-bold text-gray-700 transition hover:border-ameltan hover:text-ameltan"
                >
                  Cancel
                </Link>

              </div>

            </form>

          </div>

        </section>

        <p className="mt-6 text-center text-xs leading-5 text-gray-500">
          Only your personal contact information can
          be changed here.
        </p>

      </div>

    </main>
  );
};

export default EditProfile;