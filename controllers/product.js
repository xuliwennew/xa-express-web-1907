var express = require('express');
var router = express.Router();
const fs = require("fs")

/* GET home page. */
router.get('/', function(req, res, next) {

    res.render('product', { title: '添加了一个产品页' });
});

router.get("/list",(req,res)=>{
    res.jsonp({
        msg:"hello"
    })
})


module.exports = router;
