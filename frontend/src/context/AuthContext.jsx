import {
  createContext,
  useEffect,
  useState,
} from "react";

import {
  loginUser,
  logoutUser,
  refreshToken,
} from "../api/auth.api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading , setLoading] = useState(true);

  const login = async (credentials) => {
    const data = await loginUser(credentials);

    const loggedInUser = data.data.user;

    setUser(loggedInUser);

    localStorage.setItem(
      "user",
      JSON.stringify(loggedInUser)
    );

    return data;
  };

  const logout = async () => {
    await logoutUser();

    setUser(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await refreshToken();

        const storedUser = localStorage.getItem("user");

        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch {
        localStorage.removeItem("user");
        setUser(null);
      } finally{
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;