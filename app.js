//创建服务器
const express = require('express')
const reply = require('./reply')
//创建 APP 应用对象
const app = express()

app.use(reply())

app.listen(8888,err => {
  if(!err) console.log('服务器连接成功')
  else console.log(err)
})