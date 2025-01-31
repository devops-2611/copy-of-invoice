import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// Define the type for the component props
interface ProtectedRouteProps {
  children: ReactNode; // The children prop can be any valid React node (string, JSX, etc.)
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useAuth();

  if (!user) {
    // user is not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  return <>{children}</>; // Return the children if user is authenticated
};
