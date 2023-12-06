import { useState, useEffect, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStats } from '../hooks/useGameStats';

import * as gameService from '../services/gameService';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const navigate = useNavigate();
    const [scores, setScores] = useState([]);
    const [serverError, setServerError] = useState(null);
    const resetServerError = () => {
        setServerError(null);
    };

    const [gameStats, addLinesCleared, resetGameStats] = useGameStats();

    useEffect(() => {
        try {
            async function getAllScores() {
                const scores = await gameService.getAll();
                console.log(scores);
                setScores(scores);
                return scores;
            }
            getAllScores();
        } catch (error) {
            console.log(error.message);
            return setServerError(error.message);
        }

    }, []);

    const onCreateGameSubmit = async (data) => {
        try {
            const newScore = await gameService.createScore(data);
            //setScores(state => [...state, newScore]);
            const scores = await gameService.getAll();
            setScores(scores);
            resetGameStats();
            navigate('/scoreBoard');
        } catch (error) {
            console.log(error.message);
            return setServerError(error.message);
        }

    }

    const onScoreEditSubmit = async (data) => {
        try {
            const result = await gameService.edit(data._id, data);
            console.log(result);
            const scores = await gameService.getAll();
            setScores(scores);
            //setScores(state => state.map(x => x._id === data._id ? result : x));
            navigate(`/scoreboard/${data._id}`);
        } catch (error) {
            console.log(error.message);
            return setServerError(error.message);
        }

    }

    const onGameDelete =async (scoreId) => {
        gameService.deleteScore(scoreId);
        setScores(state => state.filter(score => score._id !== scoreId));
        navigate('/scoreBoard');
    }

    const getScore = (scoreId) => {
        return scores.find(score => score._id === scoreId);
    }


    const gameContext = {
        scores,
        getScore,
        onCreateGameSubmit,
        onScoreEditSubmit,
        onGameDelete,
        gameStats,
        addLinesCleared,
        serverError,
        resetServerError,
    };
    //console.log(context);
    return (
        < GameContext.Provider value={gameContext}>
            {children}
        </ GameContext.Provider>
    );
}

// optional - prevent useContext import from react when needed !!!
export const useGameContext = () => {
    const context = useContext(GameContext);
    return context;
}