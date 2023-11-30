import { useState, useCallback } from "react";
import { useGameContext } from '../contexts/gameContext';

let counter = 0;

export const useGameOver = () => {
  const { onCreateGameSubmit, gameStats } = useGameContext();
  const [gameOver, setGameOver] = useState(true);
  //const [result, setResult] = useState(gameStats);
  if (gameOver) {
    counter++;
    //console.log(gameOver);
  }

  if (counter === 2) {
    //console.log(result);
    onCreateGameSubmit(gameStats);
    //setResult(null);
    counter = 1;
  }
  const resetGameOver = useCallback(() => {
    setGameOver(false);
  }, []);


  return [gameOver, setGameOver, resetGameOver];
};
