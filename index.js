#! /usr/bin/env node
const program = require("commander");
const fs = require('fs');

program
  .version('0.0.1')
  .option('-t, --target <target>', 'Define target')
  .parse(process.argv);

//  It is assumed that the dir from which this is called will be populated with the framework
const dir = process.cwd();


fs.createReadStream(__dirname + "/resources/bar.salvo.json").pipe(fs.createWriteStream(dir + '/bar.salvo.json'));
fs.createReadStream(__dirname + "/resources/source.json").pipe(fs.createWriteStream(dir + '/source.json'));
