import { useUser } from "modules/user/context/userContext";
import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import Loader from "components/Loader/Loader";

const RedirectIfAuth = ({ children }: { children: ReactNode }) => {
  const { userState } = useUser();
  const location = useLocation();

  if (userState.isLoading) {
    return <Loader />;
  }

  if (userState.user) {
    // Ya autenticado, redirige al home o donde prefieras
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default RedirectIfAuth; 