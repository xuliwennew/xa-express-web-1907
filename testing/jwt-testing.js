

const jwt = require("jsonwebtoken")

let token =jwt.sign({name:"zhangsan"},"qf",{expiresIn: "1s"})
console.log(token)

let code = jwt.verify(token,"qf")
console.log(code)
