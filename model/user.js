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
    // blank 注册空白状态(尚未注册)
    // full 注册充满状态(已注册)
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

module.exports = {
    User
}