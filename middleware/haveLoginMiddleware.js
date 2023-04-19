//用于处理已经登录的情况下尝试访问登录页面或者注册页面的情况
module.exports = function (req, res, next) {
    if (req.session.username)
        res.redirect(`/user/${req.session.username}`);
    else next();
}