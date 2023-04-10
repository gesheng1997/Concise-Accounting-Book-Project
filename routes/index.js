var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');

let index = fs.readFileSync(path.resolve(__dirname,'../public/index.html')).toString();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send(index);
});

module.exports = router;
