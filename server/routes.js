const router = require('express').Router();

const userController = require('./controllers/userController');
const scoreController = require('./controllers/scoreController');

router.use('/api/users', userController);
router.use('/api/scores', scoreController);

module.exports = router;