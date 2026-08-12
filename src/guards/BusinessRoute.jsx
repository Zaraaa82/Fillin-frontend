import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

function BusinessRoute({ children }) {
    const {loading, user} = useAuth()


    if(loading) return <p>Loading...</p>

    if (!user) {
        return <Navigate to='/sign-in' />;
    }

    if (user?.role !== 'business') {
        return <Navigate to="/" />;
    }

    if (!user.isProfileComplete) {
        return <Navigate to='/profile/form' />;
    }


    return children;
}


export default BusinessRoute;