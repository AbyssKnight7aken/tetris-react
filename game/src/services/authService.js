import { get, post, put } from './apiService';

const ednpoints = {
    login: '/users/login',
    register: '/users/register',
    update: '/users/update',
    logout: '/users/logout'
};

export const login = async (email, password) => {
    const user = await post(ednpoints.login, {email, password});
    return user;
};

export const update = async (userData) => {
    const updatedUser = await put(ednpoints.update, userData);
    return updatedUser;
}; 

export const register = async (userData) => {
    console.log(userData);
    const user = await post(ednpoints.register, userData);
    return user;
}

export const logout = async () => {return await get(ednpoints.logout)};