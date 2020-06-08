
//导入bcrypt
const bcrypt = require('bcrypt');
//当前引入用户集合的构造函数
const {User,validdataUser} = require('../../model/user');
module.exports = async (req, res,next) => {
    try {
        await validdataUser(req.body) 
    } catch (error) {
        //验证没有通过
        //重定向回用户添加页面
        // res.redirect('/admin/user-edit?' + error.message);
        // return res.redirect(`/admin/user-edit?message=${error.message}`)
        //验证没有通过要阻止代码向下运行
        return next(JSON.stringify({path:'/admin/user-edit',message:error.message}))
        //next()方法只接受字符串参数 而这里要传路径和信息两个参数要以对象的格式进行
        //这就需要要将对象格式转换为字符串格式
    }

    //根据邮箱地址查询用户是否存在
    let user = await User.findOne({email:req.body.email})
    //这个查询的结果是这样子的 如果邮箱查询到了 会返回用户信息 如果没有查询到 返回的就是空null
    //如果用户已经存在 邮箱地址已经被别人占用
    if (user) {
        // return res.redirect(`/admin/user-edit?message=邮箱地址已经被占用`)
        return next(JSON.stringify({path:'/admin/user-edit',message:'邮箱地址已经被占用'}))
    } else {
        //对密码进行加密处理
        //生成随机字符串
        const salt = await bcrypt.genSalt(10);
        //加密
        const password = await bcrypt.hash(req.body.password, salt);
        req.body.password = password;
        //将用户信息添加到数据库中
        await User.create(req.body)
        //将页面重定向到用户列表页面
        res.redirect('/admin/user')
    }
    res.send(req.body);
}