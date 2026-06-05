import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({ children }) {
    const { auth } = useContext(AuthContext);

    if (!auth) {
        return <Navigate to="/" />;
    }

    return children;
}

export default ProtectedRoute;