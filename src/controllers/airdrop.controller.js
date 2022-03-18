const { MerkleTree } = require('merkletreejs');
const { soliditySha3 } = require('web3-utils');
const catchAsync = require('../utils/catchAsync');
const apiResponse = require('../utils/apiResponse');

const addresses = [
  '0x3a93da588954acf4d0d8f1f1a4439fa79d84cf29',
  '0xd23d94afe7369e29179cedd8e816638a2a0c114a',
  '0xc64dec0c9443ab703474466f5166e76f8e442de2',
  '0xf0e06ed6084564c2cb2d37479848912ecab0343a',
  '0xbfb15dbd44d32d264e9f6d283a70d9a6d6fcc522',
  '0x91ccebf0b2b13a48174906607439c9798c25dc38',
  '0xf94caacd607fc1f0e23cd1b595ab1a0b07b03264'
];

const getProof = catchAsync(async (req, res) => {
  let { rootHash, address } = req.params;
  address = address.toLowerCase();

  const leaves = addresses.map(el => soliditySha3(el));
  const tree = new MerkleTree(leaves, soliditySha3, {sort: true});
  const root = tree.getHexRoot();
  if (root !== rootHash) {
    return apiResponse.successResponseWithData(res, 'root not found', []);
  }
  if (!addresses.includes(address)) {
    return apiResponse.successResponseWithData(res, 'address not found', []);
  }
  const leaf = soliditySha3(address);
  const proof = tree.getHexProof(leaf);

  return apiResponse.successResponseWithData(res, 'success', proof);
});

module.exports = {
  getProof,
};
