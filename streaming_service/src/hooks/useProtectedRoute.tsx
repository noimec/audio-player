import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { RootState } from "../store";

export const useProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = useSelector((state: RootState) => state.auth.token);

  if (!token) {
    return <Navigate to="/auth" />;
  }

  return children;
};
