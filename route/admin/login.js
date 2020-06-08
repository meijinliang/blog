//导入用户集合构造函数
const { User } = require('../../model/user');
//导入bcrypt
const bcrypt = require('bcrypt');
module.exports = async (req, res) => {
    //接受请求参数
    const { email, password } = req.body;//这个是email接收email的值
    //req.body用于获取post请求参数
    //req.query用于获取get请求参数

    //如果用户没有输入邮件地址
    if (email.trim().length == 0 || password.trim().length == 0) {
        return res.status(400).render('admin/error', { msg: '邮件地址或者密码错误' })
    }
    //根据邮箱地址查询用户信息
    //如果查询到了用户 user变量的值是对象类型
    //如果没有查询到用户 user变量为空
    let user = await User.findOne({ email })//email是用户输入的邮箱地址
    if (user !== null) {//查询到用户
        //将客户端传递过来的密码和用户信息中的密码进行对比
        let isVaild = await bcrypt.compare(password, user.password);
        if (isVaild) {
            //登录成功
            //将用户名存储在请求对象中
            //session这个是express-session添加的 作用：向session对象存储数据
            //session这个方法在内部生成一个唯一的sessionid， 再把这个sessionid
            //存储到客户端的cookie中
            req.session.username = user.username;//req.username这个是自己向req下面添加的属性
            // res.send(req.session.username + '登入成功');
            req.app.locals.userInfo = user;
            //这个做到登入成功页面跳转到用户页面 这里需要重定向
            //重定向到用户列表页面
            res.redirect('/admin/user');
        } else {
            //密码不一样，登入不成功
            res.status(400).render('admin/error',{msg:'邮箱地址或者密码错误'})
        }
    } else {
        //没有查询到用户
        res.status(400).render('admin/error',{msg:'邮箱地址或者密码错误'})
    }
}
