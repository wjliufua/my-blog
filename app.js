// 引用express框架
const express = require('express');
// 引用mongoose
const mongoose = require('mongoose');
// 引入body-parser模块 用来处理post请求参数
const bodyParser = require('body-parser');
// 引入路径处理模块
const path = require('path');
// 引入http模块
const htpp = require('http');
// 引入session模块
var session = require('express-session');
// 引入cookie模块
var cookieParser = require('cookie-parser');
// 创建网站服务器
const app = express();

// app.all("*", function(req, res, next) {
//     //设置允许跨域的域名，*代表允许任意域名跨域
//     res.header("Access-Control-Allow-Origin", "*");
//     //允许的header类型
//     res.header("Access-Control-Allow-Headers", "content-type");
//     //跨域允许的请求方式 
//     res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
//     if (req.method.toLowerCase() == 'options') {
//         res.send(200); //让options尝试请求快速结束
//     } else {
//         next();
//     }
// });

app.use(cookieParser());

app.use(session({
    secret: 'wdnmd',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3000 * 1000 }
}));

// req.body需要使用
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/view/admin', (req, res, next) => {
    if (!req.session.username) {
        res.redirect(302, '/view/login.html');
    } else {
        // 如果用户是登录状态 并且是一个普通用户
        if (req.session.role !== 'admin') {
            // 让它跳转到博客首页  阻止程序向下执行
            return res.redirect(302, '/');
        }
        // 用户是登录状态  将请求放行
        next();
    }
});

// 开放静态资源文件
app.use(express.static(path.join(__dirname, 'public')));

// 路由模块
require('./routes')(app);

mongoose.connect('mongodb://root:root@localhost:27017/myblog?authSource=admin', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log('数据库连接成功'))
    .catch(() => console.log('数据库连接失败'));

// 监听端口
app.listen(8000);
console.log('能有什么问题');