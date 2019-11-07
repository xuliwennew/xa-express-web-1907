const mongoose = require("./dbConfig")
const Schema = mongoose.Schema;

let shopSchema = new Schema({
    title : {type:String},
    category :{type:String},
    coordinate:{type:Array},
    logo:   {type:Object},    //多个图片
    headerImg :{type:Object}, //多个图片
    address :{type:String},
    shopAlbums:{type:Array},  //多个图片
    mobile   :{type:String},
    detail  :{type:String},
    addDate  :{type:String},  //添加时间
    status   :{type:String},
    activities:{type:Array},
    notice :{type:String},
})

let ShopModel = mongoose.model("shops",shopSchema)


module.exports = {

    /**
     * 添加 一个商铺
     * @param item
     * @returns {Promise<void>}
     */
    async addItem(item){
      let shop = new ShopModel(item)
      return await shop.save()
    },

    async queryItem(where){
        return await ShopModel.find(where)
    }
}
