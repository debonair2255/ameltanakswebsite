import { createContext, useContext, useEffect, useState } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem("ameltan_notifications");

    return saved
      ? JSON.parse(saved)
      : [
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
  });

  // Save notifications
  useEffect(() => {
    localStorage.setItem(
      "ameltan_notifications",
      JSON.stringify(notifications)
    );
  }, [notifications]);

  // Number of unread notifications
  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  // Add new notification
  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      title: notification.title,
      message: notification.message,
      type: notification.type || "general",
      link: notification.link || "/dashboard",
      read: false,
      createdAt: new Date().toISOString(),
    };

    setNotifications((prev) => [newNotification, ...prev]);
  };

  // Mark one notification as read
  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  // Mark everything as read
  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  // Delete notification
  const removeNotification = (id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        removeNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useNotifications must be used inside NotificationProvider"
    );
  }

  return context;
};