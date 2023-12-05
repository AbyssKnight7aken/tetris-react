import { Link } from 'react-router-dom';
import styles from './About.module.css';
import LoadingSpinner from '../common/LoadingSpinner/LoadingSpinner';

const About = () => {
    const imageStyles = {
        "backgroundImage": "url(public/images/tetris-react.png)",
    };

    return (
        <section className={styles.about_section}>
            <div className={styles.app_logo}>
                <div style={imageStyles} className={styles.logo_image}>
                </div>
            </div>
            <section className={styles.info_section}>
                <p>Tetris-React web application is a classic tetris game, developed in React.</p>
                <p>Game Keyboard Controls :</p>
                <div className={styles.game_controls}>
                    <p>Arrow UP : Rotate</p>
                    <p>Arrow DOWN : Fast Drop</p>
                    <p>Arrow LEFT : Move Left</p>
                    <p>Arrow RIGHT : Move Right</p>
                    <p>Key Q : Quit Game</p>
                    <p>Key P : Pause Game</p>
                    <p>Key SPACE : Instant Drop</p>
                </div>
                <p>The application is designed and implemented according to the ReactJS Course project defense assignment at SoftUni.
                    It has public and private parts.
                    The public part is visible without authentication and includes the home, scoreboard
                    and about pages, as well as login and register forms.
                    The private part is for registered users and it is accessible only after successful login.
                    It contains the access to the game and the user profile page that holds all user's scores and the functionality to edit the user's info.
                    Logged in users can play, edit and delete their scores and have the options to like the scores.</p>
                <p>The server is a RESTful API that is build with Node.js and Express.js.</p>
                <p>MongoDB with Mongoose are used for storing and managing the data.</p>
                <p><Link to="https://github.com/AbyssKnight7aken/tetris-react" target="_blank" rel="noopener noreferrer">Visit project's Github page for more info</Link>  </p>
            </section>
        </section>
    );
}

export default About;