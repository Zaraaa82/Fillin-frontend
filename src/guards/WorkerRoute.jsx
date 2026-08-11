import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
    const {loading, user} = useAuth()


    if(loading) return <p>Loading...</p>

    if (user?.role !== 'worker') {
        return <Navigate to="/" />;
    }


    return children;
}


export default ProtectedRoute;