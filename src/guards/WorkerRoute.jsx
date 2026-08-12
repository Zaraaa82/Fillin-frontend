import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

function WorkerRoute({ children }) {
    const {loading, user} = useAuth()


    if(loading) return <p>Loading...</p>

    if (!user) {
        return <Navigate to='/sign-in' />;
    }

    if (user?.role !== 'worker') {
        return <Navigate to="/" />;
    }

    if (!user.isProfileComplete) {
        return <Navigate to='/profile/form' />;
    }


    return children;
}


export default WorkerRoute;