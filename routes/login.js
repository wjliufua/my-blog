const { User } = require('../model/user');

module.exports = async(req, res) => {
    let { loginEmail, loginPwd } = req.body;
    let emailFlag = await User.findOne({ email: loginEmail, register: "fullState" });
    if (emailFlag == null) return res.send({ msg: '此邮箱尚未注册' });
    let userLogin = await User.findOne({ email: loginEmail, password: loginPwd });
    if (userLogin == null) return res.send({ msg: '邮箱地址或密码错误' });
    let userState = await User.findOne({ email: loginEmail, password: loginPwd, state: 1 });
    if (userState !== null) return res.send({ msg: '请联系管理员帮助' });
    req.session.email = userLogin.email;
    req.session.username = userLogin.username;
    req.session.role = userLogin.role;
    if (userLogin.role == 'admin') {
        res.send({
            href: 'http://localhost:8000/view/admin/article-list.html',
            id: userLogin._id,
            username: userLogin.username
        });
    } else {
        res.send({
            href: 'http://localhost:8000',
            id: userLogin._id,
            username: userLogin.username
        });
    }
}