// const { timeFormat } = require('./timeFormat');
const { User } = require('../model/user');

module.exports = (req, res, next) => {
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
    res.send({
        message: '成功失败',
        reqParameter: reqParameter
    });
}