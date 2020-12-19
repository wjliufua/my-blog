const { User } = require('../../model/user');

module.exports = async(req, res) => {
    let { id, role, state } = req.query;
    let thatPage = req.query.thisPage || 1;
    let pagesize = parseInt(req.query.pagesize) || 5;
    await User.findByIdAndUpdate({ _id: id }, { $set: { state: state, role: role } }, { new: true, fields: '-password' });
    let start = (thatPage - 1) * pagesize;
    let users = await User.find().limit(pagesize).skip(start);
    // let test = await User.findOne({})
    // console.log(edit);
    // console.log(users);
    let count = await User.countDocuments();
    let totalPage = Math.ceil(count / pagesize);
    res.send({
        count,
        totalPage,
        thatPage,
        pagesize,
        users
    });
}