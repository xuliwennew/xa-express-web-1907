const express = require("express")
const router = express.Router()
const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken")

//用于sign 生成一个token
router.post("/sign",async (req,res)=>{
    let user = req.body;
    //用户名
    let data = await userModel.checkUserLogin(user)
    if(data.length>0){
        //把当前有的成功的用户信息
        let token = jwt.sign({username:data[0].username},"qf",{expiresIn:"30m"});
        res.json({
            code:200,
            msg:"签名成功",
            token:token
        })
    }else{
        res.json({
            code:201,
            msg:"签名失败"
        })
    }
})




module.exports = router
