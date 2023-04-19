const express = require('express');
const fs = require('fs'); //引入fs模块用于将头像写入静态资源目录
const path = require('path'); //引入path模块用于路径拼接运算
//注意！只有前端页面（如ejs或者react等等编写的前端代码）访问public静态资源目录的时候，系统才会自动运算！
const formidable = require('formidable');
const crypto = require('crypto-js');
const userModel = require('../model/userModel');
const haveLoginMiddleware = require('../middleware/haveLoginMiddleware');

const router = express.Router();

//利用路由中间件进行登录检测和拦截
router.get('/', haveLoginMiddleware, (req, res, next) => {
    res.render('register', {
        errorMsg: ''
    });
})

router.post('/', (req, res, next) => {
    let fullAvaterPath = path.resolve(__dirname, '../public/images/avater');
    let avaterPath = '/images/avater';

    const form = formidable({
        encoding: 'utf-8',
        multiples: true,
        uploadDir: fullAvaterPath,
        keepExtensions: true,
        filename: (name, ext, part, form) => {
            //如果拓展名是一个空字符串 那么不创建文件，即返回空串即可！
            //否则先命名为test+源文件扩展名
            if (ext === '') return '';
            else return 'test' + ext;
        }
    });
    form.parse(req, (err, fields, files) => {
        if (err) next(err);
        //生成盐值
        let salt = generateSalt();
        //新用户头像文件的文件名username.ext
        let newName = fields.username + '.' + files.avater.newFilename.split('.')[1];

        //先创建新文档，防止出现该用户已经存在但重新注册时上传图片的情况
        //因为这样一来若用户存在将会先行进入.catch而不会重命名头像
        userModel.create({
            username: fields.username,
            nickname: fields.nickname,
            password: crypto.SHA256(fields.password + ':' + salt),
            passwordSalt: salt,
            //没有上传头像的情况下，使用默认头像，否则使用
            avaterPath: files.avater.size ? path.join(avaterPath, newName) : path.join(avaterPath, 'default.png')
        }).then(msg => {
            console.log(msg);
            //如果上传的文件大小非0，即有上传头像的情况下，重命名avater文件夹中的文件为username + ext
            if (files.avater.size)
                fs.renameSync(path.join(fullAvaterPath, files.avater.newFilename),
                    path.join(fullAvaterPath, newName));

            res.redirect('/login');
        }).catch(err => {
            //如果创建新用户报错，那么会将错误消息返还给前端ejs，前端在页面上显示
            let errorMsg = '';

            if (err.code === 11000) {
                errorMsg = '该用户已经存在！';
                //用户存在的情况下，删除上传的头像文件
                fs.rmSync(path.join(fullAvaterPath, files.avater.newFilename));
            }

            res.render('register', {
                errorMsg
            });
        });
    })
})

let generateSalt = () => {
    let salt = Math.random().toString().slice(2, 7);
    return salt;
}

module.exports = router;