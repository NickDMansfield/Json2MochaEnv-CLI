const j2m = require("./index.js");


const sampleObj = {
  description: "sample obj desc",
  config: {},
  actions: [],
  describes: [
    {
      description: "Searches google - loaded from an obj",
      actions: [],
      its: [
        {
          should: "search google",
          actions: [
          {
              action: {
              method: "get",
              values: [
                "'http://google.com'"
              ]
            }
          },
          {
            target: {
              searchBy:"name",
              value: "'q'"
            },
            action: {
              method: "sendKeys",
              values: [
                "'Json2Mocha npm'"
              ]
            }
          },
          {
            target: {
              searchBy:"name",
              value: "'q'"
            },
            action: {
              method: "submit",
              values: []
            }
          }
          ]
        }
      ]
    }
  ]
};


j2m.saveJsonObjAsMochafile("./outputs/savedbyimport.js", sampleObj);
j2m.saveJsonFileAsMochaFile("./outputs/convertedFromJSON.js","./google.json");
