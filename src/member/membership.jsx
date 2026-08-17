import { Link } from "react-router-dom";

const Membership = () => {
  // Temporary member information.
  // This will later come from the authenticated user's database record.
  const member = {
    fullName: "AMELTAN Member",
    mltNumber: "MLT12345",
    membershipId: "AMELTAN-00001",
    membershipType: "Active Member",
    state: "Akwa Ibom",
    registrationDate: "17 August 2026",
    status: "Active",
  };

  return (
    <main className="min-h-screen bg-ameltan-pale px-5 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">

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
              Membership
            </p>

            <h1 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              My Membership
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
              View your AMELTAN membership information and digital membership
              credentials.
            </p>
          </div>

        </div>

        {/* =========================
            STATUS BANNER
        ========================= */}
        <section className="mb-8 rounded-2xl border border-green-100 bg-white p-5 shadow-sm sm:p-6">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50">
                <span className="text-xl">✓</span>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Membership Status
                </p>

                <p className="mt-1 font-bold text-green-700">
                  {member.status}
                </p>
              </div>

            </div>

            <span className="w-fit rounded-full bg-green-50 px-4 py-2 text-xs font-bold text-green-700">
              VERIFIED MEMBER
            </span>

          </div>

        </section>

        {/* =========================
            DIGITAL MEMBERSHIP CARD
        ========================= */}
        <section className="mb-10">

          <div className="mb-5">
            <h2 className="text-2xl font-bold text-gray-900">
              Digital Membership Card
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Your digital membership credential.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl bg-ameltan shadow-lg">

            {/* CARD HEADER */}
            <div className="relative p-6 text-white sm:p-8">

              {/* Decorative circles */}
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/5" />
              <div className="absolute -bottom-16 right-20 h-48 w-48 rounded-full bg-white/5" />

              <div className="relative z-10">

                <div className="flex items-start justify-between gap-4">

                  <div>

                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">
                      AMELTAN
                    </p>

                    <h2 className="mt-2 text-xl font-extrabold sm:text-2xl">
                      Membership Card
                    </h2>

                  </div>

                  {/* Logo Placeholder */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-lg font-bold backdrop-blur-sm">
                    A
                  </div>

                </div>

                {/* MEMBER DETAILS */}
                <div className="mt-10">

                  <p className="text-xs font-medium uppercase tracking-wider text-white/60">
                    Member Name
                  </p>

                  <p className="mt-1 text-xl font-bold sm:text-2xl">
                    {member.fullName}
                  </p>

                </div>

                <div className="mt-7 grid grid-cols-2 gap-6 sm:grid-cols-4">

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-white/60">
                      MLT/MLA No.
                    </p>

                    <p className="mt-1 text-sm font-bold tracking-wide">
                      {member.mltNumber}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-white/60">
                      Member ID
                    </p>

                    <p className="mt-1 text-sm font-bold">
                      {member.membershipId}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-white/60">
                      State
                    </p>

                    <p className="mt-1 text-sm font-bold">
                      {member.state}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-white/60">
                      Status
                    </p>

                    <p className="mt-1 text-sm font-bold">
                      {member.status}
                    </p>
                  </div>

                </div>

              </div>

            </div>

            {/* CARD FOOTER */}
            <div className="flex flex-col gap-4 bg-black/10 p-5 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <p className="text-xs text-white/60">
                  Membership Type
                </p>

                <p className="mt-1 text-sm font-bold text-white">
                  {member.membershipType}
                </p>
              </div>

              {/* QR PLACEHOLDER */}
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-white text-center text-[9px] font-bold text-gray-700">
                QR
              </div>

            </div>

          </div>

          {/* CARD ACTIONS */}
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">

            <button
              type="button"
              onClick={() => window.print()}
              className="rounded-lg bg-ameltan px-5 py-3 text-sm font-bold text-white transition hover:bg-ameltan-dark"
            >
              Print Membership Card
            </button>

            <button
              type="button"
              className="rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm font-bold text-gray-700 transition hover:border-ameltan hover:text-ameltan"
            >
              Download Card
            </button>

          </div>

        </section>

        {/* =========================
            MEMBERSHIP INFORMATION
        ========================= */}
        <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">

          <div className="mb-7">

            <h2 className="text-xl font-bold text-gray-900">
              Membership Information
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Details associated with your membership account.
            </p>

          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {/* MEMBERSHIP ID */}
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">

              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Membership ID
              </p>

              <p className="mt-2 font-bold text-gray-900">
                {member.membershipId}
              </p>

            </div>

            {/* MLT NUMBER */}
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">

              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                MLT/MLA Number
              </p>

              <p className="mt-2 font-bold tracking-wide text-ameltan">
                {member.mltNumber}
              </p>

            </div>

            {/* MEMBERSHIP TYPE */}
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">

              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Membership Type
              </p>

              <p className="mt-2 font-semibold text-gray-900">
                {member.membershipType}
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

            {/* REGISTRATION DATE */}
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">

              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Registration Date
              </p>

              <p className="mt-2 font-semibold text-gray-900">
                {member.registrationDate}
              </p>

            </div>

            {/* STATUS */}
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">

              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Status
              </p>

              <div className="mt-2 flex items-center gap-2">

                <span className="h-2.5 w-2.5 rounded-full bg-green-500" />

                <span className="font-semibold text-green-700">
                  {member.status}
                </span>

              </div>

            </div>

          </div>

        </section>

        {/* =========================
            VERIFICATION NOTICE
        ========================= */}
        <section className="mt-8 rounded-2xl border border-ameltan/10 bg-white p-6 shadow-sm">

          <div className="flex gap-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ameltan/10">
              🔐
            </div>

            <div>

              <h3 className="font-bold text-gray-900">
                Membership Verification
              </h3>

              <p className="mt-1 text-sm leading-6 text-gray-600">
                Your membership card can eventually contain a unique QR code
                that can be scanned to verify your membership status.
              </p>

              <p className="mt-2 text-xs leading-5 text-gray-500">
                QR verification will be connected to the member database when
                authentication and backend services are implemented.
              </p>

            </div>

          </div>

        </section>

      </div>
    </main>
  );
};

export default Membership;