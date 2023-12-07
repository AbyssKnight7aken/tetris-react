import { useState, useCallback } from "react";
import { useGameContext } from '../contexts/gameContext';
import { useAuthContext } from '../contexts/authContext';
import { useNavigate } from "react-router-dom";

export const useGameOver = () => {
  const { onCreateGameSubmit, gameStats } = useGameContext();
  const { isAuthenticated } = useAuthContext();
  const [gameOver, setGameOver] = useState(true);
  const navigate = useNavigate();
  console.log(gameStats);

  if (gameOver === 'GAMEOVER') {
    console.log('fetch request!');
    onCreateGameSubmit(gameStats);
  }

  const resetGameOver = useCallback(() => {
    if (!isAuthenticated) {
      return navigate('/login');
    }
    console.log(gameOver);
    setGameOver(false);
  }, []);

  return [gameOver, setGameOver, resetGameOver];
};
