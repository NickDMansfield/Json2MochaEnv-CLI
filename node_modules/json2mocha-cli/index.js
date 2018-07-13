#! /usr/bin/env node

const j2m = require("json2mocha");
const program = require("commander");



program
  .version('0.0.1')
  .option('-j, --jsonfile <jsonfile>', 'Define the location of the source JSON')
  .option('-n, --newfile <newfile>', 'Define the target location')
  .parse(process.argv);

  if (!program.jsonfile) {
    console.log('No source file specified.  Please provide a relative file path with the -j parameter');
    process.exit();
  }
  if (!program.newfile) {
    console.log('No newfile destination specified.  Please provide a relative file path with the -n parameter');
    process.exit();
  }


  j2m.saveJsonFileAsMochaFile(program.newfile, program.jsonfile);
