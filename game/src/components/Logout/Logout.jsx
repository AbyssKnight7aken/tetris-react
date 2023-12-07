import { useEffect } from "react";
import { Navigate } from "react-router-dom";

import { useAuthContext } from "../../contexts/authContext";

const Logout = () => {
    const { onLogout } = useAuthContext();

    useEffect(() => {
        onLogout();
    }, [onLogout]);

    return <Navigate to="/scoreboard" />;
}

export default Logout;