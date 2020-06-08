//d导入用户集合构造函数
const { User } = require('../../model/user');
module.exports = async (req, res) => {
    // //接收客户端传递过来的当前也参数
    let page = req.query.page||1;
    // //每一页显示的数据条数
    let pageSize = 10;
    // //查询用户数据的条数
    let count = await User.countDocuments({});
    // //总页数
    let total = Math.ceil(count / pageSize)//Math.ceil向上取整
    // // res.send('显示的总页数为'+total);//不知道为什么这里直接放变量访问不到 要加上字符串
    
    // //页码对应的数据查询开始位置
    let start = (page - 1) * pageSize;
    // //将用户信息从数据库中查询出来
    let users = await User.find({}).limit(pageSize).skip(start);
    // // res.send(users)
    // //渲染用户列表模板
    res.render('admin/user', {
        users: users,
        page: page,
        total:total

    })
}