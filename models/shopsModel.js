const mongoose = require("./dbConfig")
const Schema = mongoose.Schema;

let shopSchema = new Schema({
    title :   {type:String},
    category :{type:String},
    mapPoint:{type:Array},
    logos:   {type:Object},
    backImgs :{type:Object},
    address :{type:String},
    shopAlbums:{type:Array},
    mobile   :{type:String},
    detail  :{type:String},
    addDate  :{type:String},
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
