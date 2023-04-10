const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/',(req,res,next) => {
    res.render('add',{});
});

router.post('/',(req,res,next) => {
    let {time} = req.body;
    let publicPath = '../public/record'
    fs.readdir(path.resolve(__dirname,publicPath),(err,data) => {
        if(err){
            res.send(err);
            return;
        }

        let targetPath = path.resolve(__dirname,publicPath + '/' + time);
        let targetDate = data.find(folder => folder === time);

        if(!targetDate){
            fs.mkdirSync(targetPath);
            fs.writeFileSync(path.join(targetPath , '/1.json'),JSON.stringify(req.body));
        }else{
            let files = fs.readdirSync(targetPath);
            let newFilename = parseInt(files[files.length - 1].split('.')[0]) + 1 + '.json';
            fs.writeFileSync(path.join(targetPath,newFilename),JSON.stringify(req.body));
        }
    });
    res.redirect('/record');
});

module.exports = router;