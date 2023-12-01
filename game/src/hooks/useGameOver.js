import { useState, useCallback } from "react";
import { useGameContext } from '../contexts/gameContext';

export const useGameOver = () => {
  const { onCreateGameSubmit, gameStats } = useGameContext();
  const [gameOver, setGameOver] = useState(true);
  console.log(gameStats);

  if (gameOver === 'isGameOver') {
    console.log('fetch request!');
    onCreateGameSubmit(gameStats);
  }

  const resetGameOver = useCallback(() => {
    console.log(gameOver);
    setGameOver(false);
  }, []);

  return [gameOver, setGameOver, resetGameOver];
};
