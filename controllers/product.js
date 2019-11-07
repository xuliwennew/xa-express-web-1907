var express = require('express');
var router = express.Router();
const ProductModel  = require("../models/productModel")


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


router.get("/all",(req,res)=>{
    res.json(require("../mocks/goods.json"))
})


router.get("/item/:id",(req,res)=>{
    let data = require("../mocks/goods.json")
    res.json(data[req.params.id])
})


module.exports = router;
