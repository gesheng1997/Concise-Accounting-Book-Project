var express = require('express');
const accountModel = require('../model/accountModel');

var router = express.Router();

/* GET users listing. */
//用一个get处理函数处理查询所有以及查询筛选条件的情况
router.get('/', function (req, res, next) {
    let {type,dateGt,dateLt} = req.query;
    //注意get中的请求参数放在查询参数而非body中！ 这里踩坑了！
    // console.log(req.query);

    //请求参数处理，根据请求参数生成mongoose条件筛选的筛选对象
    let searchObj = {};
    if(type && type !== '3') searchObj.type = type;
    if(dateGt && dateLt) searchObj.$and = [{time:{$gte:dateGt}},{time:{$lte:dateLt}}];
    else{
        if(dateGt) searchObj.time = {$gte:dateGt};
        if(dateLt) searchObj.time = {$lte:dateLt};
    }
    // console.log(searchObj);
    accountModel.find(searchObj).sort({time:1}).then(records => {
        console.log(records);
        if(records.length === 0) records = '无记录，请更换筛选条件或添加记录！';
        res.render('record', {
            records
        });
    }).catch(err => {
        console.log(err);
    })
});

router.post('/', function (req, res, next) {
    let {targetId} = req.body;
    if(targetId){
        accountModel.deleteOne({_id : targetId}).then(msg => {
            //这里的res.send非常关键！只有这样返回了结果
            //前端fetch的promise才可以从pending状态进入fulfilled状态！
            res.send('删除成功');
        }).catch(err => {
            res.send(new Error('删除失败:'+ err));
        });
    }
})

module.exports = router;