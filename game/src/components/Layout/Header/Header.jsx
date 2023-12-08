import { Link } from "react-router-dom";
import { useAuthContext } from '../../../contexts/authContext';
import "./Header.css";

const Header = () => {
    const { isAuthenticated, username } = useAuthContext();
    return (
        <header className="section-site-header">
    <div className="container">
        {/* <p className="site-title"><Link to="/">Tetris React</Link></p> */}
        <Link to="/"><img src="/images/tetris.png" className="logo" alt="logo" /></Link>

        <nav className="main-nav">
            <ul>
                {isAuthenticated
                    ? <div id="user">
                        <li><Link to="about">About</Link></li>
                        <li><Link to="scoreboard">ScoreBoard</Link></li>
                        {/* <span>Welcome, {username}</span> */}
                        <li><Link to="profile">Welcome, {username}</Link></li>
                        <li><Link to="logout">Logout</Link></li>
                    </div>
                    : <div id="guest">
                        <li><Link to="about">About</Link></li>
                        <li><Link to="scoreboard">ScoreBoard</Link></li>
                        <li><Link to="login">Login</Link></li>
                        <li><Link to="register">Register</Link></li>
                    </div>
                }
            </ul>
        </nav>
    </div>
</header>
    );
}

export default Header;


