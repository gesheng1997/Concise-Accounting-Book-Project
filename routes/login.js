const express = require('express');
const path = require('path');
const crypto = require('crypto-js');
const userModel = require('../model/userModel');

const router = express.Router();

router.get('/', (req, res, next) => {
    if (req.session.username) res.redirect(`/user/${req.session.username}`);
    else res.render('login', { errorMsg:'' });
});

router.post('/', (req, res, next) => {
    let {
        username,
        password
    } = req.body;

    userModel.findOne({
        username
    }).then(record => {
        if (!record) res.render('login', { errorMsg:'不存在此用户！' });//不存在此用户名的用户，跳转回到登录界面
        else {
            let pswrdHash = crypto.SHA256(password + ':' + record.passwordSalt).toString();
            //密码不正确，跳转回到登录界面
            if(pswrdHash !== record.password) 
                res.render('login', { errorMsg:'密码错误' });

            //登录成功将session相关的信息存储，由于设置了session中间件，后端将会自动向浏览器发送sid
            // record._id 好像无法获取到正确的文档id！mongodb好像天生不希望你能获取到这个id
            //console.log(record._id.id.reduce((pre,value,index) => {
            //     console.log(parseInt(value,16),pre + parseInt(value,16));
            //    return pre + value; 
            // },''));
            // req.session.id = record._id.id.reduce((pre,value,index) => pre + value,'');
            req.session.username = record.username;
            req.session.nickname = record.nickname;
            req.session.avaterPath = record.avaterPath;    
            //
            res.redirect(`/user/${req.session.username}`);
        }
    }).catch(err => {
        console.log(err);
    })
});

module.exports = router;