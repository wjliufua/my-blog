const { User } = require('../model/user');

module.exports = async(req, res, next) => {
    // 获取post请求参数
    let reqParameter = req.body.registerValue;
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
    let [registerEmail, registerPwd, nickName, time, code] = parameters;
    time = parseInt(time);
    time = time - 1000 * 20;
    let verificationTime = await User.findOne({ email: registerEmail, register: 'blankState', code: code });
    if (verificationTime !== null) {
        let mongooseTime = verificationTime.time;
        mongooseTime = parseInt(mongooseTime);
        let timeFlag = time <= mongooseTime + 1000 * 20 ? true : false;
        if (!timeFlag) return res.send({ msg: '验证码已过期,请重新获取' });
    }
    let fullState = await User.findOne({ email: registerEmail, register: 'blankState', code: code });
    if (fullState !== null) {
        User.updateOne({ email: registerEmail }, { registerPwd: registerPwd, register: "fullState" }, function(err, data) {
            if (err) {
                console.log(err);
                console.log('注册状态更新失败');
            } else if (!data) {
                console.log(data);
                console.log('未查找到相关数据');
            } else {
                console.log('注册状态更新成功');
                res.send({ msg: '用户注册成功', state: 0 });
            }
        });
    } else {
        console.log('验证码不正确或已注册');
        res.send({ msg: '验证码不正确或已注册' });
    }
}