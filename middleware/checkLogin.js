//利用路由中间件进行拦截
//防止未登录访问某些和用户身份挂钩的页面
module.exports = (req,res,next) => {
    if(!req.session.username) 
        res.redirect('/login');
    else next();
}
