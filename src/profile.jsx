import { Link } from "react-router-dom";

const Profile = () => {
  // Temporary member data.
  // This will later come from the authenticated user's account.
  const member = {
    fullName: "AMELTAN Member",
    email: "member@example.com",
    phone: "08012345678",
    mltNumber: "MLT12345",
    state: "Akwa Ibom",
    membershipStatus: "Active",
  };

  return (
    <main className="min-h-screen bg-ameltan-pale px-5 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">

        {/* =========================
            PAGE HEADER
        ========================= */}
        <div className="mb-8">

          <Link
            to="/dashboard"
            className="inline-flex items-center text-sm font-semibold text-ameltan transition hover:gap-2"
          >
            ← Back to Dashboard
          </Link>

          <div className="mt-5">
            <p className="text-sm font-bold uppercase tracking-[0.15em] text-ameltan">
              Member Area
            </p>

            <h1 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              My Profile
            </h1>

            <p className="mt-2 text-sm leading-6 text-gray-600 sm:text-base">
              View your membership information and account details.
            </p>
          </div>

        </div>

        {/* =========================
            PROFILE CARD
        ========================= */}
        <section className="overflow-hidden rounded-2xl bg-white shadow-sm">

          {/* HEADER */}
          <div className="bg-ameltan p-6 text-white sm:p-8">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

              {/* PROFILE AVATAR */}
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-white/15 text-3xl font-bold backdrop-blur-sm">
                {member.fullName.charAt(0)}
              </div>

              <div>

                <h2 className="text-2xl font-bold">
                  {member.fullName}
                </h2>

                <p className="mt-1 text-sm text-white/75">
                  {member.mltNumber}
                </p>

                <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold">
                  <span className="h-2 w-2 rounded-full bg-green-300" />
                  {member.membershipStatus} Member
                </div>

              </div>

            </div>

          </div>

          {/* =========================
              MEMBER INFORMATION
          ========================= */}
          <div className="p-6 sm:p-8">

            <div className="mb-6 flex items-center justify-between">

              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Personal Information
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Information associated with your membership account.
                </p>
              </div>

            </div>

            {/* INFORMATION GRID */}
            <div className="grid gap-5 sm:grid-cols-2">

              {/* FULL NAME */}
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">

                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Full Name
                </p>

                <p className="mt-2 font-semibold text-gray-900">
                  {member.fullName}
                </p>

              </div>

              {/* EMAIL */}
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">

                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Email Address
                </p>

                <p className="mt-2 break-all font-semibold text-gray-900">
                  {member.email}
                </p>

              </div>

              {/* PHONE */}
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">

                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Phone Number
                </p>

                <p className="mt-2 font-semibold text-gray-900">
                  {member.phone}
                </p>

              </div>

              {/* MLT/MLA NUMBER */}
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">

                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  MLT/MLA Number
                </p>

                <p className="mt-2 font-bold tracking-wide text-ameltan">
                  {member.mltNumber}
                </p>

              </div>

              {/* STATE */}
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">

                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  State
                </p>

                <p className="mt-2 font-semibold text-gray-900">
                  {member.state}
                </p>

              </div>

              {/* MEMBERSHIP STATUS */}
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">

                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Membership Status
                </p>

                <div className="mt-2 flex items-center gap-2">

                  <span className="h-2.5 w-2.5 rounded-full bg-green-500" />

                  <span className="font-semibold text-green-700">
                    {member.membershipStatus}
                  </span>

                </div>

              </div>

            </div>

            {/* =========================
                ACCOUNT NOTICE
            ========================= */}
            <div className="mt-8 rounded-xl border border-ameltan/10 bg-ameltan/5 p-5">

              <div className="flex gap-4">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ameltan/10">
                  🔐
                </div>

                <div>

                  <h4 className="font-bold text-gray-900">
                    Account Information
                  </h4>

                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Your MLT/MLA number is part of your professional
                    membership record and should not be changed without
                    proper authorization.
                  </p>

                </div>

              </div>

            </div>

            {/* =========================
                ACTIONS
            ========================= */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <button
                type="button"
                className="rounded-lg border border-gray-200 px-5 py-3 text-sm font-bold text-gray-700 transition hover:border-ameltan hover:text-ameltan"
              >
                Edit Profile
              </button>

              <Link
                to="/dashboard"
                className="rounded-lg bg-ameltan px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-ameltan-dark"
              >
                Back to Dashboard
              </Link>

            </div>

          </div>

        </section>

        {/* =========================
            FOOTER NOTE
        ========================= */}
        <p className="mt-6 text-center text-xs leading-5 text-gray-500">
          If any membership information is incorrect, please contact the
          appropriate AMELTAN administrator.
        </p>

      </div>
    </main>
  );
};

export default Profile;