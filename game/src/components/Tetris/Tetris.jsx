import {useContext} from 'react';
import styles from './Tetris.module.css';

import Board from "../Board/Board";
import GameController from "../GameController/GameController";
import GameStats from "../GameStats/GameStats";
import Previews from "../Previews/Previews";

import { useBoard } from "../../hooks/useBoard";
import { usePlayer } from "../../hooks/usePlayer";
import { GameContext } from "../../contexts/gameContext";

const Tetris = ({ rows, columns, setGameOver }) => {
  const { gameStats, addLinesCleared } = useContext(GameContext);
  const [player, setPlayer, resetPlayer] = usePlayer();
  const [board, setBoard] = useBoard({
    rows,
    columns,
    player,
    resetPlayer,
    addLinesCleared
  });


  return (
    <div className={styles.Tetris}>
      <Board board={board} />
      <GameStats gameStats={gameStats} />
      <Previews tetrominoes={player.tetrominoes} />
      <GameController
        board={board}
        gameStats={gameStats}
        player={player}
        setGameOver={setGameOver}
        setPlayer={setPlayer}
      />
    </div>
  );
};

export default Tetris;
