const { Article } = require('../../model/article');

module.exports = async (req, res) => {
    let articleEdit = JSON.parse(req.body.articleData);
    await Article.updateOne({ _id: articleEdit.article_id }, {
        author: articleEdit.author,
        category: articleEdit.category,
        cover: articleEdit.cover,
        title: articleEdit.articleTitle,
        content: articleEdit.articleContent,
        state: articleEdit.state
    });
    res.send({
        href: '/view/admin/article-list.html'
    });
}