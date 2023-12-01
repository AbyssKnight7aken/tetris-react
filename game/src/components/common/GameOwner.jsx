import { useParams, Navigate, Outlet } from "react-router-dom";

import { useAuthContext } from '../../contexts/authContext';
import { useGameContext } from '../../contexts/gameContext';

//Overkill for small projects but good practice !!!

export const GameOwner = ({ children }) => {
    const { gameId } = useParams();
    const { userId } = useAuthContext();
    const { getGame } = useGameContext();

    const currentGame = getGame(gameId);

    if (currentGame && currentGame._ownerId !== userId) {
        return <Navigate to={`/catalogue/${gameId}`} replace />
    }

    return children ? children : <Outlet />;
}