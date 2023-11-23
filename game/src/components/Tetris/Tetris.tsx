import Board from "../Board/Board"
import { useBoard } from "../../hooks/useBoard"
import styles from "./Tetris.module.css"

const Tetris = ({ rows, columns, setGameOver }: { rows: number, columns: number, setGameover: any }) => {
    const [board] = useBoard({ rows, columns });

    return (
        <div className={styles.Tetris}>
            <Board board={board} />
        </div>
    )
}

export default Tetris;