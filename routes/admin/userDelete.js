const { User } = require('../../model/user');

module.exports = async(req, res) => {
    // let { id, role, state } = req.query;
    let { userDeleteArr, userDeleteOne } = req.query;
    let thatPage = 1;
    let pagesize = 5;
    // await User.findByIdAndUpdate({ _id: id }, { $set: { state: state, role: role } }, { new: true, fields: '-password' });
    // await User.remove({ _id: { $in: userDeleteArr } });
    if (userDeleteOne !== undefined) {
        await User.deleteOne({ _id: userDeleteOne });
    } else if (userDeleteArr !== undefined) {
        await User.remove({ _id: { $in: userDeleteArr } });
    }
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