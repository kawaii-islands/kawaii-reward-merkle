const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  trancheId: Number,
  address: String,
  tokenIds: [Number],
});

const RewardIsland = mongoose.model('RewardIsland', schema, 'reward_island');

module.exports = RewardIsland;
