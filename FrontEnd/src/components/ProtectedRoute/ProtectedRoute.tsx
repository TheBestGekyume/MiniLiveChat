import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { token } = useContext(AuthContext);
    if (!token) return <Navigate to="/login" />;
    return <>{children}</>;
};

export default ProtectedRoute;
