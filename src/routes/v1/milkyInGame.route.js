const express = require('express');
const { milkyInGameController } = require('../../controllers');

const router = express.Router();

router.route('/proof/:address').get(milkyInGameController.getProof);

module.exports = router;
