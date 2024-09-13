import { Navigate } from "react-router-dom";

import { getCookie } from "../utils";

export const useProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = getCookie("__session");

  if (!token) {
    return <Navigate to="/auth" />;
  }

  return children;
};
