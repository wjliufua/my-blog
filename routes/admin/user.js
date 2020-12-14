const { User } = require('../../model/user');

module.exports = async(req, res) => {
    /**
     * 用户点击跳转第几页
     * 如果没有默认为 1
     */
    let thatPage = req.query.thisPage || 1;
    /**
     * 获取用户点击页码从 String转换为Number
     */
    thatPage = parseInt(thatPage);
    /**
     * 页面每页显示多少条数据
     * 如果没有默认为 5
     */
    let pagesize = req.query.pagesize || 5;
    // 数据库有多少条用户数据
    let count = await User.countDocuments({});
    // 总页数
    let totalPage = Math.ceil(count / pagesize);
    // 页码对应的数据查询开始位置
    let state = (thatPage - 1) * pagesize;
    /**
     * limit 查找多少条数据
     * skip 从什么位置开始查找
     */
    let users = await User.find({}).limit(pagesize).skip(state);
    res.send({
        users,
        totalPage,
        count,
        thatPage
    });
}