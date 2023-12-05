import {useGameContext} from '../../contexts/gameContext';
import Game from '../Game/Game';
import Card from '../common/Card/Card';
import './Home.css';

const Home = () => {
    const {scores} = useGameContext();
    console.log(scores);
    return (
        <>
            <Game rows={20} columns={10} />
            <h1 className="home_h1">Highest Scores :</h1>
            <section className="rescent">
            {
                scores.length === 0
                    ? <h3>No scores yet</h3>
                    : scores.map(x => <Card key={x._id} score={x} />)
            }
                {/* <Card games={games}/>
                <Card />
                <Card /> */}
            </section>
        </>
    );
}

export default Home;