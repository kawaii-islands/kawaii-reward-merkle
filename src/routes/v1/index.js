const express = require('express');
const rewardRoute = require('./reward.route');
const airdropRoute = require('./airdrop.route');

const router = express.Router();

router.use('/reward', rewardRoute);
router.use('/airdrop', airdropRoute);

module.exports = router;
