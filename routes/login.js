const { User } = require('../model/user');

module.exports = async(req, res) => {
    let { loginEmail, loginPwd } = req.body;
    // console.log(loginEmail, loginPwd);
    let emailFlag = await User.findOne({ email: loginEmail, register: "fullState" });
    if (emailFlag == null) return res.send({ msg: '此邮箱尚未注册' });
    let userLogin = await User.findOne({ email: loginEmail, password: loginPwd });
    if (userLogin == null) return res.send({ msg: '邮箱地址或密码错误' });
    req.session.username = userLogin.email;
    req.session.role = userLogin.role;
    // res.redirect('/');
    res.send({ msg: '登录成功', href: '/' });
}