import { get, post } from "./requester";

const ednpoints = {
    login: '/users/login',
    register: '/users/register',
    logout: '/users/logout'
};

export const login = async (email, password) => {
    const user = await post(ednpoints.login, {email, password});
    return user;
}; 

export const register = async (userData) => {
    console.log(userData);
    const user = await post(ednpoints.register, userData);
    return user;
}

export const logout = async () => {return await get(ednpoints.logout)};