const { User } = require('../model/user');

module.exports = async(req, res) => {
    let { loginEmail, loginPwd } = req.body;
    let emailFlag = await User.findOne({ email: loginEmail, register: "fullState" });
    // if (emailFlag == null) return res.send({ msg: '此邮箱尚未注册' });
    if (emailFlag == null) return res.send({ msg: '此邮箱尚未注册' });
    let userLogin = await User.findOne({ email: loginEmail, password: loginPwd });
    // if (userLogin == null) return res.send({ msg: '邮箱地址或密码错误' });
    if (userLogin == null) return res.send({ msg: '邮箱地址或密码错误' });
    let userState = await User.findOne({ email: loginEmail, password: loginPwd, state: 1 });
    // if (userState !== null) return res.send({ msg: '请联系管理员帮助' });
    if (userState !== null) return res.send({ msg: '请联系管理员帮助' });
    // console.log(userLogin.email);
    // console.log(userLogin.role);
    req.session.username = userLogin.email;
    req.session.role = userLogin.role;
    // console.log(req.session);
    // res.redirect(301, '/');
    // res.send({ href: '/', username: userLogin.email, role: userLogin.role });
    if (userLogin.role == 'admin') {
        res.send({ href: 'http://localhost:8000/view/admin/user.html' });
    } else {
        res.send({ href: 'http://localhost:8000/' });
    }
}