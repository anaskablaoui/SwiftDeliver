import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRole }) {

    const token = sessionStorage.getItem("accesstoken");
    const role = sessionStorage.getItem("role");

    if (!token) {
        return <Navigate to="/" />;
    }

    if (role !== allowedRole) {
        return <Navigate to="/" />;
    }

    return children;
}

export default ProtectedRoute;