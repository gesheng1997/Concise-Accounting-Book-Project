var express = require('express');
const fs = require('fs');
const path = require('path');

var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    let publicPath = '../public/record';
    fs.readdir(path.resolve(__dirname , publicPath), (err, data) => {
        if(err){
            res.send(err);
            return;
        }
        let records = [];

        data.forEach(folder => {
            let folderPath = publicPath + '/' + folder;
            let folderFiles = fs.readdirSync(path.resolve(__dirname,folderPath));
            folderFiles.forEach(file => {
                let fileObj = JSON.parse(fs.readFileSync(
                    path.resolve(__dirname,folderPath + '/' + file)
                ).toString());
                records.push(fileObj);
            })
        })
        if(!records.length) res.render('record',{records:'不存在任何账目记录，请添加记录'})
        else res.render('record', {records});
    })
});

module.exports = router;