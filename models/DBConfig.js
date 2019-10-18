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


module.exports = mongoose

