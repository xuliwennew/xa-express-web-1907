const express = require("express")
const router = express.Router()
const orderModel = require('../models/orderModel')


router.get("/",(req,res)=>{
    // { orders:orderArr} 绑定到order.ejs模块上<%%>
    res.render("order",{ orders:orderModel.getOrders()})
})


module.exports = router;
