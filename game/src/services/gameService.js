import * as request from './requester';

export const getAllBooks = async () => {
    const books = await request.get('/data/books?sortBy=_createdOn%20desc');
    return books;
}

export const getBookById = async (bookId) => {
    const book = await request.get(`/data/books/${bookId}`);
    return book;
}

export const createScore = async (gameData) => {
    const result = await request.post('/scores/', gameData);
    console.log(result);
    return result;
}

export const edit = async (bookId, data) => {
    const result = await request.put(`/data/books/${bookId}`, data);
    return result;
}

export const deleteBook = async (bookId) => {
    const result = await request.del(`/data/books/${bookId}`);
    return result;
}

export const getBooksByOwner = async (userId) => {
    const result = await request.get(`/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
    return result;
}

export const likeBook = async (bookId) => {
    const result = await request.post('/data/likes', {bookId});
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