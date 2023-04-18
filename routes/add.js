const express = require('express');
const router = express.Router();
const accountModel = require('../model/accountModel');

router.get('/',(req,res,next) => {
    if(!req.session.username) res.redirect('/login');
    res.render('add',{});
});

router.post('/',(req,res,next) => {
    console.log(req.session.username);
    accountModel.create({...req.body,username:req.session.username}).then(msg => {
        console.log('插入成功',msg);
    }).catch(err => {
        console.log('插入失败',err);
    }) 
    res.redirect('/record');
});

module.exports = router;