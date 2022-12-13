const HDWalletProvider = require("@truffle/hdwallet-provider");
const {fxceCfg} = require('../config/vars');
exports.contractProvider = require('web3-eth-contract');

exports.provider = new HDWalletProvider({ 
    privateKeys: [fxceCfg.contractOwnerPriv], 
    providerOrUrl: fxceCfg.providerUrl,
    pollingInterval: 8000
});

//admin - c8 address: 6ee44874d355c054c138a417c5a725cccf7353460892125e028e60ebc8c77129
//validator: 12a3483ebca9b514569287e1d96ce453b0d4956747a2d95e3a1b5e2ddcefb27f
exports.adminProvider = new HDWalletProvider({
    privateKeys: ['c83103a37158a1d6ca1eddd6d5f29384ab5e082692b33447bdc0fc4d8ad6ca16'],
    providerOrUrl: fxceCfg.providerUrl,
    pollingInterval: 8000,
    networkCheckTimeout: 1000000,
    timeoutBlocks: 200
})

this.contractProvider.setProvider(this.provider)
