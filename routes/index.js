module.exports = app => {
    // // 用户
    app.use('/admin/user', require('./admin/user'));

    // 功能请求
    // 发送邮件请求
    app.use('/email', require('./sendEmail'));
    // 注册请求
    app.use('/register', require('./register'));
    // 登录请求
    app.use('/login', require('./login'));
    // app.use('/view/admin/', require('./loginGuard'));
};