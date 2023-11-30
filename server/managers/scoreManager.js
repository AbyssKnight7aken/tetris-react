const Score = require('../models/Score');


exports.getAll = async (page, itemsPerPage) => {
    return await Score.find({}).skip(page * itemsPerPage).limit(itemsPerPage).populate('_ownerId');
}

exports.getSearchResult = async (searchInput, page, itemsPerPage) => {
    const regex = new RegExp(searchInput, 'i');
    return  await Score.find({name: {$regex: regex}}).skip(page * itemsPerPage).limit(itemsPerPage).populate('_ownerId');
}

exports.getRescent = () => {
    return Score.find({}).sort({ _id: -1 }).limit(3).populate('_ownerId');
}


exports.getByUserId = async (userId, page, itemsPerPage) => {
    const userScores = await Score.find({ _ownerId: userId }).skip(page * itemsPerPage).limit(itemsPerPage).populate('_ownerId');
    const count = await Score.countDocuments({_ownerId: userId});
    let pageCount = 0;
        if (count % itemsPerPage === 0) {
            pageCount = count / itemsPerPage;
        } else {
            pageCount = Math.floor(count / itemsPerPage) + 1;
        }
        return { userScores, pageCount };
}

exports.getById = async (id) => {
    const score = Score.findById(id).populate('_ownerId').populate('commentList.user');
    return score;
}

exports.create = async (item) => {
    return Score.create(item);
}

// exports.update = async (id, item) => {
//     const existing = await Log.findById(id);

//     existing.name = item.name;
//     existing.date = item.date;
//     existing.description = item.description;
//     existing.img = item.img;
//     existing.location = item.location;

//     return existing.save();
// }

exports.deleteById = async (id) => {
    return Score.findByIdAndDelete(id);
}

exports.getCount = async () => {
    return Score.countDocuments({});
};

exports.getSearchCount = async (searchParam) => {
    const regex = new RegExp(searchParam, 'i');
    return Score.countDocuments({name: {$regex: regex}});
};

exports.addComment = async (id, commentData) => {
    const score = await Score.findById(id).populate('_ownerId').populate('commentList.user');
    Score.commentList.push(commentData);
    Score.save();
    return score;
}

exports.addLike = async (id, userId) => {
    const score = await Score.findById(id).populate('_ownerId').populate('commentList.user');
    Score.likes.push(userId);
    Score.save();
    return score;
}

// exports.downloadImage = async (id, userId) => {
//     const log = await Log.findById(id).populate('_ownerId').populate('commentList.user');
//     log.downloads.push(userId);
//     log.save();
//     return log;
// }