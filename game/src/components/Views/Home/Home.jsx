import { useGameContext } from '../../../contexts/gameContext';
import Game from '../../GameComponents/Game/Game';
import Card from '../../common/Card/Card';
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';
import './Home.css';

const Home = () => {
    const { scores, loading } = useGameContext();
    const highestScores = scores.sort((a, b) => b.points - a.points).slice(0, 3);
    //const highestScores = [];
    return (
        <>
            <Game rows={20} columns={10} />
            <h1 className="home_h1">Highest Scores :</h1>
            <section className="rescent">
                <div className="spinner">
                    {loading && <LoadingSpinner />}
                </div>

                {!loading && highestScores.length === 0 && <h2>No scores yet !</h2>}
                {!loading && highestScores.length !== 0 && highestScores.map(x => <Card key={x._id} score={x} />)}

            </section>
        </>
    );
}

export default Home;