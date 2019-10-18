var express = require('express');
var router = express.Router();
const ProductModel  = require("../models/ProductModel")



/**
 *  Restful api 设计
 *  接口说明:添加一个商品
 *  Url: localhost:3001/products
 *  method:POST
 *  body:{
 *      title,
 *      price
 *  },
 *  response: {
 *      status:xx
 *      code:200,
 *      results:{}
 *  }
 */
router.post("/add",(req,res)=>{
    //pascal cemeral
    let item = req.body || {}
    ProductModel.addProduct(item,(err,results)=>{
        res.json(results)
    })
});

router.get("/list",(req,res)=>{
    //pageIndex ?pid=1&size=1&title=
    let query = req.query || {}
    let where = {title:query.title}
    ProductModel.queryByPager(query.pid,1,where,(err,results)=>{
        res.json(results)
    })
})

// postman post man


module.exports = router;
