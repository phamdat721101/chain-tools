var keythereum = require("keythereum");
var datadir = "/home/developer/node-config/storage/fxce-validator2";
var address= "0x67D7cfd808bE256C2B58755184538Ee290b153EA";
const password = "123";
console.log("Password:", password)
var keyObject = keythereum.importFromFile(address, datadir);
var privateKey = keythereum.recover(password, keyObject);
console.log(privateKey.toString('hex'));
