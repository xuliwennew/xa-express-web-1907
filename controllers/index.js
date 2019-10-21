var express = require('express');
var router = express.Router();
const path = require("path")
const ueditor = require("ueditor")

//session 单机 cluster
//分布式 redis
router.get('/', function (req, res) {
    //首先要判断用户的登录状态
    let user = req.session.userInfo;
    if (user) {
        console.log(user)
        res.render('index', {layout: null, user: user});
    } else {
        res.redirect("/login")
    }

});


//上传相片路径（参照官方文档配置）
router.all("/ueditor/ue", ueditor(path.resolve(__dirname, "..", 'public'), (req, res) => {
    // ueditor 客户发起上传图片请求
    if (req.query.action === 'uploadimage') {
        var foo = req.ueditor;
        var imgname = req.ueditor.filename;
        console.log(imgname)
        var img_url = '/images/ueditor/';
        res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
    }
    //  客户端发起图片列表请求
    else if (req.query.action === 'listimage') {
        var dir_url = '/images/ueditor/';
        res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
    }
    // 客户端发起其它请求
    else {
        // console.log('config.json')
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/ueditor/nodejs/config.json');
    }
}));


module.exports = router;
