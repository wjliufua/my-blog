const mongoose = require('mongoose');
const { Schema } = mongoose;

const articleSchema = new Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    category: [{
        type: String
    }],
    cover: {
        type: String,
    },
    title: {
        type: String
    },
    content: {
        type: String
    },
    // 0 文章为草稿状态
    // 1 文章为发布状态
    state: {
        type: String
    }
}, { timestamps: { createdAt: 'created', updatedAt: 'updated' } });

// 创建用户集合
const Article = mongoose.model('Article', articleSchema);

module.exports = {
    Article
}