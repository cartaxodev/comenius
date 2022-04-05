const HDWalletProvider = require('@truffle/hdwallet-provider'); // Provider for Rinkeby Network
const ganache = require("ganache-cli"); // Provider for local network
const Web3 = require('web3');
const Compiler = require('./Compiler.js');


const compiler = new Compiler();
const compilerResult = compiler.compileContract('CourseContract.sol');
const abi = compilerResult.abi;
const evm = compilerResult.evm;

provider = ganache.provider();
/*provider = new HDWalletProvider(
  'truck task laptop raw lady among direct nephew reject early critic talent',
  'https://rinkeby.infura.io/v3/7e2fb81a321e4e21ab78d9f47cb9ba70'
);*/

/* Creating web3 instance */
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  const deploymentAccount = accounts[0]; //select the account used for deploy

  console.log('Attempting to deploy from account', deploymentAccount);

  const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object, arguments: ['1', '180'] })
    .send({ gas: '1000000', from: deploymentAccount });

  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};

deploy();
