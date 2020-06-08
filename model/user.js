//用于创建用户集合
//引入mongoose第三方模块
const mongoose = require('mongoose');
//导入bcrypt
const bcrypt = require('bcrypt');
//引入joi模块
const Joi = require('joi');
//创建用户集合规则
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        //保证邮箱地址在插入数据库时不重复
        unique: true,
        required: true
        
    },
    password: {
        type: String,
        required: true
    },
    //admin 超级管理员
    //nomal 普通用户
    role: {
        type: String,
        required: true
    },
    //0 启用状态
    //1 禁用状态
    state: {
        type: Number,
        default: 0
        
    }
})

//创建集合
const User = mongoose.model('User', userSchema);
//用mongoose下的model方法创建User集合 有一个返回值 用User接收
async function createUser() {
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash('853829799', salt);
    const user = await User.create({
        username: 'meijinliang',
        email: '853829799@qq.com',
        password: pass,
        role: 'admin',
        state: 0
    })
}
// createUser();

//验证用户信息
const validdataUser = (user) => {
    //定义验证规则
    const schma = {
        username: Joi.string().min(2).max(20).required().error(new Error('用户名格式不符合验证规则')),
        email: Joi.string().email().required().error(new Error('用邮箱格式不符合验证规则')),
        //email()是模块为我们提供验证邮箱格式的方法
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码格式不符合验证规则')),
        role: Joi.string().valid('normal','admin').required().error(new Error('角色值非法')),
        //valid这个方法里可以传递合法的值  传递合法值之外的都验证不通过
        state: Joi.number().valid(0,1).required().error(new Error('状态值非法'))
    };
    //实施验证
    return Joi.validate(user, schma)
    //因为这里返回的是promise对象 user-edit。js里的try中才可以用await
}
module.exports = {
    User,
    validdataUser
}