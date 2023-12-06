import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

import { AuthContext } from "../../contexts/authContext";
import { useForm } from '../../hooks/useForm';

import './Register.css';

const LoginFormKeys = {
    name: 'username',
    email: 'email',
    password: 'password',
    repass: 'repeat-password'
};

const Register = () => {

    const { onRegisterSubmit, serverError, resetServerError } = useContext(AuthContext);
    useEffect(() => {
        resetServerError();
    }, []);

    const { values, changeHandler, onSubmit, errors, focused, handleFocus } = useForm({
        [LoginFormKeys.name]: '',
        [LoginFormKeys.email]: '',
        [LoginFormKeys.password]: '',
        [LoginFormKeys.repass]: ''
    }, onRegisterSubmit);

    return (
        <div className="align">

            <div className="grid">

                <form method="POST" className="form login" onSubmit={onSubmit}>

                    <div className="form__field">
                        <label htmlFor="login__username"><FontAwesomeIcon icon={faUser}>icon</FontAwesomeIcon><span className="hidden">Username</span></label>
                        <input
                            id="login__username"
                            type="text"
                            className="form__input"
                            placeholder="Username"
                            required
                            invalid={errors.username && !focused ? "true" : "false"}
                            onBlur={handleFocus}
                            focused={focused.toString()}
                            name={LoginFormKeys.name}
                            value={values[LoginFormKeys.name]}
                            onChange={changeHandler} />
                    </div>

                    {errors.username && !focused && <span className='error'>{errors.username}</span> }

                    <div className="form__field">
                        <label htmlFor="login__email"><FontAwesomeIcon icon={faEnvelope}>icon</FontAwesomeIcon><span className="hidden">Username</span></label>
                        <input
                            id="login__email" type="text"
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

                    {errors.email && !focused && <span className='error'>{errors.email}</span> }

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

                    {errors.password && !focused && <span className='error'>{errors.password}</span> }

                    <div className="form__field">
                        <label htmlFor="login__repeat-password"><FontAwesomeIcon icon={faLock}>icon</FontAwesomeIcon><span className="hidden">Password</span></label>
                        <input
                            id="login__repeat-password"
                            type="password"
                            className="form__input"
                            placeholder="Repeat Password"
                            required
                            invalid={errors.confirmPassword && !focused ? "true" : "false"}
                            onBlur={handleFocus}
                            focused={focused.toString()}
                            name={LoginFormKeys.repass}
                            value={values[LoginFormKeys.repass]}
                            onChange={changeHandler} />
                    </div>

                    {errors.confirmPassword && !focused && <span className='error'>{errors.confirmPassword}</span> }

                    <div className="form__field">
                        <input disabled={Object.keys(errors).length > 0 } type="submit" value="Register" />
                    </div>

                    {serverError && Object.keys(errors).length === 0 && <span className='error'>{serverError}</span>}

                </form>

                <p className="text--center">Already a mamber? <Link to="/login">Login</Link> <svg className="icon"><use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="assets/images/icons.svg#arrow-right"></use></svg></p>

            </div>

        </div>
    );
}

export default Register;