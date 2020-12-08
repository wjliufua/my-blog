const { User } = require('../../model/user');

module.exports = async(req, res) => {
    let page = req.query.page || 7;
    let pagesize = req.query.pagesize || 5;
    let count = await User.countDocuments({});
    let total = Math.ceil(count / pagesize);
    // let state = (page - 1) * pagesize;
    // let users = await User.find({}).limit(pagesize).skip(state);
    // res.send({
    //     users: users,
    //     page: page,
    //     total: total
    // });
    // console.log(req.query);
    // console.log(req.query.page);
    res.send({
        page,
        total
    });
}