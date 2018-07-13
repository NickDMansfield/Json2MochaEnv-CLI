require('chromedriver');
var webdriver = require('selenium-webdriver');
const assert = require('assert');
const until = webdriver.until;



var driver = new webdriver.Builder().
   withCapabilities(webdriver.Capabilities.chrome()).
   build();
