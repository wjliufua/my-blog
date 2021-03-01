module.exports = (req, res) => {
    // console.log(req.session);
    // console.log(req.query);
    let loginState = req.query.login;
    if (loginState === 'out') {
        req.session.destroy(function() {
            // 删除cookie
            res.clearCookie('connect.sid');
            // 重定向到用户登录页面
            res.redirect(302, '/view/login.html');
        });
    } else {
        res.send({
            username: req.session.username
        });
    }
}