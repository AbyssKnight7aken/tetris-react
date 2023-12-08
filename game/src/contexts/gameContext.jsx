import { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStats } from '../hooks/useGameStats';

import * as gameService from '../services/gameService';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const navigate = useNavigate();
    const [scores, setScores] = useState([]);
    const [pageCount, setPageCount] = useState();
    const [page, setPage] = useState(1);
    const [serverError, setServerError] = useState(null);
    const [loading, setLoading] = useState(false);
    
    // const resetLoading = useCallback(() => {
    //     setLoading(!loading);
    //     console.log(loading);
    // },[]);

    const resetServerError = useCallback(() => {
        setServerError(null);
    },[]);

    const resetPage = useCallback(() => {
        setPage(1)
    },[]);

    const [gameStats, addLinesCleared, resetGameStats] = useGameStats();

    useEffect(() => {
        try {
            setLoading(true);
            async function getAllScores() {
                const [scores, pages, userScores] = await Promise.all([
                    gameService.getAll(page),
                    gameService.getCount(),
                ]);
                setPageCount(pages);
                setScores(scores);
                setLoading(false);
                return scores;
            }
            getAllScores();
        } catch (error) {
            console.log(error.message);
            return setServerError(error.message);
        }

    }, [page]);

    const onCreateGameSubmit = async (data) => {
        try {
            const [newScore, newScores] = await Promise.all([
                gameService.createScore(data),
                gameService.getAll()
            ]);
            console.log(newScore);
            //setScores(state => [...state, newScore])
            setScores(newScores);
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

    const onGameDelete = async (scoreId) => {
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
        page,
        setPage,
        pageCount,
        resetPage,
        loading,
    };

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