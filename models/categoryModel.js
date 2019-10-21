
//引于连接成功的mongoose
const mongoose = require("./dbConfig")

const Schema = mongoose.Schema;
//生成一个nodejs中的数据库集合的代理
let categorySchema = new Schema({
    title:{type:String},
    desc:{type:String},
    pic:{type:Object}
})
//把代理与collection绑定
let CategoryModel = mongoose.model("categories",categorySchema)

//对productModel进行操作 CURD
module.exports = {

    /**
     * 添加一个
     * @param item
     */
    async addItem(item){
        //初始化数据
        let category = new CategoryModel(item)
        await category.save()

    },

    /**
     * 根据条件更新商品信息
     * db.categories.update({k:v,k1:v1},{$set:{k:v,k2:v2}})
     */
    async updateByWhere(where,setObj){
        await CategoryModel.updateOne(where,{$set:setObj})
    },

    /**
     * 根据条件查询商品
     */
    async queryByWhere(where){
        await CategoryModel.find(where).exec()
    },

    /**
     * 根据条件进行分页
     * @param pageIndex
     * @param pageSize
     * @param where
     */
    async queryByPager(pageIndex=0,pageSize=10,where){
        return await CategoryModel.find(where).skip(pageIndex * pageSize).limit(pageSize).exec()
    },

    /**
     * 根据条件进行删除
     * db.categories.deleteOne({id:11})
     */
    async deleteProductByWhere(where){
        return await CategoryModel.deleteOne(where)
    }




}

