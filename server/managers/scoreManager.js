const Score = require('../models/Score');


exports.getAll = async (page, itemsPerPage) => {
    return Score.find({}).sort({ _id: -1 }).skip(page * itemsPerPage).limit(itemsPerPage).populate('_ownerId');
}

exports.getSearchResult = async (searchInput, page, itemsPerPage) => {
    const regex = new RegExp(searchInput, 'i');
    return  await Score.find({name: {$regex: regex}}).skip(page * itemsPerPage).limit(itemsPerPage).populate('_ownerId');
}

exports.getHighestScores = () => {
    return Score.find({}).sort({ points: -1 }).limit(3).populate('_ownerId');
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
    //const score = Score.findById(id).populate('_ownerId').populate('commentList.user');
    const score = Score.findById(id).populate('_ownerId');
    return score;
}

exports.create = async (item) => {
    return Score.create(item);
}

exports.update = async (id, item) => {
    const existing = await Score.findById(id);

    existing.level = item.level;
    existing.linesCompleted = item.linesCompleted;
    existing.points = item.points;
    existing.date = item.date;

    return existing.save();
}

exports.deleteById = async (id) => {
    return Score.findByIdAndDelete(id);
}

exports.getCount = async () => {
    return Score.countDocuments({});
};

exports.addLike = async (id, userId) => {
    const score = await Score.findById(id).populate('_ownerId');
    score.likes.push(userId);
    score.save();
    return score;
}

exports.removeLike = async (id, userId) => {
    const score = await Score.findById(id).populate('_ownerId');
    score.likes = score.likes.filter(x => x._id.toString() !== userId.toString());
    console.log(score.likes);
    console.log(userId.toString());
    score.save();
    return score;
}