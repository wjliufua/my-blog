// const guard = (req, res, next) => {
//     console.log('11');
//     // 登录拦截
//     if (!req.session.username) {
//         console.log(req.session.username);
//         res.redirect('/public/view/login.html');
//     } else {
//         // 如果用户是登录状态 并且是一个普通用户
//         if (req.session.role !== 'admin' && req.url == '/view/admin') {
//             console.log(req.session.username);
//             // 让它跳转到博客首页  阻止程序向下执行
//             return res.redirect('/');
//             // return res.send('location.href = ' / '');
//             // var form = fs.readFileSync('public/index.html', { encoding: 'utf8' });
//             // res.send(form);
//         }
//         // 用户是登录状态  将请求放行
//         next();
//     }
// }

module.exports = (req, res, next) => {
    console.log('11');
};