const path = require('path');
const fs = require('fs');
const solc = require('solc');

module.exports = class Compiler {

    constructor(contractFileName) {
        this.contractFileName = contractFileName;
    }

    compileContract(contractFileName) {

      this.contractFileName = contractFileName;
      //Include here all contracts to be compiled
      const courseContractPath = path.resolve(__dirname, '../contracts', contractFileName);
      const courseContractSource = fs.readFileSync(courseContractPath, 'utf8');

      const input = {
        language: 'Solidity',
        sources: {
          'contract 1': {
            content: courseContractSource,
          },
        },
        settings: {
          outputSelection: {
            '*': {
              '*': ['*'],
            },
          },
        },
      };

      //console.log("Compiling:.. " + JSON.parse(solc.compile(JSON.stringify(input))).contracts['CourseContract.sol'].CourseContract);

      let result;

      /* There is an IF for each contract class in contracts source */
      if (contractFileName === 'CourseContract.sol') {
        result = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
          'contract 1'
        ].CourseContract;
      }

      //module.exports = result;
      return result;
  }

}
//
// let compiler = new Compiler();
// console.log(compiler);
