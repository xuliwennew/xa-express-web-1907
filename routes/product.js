var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    //res.render 页面
    res.render('index', { title: '添加了一个产品页' });
});

router.get("/list",(req,res)=>{
    res.jsonp({
        msg:"hello"
    })
})

module.exports = router;
