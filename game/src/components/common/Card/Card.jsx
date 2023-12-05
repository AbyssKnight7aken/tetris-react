import { Link } from 'react-router-dom';
import './Card.css';

const Card = ({ score }) => {
    return (
        <div className="ag-courses_item">
            <Link to={`/scoreboard/${score._id}`} className="ag-courses-item_link">
                <div className="ag-courses-item_bg"></div>

                <div className="ag-courses-item_title">
                    {score._ownerId.username}
                </div>

                <div className="ag-courses-item_title">
                    {score.points} points
                </div>
            </Link>
        </div>
    );
}

export default Card;