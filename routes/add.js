const express = require('express');
const router = express.Router();
const accountModel = require('../model/accountModel');

router.get('/',(req,res,next) => {
    res.render('add',{});
});

router.post('/',(req,res,next) => {
    accountModel.create({...req.body}).then(msg => {
        console.log('插入成功',msg);
    }).catch(err => {
        console.log('插入失败',err);
    }) 
    res.redirect('/record');
});

module.exports = router;