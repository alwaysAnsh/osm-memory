import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRouteforAdmin = ({ children }) => {
  const { adminToken } = useSelector((state) => state.auth);


  if (!adminToken) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRouteforAdmin;
