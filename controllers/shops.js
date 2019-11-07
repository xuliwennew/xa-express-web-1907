const express = require("express")
const router = express.Router()
const shopsModel = require("../models/shopsModel")


/**
 * 解决访问的跨域问题 no-cors micro services  restful gateway router spring cloud
 */
router.all("*",(req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
    else  next();
})

/**
 * 介绍shops api文档
 */
router.get("/",(req,res)=>{
   res.render("api/shop",{})
})

router.get("/info", async (req,res)=>{
    console.log(req.query)
    let data = await shopsModel.queryItem({})
    res.json(data)
})


router.post("/add",async (req,res)=>{
    console.log(req.body)
   let data = await shopsModel.addItem(req.body)
    res.json(data)
})

router.post("/test",(req,res)=>{
    console.log(req.query)
    console.log(req.body)
    res.json(req.body)

})


module.exports = router;
