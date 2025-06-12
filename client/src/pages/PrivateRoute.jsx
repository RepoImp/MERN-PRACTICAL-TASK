import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "../context/ContextProvider";

const PrivateRoute = () => {
  const { token } = useContext(AppContext);
  if (!token) return <Navigate to="/" />;
  return <Outlet />;
};

export default PrivateRoute;
