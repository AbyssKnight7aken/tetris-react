import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as authService from '../services/authService';
import { useLocalStorage } from "../hooks/useLocalStorage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [auth, setAuth] = useLocalStorage('auth', {});
    const [serverError, setServerError] = useState(null);
    const resetServerError = () => {
        setServerError(null);
    };

    const onRegisterSubmit = async (data) => {
        try {
            // if (data.email === '' || data.password === '') {
            //     return alert('All fields are required!');
            // }

            // if (data.password !== data['repeat-password']) {
            //     return alert('Password dos\'t march');
            // }

            console.log(data);
            // const formData = new FormData();
            // formData.append('username', data.username);
            // formData.append('email', data.email);
            // formData.append('password', data.password);
            // //formData.append('img', this.selectedFile);
            // console.log(formData.get('username'));
            const user = await authService.register(data);
            setAuth(user);
            navigate('/game');

        } catch (error) {
            console.log(error.message);
            return setServerError(error.message);
        }
    };

    const onLoginSubmit = async (data) => {
        try {
            //     if (data.email === '' || data.password === '') {
            //     return;
            // }
            const user = await authService.login(data.email, data.password);
            setAuth(user);
            navigate('/game');
        } catch (error) {
            console.log(error.message);
            return setServerError(error.message);
        };
    };

    const onLogout = async () => {
        await authService.logout();
        setAuth({});
        localStorage.removeItem('auth');
    }

    const onUserEditSubmit = async () => {
        console.log('edited user!');
    }

    const context = {
        onRegisterSubmit,
        onLoginSubmit,
        onLogout,
        onUserEditSubmit,
        userId: auth._id,
        token: auth.accessToken,
        username: auth.username,
        userEmail: auth.email,
        isAuthenticated: !!auth.accessToken,
        serverError,
        resetServerError
    }

    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    );

};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    return context;
}