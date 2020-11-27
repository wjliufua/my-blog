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

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

app.use(cookieParser());

app.use(session({
    secret: 'wdnmd',
    cookie: { maxAge: 3000 * 1000 },
    resave: false,
    saveUninitialized: false
}));

// req.body需要使用
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



// 路由模块
require('./routes')(app);




app.use((req, res, next) => {
    console.log(req.session);
    // 登录拦截
    if (!req.session.username) {
        return res.redirect(301, '/view/login.html');
        // console.log('1');
    } else {
        // 如果用户是登录状态 并且是一个普通用户
        if (req.session.role !== 'admin' && req.url == '/view/admin') {
            // 让它跳转到博客首页  阻止程序向下执行
            return res.redirect('/');
        }
        // 用户是登录状态  将请求放行
        next();
    }
});

// 开放静态资源文件
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://root:root@localhost:27017/myblog?authSource=admin', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log('数据库连接成功'))
    .catch(() => console.log('数据库连接失败'));

// 监听端口
app.listen(8000);
console.log('能有什么问题');