const express = require("express")
const router = express.Router()
var formidable = require("formidable")


router.get("/", (req, res) => {
    //首先要判断用户的登录状态
    let user = req.session.userInfo;
    if (user) {
        res.redirect("/")
    } else {
        res.render("login", {})
    }

})

router.post("/check", (req, res) => {
    //获取form中的用户名和密码
    console.log(req.body)
    let user = req.body;
    // name =="zhangsan" & pass="xx"
    //当用户名和密码合法时，用户可以登录
    // .... check db
    //如果用户登录成功，需要把用户的信息保存到session
    req.session.userInfo = user;

    //转到index
    res.redirect("/")

})

router.get("/out", (req, res) => {
    req.session.userInfo = null;
    res.redirect("/login")
})


router.get("/reg", (req, res) => {
    res.render("regUser", {})
})

router.post("/upload", (req, res) => {
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';		//设置编辑
    form.uploadDir = 'public/user';	 //设置上传目录
    form.keepExtensions = true;	 //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小

    //public/
    form.parse(req,(err,fields,files)=>{
        res.send(files.f1.path.substr(6))
    })
})

module.exports = router;
