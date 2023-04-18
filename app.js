var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const db = require('./db/db');
const accountModel = require('./model/accountModel');
const userModel = require('./model/userModel');
const session = require('express-session');
const MongoStore = require('connect-mongo');

let userRouter = require('./routes/user');
let recordRouter = require('./routes/record');
let addRouter = require('./routes/add');
let loginRouter = require('./routes/login');
let registerRouter = require('./routes/register');

db(() => {
    accountModel.create().then(() => {
        console.log('文档accounts创建成功');
    }).catch(err => {
        console.log('accounts创建失败',err);
    });

    userModel.create().then(() => {
        console.log('文档users创建成功');
    }).catch(err => {
        console.log('文档users创建失败',err);
    })
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    name:'sid',
    secret:'ilovewenjun',
    saveUninitialized:false,
    resave:true,
    store:MongoStore.create({
        mongoUrl:'mongodb://127.0.0.1:27017/accountBook'
    }),
    cookie:{
        httpOnly:true,
        maxAge:1000 * 60 * 60 * 72
    }
}))

app.use('/', loginRouter);
app.use('/user', userRouter);
app.use('/record', recordRouter);
app.use('/add', addRouter);
app.use('/login',loginRouter);
app.use('/register',registerRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;