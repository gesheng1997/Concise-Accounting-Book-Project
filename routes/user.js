const express = require('express');
const recordRouter = require('./record');
const addRouter = require('./add');

const router = express.Router();

/* GET home page. */
router.get('/:username', function(req, res, next) {
  //如果session中用户名为空（即查询session结果为空） 那么说明当前没有登录！重定向至登录界面
  if(!req.session.username) res.redirect('/login');
  res.render('user',{ nickname:req.session.nickname, avaterPath:req.session.avaterPath });
});

module.exports = router;
