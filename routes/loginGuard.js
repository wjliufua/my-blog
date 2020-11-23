const guard = (req, res, next) => {
    // 登录拦截
    if (!req.session.username) {
        res.redirect('/view/login');
    } else {
        // 如果用户是登录状态 并且是一个普通用户
        if (req.session.role == 'ordinary') {
            // 让它跳转到博客首页  阻止程序向下执行
            return res.redirect('/');
        }
        // 用户是登录状态  将请求放行
        next();
    }
}

module.exports = guard;