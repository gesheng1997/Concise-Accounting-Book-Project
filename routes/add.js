const express = require('express');
const router = express.Router();
const accountModel = require('../model/accountModel');
const checkLoginMiddleware = require('../middleware/checkLogin');

router.get('/', checkLoginMiddleware ,(req,res,next) => {
    res.render('add',{});
});

router.post('/', checkLoginMiddleware ,(req,res,next) => {
    console.log(req.session.username);
    accountModel.create({...req.body,username:req.session.username}).then(msg => {
        console.log('插入成功',msg);
    }).catch(err => {
        console.log('插入失败',err);
    }) 
    res.redirect('/record');
});

module.exports = router;