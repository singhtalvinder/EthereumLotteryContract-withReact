import web3 from './web3';

// Next 2- generated from the lottery contract's deploy.js
// node deploy.js which logged two values :
// an Address where deployed.
// and the abi(interface).
// These 2- will be used to create a local contract(representation 
// of our deployed contract in our app i.e., copy) instance using the 
// web3 library.
const address = '0x29b7d0Ef0E78c5E20845D6C6E089c56372Adc84D';
const abi = 
[{"constant":true,"inputs":[],"name":"manager","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pickWinner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"random","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getPlayers","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"enter","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"players","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];


export default new web3.eth.Contract(abi,address);