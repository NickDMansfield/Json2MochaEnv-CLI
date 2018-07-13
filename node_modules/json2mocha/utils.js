
const fs = require('fs');
const path = require("path");

let mochaConfig = null;

const getFormattedCommentString = (_obj, indents = 0, _charsPerLine = 80) => {
  if (_obj === undefined)
    return " ".repeat(indents);
  if (!_obj.comment)
    return "";
  const obj = JSON.parse(JSON.stringify(_obj));
  let commentString = obj.comment ? JSON.parse(JSON.stringify(obj)).comment : "";
  const charsPerLine = obj.charsPerLine || _charsPerLine;
  let outputString =  " ".repeat(indents);
  const commentArr = commentString.split(" ");
  if (commentArr.length > 0) {
    outputString += "// ";
  }
  let charCount = 0;
  for (let word of commentArr) {
    if ((charCount + word.length ) > charsPerLine) {
      outputString += "\r\n" + " ".repeat(indents) + "// ";
      charCount = 0;
    }
    charCount += word.length;
    outputString += word + " ";
  }
  return outputString + " ".repeat(indents) + "\r\n";
};

const getFindElementStringViaTargetObj = (targetObj, indents = 0) => {
  return " ".repeat(indents - 1) + "driver.wait(until.elementLocated(webdriver.By." + targetObj.searchBy + "(" + targetObj.value + ")), 10000).then(element => { \r\n" + " ".repeat(indents) + "return element.ACTIONSTRINGPLACEHOLDER \r\n" + " ".repeat(indents - 1) + "}) ";
};

const getActionStringFromActionObj = actionObj => {
  let returnString =  actionObj.method + "(";
  if (actionObj.values && actionObj.values.length > 0) {
    for (let val of actionObj.values) {
      returnString += val + ",";
    }
    returnString = returnString.slice(0, -1);
  }
  returnString += ")";
  return returnString;
};

const addActionText = (actionObj, indents = 0) => {
  // expects an object with a target and an action property
  let editedString =  getFormattedCommentString(actionObj, indents);
  const actionTargetString = actionObj.target ? getFindElementStringViaTargetObj(actionObj.target, indents + 1) : " ".repeat(indents) + "driver";
  const actionActionString = getActionStringFromActionObj(actionObj.action);
  editedString += actionObj.target ? actionTargetString.replace("ACTIONSTRINGPLACEHOLDER", actionActionString) : actionTargetString + "." + actionActionString;
  return editedString;
};

const getStringsForActionsArray = (actionsArr, indents = 0) => {
  let retStr = "";
  for (let action of actionsArr) {
    if (mochaConfig != null && mochaConfig.hasOwnProperty('autoDelay')) {
      // If an auto delay is enabled, will put a lag between each action
      retStr += addActionText({ action: { method: 'sleep', values: [mochaConfig.autoDelay] }}, indents) + ";\r\n";
    }
    retStr += addActionText(action, indents) + ";\r\n";
  }
  return retStr;
};

const convertJsonObjToMochaString = (obj) => {
  let mochaString = getFormattedCommentString(obj);
  mochaConfig = obj.config;

  for (let describesCount = 0; describesCount < obj.describes.length; ++describesCount) {
    const currentDescribe = obj.describes[describesCount];

    // Set up initial describe
    mochaString = getFormattedCommentString(currentDescribe) + mochaString.concat("describe('" + currentDescribe.description + "', function () {\r\n");


    for (let itsCount = 0; itsCount < currentDescribe.its.length; ++itsCount) {
      let indent ="  ";
      const currentIt = currentDescribe.its[itsCount];
      // Begin it statement
      mochaString = mochaString.concat(indent + getFormattedCommentString(currentIt) + "  it('" + currentIt.should + "', function() {\r\n");


        // If there are any shared describe actions, apply them
        if (obj.sharedItActions && obj.sharedItActions.length > 0) {
          mochaString += getStringsForActionsArray(obj.sharedItActions, 4);
        }

      // Gets all actions
      mochaString += getStringsForActionsArray(currentIt.actions, 4);

      //Close out it statement
      mochaString += indent + "});\r\n"
    }

    // Close out describe section
    mochaString = mochaString.concat("});\r\n\r\n");
  }
  return mochaString;
};

const getBaseTemplateText = callback => {

  return fs.readFile(path.join(__dirname, 'mochaTemplate.js'), 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    return callback(data);
  });
};

const writeMochaFile = (fileLoc, mochaText, callback) => {
  fs.writeFile(fileLoc, mochaText, () => {
    callback();
  });
};

module.exports = {
  convertJsonObjToMochaString,
  getBaseTemplateText,
  writeMochaFile
};
