import { useParams, Navigate, Outlet } from "react-router-dom";

import { useAuthContext } from '../../contexts/authContext';
import { useGameContext } from '../../contexts/gameContext';


export const GameOwner = ({ children }) => {
    const { scoreId } = useParams();
    const { userId } = useAuthContext();
    const { getScore } = useGameContext();
    const currentScore = getScore(scoreId);

    if (currentScore && currentScore?._ownerId?._id !== userId) {
        return <Navigate to={`/scoreboard/${scoreId}`} replace />
    }

    return children ? children : <Outlet />;
}