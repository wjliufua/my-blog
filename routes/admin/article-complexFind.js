const { Article } = require('../../model/article');

module.exports = async (req, res) => {
    // console.log(req.body);
    let articleFind = JSON.parse(req.body.articleFind);
    console.log(articleFind);
    // console.log(stateFind);
    var conditionFind = [];
    // for (let i = 0; i < articleFind.conditionFind.length; i++) {
    //     console.log(articleFind.conditionFind[i]);
    //     if (articleFind.conditionFind[i] !== '选择查找分类') {
    //         conditionFind.push(articleFind.conditionFind[i]);
    //     }
    // }
    var conditionFind = articleFind.conditionFind.filter(function (val, index) {
        return val !== '选择查找分类'
    });
    console.log(conditionFind);
    var sortFind = await Article.find({});
    var findResult = sortFind.filter(function (val, index) {
        
        return 
    });
    // console.log(conditionFind.length);
    // if (articleFind.stateFind === '' && conditionFind.length === 0) {
    //     console.log('没有搜索条件-------');
    //     var findResult = await Article.find({});
    // } else if (articleFind.stateFind === '' && conditionFind.length !== 0) {
    //     console.log('状态不限,分类筛选-------');
    //     var findResult = await Article.find({});
    // } else {
    //     console.log('分类以及状态都筛选-------');
    //     var findResult = await Article.find({});
    // }
    // var findResult = await Article.find({ state: articleFind.stateFind });
    // console.log(findResult);
    res.send({
        msg: 'em',
        findResult: findResult
    });
}