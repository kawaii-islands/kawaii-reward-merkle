const express = require('express');
const rewardRoute = require('./reward.route');

const router = express.Router();

router.use('/', rewardRoute);

module.exports = router;
