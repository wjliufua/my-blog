module.exports = (req, res, next) => {
    let aaa = req.body.registerValue;
    // console.log(sendEmail.stack[1].next());
    res.send({
        message: '成功失败',
        aaa: aaa
    });
}