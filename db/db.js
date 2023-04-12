module.exports = function (success, error) {
    const mongoose = require('mongoose');
    const {DBHOST,DBPORT,DBNAME} = require('../config/dbconfig');

    mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`);

    if(!error){
        error = err => {
            console.log(err);
            return;
        }
    }

    mongoose.connection.once('open',() => {
        success();
    });

    mongoose.connection.on('error',err => {
        error(err);
    });
}