import { useState, useCallback } from "react";
import { useGameContext } from '../contexts/gameContext';

let counter = 0;

export const useGameOver = () => {
  const { onCreateGameSubmit } = useGameContext();
  const [gameOver, setGameOver] = useState(true);
  //const [counter, setCounter] = useState(0);
  if (gameOver) {
    counter++;
    console.log(counter);
  }

  if (counter === 2) {
    console.log('GAME OVER');
    onCreateGameSubmit({"Test": "123"});
    counter = 1;
  }
  const resetGameOver = useCallback(() => {
    setGameOver(false);
  }, []);

  return [gameOver, setGameOver, resetGameOver];
};
