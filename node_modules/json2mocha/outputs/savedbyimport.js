require('chromedriver');
var webdriver = require('selenium-webdriver');
const assert = require('assert');
const test = require('selenium-webdriver/testing');
const until = webdriver.until;



var driver = new webdriver.Builder().
   withCapabilities(webdriver.Capabilities.chrome()).
   build();
test.describe('Searches google - loaded from an obj', function () {
    test.it('search google', function() {
    driver.get('http://google.com');
    driver.wait(until.elementLocated(webdriver.By.name('q')), 10000).then(element => { 
     return element.sendKeys('Json2Mocha npm') 
    }) ;
    driver.wait(until.elementLocated(webdriver.By.name('q')), 10000).then(element => { 
     return element.submit() 
    }) ;
  });
});

