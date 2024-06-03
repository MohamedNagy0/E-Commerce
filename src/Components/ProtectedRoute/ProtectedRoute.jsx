import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const user = false;

    if (user) {
        return children;
    } else {
        return <Navigate to="/auth/login" />;
    }
}
