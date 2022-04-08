const { MerkleTree } = require('merkletreejs');
const { soliditySha3 } = require('web3-utils');
const catchAsync = require('../utils/catchAsync');
const apiResponse = require('../utils/apiResponse');
const Reward = require('../models/reward.model');
const RewardIsland = require('../models/rewardIsland.model');

const getProof = catchAsync(async (req, res) => {
  let { address } = req.params;
  address = address.toLowerCase();
  const personalRewards = await Reward.find({ address });
  const leaves = personalRewards.map(el => soliditySha3(address, el.balance));

  const trees = [];
  for (const reward of personalRewards) {
    const rewards = await Reward.find({ trancheId: reward.trancheId });
    const leaves = rewards.map(el => soliditySha3(el.address, el.balance));
    trees.push(new MerkleTree(leaves, soliditySha3, { sort: true }));
  }

  const proofs = leaves.map((el, idx) => ({
    trancheId: personalRewards[idx].trancheId,
    balance: personalRewards[idx].balance,
    proof: trees[idx].getHexProof(el),
  }));

  return apiResponse.successResponseWithData(res, 'success', proofs);
});

const getProofOfRewardIsland = catchAsync(async (req, res) => {
  let { address } = req.params;
  address = address.toLowerCase();
  const personalRewards = await RewardIsland.find({ address });
  const leaves = personalRewards.map(el => soliditySha3(address, ...el.tokenIds));

  const trees = [];
  for (const reward of personalRewards) {
    const rewards = await RewardIsland.find({ trancheId: reward.trancheId });
    const leaves = rewards.map(el => soliditySha3(el.address, ...el.tokenIds));
    trees.push(new MerkleTree(leaves, soliditySha3, { sort: true }));
  }

  const proofs = leaves.map((el, idx) => ({
    trancheId: personalRewards[idx].trancheId,
    tokenIds: personalRewards[idx].tokenIds,
    proof: trees[idx].getHexProof(el),
  }));

  return apiResponse.successResponseWithData(res, 'success', proofs);
});

module.exports = {
  getProof,
  getProofOfRewardIsland,
};
