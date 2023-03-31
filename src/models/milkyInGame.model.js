const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  address: String,
  balance: String,
});

const MilkyInGame = mongoose.model('MilkyInGame', schema, 'milky_in_game');

module.exports = MilkyInGame;
