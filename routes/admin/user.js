const { User } = require('../../model/user');

module.exports = async(req, res) => {
    let { username, useremail, userrole, userstate, search } = req.query;
    /**
     * 用户点击跳转第几页
     * 如果没有默认为 1
     */
    let thatPage = req.query.thisPage || 1;
    // 获取用户点击页码从 String转换为Number
    thatPage = parseInt(thatPage);
    /**
     * 页面每页显示多少条数据
     * 如果没有默认为 5
     */
    let pagesize = parseInt(req.query.pagesize) || 5;
    let userObj = {
        usernmae: username,
        email: useremail,
        role: userrole,
        state: userstate,
        register: 'fullState'
    };
    let searchObj = {};
    for (let key in userObj) {
        if (userObj[key] === '' || userObj[key] === undefined || userObj[key] === '2') {
            continue
        }
        searchObj[key] = userObj[key];
    }

    function searchUser(searchObj) {
        if (searchObj.role !== undefined && searchObj.role === '0') {
            searchObj.role = 'admin';
        } else if (searchObj.role !== undefined && searchObj.role === '1') {
            searchObj.role = 'ordinary';
        }
        if (searchObj.state !== undefined) { searchObj.state = parseInt(searchObj.state) }
        return searchObj;
    }
    let searchArry = req.query.searchArry || [];
    if (searchArry.length === 0 && search == true) {
        searchArry[0] == searchUser(searchObj);
    } else if (searchArry.length === 0) {
        searchArry.push(searchUser(searchObj));
    }
    // console.log(searchArry[0]);
    // // 数据库有多少条用户数据
    let count = await User.countDocuments(searchArry[0]);
    // 总页数
    let totalPage = Math.ceil(count / pagesize);
    // 页码对应的数据查询开始位置
    let start = (thatPage - 1) * pagesize;
    /**
     * limit 查找多少条数据
     * skip 从什么位置开始查找
     */
    let users = await User.find(searchArry[0]).limit(pagesize).skip(start);
    res.send({
        users,
        thatPage,
        totalPage,
        count,
        pagesize,
        searchArry: searchArry[0]
    });
}