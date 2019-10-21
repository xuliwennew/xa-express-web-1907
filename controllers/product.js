var express = require('express');
var router = express.Router();
const ProductModel  = require("../models/productModel")



router.post("/add",async (req,res)=>{
    //pascal cemeral
    let item = req.body || {}
    return await ProductModel.addItem(item)
});

router.get("/list",async (req,res)=>{
    //pageIndex ?pid=1&size=1&title=
    let query = req.query || {}
    let where = {title:query.title}
    let data= await ProductModel.queryByPager(query.pid,1,where)
    return res.json(data)
})


module.exports = router;
