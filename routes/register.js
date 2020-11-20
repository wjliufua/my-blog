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
        // let [parameterArr[j][0]] = parameterArr[j][1];
    }
    console.log(parameters);
    let [registerEmail, registerPwd, nickName, time] = parameters;
    let fullState = User.find({ registerEmail: registerEmail, register: 'blankState' });
    // let aaa = User.find({ email: '22' });
    // console.log(aaa);
    if (fullState !== null) {
        User.findOneAndUpdate(registerEmail, { registerPwd: registerPwd, register: "fullState" }, function(err, data) {
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
    }
    res.send({
        message: '成功失败',
        reqParameter: reqParameter
    });
}