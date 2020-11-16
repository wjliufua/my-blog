module.exports = (req, res) => {
    let aaa = req.body.registerValue;
    console.log(aaa);
    res.send({
        message: '成功失败',
        aaa: aaa
    });
}