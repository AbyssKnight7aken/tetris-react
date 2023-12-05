import * as request from './apiService';

export const getAll = async () => {
    const scores = await request.get('/scores?page=${page}');
    return scores;
}

export const getScoreById = async (scoreId) => {
    const score = await request.get(`/scores/${scoreId}`);
    return score;
}

export const createScore = async (gameData) => {
    const result = await request.post('/scores/', gameData);
    console.log(result);
    return result;
}

export const edit = async (scoreId, data) => {
    const result = await request.put(`/scores/${scoreId}`, data);
    return result;
}

export const deleteScore = async (scoreId) => {
    const result = await request.del(`/scores/${scoreId}`);
    return result;
}

export const getBooksByOwner = async (userId) => {
    const result = await request.get(`/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
    return result;
}

export const addLike = async (scoreId) => {
    const result = await request.get(`/scores/${scoreId}/likes`);
    return result;
}

export const getLikesBybookId = async (bookId) => {
    const result = await request.get(`/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`);
    return result;
}

export const getOwnerLikesByBookId = async (bookId, userId) => {
    const result = await request.get(`/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
    return result;
}