import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

import { useAuthContext } from '../../../contexts/authContext';
import { useForm } from '../../../hooks/useForm';
import './Login.css';

const LoginFormKeys = {
    email: 'email',
    password: 'password',
};

const Login = () => {
    const { onLoginSubmit, serverError, resetServerError } = useAuthContext();
    useEffect(() => {
        resetServerError();
    }, []);

    const { values, changeHandler, onSubmit, changeValues, errors, focused, handleFocus } = useForm({
        [LoginFormKeys.email]: '',
        [LoginFormKeys.password]: '',
    }, onLoginSubmit);

    return (
        <div className="align">

            <div className="grid">

                <form method="POST" className="form login" onSubmit={onSubmit}>

                    <div className="form__field">
                        <label htmlFor="login__email"><FontAwesomeIcon icon={faEnvelope}>icon</FontAwesomeIcon><span className="hidden">Username</span></label>
                        <input
                            id="login__email"
                            type="text"
                            className="form__input"
                            placeholder="Email"
                            required
                            invalid={errors.email && !focused ? "true" : "false"}
                            onBlur={handleFocus}
                            focused={focused.toString()}
                            name={LoginFormKeys.email}
                            value={values[LoginFormKeys.email]}
                            onChange={changeHandler} />
                    </div>

                    {errors.email && !focused && <span className='error'>{errors.email}</span>}

                    <div className="form__field">
                        <label htmlFor="login__password"><FontAwesomeIcon icon={faLock}>icon</FontAwesomeIcon><span className="hidden">Password</span></label>
                        <input
                            id="login__password"
                            type="password"
                            className="form__input"
                            placeholder="Password"
                            required
                            invalid={errors.password && !focused ? "true" : "false"}
                            onBlur={handleFocus}
                            focused={focused.toString()}
                            name={LoginFormKeys.password}
                            value={values[LoginFormKeys.password]}
                            onChange={changeHandler} />
                    </div>

                    {errors.password && !focused && <span className='error'>{errors.password}</span>}


                    <div className="form__field">
                        <input disabled={Object.keys(errors).length > 0} type="submit" value="Login" />
                    </div>

                    {serverError && Object.keys(errors).length === 0 && <span className='error'>{serverError}</span>}


                </form>

                <p className="text--center">Not a member? <Link to="/register">Register</Link> <svg className="icon"><use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="assets/images/icons.svg#arrow-right"></use></svg></p>

            </div>

        </div>
    );
}

export default Login;