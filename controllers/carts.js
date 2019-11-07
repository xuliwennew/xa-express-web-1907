const express = require("express")
const router = express.Router()



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


router.get("/",(req,res)=>{
    res.json(require("../mocks/carts.json"))
})

router.get("/clear",(req,res)=>{
    let data = {
        "user": {
            "no": 1
        },
        "shops": [

        ],
        "totalPrice": 0,
        "checked": true
    }
    var fs = require("fs")
    var dir = require("path").resolve(__dirname,"../mocks/carts.json")
    fs.writeFile(dir,JSON.stringify(data),()=>{})
    res.json(require("../mocks/carts.json"))
})

router.get("/add",(req,res)=>{

    /**
     * 如果cartinfo存在，
     判断店铺是否存在,
     如果店铺存在，
     判断店铺中的商品是否存在
     如果店铺中的商品存在，更新数量
     如果不存在，追加这条商品
     如果店铺不存在，
     追加这个店铺，并追加这个商品
     */
    let {name, pid} = req.query;
    //获取最初的cartinfo
    let cartInfo = require("../mocks/carts.json")
    let product = require("../mocks/goods.json")[pid];

    let sid = cartInfo.shops.findIndex((v,i,arr)=>{
        return v.shopName == name;
    })

    var pIndex = -1;

    //判断店铺是否存在,
    if(sid > -1){
        pIndex = cartInfo.shops[sid].products.findIndex((v,i,arr)=>{
            return v.title == product.title;
        })
        //判断店铺中的商品是否存在
        if(pIndex >-1){
            console.log("判断店铺中的商品存在")
            ++cartInfo.shops[sid].products[pIndex].num
        }else {
            console.log("判断店铺中的商品不存在")
            cartInfo.shops[sid].products.push({
                "checked": true,
                "title": product.title,
                "price": product.price,
                "num": 1,
                "attrs": {
                    "weight": 100,
                    "color": "black",
                    "version": "1.0"
                },
                "pic":product.pic
            })
        }
    } else {
        cartInfo.shops.push( {
            "checked": true,
            "degree": 1,
            "shopName": name,
            "totalPrice": 0,
            "products": [
                {
                    "checked": true,
                    "title": product.title,
                    "price": product.price,
                    "num": 1,
                    "attrs": {
                        "weight": 100,
                        "color": "black",
                        "version": "1.0"
                    },
                    "pic":product.pic
                }
            ]
        },)
    }

    var fs = require("fs")
    var dir = require("path").resolve(__dirname,"../mocks/carts.json")
    fs.writeFile(dir,JSON.stringify(cartInfo),()=>{})
    res.json(require("../mocks/carts.json"))


})

module.exports = router;
