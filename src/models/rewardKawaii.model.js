const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  trancheId: Number,
  address: String,
  balance: String,
});

/**
 *
 * @typedef RewardKawaii
 */
const RewardKawaii = mongoose.model('RewardKawaii', schema, 'reward_kawaii');

module.exports = RewardKawaii;
