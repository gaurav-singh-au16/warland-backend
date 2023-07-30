const express = require('express');
const router = express.Router();
const gameController = require('../controllers/UserController.js');


// routes

router.get('/create-url', gameController.generateLink);
router.post('/share-url', gameController.shareLinkToUser);
router.post('/join-game', gameController.joinGame);
router.get('/get-user', gameController.showAllUser);

module.exports = router;