const express = require('express');
const { airdropController } = require('../../controllers');

const router = express.Router();

router.route('/:rootHash/proof/:address').get(airdropController.getProof);

module.exports = router;
