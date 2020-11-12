 //引入模块 nodemailer
 const nodemailer = require('nodemailer')

 const config = {
     // 163邮箱 为smtp.163.com
     host: 'smtp.163.com', //这是qq邮箱
     //端口
     port: 465,
     auth: {
         // 发件人邮箱账号
         user: '18420116994@163.com',
         //发件人邮箱的授权码 这里可以通过qq邮箱获取 并且不唯一
         pass: 'WFYLSWXYHLHBYEAG'
     }
 }

 const transporter = nodemailer.createTransport(config)
 var random = String(Math.random());
 const mail = {
     // 发件人 邮箱  '昵称<发件人邮箱>'
     from: 'wdnmd<18420116994@163.com>',
     // 主题
     subject: '激活验证码',
     // 收件人 的邮箱 可以是其他邮箱 不一定是qq邮箱
     to: '1459200389@qq.com',
     // 内容
     text: `您的激活验证码为：${random.slice(2, 7)}, 请24小时内有效，请谨慎保管。`,
     //这里可以添加html标签
     html: '<a href="http://www.gov.cn/">wdnmd</a>'
 }

 transporter.sendMail(mail, function(error, info) {
     if (error) {
         return console.log(error);
     }
     transporter.close()
     console.log('mail sent:', info.response)
 })