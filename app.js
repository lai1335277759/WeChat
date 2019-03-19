const express = require('express')

const sha1 = require('sha1')

const app = express()

app.use((req,res) => {
  const {signature,echostr,timestamp,nonce} = req.query

  const token = 'Wechat-liuxing'

  const sortedArr = [token,timestamp,nonce].sort()

  const sha1Str = sha1(sortedArr.join(''))

  if(sha1Str === signature){
    res.end(echostr)
  }else{
    res.end('error')
  }
})

app.listen(8888,err => {
  if(!err) console.log('服务器连接成功')
  else console.log(err)
})

