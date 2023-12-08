import { useContext, useEffect, useState } from 'react'
import {  Link } from 'react-router-dom';

import { AuthContext } from '../../../contexts/authContext';
import { useGameContext } from '../../../contexts/gameContext';
import * as gameService from '../../../services/gameService';
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';


import './Profile.css';
import Card from '../../common/Card/Card';
import Pagination from '../../common/Pagination/Pagination';

const Profile = () => {
    const { userId, username, userEmail } = useContext(AuthContext);
    const { page, resetPage, loading } = useGameContext();
    const [userScores, setUserScores] = useState([]);
    //const {userScores, setUserScores} = useGameContext();
    
    useEffect(() => {
        async function getAllUserScores() {
            const result = await gameService.getUserScores(userId, page);
            resetPage()
            console.log(result);
            setUserScores(result);
        }
        getAllUserScores();
        //const userScores = scores.filter(x => x._ownerId._id === userId);
    }, [page]);

    console.log(userScores);
    console.log(userId);

    //const userScores = [];

    return (
        <section className="user_details">
            <div className="ag-courses_item">
                <div className="ag-courses-item_link">
                    <div className="ag-courses-item_bg"></div>

                    <div className="ag-courses-item_title">
                        USER INFO
                    </div>

                    <div className="ag-courses-item_title">
                        Name : {username}
                    </div>

                    <div className="ag-courses-item_title">
                        Email : {userEmail}
                    </div>

                    {/* <div className="ag-courses-item_title">
                        Points: {score.points}
                    </div> */}

                    <div className="buttons">
                        <p className="button-red"><Link to={'/profile/edit'}>EDIT USER INFO</Link> </p>
                    </div>
                </div>
            </div>
            <h1>Player Scores :</h1>
            <Pagination pageCount={userScores.pageCount}/>
            <div className="spinner">
                    {loading && <LoadingSpinner />}
                </div>
            {!loading && userScores?.userScores?.length === 0 && <h2>This player has no scores yet !</h2>}
            <div className="user_scores">
                {!loading && userScores?.length !== 0 && userScores?.userScores.map(x => <Card key={x._id} score={x} />)}
            </div>
        </section>
    );
}

export default Profile;