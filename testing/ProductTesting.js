const ProductModel = require("../models/ProductModel")

let item = {
    title:"iphone X",
    price:6000
}
// ProductModel.AddProduct(item,(err,results)=>{
//     console.log(results)
// })

// ProductModel.updateProductByWhere({title:"iphone 10"},{title:"iphone X",price:6000},(err,result)=>{
//     console.log(result)
// })


// ProductModel.queryByWhere({},(err,results)=>{
//     //error null
//     console.log(results)
// })

// ProductModel.queryByPager(1,1,{},(err,results)=>{
//     console.log(results)
// })

ProductModel.deleteProductByWhere({title:"iphone X"},(err,results)=>{
    console.log(results)
})
