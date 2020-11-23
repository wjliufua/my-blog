// 引用express框架
const express = require('express');
// 引用mongoose
const mongoose = require('mongoose');
// 引入body-parser模块 用来处理post请求参数
const bodyParser = require('body-parser');
// 引入路径处理模块
const path = require('path');
// 引入session模块
var session = require('express-session');
// 引入cookie模块
var cookieParser = require('cookie-parser');
// 创建网站服务器
const app = express();

// 开放静态资源文件
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());

app.use(session({
    secret: 'wdnmd',
    cookie: { maxAge: 120 * 1000 },
    resave: false,
    saveUninitialized: false
}));

// req.body需要使用
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/admin', require('./routes/loginGuard'));

// const client = require('./routes/client');
const sendEmail = require('./routes/sendEmail');
const register = require('./routes/register');
const login = require('./routes/login');

app.use('/email', sendEmail);
app.use('/register', register);
app.use('/login', login);

app.use(sendEmail, (err, req, res, next) => {
    console.log(next.msg);
});

// 路由模块
// app.use('/', client);
// require('./routes')(app);

mongoose.connect('mongodb://root:root@localhost:27017/myblog?authSource=admin', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log('数据库连接成功'))
    .catch(() => console.log('数据库连接失败'));

// 监听端口
app.listen(8000);
console.log('能有什么问题');