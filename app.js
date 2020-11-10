// 引用express框架
const express = require('express');
// 引用mongoose
const mongoose = require('mongoose');
// 引入路径处理模块
const path = require('path');
// 创建网站服务器
const app = express();

// 开放静态资源文件
app.use(express.static(path.join(__dirname, 'public')));

// const client = require('./routes/client')

// 路由模块
// app.use('/', client);

// 监听端口
app.listen(8000);
console.log('能有什么问题');