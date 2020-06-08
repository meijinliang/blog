//引入express框架
const express = require('express');
const path = require('path');
//引入body-Parser模块 用来处理post请求参数
const bodyParser = require('body-parser')
//导入exoress-session模块
const session = require('express-session');
//创建网站服务器
const app = express();
//数据库连接
require('./model/connect');
//处理post请求参数
app.use(bodyParser.urlencoded({ extended: false }))
//配置session
app.use(session({ secret: 'secret ksy' }))

// require('./model/user');用于创建初始用户
//告诉express框架模板所在的位置
app.set('views', path.join(__dirname, 'views'));
//告诉express框架模板的默认后缀是什么
app.set('view engine', 'art')
//当渲染后最为art模板时，所使用的模板引擎是什么
app.engine('art', require('express-art-template'));

//开放静态资源
app.use(express.static(path.join(__dirname, 'public')));

//引入路由模块
const home = require('./route/home');
const admin = require('./route/admin');
//拦截请求，判断用户登入状态
app.use('/admin', require('./middleware/loginGuard'))

//为路由匹配请求路径
app.use('/home', home);
app.use('/admin', admin);

//错误处理中间件
app.use((err, req, res, next) => {
    //next()传过来的参数其实就是err的实参  将字符串转换为对象
    const result = JSON.parse(err);
    res.redirect(`${result.path}?message=${result.message}`);
})
//监听端口
app.listen(80);
console.log('服务器创建成功，请访问localhost');