// 引入mongoo数据库
const mongoose = require('mongoose');
// 用户集合规则
const { Schema } = mongoose;

// 用户集合规则
const UserSchema = new Schema({
    // 昵称
    usernmae: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // ordinary 普通用户
    // admin 管理员
    role: {
        type: String,
        required: true
    },
    // 0 启用状态
    // 1 禁用状态
    state: {
        type: Number,
        default: 0
    },
    // 注册状态(是否已经注册)
    // blankState 注册空白状态(尚未注册)
    // fullState 注册充满状态(已注册)
    register: {
        type: String,
        required: true
    },
    // 邮箱验证码
    code: {
        type: Number,
        required: true
    },
    time: {
        type: Number
    }
});

// 创建用户集合
const User = mongoose.model('User', UserSchema);

// User.create({
//     usernmae: 'wdnmd',
//     email: '22',
//     password: '22',
//     role: 'ordinary',
//     // 0 启用状态
//     // 1 禁用状态
//     state: 0,
//     // 注册状态(是否已经注册)
//     // blankState 注册空白状态(尚未注册)
//     // fullState 注册充满状态(已注册)
//     register: 'blankState',
//     // 邮箱验证码
//     code: 123456,
//     time: 77777777
// });

module.exports = {
    User
}