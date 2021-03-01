const mongoose = require('mongoose');
const { Schema } = mongoose;

// const forumSchema = new Schema({
//     // 一级评论评论人
//     reviewer: {
//         type: mongoose.Schema.Types.ObjectId,
//         required: true,
//         ref: 'User'
//     },
//     // 评论内容
//     comment: {
//         required: true,
//         type: String
//     },
//     items: [{
//         // 二级评论评论人
//         from: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'User'
//         },
//         // 回复哪一位
//         to: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'User'
//         },
//         // 评论内容
//         comment: {
//             type: String
//         },
//         // 父级id
//         parentId: {
//             type: mongoose.Schema.Types.ObjectId
//         },
//         items: [{
//             // 三级评论评论人
//             from: {
//                 type: mongoose.Schema.Types.ObjectId,
//                 ref: 'User'
//             },
//             // 回复哪一位
//             to: {
//                 type: mongoose.Schema.Types.ObjectId,
//                 ref: 'User'
//             },
//             // 评论内容
//             comment: {
//                 type: String
//             },
//             // 父级id
//             parentId: {
//                 type: mongoose.Schema.Types.ObjectId
//             }
//         }]
//     }]
// });

const forumSchema = new Schema({
    // 一级评论评论人
    reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    // 评论内容
    comment: {
        required: true,
        type: String
    },
    items: [{
        // 父级id
        parentId: {
            type: mongoose.Schema.Types.ObjectId
        },
        // 几级评论
        level: String,
        // 二级评论评论人
        from: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        // 回复哪一位
        to: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        // 评论内容
        comment: {
            type: String
        },
    }]
});

const Forum = mongoose.model('Forum', forumSchema);

module.exports = {
    Forum
}