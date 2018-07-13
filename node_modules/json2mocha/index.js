
const utils = require('./utils.js');
const fs = require("fs");


const saveJsonObjAsMochafile = (loc, obj) => {
  const data = utils.convertJsonObjToMochaString(obj);
  utils.getBaseTemplateText(template => {
      utils.writeMochaFile(loc, template + data, function() {
        // Put any completion logic here
      });
  });
};

const saveJsonFileAsMochaFile = (newFile, jsonFile) => {
  return fs.readFile(jsonFile, 'utf8', function (err,data) {
    return saveJsonObjAsMochafile(newFile, JSON.parse(data));
  })
};

module.exports = {
  saveJsonFileAsMochaFile,
  saveJsonObjAsMochafile,
  utils
}
