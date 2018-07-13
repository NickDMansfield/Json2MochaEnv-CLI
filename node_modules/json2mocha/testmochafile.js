var webdriver = require('selenium-webdriver');
const assert = require('assert');
const test = require('selenium-webdriver/testing');
const until = webdriver.until;



var driver = new webdriver.Builder().
   withCapabilities(webdriver.Capabilities.chrome()).
   build();

   
test.describe('This should be in a method', function () {
  test.it('search google', function() {
      driver.get('http://google.com');
    driver.findElement(webdriver.By.name('q')).sendKeys('Json2Mocha npm');
    driver.findElement(webdriver.By.name('q')).submit();
  });
});