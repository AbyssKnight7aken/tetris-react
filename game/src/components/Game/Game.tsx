import { useGameOver } from "../../hooks/useGameOver";
import Menu from "../Menu/Menu";
import Tetris from "../Tetris/Tetris";

const Game = ({ rows, columns }: { rows: number, columns: number }) => {
    const [gameOver, setGameOver, resetGameOver] = useGameOver();
    const start = (): void => {
        resetGameOver();
        console.log(`Start gameOver is ${gameOver}`)
    };
    return (
        <div className="Game">
            {
                gameOver
                    ? <Menu onClick={start} />
                    : <Tetris rows={rows} columns={columns} setGameOver={setGameOver} />
            }
        </div>
    );
};

export default Game;