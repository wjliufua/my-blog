function TimeFormat() {
    let date = new Date();
    // let Y = date.getFullYear();
    // let M = date.getDate();
    // let D = date.getDate();
    // let h = date.getHours();
    // let m = date.getMinutes();
    // let s = date.getSeconds();
    // let time = date.toLocaleTimeString();
    // return Y + '-' + M + D + h + m + s;
    // var t = new Date(); //你已知的时间
    // var t_s = t.getTime(); //转化为时间戳毫秒数
    // var nt = new Date(); //定义一个新时间
    // nt.setTime(t_s + 1000 * 60); //设置新时间比旧时间多一分钟
    // nt.setTime(t_s + 1000 * 60 * 60); //设置新时间比旧时间多一小时
    // nt.setTime(t_s + 1000 * 60 * 60 * 24); //设置新时间比旧时间多一天
    let dateOpend = date.getTime();
    return dateOpend;
}

module.exports = function() {
    return function() {
        let dateOpend = date.getTime();
    }
}

// module.exports = {
//     TimeFormat
// }