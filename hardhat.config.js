require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "fxce",
  networks: {
    hardhat: {
    },
    fxce: {
      url: "http://202.143.111.229:32003",
      accounts: ['6ee44874d355c054c138a417c5a725cccf7353460892125e028e60ebc8c77129']
    }
  },
  solidity: "0.8.17",
};
