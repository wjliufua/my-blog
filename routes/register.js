// const { timeFormat } = require('./timeFormat');
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
    // console.log(parameters);
    let [registerEmail, registerPwd, nickName, time, code] = parameters;
    // time = time - 1000 * 20;
    // await User.findOne({ registerEmail: registerEmail, register: 'blankState', code: code, time: time }, function(err, data) {
    //     return data == null ? res.send({ msg: '验证码已过期' }) : console.log('验证码还活着')
    // });
    console.log(registerEmail);
    await User.findOne({ registerEmail: registerEmail }, function(err, data) {
        console.log(data);
        console.log('----');
    });
    let fullState = await User.findOne({ registerEmail: registerEmail, register: 'blankState', code: code }, function(err, res) {
        console.log(res);
        return res
    });
    console.log(fullState);
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
            }
        });
    } else {
        console.log('验证码不正确或已注册');
        // res.send({
        //     message: '成功失败',
        //     reqParameter: reqParameter
        // });
    }
}