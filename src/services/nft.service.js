const { Nft } = require('../models');

/**
 * Count nft
 * @returns {Number}
 */
const countNft = async () => {
  return Nft.count();
};

module.exports = {
  countNft,
};
