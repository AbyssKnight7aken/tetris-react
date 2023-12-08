import Card from '../../common/Card/Card';
import { useGameContext } from '../../../contexts/gameContext';


import './ScoreBoard.css';
import Pagination from '../../common/Pagination/Pagination';
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';

const ScoreBoard = () => {
    const { scores, pageCount, loading } = useGameContext();
    //const scores = [];
    return (
        <section className="scores">
            <h1>Scores :</h1>
            <div className="spinner">
                {loading && <LoadingSpinner />}
            </div>
            {!loading && scores.length === 0 && <h2>No scores yet !</h2>}
            {!loading && scores.length !== 0 && scores.map(x => <Card key={x._id} score={x} />)}
            {!loading && <Pagination pageCount={pageCount} />}
        </section>
    );
}

export default ScoreBoard;