const fs = require('fs');
const path = require('path');
const moment = require('moment');


const scoreController = require('express').Router();

const scoreManager = require('../managers/scoreManager')
const { isAuth, auth } = require('../middlewares/authMiddleware')
const { parseError } = require('../util/parser');
const itemsPerPage = 6;


scoreController.get('/count', async (req, res) => {
    try {
        const count = await scoreManager.getCount();
        let pageCount = 0;
        if (count % itemsPerPage === 0) {
            pageCount = count / itemsPerPage;
        } else {
            pageCount = Math.floor(count / itemsPerPage) + 1;
        }
        res.json(pageCount);
    } catch (err) {
        const message = parseError(err);
        console.log(message);
        res.status(400).json({ message });
    }
});


scoreController.get('/highest', async (req, res) => {
    const highestScores = await scoreManager.getHighestScores();
    res.json(highestScores);
});


scoreController.get('/', async (req, res) => {
    let items = [];
    const page = req.query.page - 1 || 0;
    console.log(req.query.where);
    try {
        if (req.query.where) {
            const userId = JSON.parse(req.query.where.split('=')[1]);
            console.log(userId);
            console.log(page);
            items = await scoreManager.getByUserId(userId, page, itemsPerPage);
        } else {
            items = await scoreManager.getAll(page, itemsPerPage);
        }
        res.json(items);
    } catch (err) {
        const message = parseError(err);
        console.log(message);
        res.status(400).json({ message });
    }

});

//TODO: Turn on Guards and add userId...
scoreController.post('/', async (req, res) => {

    console.log(req.body);
    console.log(req.user);

    try {

        const data = {
            "level": req.body.level,
            "linesCompleted": req.body.linesCompleted,
            "points": req.body.points,
            "date": moment(),
            "_ownerId": req.user._id
        };


        const newScore = await scoreManager.create(data);
        console.log('Created!');
        res.json(newScore);

        //const data = Object.assign({ _ownerId: req.user._id }, req.body);
        //const data = Object.assign(req.body);
        //const item = await logManager.create(data);
        //res.json(item);

    } catch (err) {
        const message = parseError(err);
        console.log(message);
        res.status(400).json({ message });
    }
});

scoreController.get('/:id', async (req, res) => {
    const score = await scoreManager.getById(req.params.id);
    res.json(score);
});

scoreController.put('/:id', isAuth, async (req, res, next) => {
    const item = await scoreManager.getById(req.params.id);
    //console.log('req.user', req.user._id);
    //console.log('item._ownerId', item._ownerId._id.toString());
    if (req.user._id != item._ownerId._id.toString()) {
        return res.status(403).json({ message: 'You cannot modify this record' });
    }

    try {

        const data = {
            "level": Number(req.body.level),
            "linesCompleted": Number(req.body.linesCompleted),
            "points": Number(req.body.points),
            //"date": moment(req.body.date).format('MMMM Do YYYY, h:mm:ss a'),
            "date": moment(),
            "_ownerId": req.user._id,
            // "img": {
            //     "data": fs.readFileSync("uploads/" + req.file.filename),
            //     "contentType": "image/png",
            // },
        };

        const updatedScore = await scoreManager.update(req.params.id, data);
        console.log('updated!');
        res.json(updatedScore);

    } catch (err) {
        const message = parseError(err);
        console.log(message);
        res.status(400).json({ message });
    }
});

scoreController.delete('/:id', isAuth, async (req, res) => {
    const item = await scoreManager.getById(req.params.id);
    if (req.user._id != item._ownerId._id.toString()) {
        return res.status(403).json({ message: 'You cannot modify this record' });
    }

    try {
        await scoreManager.deleteById(req.params.id);
        res.status(204).end();
    } catch (err) {
        const message = parseError(err);
        console.log(message);
        res.status(400).json({ message });
    }
});


//LIKES==================================================================
scoreController.get('/:id/likes', isAuth, async (req, res) => {
    const scoreId = req.params.id;
    const userId = req.user._id;
    try {
        const score = await scoreManager.getById(scoreId);
        const isLiked = score.likes.map(x => x._id.toString()).includes(req.user?._id.toString());
        let result;
        if (isLiked) {
            result = await scoreManager.removeLike(scoreId, userId);
            console.log('remove like!');
        } else {
            result = await scoreManager.addLike(scoreId, userId);
            console.log('add like!');
        }
        res.json(result);
    } catch (err) {
        const message = parseError(err);
        console.log(message);
        res.status(400).json({ message });
    }
});

module.exports = scoreController;