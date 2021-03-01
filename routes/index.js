module.exports = app => {
    // 查询用户
    app.use('/admin/user', require('./admin/user'));
    // 修改用户
    app.use('/admin/userEdit', require('./admin/userEdit'));
    // 搜索用户
    app.use('/admin/userSearch', require('./admin/userSearch'));
    // 删除用户
    app.use('/admin/userDelete', require('./admin/userDelete'));

    // 文章创建
    app.use('/admin/article', require('./admin/article'));
    // 文章修改
    app.use('/admin/article-edit', require('./admin/article-edit'));
    // 文章复杂查询
    app.use('/admin/article-complexFind', require('./admin/article-complexFind'));

    // 论坛评论
    app.use('/client/comment', require('./client/comment'));

    // 功能请求
    // 发送邮件请求
    app.use('/email', require('./sendEmail'));
    // 注册请求
    app.use('/register', require('./register'));
    // 文章图片上传
    app.use('/upload', require('./upload'));
    // 登录请求
    app.use('/login', require('./login'));
    // 用户登录信息
    app.use('/loginState', require('./loginState'));
    // app.use('/view/admin/', require('./loginGuard'));
};