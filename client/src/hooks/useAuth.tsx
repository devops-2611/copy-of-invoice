import React, { createContext, useContext, useMemo, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

// Define a type for the user
interface User {
  id: string;
  email: string;
  [key: string]: any; // Allow other dynamic fields as needed
}

// Define the type for the AuthContext value
interface AuthContextType {
  user: User | null;
  login: (data: User) => void;
  logout: () => void;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useLocalStorage<User | null>("user", null);
  const navigate = useNavigate();

  // Call this function when you want to authenticate the user
  const login = async (data: User) => {
    setUser(data); // Store the user in localStorage
    if (data?.role === "admin") {
      navigate("/admin"); // Redirect to the profile page
    } else if (data?.role === "merchant") {
      navigate("/merchant/6/dashboard");
    }
  };

  // Call this function to sign out the logged-in user
  const logout = () => {
    setUser(null); // Remove the user from localStorage
    navigate("/", { replace: true }); // Redirect to the home page
  };

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use authentication context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  // Ensure that the context is always available when the hook is used
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
