module.exports = app => {
    // 查询用户
    app.use('/admin/user', require('./admin/user'));
    // 修改用户
    app.use('/admin/userEdit', require('./admin/userEdit'));
    // 搜索用户
    app.use('/admin/userSearch', require('./admin/userSearch'));
    // 删除用户
    app.use('/admin/userDelete', require('./admin/userDelete'));

    // 功能请求
    // 发送邮件请求
    app.use('/email', require('./sendEmail'));
    // 注册请求
    app.use('/register', require('./register'));
    // 登录请求
    app.use('/login', require('./login'));
    // app.use('/view/admin/', require('./loginGuard'));
};