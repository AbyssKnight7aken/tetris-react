import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

import * as authService from '../services/authService';
import { useLocalStorage } from "../hooks/useLocalStorage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [auth, setAuth] = useLocalStorage('auth', {});

    const onRegisterSubmit = async (data) => {
        //try catch...

        if (data.email === '' || data.password === '') {
            return alert('All fields are required!');
        }

        if (data.password !== data['repeat-password']) {
            return alert('Password dos\'t march');
        }

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
    };

    const onLoginSubmit = async (data) => {
        if (data.email === '' || data.password === '') {
            return;
        }
        const user = await authService.login(data.email, data.password);
        setAuth(user);
        navigate('/game');
    }

    const onLogout = async () => {
        await authService.logout();
        setAuth({});
        localStorage.removeItem('auth');
    }

    const context = {
        onRegisterSubmit,
        onLoginSubmit,
        onLogout,
        userId: auth._id,
        token: auth.accessToken,
        username: auth.username,
        userEmail: auth.email,
        isAuthenticated: !!auth.accessToken
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