import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const NotificationContext = createContext(null);

const STORAGE_KEY = "ameltan_notifications";

const defaultNotifications = [
  {
    id: 1,
    title: "Welcome to AMELTAN",
    message:
      "Your member dashboard is now available. Check your account for important updates.",
    type: "announcement",
    link: "/dashboard",
    read: false,
    createdAt: new Date().toISOString(),
  },
];

export const NotificationProvider = ({ children }) => {
  /* =========================
      LOAD NOTIFICATIONS
  ========================= */
  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (!saved) {
        return defaultNotifications;
      }

      const parsed = JSON.parse(saved);

      return Array.isArray(parsed) ? parsed : defaultNotifications;
    } catch (error) {
      console.error(
        "Unable to load AMELTAN notifications:",
        error
      );

      return defaultNotifications;
    }
  });

  /* =========================
      SAVE NOTIFICATIONS
  ========================= */
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(notifications)
      );
    } catch (error) {
      console.error(
        "Unable to save AMELTAN notifications:",
        error
      );
    }
  }, [notifications]);

  /* =========================
      UNREAD COUNT
  ========================= */
  const unreadCount = useMemo(() => {
    return notifications.filter(
      (notification) => !notification.read
    ).length;
  }, [notifications]);

  /* =========================
      ADD NOTIFICATION
  ========================= */
  const addNotification = ({
    title,
    message,
    type = "general",
    link = "/dashboard",
  }) => {
    if (!title || !message) {
      console.warn(
        "A notification requires both a title and message."
      );

      return;
    }

    const newNotification = {
      id: `${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 9)}`,

      title,
      message,
      type,
      link,
      read: false,
      createdAt: new Date().toISOString(),
    };

    setNotifications((prev) => [
      newNotification,
      ...prev,
    ]);
  };

  /* =========================
      MARK ONE AS READ
  ========================= */
  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              read: true,
            }
          : notification
      )
    );
  };

  /* =========================
      MARK ALL AS READ
  ========================= */
  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  /* =========================
      REMOVE ONE
  ========================= */
  const removeNotification = (id) => {
    setNotifications((prev) =>
      prev.filter(
        (notification) => notification.id !== id
      )
    );
  };

  /* =========================
      CLEAR ALL
  ========================= */
  const clearNotifications = () => {
    setNotifications([]);
  };

  /* =========================
      RESET NOTIFICATIONS
  ========================= */
  const resetNotifications = () => {
    setNotifications(defaultNotifications);
  };

  /* =========================
      CONTEXT VALUE
  ========================= */
  const value = {
    notifications,
    unreadCount,

    addNotification,

    markAsRead,
    markAllAsRead,

    removeNotification,
    clearNotifications,
    resetNotifications,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

/* =========================
    CUSTOM HOOK
========================= */
export const useNotifications = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useNotifications must be used inside NotificationProvider"
    );
  }

  return context;
};