const express = require("express")
const router = express.Router()



router.get("/",(req,res)=>{
    // { orders:orderArr} 绑定到order.ejs模块上<%%>
    res.render("order",{ orders:[]})
})


module.exports = router;
