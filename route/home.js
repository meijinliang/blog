//引入express框架
const express = require('express')
//创建博客展示页面路由对象
const home = express.Router()

home.get('/', (req,res) => {
    res.send('欢迎来到博客首页')
})
//将路由对象做为模块成员进行导出
module.exports = home;
//home路由模块完成