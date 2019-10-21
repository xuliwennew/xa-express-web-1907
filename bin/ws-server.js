const WebSocket = require("ws")
const wss = new WebSocket.Server({
    port:8080
})


//websocket的服务器，监听数据，推送数据
//通过监听wss服务对象是否和客户端连接成功了，
wss.on("connection",(socket)=>{
    console.log("linked success")

    //监听客户端发送的数据包
   socket.on("message",(data)=>{
       console.log(data)
       //点对点的发送
       // socket.send(data)

       //广播 data 转发所有连接成功的客户端

       wss.clients.forEach((client)=>{
          client.send(data)
       })
  })
})

console.log("websocket server is listening on 8080")
