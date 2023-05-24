import { Navigate } from "react-router-dom";
import { useUser } from "../Context/UserContext/UserContext";

const ProtectedRoutes = ({ children }) => {
    const { isLoggedIn } = useUser();
  
    return isLoggedIn ? children : <Navigate to="/" />;
  };
  
  export default ProtectedRoutes;