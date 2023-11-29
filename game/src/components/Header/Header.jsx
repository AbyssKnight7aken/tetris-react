import { Link } from "react-router-dom";
import "./Header.css";

import { useAuthContext } from "../../contexts/authContext";

const Header = () => {
    const { isAuthenticated, username } = useAuthContext();
    return (
        <header className="section-site-header">
    <div className="container">
        <p className="site-title"><Link to="/game">Tetris React</Link></p>

        <nav className="main-nav">
            <ul>
                {isAuthenticated
                    ? <div id="user">
                        <li><Link to="about">About</Link></li>
                        <li><Link to="scoreboard">ScoreBoard</Link></li>
                        {/* <span>Welcome, {username}</span> */}
                        <li>Welcome,<Link to="profile">{username}</Link></li>
                        <li><Link to="logout">Logout</Link></li>
                    </div>
                    : <div id="guest">
                        <li><Link to="about">About</Link></li>
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


