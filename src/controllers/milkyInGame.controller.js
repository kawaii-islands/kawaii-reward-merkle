const { soliditySha3 } = require('web3-utils');
const { MerkleTree } = require('merkletreejs');
const catchAsync = require('../utils/catchAsync');
const MilkyInGame = require('../models/milkyInGame.model');
const apiResponse = require('../utils/apiResponse');

const getProof = catchAsync(async (req, res) => {
  let { address } = req.params;
  address = address.toLowerCase();
  const personalMilky = await MilkyInGame.findOne({ address });
  let result = null;

  if (personalMilky) {
    const personalLeaf = soliditySha3(address, personalMilky.balance);

    const milky = await MilkyInGame.find({});
    const leaves = milky.map(el => soliditySha3(el.address, el.balance));
    const tree = new MerkleTree(leaves, soliditySha3, { sort: true });

    // proof
    result = {
      balance: personalMilky.balance,
      proof: tree.getHexProof(personalLeaf),
      // root: tree.getHexRoot(),
    };
  }

  return apiResponse.successResponseWithData(res, 'success', result);
});

module.exports = {
  getProof,
};
