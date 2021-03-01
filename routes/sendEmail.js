const express = require('express');
const router = express.Router();
const sendMail = require('./nodemailer');
const { User } = require('../model/user');


module.exports = async(req, res) => {
    let empty = '传入数据为空';
    if (req.body.registerValue === undefined) {
        return empty;
    }
    console.log(req.body.registerValue);
    let code = "";
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
    }
    let [registerEmail, registerPwd, nickName, time] = parameters;
    userTesting(registerEmail, registerPwd, nickName, time);

    async function userTesting(registerEmail, registerPwd, nickName, time) {
        let userFlag = await User.findOne({ email: registerEmail });
        let registerFlag = await User.findOne({ email: registerEmail, register: 'blankState' });
        if (userFlag == null) {
            User.create({
                username: nickName,
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
        } else if (userFlag !== null && registerFlag !== null) {
            User.updateOne({ email: registerEmail }, { code: code }, function(err) {
                if (err) {
                    res.json({
                        status: '0',
                        msg: "验证码发送失败"
                    });
                } else {
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
            });
        } else {
            return res.send({ msg: '此邮箱已注册' });
        }
    }
}