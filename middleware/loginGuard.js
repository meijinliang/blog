const guard = (req,res,next) => {
    // 判断用户访问的是否是登入页面
    // 判断用户的登入状态
    // 如果页面是登入的 将请求放行
    // 如果用户不是登录的 将请求重定向到登入页面
    if (req.url !='/login' && !req.session.username) {
        //这里的意思是如果访问的不是登录页面并且用户还没有登入 那么就重定向到登入界面
        // res.redirect('/admin/login')
        res.redirect('/admin/login');
    } else {
        //用户是登录状态 将请求放行
        next();
    }
}
module.exports = guard;