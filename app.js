//创建服务器
const express = require('express')
const sha1 = require('sha1')
const fetchTicket = require('./wechat/ticket')
const reply = require('./reply')
const {url,appId} = require('./config/index')
//创建 APP 应用对象
const app = express()
app.set('views','views')
app.set('view engine','ejs')
app.use(express.static('public'))

app.get('/search',async (req,res) => {

  // 签名生成规则如下：参与签名的字段包括noncestr（随机字符串）, 有效的jsapi_ticket, timestamp（时间戳）, url（当前网页的URL，不包含#及其后面部分） 。
  const {ticket} = await fetchTicket()
  const timestamp = Math.round(Date.now() / 1000)
  const noncestr = Math.random().toString().slice(2)
  // 对所有待签名参数按照字段名的ASCII 码从小到大排序（字典序）后，使用URL键值对的格式（即key1=value1&key2=value2…）拼接成字符串string1。这里需要注意的是所有参数名均为小写字符。
  const arr = [
    `noncestr=${noncestr}`,
    `jsapi_ticket=${ticket}`,
    `timestamp=${timestamp}`,
    `url=${url}/search`
  ]
  // 对string1作sha1加密，字段名和字段值都采用原始值，不进行URL 转义。
  const signature = sha1(arr.sort().join('&'))

  res.render('search.ejs',{signature,noncestr,timestamp,appId,url})
})
app.use(reply())

app.listen(8888,err => {
  if(!err) console.log('服务器连接成功')
  else console.log(err)
})