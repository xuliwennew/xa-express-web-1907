const mongoose = require("./dbConfig")
const Schema = mongoose.Schema;

let userSchema = new Schema({
    mobile:{type:String},
    username:{type:String},
    password:{type:String}
})


let UserModel = mongoose.model("users",userSchema)


module.exports = {

    //async promise
    async checkUserLogin(where){
       return await UserModel.find(where)
    }
}
