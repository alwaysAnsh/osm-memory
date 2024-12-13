import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRouteforUser = ({ children }) => {
  const { token } = useSelector((state) => state.user);


  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRouteforUser;



