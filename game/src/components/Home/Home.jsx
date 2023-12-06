import {useGameContext} from '../../contexts/gameContext';
import Game from '../Game/Game';
import Card from '../common/Card/Card';
import './Home.css';

const Home = () => {
    const {scores} = useGameContext();
    const highestScores = scores.sort((a, b) => b.points - a.points).slice(0,3);
    //const highestScores = [];
    return (
        <>
            <Game rows={20} columns={10} />
            <h1 className="home_h1">Highest Scores :</h1>
            <section className="rescent">
            {
                highestScores.length === 0
                    ? <h2>No scores yet !</h2>
                    : highestScores.map(x => <Card key={x._id} score={x} />)
            }
            </section>
        </>
    );
}

export default Home;