var express = require('express');
var router = express.Router();

 //session 单机 cluster
//分布式 redis
router.get('/', function(req, res, next) {
  //首先要判断用户的登录状态
  let user = req.session.userInfo;
  if(user){
      res.render('index', { user:user });
  }else{
    res.redirect("/login")
  }

});


module.exports = router;
