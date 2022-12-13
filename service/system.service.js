const bluebird = require('bluebird');

const {fxceCfg} = require('../config/vars');
const redis = require('redis');
bluebird.promisifyAll(redis)

const systemContractAbi = require("./artifacts/contracts/SystemReward.sol/SystemReward.json")
const {adminProvider} = require('../utils/provider');

const Web3 = require('web3');
const web3 = new Web3(adminProvider)
let systemContract = new web3.eth.Contract(systemContractAbi, '0x0000000000000000000000000000000000001002')

// const  adminProvider = new HDWalletProvider({
//     privateKeys: ['3e7556538f8f3f97b9f77357adcf72f62d5f70f1dc314db82d0dd39fcf7e076d'],
//     providerOrUrl: 'http://202.143.111.229:32003',
//     pollingInterval: 8000,
//     networkCheckTimeout: 1000000,
//     timeoutBlocks: 200
// })

// const holderProvider = new HDWalletProvider({
//     privateKeys: ['6ee44874d355c054c138a417c5a725cccf7353460892125e028e60ebc8c77129'],
//     providerOrUrl: 'http://202.143.111.229:32003',
//     pollingInterval: 8000,
//     networkCheckTimeout: 1000000,
//     timeoutBlocks: 200
// })

const  requestParam = {
    from: '0x6f422aCF1488455Ea134550D52Df3657Db335a05',
    gasPrice: 5000000000,
    gas: 5000000
}

const requestAdmin = {
    from: '0xF7FCCFc3DE0789362B5B998782992a27b12040c8',
    gasPrice: 5000000000,
    gas: 5000000
}

let stakingContract = new web3.eth.Contract(stakingContractAbi, '0x0000000000000000000000000000000000001000')

exports.getValidatorStatus = async(req) =>{
    let validatorStatus = await stakingContract.methods.getValidatorStatus(req.address).call();
    console.log("Validator status: ", validatorStatus)
}

exports.getListValidator = async() => {
    let validators = await stakingContract.methods.getValidators().call();
    console.log("List validator: ", validators)
}

exports.claimValidatorFee = async() => {
    let claimFeeResp = await stakingContract.methods.claimDelegatorFee('0x6f422aCF1488455Ea134550D52Df3657Db335a05').send(Object.assign(requestParam));
    console.log("Resp claim: ", claimFeeResp)
}

exports.getDistributionShares = async() => {
    let distributionShares = await systemContract.methods.getDistributionShares().call();
    console.log("Distribution shares: ", distributionShares)
}

exports.getSystemFee = async() => {
    let systemFee = await systemContract.methods.getSystemFee().call()
    console.log("System fee: ", systemFee)
}

exports.claimSystemFee = async() => {
    let claimResp = await systemContract.methods.claimSystemFee().send(Object.assign(requestAdmin));
    console.log("Claim resp: ", claimResp);
}

let req = {
    "address": "0x49157C7129cd754B7df7585Bb9c4e002222Cb63e",
    "validator": "0x6f422aCF1488455Ea134550D52Df3657Db335a05"
}