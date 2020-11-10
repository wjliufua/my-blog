module.exports = app => {
    // 客户端首页
    app.use('/', require('/client'));
    // 用户
    app.use('/users', require('/user'));
}