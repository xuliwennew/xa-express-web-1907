const express = require("express")
const router = express.Router()
var formidable = require("formidable")
const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken")

//定义拦截器 golang
router.use((req,res,next)=>{
   let token = req.query.token || req.body.token || req.headers["x-token"]
    if(token){
        //verify
        jwt.verify(token,"qf",(error,decode)=>{
            console.log(error)
            console.log(decode)
            if(error){
                return res.json({
                    code:203,
                    msg:"token无效"
                })
            }else{
                next(); //只有合法的token,才可以调用下一个路由
            }
        })
    }else {
        //直接返回一个403
        res.status(403).send({
            msg:"没有token"
        })
    }
})

router.get("/", (req, res) => {
    //首先要判断用户的登录状态
    let user = req.session.userInfo;
    if (user) {
        res.redirect("/")
    } else {
        res.render("admin/login", {layout: null})
    }
})


router.post("/check", async (req, res) => {
    //获取form中的用户名和密码
    console.log(req.body)
    let user = req.body;
    // name =="zhangsan" & pass="xx"
    //当用户名和密码合法时，用户可以登录
    // .... check db
    let data = await userModel.checkUserLogin(user)
    if(data.length>0){
        //如果用户登录成功，需要把用户的信息保存到session
        req.session.userInfo = data[0];

        //restful api json
        res.json({
            code: 200,
            msg: "登录成功了"
        })
    }else {
        res.json({
            code:201,
            msg:"登录失败，用户名或者密码错误"
        })
    }

})

router.post("/checkuser",async (req,res) =>{
   let data = await userModel.checkUserLogin({username:"zhangsan",password:"123"})
   res.json(data)
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
    form.parse(req, (err, fields, files) => {
        res.send(files.f1.path.substr(6))
    })
})

module.exports = router;
