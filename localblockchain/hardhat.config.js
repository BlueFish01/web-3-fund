
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },

  defaultNetwork: "runnung",

  networks: {
    hardhat: {
      chainId: 1337,
    }
  },

  running: {
    url: "http://localhost:8545",
    chainId: 1337,
  }
};
