//导入bcrypt
const bcrypt = require('bcrypt');
const { User } = require('../../model/user');

module.exports = async(req, res,next) => {
    //接收客户端传递过来的请求参数
    const {username,email,role,state,password} = req.body;//post提交的参数 只包含表单里面的参数
    //即将要修改的用户id
    const id = req.query.id;//id参数通过地址栏传递过来 通过get方式
    // res.send(body)
    let user = await User.findOne({ _id: id })
    // res.send(req.query.id)
    //密码比对
    const isValid = await bcrypt.compare(password, user.password)//返回的是布尔值
    if (isValid ) {
        //密码对比成功
        // res.send('密码对比成功')
        await User.updateOne({ _id: id }, {
            username: username,
            email: email,
            role: role,
            state: state 
        })
        //重定向到用户列表页面
        res.redirect('/admin/user');
    } else {
        //密码对比失败
        let obj = {path:'/admin/user-edit',message:'密码比对失败,不能进行用户信息修改',id:id}
        next(JSON.stringify(obj));
    }
}