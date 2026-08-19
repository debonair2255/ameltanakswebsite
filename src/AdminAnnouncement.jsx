import { useState } from "react";
import { useNotifications } from "./context/NotificationContext";

const AdminAnnouncements = () => {
  const { addNotification } = useNotifications();

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("announcement");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !message.trim()) {
      return;
    }

    addNotification({
      title: title.trim(),
      message: message.trim(),
      type,
      link: "/announcements",
    });

    setTitle("");
    setMessage("");
    setType("announcement");
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
    }, 4000);
  };

  return (
    <main className="min-h-screen w-full bg-ameltan-pale">
      <div className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 lg:px-10 lg:py-14">

        {/* HEADER */}
        <div className="mb-10">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-ameltan">
            Administrator
          </span>

          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Publish Announcement
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
            Create and publish important updates for AMELTAN members.
            Published announcements will appear in members' notification
            systems.
          </p>
        </div>

        {/* SUCCESS */}
        {success && (
          <div className="mb-6 bg-green-50 p-4 text-green-700">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 font-bold">
                ✓
              </div>

              <div>
                <p className="font-bold">
                  Announcement published successfully.
                </p>

                <p className="mt-1 text-sm">
                  Members can now see the update through their notification
                  bell.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* FORM */}
        <section className="w-full bg-white p-6 shadow-sm sm:p-8 lg:p-10">

          <form onSubmit={handleSubmit}>

            {/* TITLE */}
            <div>
              <label
                htmlFor="title"
                className="text-sm font-bold text-gray-900"
              >
                Announcement Title
              </label>

              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter announcement title"
                className="mt-2 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-ameltan focus:ring-2 focus:ring-ameltan/10"
                required
              />
            </div>

            {/* TYPE */}
            <div className="mt-6">
              <label
                htmlFor="type"
                className="text-sm font-bold text-gray-900"
              >
                Announcement Type
              </label>

              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="mt-2 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-ameltan focus:ring-2 focus:ring-ameltan/10"
              >
                <option value="announcement">
                  General Announcement
                </option>

                <option value="membership">
                  Membership Update
                </option>

                <option value="event">
                  Event Update
                </option>

                <option value="important">
                  Important Notice
                </option>
              </select>
            </div>

            {/* MESSAGE */}
            <div className="mt-6">
              <label
                htmlFor="message"
                className="text-sm font-bold text-gray-900"
              >
                Announcement Message
              </label>

              <textarea
                id="message"
                rows="8"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your announcement here..."
                className="mt-2 w-full resize-none rounded-lg border border-gray-200 px-4 py-3 text-sm leading-6 text-gray-900 outline-none transition focus:border-ameltan focus:ring-2 focus:ring-ameltan/10"
                required
              />
            </div>

            {/* PREVIEW */}
            {(title || message) && (
              <div className="mt-8 bg-ameltan-pale p-5 sm:p-6">

                <p className="text-xs font-bold uppercase tracking-[0.15em] text-ameltan">
                  Notification Preview
                </p>

                <div className="mt-4 flex gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ameltan/10 text-lg">
                    📢
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-bold text-gray-900">
                      {title || "Announcement title"}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      {message ||
                        "Announcement message will appear here."}
                    </p>
                  </div>

                </div>
              </div>
            )}

            {/* BUTTON */}
            <div className="mt-8 flex justify-end">

              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-lg bg-ameltan px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-ameltan-dark hover:shadow-lg"
              >
                Publish Announcement
                <span className="ml-2">→</span>
              </button>

            </div>

          </form>
        </section>

      </div>
    </main>
  );
};

export default AdminAnnouncements;