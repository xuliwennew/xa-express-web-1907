var express = require('express');
var router = express.Router();

/* GET home page. */
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
