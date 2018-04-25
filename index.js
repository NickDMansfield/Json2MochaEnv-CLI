#! /usr/bin/env node
const program = require("commander");


program
  .version('0.0.1')
  .option('-t, --target <target>', 'Define target')
  .parse(process.argv);

//  It is assumed that the dir from which this is called will be populated with the framework
console.log(process.cwd());
