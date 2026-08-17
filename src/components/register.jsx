import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    mltNumber: "",
    state: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const states = [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
    "FCT",
  ];

  // =========================
  // HANDLE INPUT CHANGES
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
  // HANDLE MLT/MLA NUMBER
  // =========================
  const handleMltNumberChange = (e) => {
    const value = e.target.value.toUpperCase();

    /*
      Allows only:
      - Maximum 3 capital letters
      - Followed by maximum 5 numbers

      Examples:
      M
      ML
      MLT
      MLT1
      MLT12
      MLT123
      MLT1234
      MLT12345
    */

    if (/^[A-Z]{0,3}[0-9]{0,5}$/.test(value)) {
      setFormData((prev) => ({
        ...prev,
        mltNumber: value,
      }));

      setError("");
    }
  };

  // =========================
  // FORM SUBMISSION
  // =========================
  const handleSubmit = (e) => {
    e.preventDefault();

    // Strict MLT/MLA format
    const mltNumberPattern = /^(MLT|MLA)[0-9]{5}$/;

    // Validate MLT/MLA number
    if (!mltNumberPattern.test(formData.mltNumber)) {
      setError(
        "Invalid MLT/MLA number. Use exactly 3 capital letters followed by 5 numbers, for example MLT12345 or MLA12345."
      );
      return;
    }

    // Validate password
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    // Confirm password
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Temporary submission
    console.log("Registration Data:", formData);

    alert(
      "Registration form submitted successfully. Backend authentication will be connected later."
    );
  };

  return (
    <main className="min-h-screen w-full bg-ameltan-pale px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">

      {/* =========================
          MAIN CONTAINER
      ========================= */}
      <div className="mx-auto w-full max-w-6xl">

        {/* =========================
            PAGE HEADER
        ========================= */}
        <div className="w-full text-center">

          <span className="text-sm font-bold uppercase tracking-[0.2em] text-ameltan">
            Membership
          </span>

          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Create Your AMELTAN Account
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
            Join the professional community and gain access to members-only
            resources and activities.
          </p>

        </div>

        {/* =========================
            REGISTRATION AREA
        ========================= */}
        <div className="mx-auto mt-10 w-full bg-white">

          <div className="w-full p-6 sm:p-8 lg:p-12">

            {/* =========================
                FORM TITLE
            ========================= */}
            <div className="mb-8">

              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Membership Registration
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Please provide accurate information when creating your
                account.
              </p>

            </div>

            {/* =========================
                ERROR MESSAGE
            ========================= */}
            {error && (
              <div className="mb-6 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium leading-6 text-red-700">
                {error}
              </div>
            )}

            {/* =========================
                FORM
            ========================= */}
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* =========================
                  FULL NAME
              ========================= */}
              <div>

                <label
                  htmlFor="fullName"
                  className="text-sm font-semibold text-gray-700"
                >
                  Full Name
                </label>

                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  autoComplete="name"
                  className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-ameltan focus:ring-2 focus:ring-ameltan/10"
                />

              </div>

              {/* =========================
                  EMAIL + PHONE
              ========================= */}
              <div className="grid gap-6 sm:grid-cols-2">

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
                    required
                    autoComplete="email"
                    className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-ameltan focus:ring-2 focus:ring-ameltan/10"
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
                    placeholder="08012345678"
                    required
                    autoComplete="tel"
                    className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-ameltan focus:ring-2 focus:ring-ameltan/10"
                  />

                </div>

              </div>

              {/* =========================
                  MLT NUMBER + STATE
              ========================= */}
              <div className="grid gap-6 sm:grid-cols-2">

                {/* MLT/MLA NUMBER */}
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
                    onChange={handleMltNumberChange}
                    placeholder="MLT12345"
                    maxLength={8}
                    required
                    autoComplete="off"
                    spellCheck="false"
                    pattern="^(MLT|MLA)[0-9]{5}$"
                    title="Enter your MLT/MLA number in the format MLT12345 or MLA12345"
                    className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-semibold tracking-wide text-gray-900 outline-none transition placeholder:font-normal placeholder:tracking-normal placeholder:text-gray-400 focus:border-ameltan focus:ring-2 focus:ring-ameltan/10"
                  />

                  <p className="mt-2 text-xs text-gray-500">
                    Format: MLT12345 or MLA12345
                  </p>

                </div>

                {/* STATE */}
                <div>

                  <label
                    htmlFor="state"
                    className="text-sm font-semibold text-gray-700"
                  >
                    State
                  </label>

                  <select
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-ameltan focus:ring-2 focus:ring-ameltan/10"
                  >

                    <option value="">
                      Select your state
                    </option>

                    {states.map((state) => (
                      <option
                        key={state}
                        value={state}
                      >
                        {state}
                      </option>
                    ))}

                  </select>

                </div>

              </div>

              {/* =========================
                  PASSWORD
              ========================= */}
              <div>

                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-gray-700"
                >
                  Password
                </label>

                <div className="relative mt-2">

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    required
                    minLength={8}
                    autoComplete="new-password"
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 pr-20 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-ameltan focus:ring-2 focus:ring-ameltan/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 !m-0 !w-auto -translate-y-1/2 !bg-transparent px-2 py-1 text-xs font-bold text-ameltan hover:!bg-transparent"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>

                </div>

                <p className="mt-2 text-xs text-gray-500">
                  Password must contain at least 8 characters.
                </p>

              </div>

              {/* =========================
                  CONFIRM PASSWORD
              ========================= */}
              <div>

                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-semibold text-gray-700"
                >
                  Confirm Password
                </label>

                <div className="relative mt-2">

                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    required
                    autoComplete="new-password"
                    className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 pr-20 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-ameltan focus:ring-2 focus:ring-ameltan/10"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    className="absolute right-3 top-1/2 !m-0 !w-auto -translate-y-1/2 !bg-transparent px-2 py-1 text-xs font-bold text-ameltan hover:!bg-transparent"
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>

                </div>

              </div>

              {/* =========================
                  TERMS
              ========================= */}
              <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-4">

                <input
                  id="terms"
                  type="checkbox"
                  required
                  className="mt-1 h-4 w-4 shrink-0 accent-[#1f6f54]"
                />

                <label
                  htmlFor="terms"
                  className="text-xs leading-5 text-gray-600 sm:text-sm"
                >
                  I confirm that the information provided is accurate
                  and agree to the AMELTAN membership terms and
                  conditions.
                </label>

              </div>

              {/* =========================
                  CREATE ACCOUNT BUTTON
              ========================= */}
              <button
                type="submit"
                className="w-full rounded-lg bg-ameltan px-6 py-3.5 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-ameltan-dark hover:shadow-md"
              >
                Create Account
                <span className="ml-2">
                  →
                </span>
              </button>

            </form>

            {/* =========================
                LOGIN LINK
            ========================= */}
            <div className="mt-8 border-t border-gray-100 pt-7 text-center">

              <p className="text-sm text-gray-600">
                Already have an account?
              </p>

              <Link
                to="/login"
                className="mt-2 inline-block text-sm font-bold text-ameltan hover:underline"
              >
                Sign in to your account →
              </Link>

            </div>

          </div>

        </div>

        {/* =========================
            SECURITY NOTE
        ========================= */}
        <div className="mx-auto mt-6 w-full max-w-6xl px-4 text-center">

          <p className="text-xs leading-5 text-gray-500">
            Your information should be kept secure and used only
            for legitimate membership and association purposes.
          </p>

        </div>

      </div>

    </main>
  );
};

export default Register;