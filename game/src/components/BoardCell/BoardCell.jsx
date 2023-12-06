import "./BoardCell.css";

const BoardCell = ({ cell }) => (
  <div className={`BoardCell tetromino ${cell.className}`}>
    <div className="Sparkle"></div>
  </div>
);

export default BoardCell;
