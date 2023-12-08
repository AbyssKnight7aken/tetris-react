import * as request from './apiService';


export const getCount = async () => {
    const scoresCount = await request.get('/scores/count');
    return scoresCount;
}

export const getAll = async (page) => {
    const scores = await request.get(`/scores?page=${page}`);
    return scores;
}

export const getHighest = async () => {
    const scores = await request.get(`/scores/highest`);
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


export const getUserScores = async (userId, page) => {
    const result = await request.get(`/scores?where=_ownerId%3D%22${userId}%22&page=${page}`);
    return result;
}

export const addLike = async (scoreId) => {
    const result = await request.get(`/scores/${scoreId}/likes`);
    return result;
}