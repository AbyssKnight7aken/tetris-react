import styles from './BoardCell.module.css'

const BoardCell = ({cell} : {cell: any, className?: string }) => {
    return (
        <div className={`${styles.BoardCell} ${cell.className}`}>
            <div className="Sparkle" />
        </div>
    );
}

export default BoardCell;