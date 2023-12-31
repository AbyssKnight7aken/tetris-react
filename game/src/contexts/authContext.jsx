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
            console.log(data);
            // const formData = new FormData();
            // formData.append('username', data.username);
            // formData.append('email', data.email);
            // formData.append('password', data.password);
            // formData.append('avatar', avatar);
            // console.log(formData.get('avatar'));


            const user = await authService.register(data);
            setAuth(user);
            navigate('/scoreboard');

        } catch (error) {
            console.log(error.message);
            return setServerError(error.message);
        }
    };

    const onLoginSubmit = async (data) => {
        try {
            const user = await authService.login(data.email, data.password);
            setAuth(user);
            navigate('/scoreboard');
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

    const onUserEditSubmit = async (userData) => {
        try {
            const updatedUser = await authService.update(userData);
            console.log(updatedUser);
            setAuth(updatedUser);
            navigate('/profile');
        } catch (error) {
            console.log(error.message);
            return setServerError(error.message);
        }

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
        resetServerError,
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