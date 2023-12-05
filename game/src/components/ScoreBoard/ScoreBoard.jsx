import Card from '../common/Card/Card';
import { useGameContext } from '../../contexts/gameContext'

import './ScoreBoard.css';

const ScoreBoard = () => {
    const { scores } = useGameContext();
    //const scores = [];
    return (
        <section className="scores">
            <h1>Scores :</h1>
            {scores.length === 0 && <h2>No scores yet !</h2>}
            {scores.length !== 0 && scores.map(x => <Card key={x._id} score={x} />)}
        </section>
    );
}

export default ScoreBoard;