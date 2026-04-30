import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext(null);
const API_URL = import.meta.env.VITE_API_URL || "/api";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("deknek3d-user");
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem("deknek3d-user", JSON.stringify(user));
    } else {
      localStorage.removeItem("deknek3d-user");
    }
  }, [user]);

  const authRequest = async (endpoint, payload) => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${API_URL}/auth/${endpoint}`, payload);
      setUser(data);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Something went wrong",
      };
    } finally {
      setLoading(false);
    }
  };

  const login = (payload) => authRequest("login", payload);
  const signup = (payload) => authRequest("signup", payload);

  const logout = () => setUser(null);

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    apiUrl: API_URL,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
