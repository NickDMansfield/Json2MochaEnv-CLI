require('chromedriver');
var webdriver = require('selenium-webdriver');
const assert = require('assert');
const test = require('selenium-webdriver/testing');
const until = webdriver.until;



var driver = new webdriver.Builder().
   withCapabilities(webdriver.Capabilities.chrome()).
   build();
// Comments can go on describes 
test.describe('Searches google - loaded from a json file', function () {
  // Or you can put comments on it/should objects 
  test.it('search google', function() {
    driver.sleep(1000);
    driver.get('http://google.com');
    driver.sleep(1000);
    driver.wait(until.elementLocated(webdriver.By.name('q')), 10000).then(element => { 
     return element.sendKeys('npm json2mocha') 
    }) ;
    driver.sleep(1000);
    driver.wait(until.elementLocated(webdriver.By.name('q')), 10000).then(element => { 
     return element.submit() 
    }) ;
  });
});

test.describe('Looks up cat pictures', function () {
    test.it('Look up cat pictures', function() {
    driver.sleep(1000);
    driver.get('http://google.com');
    driver.sleep(1000);
    // This here is a comment. But look at how long it has 
    // now become?  If it gets any longer, we will have to 
    // wrap it.  The default value is 80, but it can be set 
    // via the adjacent 'charsPerLine' property in 
    // the source JSON file.     
    driver.wait(until.elementLocated(webdriver.By.name('q')), 10000).then(element => { 
     return element.sendKeys('We\'re gonna wait for five seconds now') 
    }) ;
    driver.sleep(1000);
    driver.sleep(3000);
    driver.sleep(1000);
    driver.wait(until.elementLocated(webdriver.By.name('q')), 10000).then(element => { 
     return element.clear() 
    }) ;
    driver.sleep(1000);
    driver.wait(until.elementLocated(webdriver.By.name('q')), 10000).then(element => { 
     return element.sendKeys('purrito') 
    }) ;
    driver.sleep(1000);
    driver.wait(until.elementLocated(webdriver.By.name('q')), 10000).then(element => { 
     return element.submit() 
    }) ;
    driver.sleep(1000);
    driver.wait(until.elementLocated(webdriver.By.className('q qs')), 10000).then(element => { 
     return element.click() 
    }) ;
  });
});

