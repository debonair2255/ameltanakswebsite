
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

  const getToken = () => {
    return (
      localStorage.getItem("ameltan_token") ||
      sessionStorage.getItem("ameltan_token")
    );
  };

  const getBackendUrl = () => {
    const url = import.meta.env.VITE_BACKEND_URL;

    if (!url) {
      throw new Error(
        "Backend URL is not configured. Please check your Vercel environment variable."
      );
    }

    return url.replace(/\/$/, "");
  };

  // =========================
  // LOAD PROFILE
  // =========================

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = getToken();

        if (!token) {
          setError(
            "Your session has expired. Please login again."
          );
          setLoading(false);
          return;
        }

        const backendUrl = getBackendUrl();

        const response = await fetch(
          `${backendUrl}/api/auth/me`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        const data = await response.json();

        console.log("EDIT PROFILE DATA:", data);

        if (
          response.status === 401 ||
          response.status === 403
        ) {
          localStorage.removeItem("ameltan_token");
          localStorage.removeItem("ameltan_user");

          sessionStorage.removeItem("ameltan_token");
          sessionStorage.removeItem("ameltan_user");

          navigate("/login");
          return;
        }

        if (!response.ok) {
          setError(
            data.message ||
              "Unable to load your profile."
          );
          return;
        }

        if (!data.user) {
          setError(
            "Profile information was not returned by the server."
          );
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
          error.message ||
            "Unable to connect to the server."
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

    try {
      setSaving(true);

      const token = getToken();

      if (!token) {
        setError(
          "Your session has expired. Please login again."
        );
        return;
      }

      const backendUrl = getBackendUrl();

      const response = await fetch(
        `${backendUrl}/api/auth/profile`,
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

      const data = await response.json();

      console.log("UPDATE PROFILE RESPONSE:", data);

      if (
        response.status === 401 ||
        response.status === 403
      ) {
        localStorage.removeItem("ameltan_token");
        localStorage.removeItem("ameltan_user");

        sessionStorage.removeItem("ameltan_token");
        sessionStorage.removeItem("ameltan_user");

        navigate("/login");
        return;
      }

      if (!response.ok) {
        setError(
          data.message ||
            "Unable to update your profile."
        );
        return;
      }

      if (data.user) {
        const storage =
          localStorage.getItem("ameltan_token")
            ? localStorage
            : sessionStorage;

        storage.setItem(
          "ameltan_user",
          JSON.stringify(data.user)
        );

        setFormData({
          name: data.user.name || "",
          email: data.user.email || "",
          phone: data.user.phone || "",
          state: data.user.state || "",
        });
      }

      setSuccess(
        "Your profile has been updated successfully."
      );

      setTimeout(() => {
        navigate("/profile");
      }, 1200);
    } catch (error) {
      console.error(
        "Update profile error:",
        error
      );

      setError(
        error.message ||
          "Unable to connect to the server."
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
      <main className="min-h-screen bg-ameltan-pale px-5 py-10">
        <div className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-ameltan/20 border-t-ameltan" />

            <p className="mt-4 text-sm font-semibold text-gray-600">
              Loading your profile...
            </p>
          </div>
        </div>
      </main>
    );
  }

  // =========================
  // PAGE
  // =========================

  return (
    <main className="min-h-screen bg-ameltan-pale px-5 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-3xl">

        {/* HEADER */}

        <div className="mb-8">
          <Link
            to="/profile"
            className="inline-flex items-center text-sm font-semibold text-ameltan hover:underline"
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

        {/* CARD */}

        <section className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="h-2 bg-ameltan" />

          <div className="p-6 sm:p-8">

            {/* ERROR */}

            {error && (
              <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium leading-6 text-red-700">
                {error}
              </div>
            )}

            {/* SUCCESS */}

            {success && (
              <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium leading-6 text-green-700">
                {success}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
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
                  autoComplete="name"
                  required
                  className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-ameltan focus:ring-2 focus:ring-ameltan/10"
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
                  autoComplete="email"
                  required
                  className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-ameltan focus:ring-2 focus:ring-ameltan/10"
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
                  autoComplete="tel"
                  className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-ameltan focus:ring-2 focus:ring-ameltan/10"
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
                  className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-ameltan focus:ring-2 focus:ring-ameltan/10"
                />
              </div>

              {/* MLT NUMBER */}

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

              {/* BUTTONS */}

              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 rounded-lg bg-ameltan px-6 py-3.5 text-sm font-bold text-white transition hover:bg-ameltan-dark disabled:cursor-not-allowed disabled:opacity-60"
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
          Your MLT/MLA number cannot be changed from this page.
        </p>

      </div>
    </main>
  );
};

export default EditProfile;

