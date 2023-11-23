import BoardCell from '../BoardCell/BoardCell';
import styles from './Board.module.css';

const Board = ({ board }: {board:any}) => {
    console.log('board', board);

    const boardStyles = {
        gridTemplateRows: `repeat(${board.size.rows}, 1fr)`,
        gridTemplateColumns: `repeat(${board.size.columns}, 1fr)`
    }

    return (
        <div className={styles.Board} style={boardStyles}>
            {board.rows.map((row:any) =>
                row.map((cell:any, x:any) => (
                    <BoardCell key={x * board.size.columns + x} cell={cell} />
                ))
            )}
        </div>
    );
}

export default Board;