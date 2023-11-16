import { useGameOver } from "../../hooks/useGameOver";
import Menu from "../Menu/Menu";

const Game = ({ rows, columns }: { rows: number, columns: number }) => {
    const [gameOver, setGameOver, resetGameOver] = useGameOver();
    const start = (): void => { console.log(`Start gameOver is ${gameOver}`) };
    return (
        <div className="Game">
            <Menu onClick={start} />
        </div>
    );
};

export default Game;