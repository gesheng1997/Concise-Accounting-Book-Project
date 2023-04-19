const express = require('express');
const recordRouter = require('./record');
const addRouter = require('./add');
const checkLoginMiddleware = require('../middleware/checkLogin');

const router = express.Router();

/* GET home page. */
//如果session中用户名为空（即查询session结果为空） 
//那么说明当前没有登录！重定向至登录界面，这里引入的路由中间件就是这个作用
router.get('/:username', checkLoginMiddleware ,function(req, res, next) {
  res.render('user',{ nickname:req.session.nickname, avaterPath:req.session.avaterPath });
});

module.exports = router;
