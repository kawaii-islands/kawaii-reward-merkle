const { MerkleTree } = require('merkletreejs');
const { soliditySha3 } = require('web3-utils');
const catchAsync = require('../utils/catchAsync');
const apiResponse = require('../utils/apiResponse');

const addresses = [
  "0x2f298db3eda6542ebb5e9c819939b247d1b2bf77",
  "0xd74f68128cecfb50e2ddfce6f290e30a55211518",
  "0x8dc7052ce0c8e4cebbf9f80fe28a06812c300c16",
  "0x46ded7c5d3e1c1cec4028a973069543f36cb5a54",
  "0x952a5d9a8d379d2df6621f468ab6316d4bb7b45f",
  "0x8674fade2e56ac7b8eaca7844037cec26403ab43",
  "0x000000a74b81381ee651df04d7d29594e242dacb",
  "0x48d5f2d32f4502943874e66a80220b9357feb071",
  "0xc73e5db51c60e53ae9ad5563d558ddd5b126e457",
  "0x4cad39e4e077e17c729408e493ab2bc7eaad8749",
  "0x1a12876693a1d6722ab09a54792a1c9a88aa2368",
  "0x46388f06ee9f6171117de2df21c2f9a95a1fe9fc",
  "0x24429bba350ca47eab3b8c292b09d1cfbbd12be3",
  "0x89a92a6e1bf184849f319f2a170dccf3296cc5d9",
  "0x4d147451eb44d6cf284b04af37f05a5216817a45",
  "0x3f36dd1061e92ce4099880fca38aa0dd03d917fd",
  "0xfb35061595e5e17cc2186c418bfecd1c5e8d441a",
  "0xcbe5870facbd81576600d4d3e0c0b47995d599a6",
  "0xf06bf753881526603319657a2fb2847bf71ebebd",
  "0x91ac29d40ea17775a39cef4bf90b793ee3e3e94d",
  "0x0f3bf51e36df0897488fc469ecd25953b339842c",
  "0x3827b7aeccfcd4d3dd25e5367cf2278f9668ab70",
  "0x58ed1d28bec868b277a7e7dc4e33886d31ae81e6",
  "0x312318892ea8363e9036e0d09b3257facd19c1d5",
  "0x883e0fa9a660e8d7b31667fa66dc444ccbb75cc3",
  "0xbdb65044a0879fb91967f32b324f9d43c650dd62",
  "0x006543726882b5913aff64bcd22f843b642ac9cb",
  "0x8f396c9c2a5e769371c7984f279c935817f31d8e",
  "0xf6f68aedca0b93f0868398577f22bee684908056",
  "0xe775c031375154f9268013c51057c51293ad39f2",
  "0x2e3e79cde11d647313f6b7a36fc3e4601dd80352",
  "0xd28537f971f5342b40273dbcc5cf85e4af646d68",
  "0x6f8dd9349f1dbc9f753574c151b117a55f53777e",
  "0xaf1b75950d3a6635abe7c1df7b780f057f0be426",
  "0x48e964d29408aa8fd7724c458c714e8b75b570fb",
  "0x61ef120f391fd82d6057a070a9f6b17a4203dee6",
  "0x6097fc1481c7b11334d2f08f480adff516c2e7b3",
  "0x3f12d4a45127e8bc04936bd91379e88bba781f9b",
  "0x8938fa07be3f76d0a69d2fbe6ed256457d7f4797",
  "0xc6e12ef030991c5118f278628069658460a0d096",
  "0x5d9fae88a9c626fada97c703d4ff2d33223fc8cb",
  "0x9055a0fc50c3a5c1827cb485d12f6137fa11d399",
  "0x63bd2398eda323a97388130da3ce6e64d4f756f9",
  "0x7883de49d31b13f7a2ca7aba9c1167f1646896bb",
  "0x77dd6555f6c5bdcc1cee227ffd69b5c277b07df9",
  "0x82fdcfe9b0a6ef2d210255e54da6bac7e56cfd8d",
  "0x9fda8e97f0cce39e1ac3e06e1372ddcf1ee88c50",
  "0x31e80e71a2c1e97e23c2e35652e516018e87d130",
  "0x07864097298f929fcc6fe60f5dc0f8f23bd34a8f",
  "0x91ca88fcced5832190380c92a3d18942d4ed5c37",
  "0x4e54bd51fbd6015e01625066bf2bf103e8cc6ca6",
  "0x99f5d4aac1607bcc83626402a2247b2c9dee49e9",
  "0x6d8e333c55476a2b6dea45233fbfafdff57c4269",
  "0x95845e0390d4811cfe768942dc9b7d16bde52192",
  "0xcba4a403b2816ab2129f0c0a29340cd8b185c1bb",
  "0xc9442bb05b2e1090241bfc0bb1a2a994ddad5788",
  "0x16b795fd0407a99c2318d10f65a00610f5f8ba56",
  "0x67f69922459126b6ffa1497482020bd6168c9ddb",
  "0x76924cb1bbebf5f0312a1474bd456f9919d62cd7",
  "0xb329fd6eef2ab438c0c581d42e930d805bbcbd3b",
  "0x96a1924f3b2cc60b447afa81e8826580118d317e",
  "0xfe2ecbfb41ea9ff56bbeb0c0881c0731632ba649",
  "0x9581674ff02c9a6e364800f65ccf4e815384254c",
  "0xd82bb8c1db0dd582a51f6045ada23c413018172c",
  "0x391ad00bc9e965c6cd4dfbca34da5763eb8202df",
  "0xeb388de7872fe470955a1e64d70bf903387bf1d7",
  "0x305670d83c2188e5603ed1f0562e3e53e26b7a3d",
  "0xf3e0e37a58075daa6711bc88a55eca87a65e280d",
  "0xe506c9774a7993ee9573a5844f50d088aa1995fc",
  "0xd76bee1145dd90ef4582b01b3ea3714f1d5928fe",
  "0xa4acb0167484b7494cf7ee2e426f25791bf662f8",
  "0xa3734eeaf85f015a036c8dee648852d8a3406779",
  "0x7341b65d54172332f6299faf6c32a56b58cab962",
  "0x3a264037cc33cf2ac28161d4d55ca0e05c862b09",
  "0xa08a557dd959be3898cfed494ae8566234a2b167",
  "0x360e991923e25229e76455b41acf9d1d06886288",
  "0x353744c2a9c5ffacc03ed804d00366682f579ba9",
  "0xbadde1974f54be17c85f023e38701d3e37752941",
  "0x662b0da61b0b6ed8b23f0ce3c0af9fb8afc8e24e",
  "0xad57452d358deddb4d50065af7319a71318d79b4",
  "0x1af5ff70621b2e2aafc4ecffac2dca5ab19ae468",
  "0x8e53d05f1e59ce972db4ce9a28d8684bd4e60a49",
  "0x25dc45461a8ee35b9dbc2f539efed2bcfaaab1cb",
  "0xeadf53429510765becbc6af6362cd0c7fb861506",
  "0x9e89c4c586273a5849fbf1b958699b59b1ef90ef",
  "0x03ebac2d81a569a024c7d72b27aa25297184ac96",
  "0xc6fc00ed573fcf52016fac9aede7f1d6feb5ea04",
  "0x4016f85c64e58f1b5b982f4711c8a9d9f6db78e8",
  "0xa7e5cdb5a383d0ceaa8190dda34567e597529b46",
  "0xab25588ced5fddf7ef933f68abec0b2ff5934203",
  "0xefb83ac62b23ccd7c53cfeb5333788ef9da52579",
  "0xdebcc1d359dea46cc09ca2b2c6c8774a73d6b4c7",
  "0xac40c6f95ec22b5dd352a44722d4732e3e6e22e3",
  "0x849f009a22ebca3b208e84a84cf8c07162acdf02",
  "0x86b240ec4b34e8f8e17cee4bf75baf851beb1971",
  "0xfc721274c404947c140b855b38b93c3f5ab9b6de",
  "0xec0b2efdd095c82a9e0d7a786352cf76f96a312d",
  "0xf08a5914bffe1664060f92c643735b960ee0823e",
  "0xd18324e7a59601d6085d7b6641f8233bfa623cdd",
  "0x2bf09a08151ac50fe3ac4dc2c321d56974d51bb6",
  "0xa5e98636aad92d2b747516d351f15e12af8c509d",
  "0x5be53bbccc02d6ca3c988eaf74afa934b58aae41",
  "0xe378fc973578f5619d2fb4ffcf92c7210a8f2243",
  "0x7bcf48ee0a114942eecbe4410e7c07aa58fad803",
  "0x6d4306ce5eb24cc18799cfbc2636eee8c3941689",
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
