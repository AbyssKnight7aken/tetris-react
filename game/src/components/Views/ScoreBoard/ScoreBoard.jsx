import Card from '../../common/Card/Card';
import { useGameContext } from '../../../contexts/gameContext'

import './ScoreBoard.css';
import Pagination from '../../common/Pagination/Pagination';

const ScoreBoard = () => {
    const { scores, pageCount } = useGameContext();
    //const scores = [];
    return (
        <section className="scores">
            <h1>Scores :</h1>
            {scores.length === 0 && <h2>No scores yet !</h2>}
            {scores.length !== 0 && scores.map(x => <Card key={x._id} score={x} />)}
            <Pagination pageCount={pageCount} />
        </section>
    );
}

export default ScoreBoard;