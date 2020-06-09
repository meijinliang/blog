//引入express框架
const express = require('express');

//创建博客管理页面路由对象
const admin = express.Router();
//渲染登入页面的
admin.get('/login', require('./admin/loginPage'));
//实现登入功能
admin.post('/login', require('./admin/login'));
//创建用户列表页
admin.get('/user', require('./admin/userPage'));
//实现退出功能
admin.get('/logout', require('./admin/logout'));
//创建用户编辑页面
admin.get('/user-edit', require('./admin/user-edit'));
//创建实现用户添加功能路由
admin.post('/user-edit', require('./admin/user-edit-fn'));
//创建实现用户修改功能路由
admin.post('/user-modify', require('./admin/user-modify'));

admin.get('/article', require('./admin/article'));

admin.get('/article-edit', require('./admin/article-edit'));

//将路由对象做为模块成员进行导出
module.exports = admin;
//admin路由模块完成