const express = require("express")
const router = express.Router()
const shopsModel = require("../models/shopsModel")


/**
 * 介绍shops api文档
 */
router.get("/",(req,res)=>{
   res.render("api/shop",{})
})

router.get("/info", async (req,res)=>{
     let data = await shopsModel.queryItem({})
    res.json(data)
})


router.post("/add",async (req,res)=>{
   let data = await shopsModel.addItem(req.body)
    res.json(data)
})


module.exports = router;
