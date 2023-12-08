import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faStar, faGripLines } from '@fortawesome/free-solid-svg-icons';

import { useForm } from '../../../hooks/useForm';
import {useGameContext} from '../../../contexts/gameContext';

import * as gameService from '../../../services/gameService';
import './EditScore.css';


const EditScore = () => {
    const { onScoreEditSubmit, serverError, resetServerError } = useGameContext();
    const { scoreId } = useParams();
    const { values, changeHandler, onSubmit, changeValues, errors, focused, handleFocus } = useForm({
        level: '',
        linesCompleted: '',
        points: '',
    }, onScoreEditSubmit);

    useEffect(() => {
        //resetServerError();
        const getScore = async () => {
            const score = await gameService.getScoreById(scoreId);
            changeValues(score);
        };
        getScore();
    }, [scoreId]);

    return (
        <div className="align">

            <div className="grid">

                <form method="POST" className="form login" onSubmit={onSubmit}>

                    <div className="form__field">
                        <label htmlFor="level"><FontAwesomeIcon icon={faGamepad}>icon</FontAwesomeIcon><span className="hidden">Username</span></label>
                        <input
                            id="level"
                            type="text"
                            className="form__input"
                            placeholder="level"
                            required
                            invalid={errors.level && !focused ? "true" : "false"}
                            onBlur={handleFocus}
                            focused={focused.toString()}
                            name="level"
                            value={values.level}
                            onChange={changeHandler} />
                    </div>

                    {errors.level && !focused && <span className='error'>{errors.level}</span>}

                    <div className="form__field">
                        <label htmlFor="linesCompleted"><FontAwesomeIcon icon={faGripLines}>icon</FontAwesomeIcon><span className="hidden">Username</span></label>
                        <input
                            id="linesCompleted"
                            type="text"
                            className="form__input"
                            placeholder="linesCompleted"
                            required
                            invalid={errors.linesCompleted && !focused ? "true" : "false"}
                            onBlur={handleFocus}
                            focused={focused.toString()}
                            name="linesCompleted"
                            value={values.linesCompleted}
                            onChange={changeHandler} />
                    </div>

                    {errors.linesCompleted && !focused && <span className='error'>{errors.linesCompleted}</span>}

                    <div className="form__field">
                        <label htmlFor="points"><FontAwesomeIcon icon={faStar}>icon</FontAwesomeIcon><span className="hidden">Password</span></label>
                        <input
                            id="points"
                            type="text"
                            className="form__input"
                            placeholder="points"
                            required
                            invalid={errors.points && !focused ? "true" : "false"}
                            onBlur={handleFocus}
                            focused={focused.toString()}
                            name="points"
                            value={values.points}
                            onChange={changeHandler} />
                    </div>

                    {errors.points && !focused && <span className='error'>{errors.points}</span>}

                    <div className="form__field">
                        <input disabled={Object.keys(errors).length > 0} type="submit" value="Edit Score" />
                    </div>

                    {/* {serverError && Object.keys(errors).length === 0 && <span className='error'>{serverError}</span>} */}

                </form>

            </div>

        </div>
    );
}

export default EditScore;