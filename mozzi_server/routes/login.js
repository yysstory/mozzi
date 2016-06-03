var express = require('express');
var router = express.Router();

var loginData = {'name':'윤용식','age':30,'email':'yysstory@gmail.com'};
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(loginData);
});

module.exports = router;
