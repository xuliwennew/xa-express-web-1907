

//step3: 操作数据库 ODM
/**
 * 1.在nodejs中创建一个js对象，这个对象和数据库中的 collection的结构一致
 * 2.使用mongoose 把nodejs中的对象与mongodb中的collection进行关联
 * 3.在程序中通过关联的对象进行CURD
 */

//引于连接成功的mongoose
const mongoose = require("./dbConfig")

const Schema = mongoose.Schema;
//生成一个nodejs中的数据库集合的代理
let productSchema = new Schema({
    title:{type:String},
    price:{type:Number}
})
//把代理与collection绑定
let ProductModel = mongoose.model("products",productSchema)

//对productModel进行操作 CURD
module.exports = {

    /**
     * 添加一个商品
     * @param product generator
     */
    async addItem(item){
        //初始化数据
       let product = new ProductModel(item)
       await product.save() //blocking io

    },

    /**
     * 根据条件更新商品信息
     * db.products.update({k:v,k1:v1},{$set:{k:v,k2:v2}})
     */
    async updateByWhere(where,setObj){
       await ProductModel.updateOne(where,{$set:setObj})
    },

    /**
     * 根据条件查询商品
     */
    async queryByWhere(where){
      await ProductModel.find(where).exec()
    },

    /**
     * 根据条件进行分页
     * @param pageIndex
     * @param pageSize
     * @param where
     */
    async queryByPager(pageIndex=0,pageSize=10,where){
       return await ProductModel.find(where).skip(pageIndex * pageSize).limit(pageSize).exec()
    },

    /**
     * 根据条件进行删除
     * db.products.deleteOne({id:11})
     */
    async deleteByWhere(where){
       return await ProductModel.deleteOne(where)
    }




}

