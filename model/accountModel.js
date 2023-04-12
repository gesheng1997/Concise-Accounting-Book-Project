const mongoose = require('mongoose');

let accountSchema = new mongoose.Schema({
    time:String,
    affair:String,
    type:String,
    amount:Number,
    remark:{
        type:String,
        default:'无'
    }
});

module.exports = mongoose.model('accounts',accountSchema);