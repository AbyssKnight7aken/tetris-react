import { useContext, useEffect, useState, useReducer } from 'react'
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

import { AuthContext } from '../../contexts/authContext';
import { useGameContext } from '../../contexts/gameContext';
import * as gameService from '../../services/gameService';
import Modal from '../common/Modal/Modal';
//import * as commentService from '../../services/commentService';

//import { AddComment } from './AddComment/AddComment';
//import { gameReducer } from '../../reducers/gameReducer';
import './ScoreDetails.css';

const ScoreDetails = () => {
    const { scoreId } = useParams();
    const [score, setScore] = useState({});
    const [likes, setlikes] = useState(null);
    const [showModal, setShowModal] = useState(false);
    // const [game, dispatch] = useReducer(gameReducer, {});
    const { userId, isAuthenticated, userEmail } = useContext(AuthContext);
    const { onGameDelete } = useGameContext();
    const isOwner = score._ownerId?._id === userId;

    useEffect(() => {
        async function getScoreDetails() {
            const score = await gameService.getScoreById(scoreId);
            setScore(score);
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

    const formatDate = (dateString) => {
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: 'numeric'
        };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
    };

    const onDeleteClick = async () => {
        setShowModal(true);
    }

    const close = () => {
        setShowModal(false);
    };

    const deleteConfirm = async () => {
        onGameDelete(scoreId);
    }

    const onLikeClick = async () => {
        await gameService.addLike(scoreId);
        const score = await gameService.getScoreById(scoreId);
        setScore(score);
        // const newLikes = await bookService.getLikesBybookId(bookId);
        // setlikes(newLikes);
        // setMylikes(1);
        console.log('like');
    }

    return (
        <section className="score_details">
            <div className="ag-courses_item">
                <div className="ag-courses-item_link">
                    <div className="ag-courses-item_bg"></div>

                    <div className="ag-courses-item_title">
                        Player : {score?._ownerId?.username}
                    </div>

                    <div className="ag-courses-item_title">
                        Level : {score.level}
                    </div>

                    <div className="ag-courses-item_title">
                        Lines Completed : {score.linesCompleted}
                    </div>

                    <div className="ag-courses-item_title">
                        Points: {score.points}
                    </div>

                    <div className="ag-courses-item_date-box">
                        <span className="ag-courses-item_date">
                            {formatDate(score.date)}
                        </span>
                    </div>

                    <div className="buttons">
                        {
                            isAuthenticated && isOwner &&
                            <p className="button-red"><FontAwesomeIcon icon={faThumbsUp}>icon</FontAwesomeIcon> {score.likes?.length}</p>
                        }
                        {
                            !isAuthenticated &&
                            <p className="button-red"><FontAwesomeIcon icon={faThumbsUp}>icon</FontAwesomeIcon> {score.likes?.length}</p>
                        }
                        {
                            isAuthenticated && !isOwner &&
                            <p className="button-blue"><Link onClick={onLikeClick} to=""><FontAwesomeIcon icon={faThumbsUp}>icon</FontAwesomeIcon> {score.likes?.length}</Link></p>
                        }
                        {
                            isAuthenticated && isOwner &&
                            <>
                                <p className="button-blue"><Link to={`/scoreboard/${scoreId}/edit`}>Edit</Link></p>
                                <p className="button-red"><Link onClick={onDeleteClick} to="">Delete</Link></p>
                            </>
                        }
                        {
                            showModal && <Modal close={close} deleteConfirm={deleteConfirm}></Modal>
                        }
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ScoreDetails;