const express = require('express');
const router = express.Router();
const sendMail = require('./nodemailer');
const time = require('./timeFormat');
const { User } = require('../model/user');

// let code = "";
// router.post("/sendEmail", (req, res) => {
//     let email = req.body.email;
//     console.log(req.body);
//     code = "";
//     // 随机生成六位验证码
//     for (let i = 0; i < 6; i++) {
//         code += Math.floor(Math.random() * 10);
//     }
//     sendMail.mail(email, "博客注册验证码", code, (err, data) => {
//         if (err) {
//             res.json({
//                 status: '1',
//                 msg: err.message
//             });
//         } else {
//             res.json({
//                 status: '0',
//                 msg: "验证码已发送"
//             });
//         }
//     });
// });
// router.post("/confirm", (req, res, next) => {
//     let userCode = req.body.code;
//     let date = time;
//     console.log(date);
//     // console.log(router);
//     // console.log(code);
//     if (code != userCode) {
//         res.json({
//             status: '1',
//             msg: '验证码错误'
//         });
//     } else {
//         res.json({
//             status: '0',
//             msg: '验证成功'
//         });
//     }
// });
// module.exports = router;
module.exports = async(req, res) => {
    let code = "";
    // let email = req.body.email;
    // console.log(req.body);
    code = "";
    // 随机生成六位验证码
    for (let i = 0; i < 6; i++) {
        code += Math.floor(Math.random() * 10);
    }

    // async function blank() {
    // 获取post请求参数
    let reqParameter = req.body.registerValue;
    // console.log(reqParameter);
    // post请求参数以&分隔
    let parameter = reqParameter.split("&");
    // 存储post请求每个以=分隔的参数
    let parameterArr = [];
    // post请求每个参数的值
    let parameters = [];
    for (let i = 0; i < parameter.length; i++) {
        parameterArr.push(parameter[i].split("="));
    }
    for (let j = 0; j < parameterArr.length; j++) {
        parameters.push(parameterArr[j][1]);
        // let [parameterArr[j][0]] = parameterArr[j][1];
    }
    // console.log(parameters);
    let [registerEmail, registerPwd, nickName, time] = parameters;
    userTesting(registerEmail, registerPwd, nickName, time);

    async function userTesting(registerEmail, registerPwd, nickName, time) {
        let userFlag = await User.findOne({ email: registerEmail });
        let registerFlag = await User.find({ 'email': registerEmail, 'register': 'blankState' });
        // console.log(userFlag);
        if (userFlag == null) {
            // let registerFlag = await User.find({ 'email': registerEmail, 'register': 'blankState' });
            // console.log(registerFlag);
            User.create({
                usernmae: nickName,
                email: registerEmail,
                password: registerPwd,
                role: 'ordinary',
                // 0 启用状态
                // 1 禁用状态
                state: 0,
                // 注册状态(是否已经注册)
                // blankState 注册空白状态(尚未注册)
                // fullState 注册充满状态(已注册)
                register: 'blankState',
                // 邮箱验证码
                code: code,
                time: time
            });
        } else if (userFlag !== null && registerFlag == 'blankState') {
            // let registerFlag = await User.find({ 'email': registerEmail, 'register': 'blankState' });
            User.findByIdAndUpdate(registerEmail, { code: code }, function(err) {
                if (err) {
                    console.log('验证码更新失败');
                } else {
                    console.log('验证码更新成功');
                }
            });
            // res.status(400).send('请点击获取验证码');
        } else {
            res.send({
                msg: '报错了'
            });
        }
    }
    // }
    sendMail.mail(parameters[0], "博客注册验证码", code, (err, data) => {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            });
        } else {
            res.json({
                status: '0',
                msg: "验证码已发送"
            });
        }
    });
}