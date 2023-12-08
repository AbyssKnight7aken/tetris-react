import { Link } from 'react-router-dom';
import './NotFound.css';

export const NotFound = () => {
    return (
        <>
            <h1>Not Found ...</h1>
            {/* <p class="zoom-area"><b>Not Found ...</b></p> */}
            <section className="error-container">
                <span className="four"><span className="screen-reader-text">4</span></span>
                <span className="zero"><span className="screen-reader-text">0</span></span>
                <span className="four"><span className="screen-reader-text">4</span></span>
            </section>
            <div class="link-container">
                <Link to="/" class="more-link">Visit Home Page</Link>
            </div>
        </>
    );
}

export default NotFound;