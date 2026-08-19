import {
  createContext,
  useContext,
  useState,
} from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

  // =========================
  // LOAD SAVED USER
  // =========================

  const [user, setUser] = useState(() => {
    try {
      const localUser =
        localStorage.getItem("ameltan_user");

      if (localUser) {
        return JSON.parse(localUser);
      }

      const sessionUser =
        sessionStorage.getItem("ameltan_user");

      if (sessionUser) {
        return JSON.parse(sessionUser);
      }

      return null;
    } catch (error) {
      console.error(
        "Unable to load saved user:",
        error
      );

      return null;
    }
  });

  // =========================
  // LOAD SAVED TOKEN
  // =========================

  const [token, setToken] = useState(() => {
    try {
      const localToken =
        localStorage.getItem("ameltan_token");

      if (localToken) {
        return localToken;
      }

      const sessionToken =
        sessionStorage.getItem("ameltan_token");

      if (sessionToken) {
        return sessionToken;
      }

      return null;
    } catch (error) {
      console.error(
        "Unable to load saved token:",
        error
      );

      return null;
    }
  });

  // =========================
  // LOGIN
  // =========================

  const login = (
    userData,
    authToken,
    rememberMe = false
  ) => {

    if (!userData) {
      return {
        success: false,
        message:
          "No user information was returned from the server.",
      };
    }

    if (!authToken) {
      return {
        success: false,
        message:
          "No authentication token was returned from the server.",
      };
    }

    setUser(userData);
    setToken(authToken);

    // Clear previous session
    localStorage.removeItem("ameltan_user");
    localStorage.removeItem("ameltan_token");

    sessionStorage.removeItem("ameltan_user");
    sessionStorage.removeItem("ameltan_token");

    // Choose storage
    const storage = rememberMe
      ? localStorage
      : sessionStorage;

    storage.setItem(
      "ameltan_user",
      JSON.stringify(userData)
    );

    storage.setItem(
      "ameltan_token",
      authToken
    );

    return {
      success: true,
      user: userData,
      token: authToken,
    };
  };

  // =========================
  // LOGOUT
  // =========================

  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("ameltan_user");
    localStorage.removeItem("ameltan_token");

    sessionStorage.removeItem("ameltan_user");
    sessionStorage.removeItem("ameltan_token");
  };

  // =========================
  // AUTH STATUS
  // =========================

  const isAuthenticated = Boolean(
    user && token
  );

  const isAdmin =
    user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// =========================
// CUSTOM HOOK
// =========================

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};