const mongoose = require('mongoose');
const { Forum } = require('../../model/forum');

module.exports = async(req, res) => {
    // console.log(req.query);
    if (req.query.query === 'true') {
        // console.log(true);
        let forumData = await Forum.find().populate('reviewer');
        let forumTwoData = await Forum.find().populate('reviewer').populate('items.from items.to');
        let forumTotle = await Forum.find().countDocuments();
        return res.send({
            forumData: forumData,
            forumTwoData: forumTwoData,
            forumTotle: forumTotle
        });
    }
    // 回复评论的ID
    // 一级评论
    let parentId = mongoose.Types.ObjectId(req.query.parentId);
    // 回复谁的评论
    let to = mongoose.Types.ObjectId(req.query.to);
    // 一级评论人
    let reviewer = mongoose.Types.ObjectId(req.query.userId);
    // 二级评论人
    let fromTwo = mongoose.Types.ObjectId(req.query.fromTwo);
    // console.log(from);
    // 评论内容
    let comment = req.query.comment;
    // 评论层级
    let item = req.query.item;
    // 一级评论Id
    let oneCommentId = req.query.oneCommentId;
    if (req.query.create === 'true') {
        await Forum.create({ reviewer: reviewer, comment: comment });
        return res.send({ msg: 'o97k' });
    }
    await Forum.findOneAndUpdate({ _id: oneCommentId }, {
        $addToSet: {
            items: [{
                // 父级id
                parentId: parentId,
                // 几级评论
                level: item,
                // 二级评论评论人
                from: fromTwo,
                // 回复哪一位
                to: to,
                // 评论内容
                comment: comment
            }]
        }
    });
    // if (item === '1') {
    //     try {
    //         await Forum.findOneAndUpdate({ _id: parentId }, {
    //             $addToSet: {
    //                 items: [{ // 二级评论评论人
    //                     from: fromTwo,
    //                     // 回复哪一位
    //                     to: to,
    //                     // 评论内容
    //                     comment: comment,
    //                     // 父级id
    //                     parentId: parentId,
    //                     items: []
    //                 }]
    //             }
    //         });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // } else if (item === '2') {
    //     console.log(2);
    //     console.log(oneCommentId);
    //     console.log(parentId);
    //     await Forum.findOneAndUpdate({ '_id': oneCommentId, 'items._id': parentId }, {
    //         $addToSet: {
    //             'items.$.items': [{ // 二级评论评论人
    //                 from: fromTwo,
    //                 // 回复哪一位
    //                 to: to,
    //                 // 评论内容
    //                 comment: comment,
    //                 // 父级id
    //                 parentId: parentId,
    //                 items: []
    //             }]
    //         }
    //     });
    // }
    res.send({ msg: 'o98k' });
}