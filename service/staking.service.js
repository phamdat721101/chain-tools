const bluebird = require('bluebird');
const axios = require('axios')

const {fxceCfg} = require('../config/vars');
const redis = require('redis');
bluebird.promisifyAll(redis);

const stakingAbi = require('../artifacts/contracts/Staking.sol/Staking.json');
const deployerAbi = require('../artifacts/contracts/DeployerProxy.sol/DeployerProxy.json');
const goverAbi = require('../artifacts/contracts/Governance.sol/Governance.json');
const {adminProvider} = require('../utils/provider');

const Web3 = require('web3');
const web3 = new Web3(adminProvider);
let stakingContract = new web3.eth.Contract(stakingAbi, '0x0000000000000000000000000000000000001000');
let deployerContract = new web3.eth.Contract(deployerAbi,'0x0000000000000000000000000000000000007005');
let goverContract = new web3.eth.Contract(goverAbi, '0x0000000000000000000000000000000000007002')

const  requestParam = {
    from: '0x67D7cfd808bE256C2B58755184538Ee290b153EA',
    gasPrice: 90000000000,
    gas: 5000000,
    value: '2000000000000000000000'
            // 1010000000000000000000000
 }

exports.getValidatorStatus = async(req) => {
    try {
        let validatorStatus = await stakingContract.methods.getValidatorStatus(req.address).call();
        console.log("Validator status: ", validatorStatus)     

        let isValidator = await stakingContract.methods.isValidator(req.address).call();
        console.log("Is validator: ", isValidator)
    } catch (err) {
        console.log("Error messege: ", err.message)
    }
}

exports.getListValidator = async() =>{
    try {
        let listValidator = await stakingContract.methods.getValidators().call();
        console.log("List validator: ", listValidator) 
        let currentEpo = await stakingContract.methods.currentEpoch().call();
        let nextEpo = await stakingContract.methods.nextEpoch().call();
        console.log("Current: ", currentEpo, " -: ", nextEpo);
    } catch (err) {
        console.log("Error message get list validator: ", err)
        return err
    }
}

exports.addValidator = async(req) => {
    try {
        let balance = await web3.eth.getBalance(req.address)
        console.log("balance: ", balance)
        let resp = await stakingContract.methods.registerValidator(req.address,0).send(Object.assign(requestParam))
        console.log("Add validator resp: ", resp)
        
    } catch (err) {
        console.log("error add validator: ", err.message);
    }
}

exports.registerDeployer = async(req) =>{
    try {
        let resp = await deployerContract.methods.registerDeployedContract(req.address, '0x0000000000000000000000000000000000007002').send(Object.assign(requestParam))
        console.log("Resp register deployer: ", resp)
    } catch (err) {
        console.log("Error register deployer: ", err.message)
    }
}

exports.checkSystemContract = async(req) =>{
    try {
        let contractState = await deployerContract.methods.getContractState('0x0000000000000000000000000000000000007002').call();
        console.log("Contract state: ", contractState)
    } catch (err) {
        console.log("Error check system contract: ", err.message)
    }
}

// exports.getGoverRole = async(req) =>{
//     try {
//         let role = await goverContract.methods.
//     } catch (err) {
//         console.log("Error get governance role: ", err.message)
//     }
// }

let req = {
    "address": "0x67D7cfd808bE256C2B58755184538Ee290b153EA",
    "validator": "0x2D5320993b3068e1e342953870A07DA6AC6E12b0"
}

this.getListValidator()
// this.registerDeployer(req)
// this.getValidatorStatus(req)
// this.checkSystemContract(req)
this.addValidator(req)