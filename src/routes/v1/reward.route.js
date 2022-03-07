const express = require('express');
const { rewardController } = require('../../controllers');

const router = express.Router();

router.route('/proof/:address').get(rewardController.getProof);

module.exports = router;
