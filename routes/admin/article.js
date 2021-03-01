const { Article } = require('../../model/article');

module.exports = async (req, res) => {
    // console.log(233);
    let { findFlag } = req.body;
    let { article_id } = req.query;
    // console.log(req.query);
    if (article_id) {
        let article_edit = await Article.findById({ _id: article_id });
        return res.send({
            msg: '彳亍',
            article_edit: article_edit
        });
    }
    if (findFlag === 'true') {
        var article = await Article.find().populate('author');
        res.send({
            articleData: article,
            msg: 'ko'
        });
    } else {
        let articleCreate = JSON.parse(req.body.articleData);
        await Article.create({
            author: articleCreate.author,
            category: articleCreate.category,
            cover: articleCreate.cover,
            title: articleCreate.articleTitle,
            content: articleCreate.articleContent,
            state: articleCreate.state
        });
        res.send({ msg: 'ko' });
    }
}