import { useState, useEffect, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {useGameStats} from '../hooks/useGameStats';

import * as gameService from '../services/gameService';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const navigate = useNavigate();
    const [games, setGames] = useState([]);

    const [gameStats, addLinesCleared] = useGameStats();

    // useEffect(() => {
    //     try {
    //         async function getAllGames() {
    //             const games = await gameService.getAll();
    //             //console.log(games);
    //             setGames(games);
    //             return games;
    //         }
    //         getAllGames();
    //     } catch (error) {
    //         console.log('Error, ' + error);
    //     }

    // }, []);

    const onCreateGameSubmit = async (data) => {
        const newGame = await gameService.createScore(data);

        //setGames(state => [...state, newGame]);
        navigate('/scoreBoard');
    }

    const onGameEditSubmit = async (data) => {
        const result = await gameService.edit(data._id, data);
        console.log(result);
        navigate(`/catalogue/${data._id}`);
        setGames(state => state.map(x => x._id === data._id ? result : x));
    }

    const onGameDelete = (gameId) => {
        setGames(state => state.filter(game => game._id !== gameId));
    }

    const getGame = (gameId) => {
        return games.find(game => game._id === gameId);
    }


    const gameContext = {
        games,
        getGame,
        onCreateGameSubmit,
        onGameEditSubmit,
        onGameDelete,
        gameStats,
        addLinesCleared,
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