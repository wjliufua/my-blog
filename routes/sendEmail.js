const express = require('express');
const router = express.Router();
const sendMail = require('./nodemailer')
let code = "";
router.post("/sendEmail", (req, res) => {
    let email = req.body.email;
    console.log(req.body);
    code = "";
    // 随机生成六位验证码
    for (let i = 0; i < 6; i++) {
        code += Math.floor(Math.random() * 10);
    }
    sendMail.mail(email, "博客注册验证码", code, (err, data) => {
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
});
router.post("/confirm", (req, res, next) => {
    let userCode = req.body.code;
    if (code != userCode) {
        res.json({
            status: '1',
            msg: '验证码错误'
        });
    } else {
        res.json({
            status: '0',
            msg: '验证成功'
        });
    }
});
module.exports = router;