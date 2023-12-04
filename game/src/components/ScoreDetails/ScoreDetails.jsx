import { useContext, useEffect, useState, useReducer } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/authContext';
import { useGameContext } from '../../contexts/gameContext';
import * as gameService from '../../services/gameService';
//import * as commentService from '../../services/commentService';

//import { AddComment } from './AddComment/AddComment';
//import { gameReducer } from '../../reducers/gameReducer';
import './ScoreDetails.css';

const ScoreDetails = () => {


    const { scoreId } = useParams();
    const [score, setScore] = useState({});
    // const [game, dispatch] = useReducer(gameReducer, {});
    const { userId, isAuthenticated, userEmail } = useContext(AuthContext);
    // const { onGameDelete } = useContext(GameContext);
    const isOwner = score._ownerId === userId;
    // console.log(game);
    // const navigate = useNavigate();

    useEffect(() => {
        async function getScoreDetails() {
            const score = await gameService.getScoreById(scoreId);
            setScore(score);
            console.log(score.points);
        }
        getScoreDetails();
    }, [scoreId]);

    // useEffect(() => {
    //     async function getComments() {
    //         const [gameData, comments] = await Promise.all([
    //             gameService.getOne(gameId),
    //             commentService.getAllComments(gameId)
    //         ]);
    //         const gameState = { ...gameData, comments };
    //         dispatch({ type: 'GET_GAME', payload: gameState });
    //         //console.log(gameData);
    //     }
    //     getComments();
    // }, [gameId]);

    // const onCommentSubmit = async (data) => {
    //     //console.log(data);
    //     const newComment = await commentService.createComment(gameId, data.comment);
    //     //console.log(newComment);
    //     dispatch({ type: 'ADD_COMMENT', payload: newComment, userEmail })
    // }

    // const onDeleteClick = async () => {
    //     const confirmed = window.confirm(`Are you sure you want to delete ${game.title}?`);
    //     //Good UX is ot use custom modal dialogs, instead of confirm! // showDeleteDialog(true)!
    //     if (confirmed) {
    //         await gameService.deleteGame(gameId);
    //         onGameDelete(gameId);
    //         navigate('/catalogue');
    //     }
    // }

    return (
        <div className="ag-courses_item">
            <a href="#" className="ag-courses-item_link">
                <div className="ag-courses-item_bg"></div>

                <div className="ag-courses-item_title">
                    Player:{score?._ownerId?.username}
                </div>

                <div className="ag-courses-item_title">
                    Level:{score.level}
                </div>

                <div className="ag-courses-item_title">
                    Lines Completed:{score.linesCompleted} 
                </div>

                <div className="ag-courses-item_title">
                    Points:{score.points}
                </div>

                <div className="ag-courses-item_date-box">
                    Cteated:
                    <span className="ag-courses-item_date">
                        {score.date}
                    </span>
                </div>
            </a>
        </div>
    );
}

export default ScoreDetails;