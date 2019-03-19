const express = require('express')

const app = express()

app.use((req,res) => {
  
})

app.listen(3000,err => {
  if(!err) console.log('服务器连接成功')
  else console.log(err)
})

