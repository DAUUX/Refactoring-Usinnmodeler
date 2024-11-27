import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const authToken = !!localStorage.getItem("token");
  const authUser = !!localStorage.getItem("user");

  return authToken && authUser ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;
