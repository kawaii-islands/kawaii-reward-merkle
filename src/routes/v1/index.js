const express = require('express');
const rewardRoute = require('./reward.route');
const airdropRoute = require('./airdrop.route');
const milkyInGameRoute = require('./milkyInGame.route');

const router = express.Router();

router.use('/reward', rewardRoute);
router.use('/airdrop', airdropRoute);
router.use('/milky-in-game', milkyInGameRoute);

module.exports = router;
