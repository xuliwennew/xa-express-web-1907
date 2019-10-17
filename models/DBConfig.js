const mongoose = require("mongoose")

//step1: 通过mongoose连接mongodb 27017
mongoose.connect("mongodb://127.0.0.1:27017/shops",{
    useNewUrlParser:true,
    useUnifiedTopology:true
});


//step2: 监听连接的信息
mongoose.connection.on("connected",()=>{
    console.log("mongodb is connected")
})


//step3: 操作数据库 ODM
/**
 * 1.在nodejs中创建一个js对象，这个对象和数据库中的 collection的结构一致
 * 2.使用mongoose 把nodejs中的对象与mongodb中的collection进行关联
 * 3.在程序中通过关联的对象进行CURD
 */

const Schema = mongoose.Schema;
//生成一个nodejs中的数据库集合的代理
let productSchema = new Schema({
    title:{type:String},
    price:{type:Number}
})
//把代理与collection绑定
let ProductModel = mongoose.model("products",productSchema)

//对productModel进行操作

//添加一条记录

let product = new ProductModel({
    title:"华为Mate 30",
    price:5000
})

product.save((err,result)=>{
    console.log(result)
})


