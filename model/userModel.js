const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
    },
    password:String,
    passwordSalt:String,
    nickname:String,
    avaterPath:String
});

module.exports = mongoose.model('users',userSchema);