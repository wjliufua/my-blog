module.exports = async(req, res) => {
    // console.log(req.files);
    // console.log(req.body);
    let imgsPath = [];
    if (req.files) {
        for (let attr in req.files) {
            if (req.files[attr].path) {
                imgsPath.push({
                    [attr]: req.files[attr].path.split('public')[1]
                });
            }
        }
    }
    res.send(imgsPath);
}