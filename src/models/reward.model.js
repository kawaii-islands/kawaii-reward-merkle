const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  trancheId: Number,
  address: String,
  balance: String,
});

const Reward = mongoose.model('Reward', schema, 'reward');

module.exports = Reward;
