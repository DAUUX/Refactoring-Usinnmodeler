import { Navigate } from "react-router-dom";
import { SocketProvider } from "../../services/SocketContext";

const PrivateRoute = ({ element }) => {
  const authToken = !!localStorage.getItem("token");
  const authUser = !!localStorage.getItem("user");

  return authToken && authUser ? (
    <SocketProvider>{element}</SocketProvider>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
