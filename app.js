//创建服务器
const express = require('express')
//引入 sha1 对sortedArr进行加密
const sha1 = require('sha1')
//引入xml2js库将xml文件转成js对象
const {parseString} = require('xml2js')
//创建 APP 应用对象
const app = express()

app.use(async (req,res) => {
  //获取 signature(加密签名) timestamp(时间戳) nonce(随机数字) echostr(微信后台生成的随机字符串)
  const {signature,echostr,timestamp,nonce} = req.query
  //token 接口配置信息
  const token = 'Wechat-liuxing'
  //将这三个参数进行排序 拼接并加密
  const sha1Str = sha1([token,timestamp,nonce].sort().join(''))
  //判断请求方式 'get' 是服务器发送的请求 'post' 是用户发送的请求
  if(req.method === 'GET'){
    //signature (服务器署名)   echostr(随机字符串)
    if(sha1Str === signature){
      res.end(echostr)
    }else {
      res.end('error')
    }
  }else if(req.method === 'POST'){
    //过滤 非服务器发送的信息
    if (sha1Str !== signature) {
      res.end('error')
      return
    }
    //利用 async 特性 获取 xmlData
    const xmlData = await new Promise((resolve,reject) => {
      let xmlData = ''
      //绑定 'data'监听事件 获取用户发送的数据
      req
        .on('data',data => {
          xmlData += data.toString()
        })
        //数据获取完毕
        .on('end',data => {
          resolve(xmlData)
        })
    })
    let jsData = null
    //使用xml2js 方法 将获取的数据转成 js 对象
    parseString(xmlData,{trim:true},(err, result) => {
      if(!err){
        jsData = result
      }else{
        res.end(err)
      }
    })
    //格式化数据
    const {xml} = jsData
    const userData = {}
    for(let key in xml){
      let value = xml[key]
      userData[key] = value[0]
    }

   let content = '一脸懵逼'
    if(userData.Content === '牛逼'){
      content += '你牛逼,你闪电,你拿几把戳电线'
    }else if(userData.Content.indexOf('摸鱼') !== -1){
      content += '摸鱼一时爽,一直摸一直爽'
    }
    const replyMessage = `<xml>
<ToUserName><![CDATA[${userData.FromUserName}]]></ToUserName>
<FromUserName><![CDATA[${userData.ToUserName}]]></FromUserName>
<CreateTime>${Date.now()}</CreateTime>
<MsgType><![CDATA[text]]></MsgType>
<Content><![CDATA[${content}]]></Content>
</xml>`
    res.send(replyMessage)

  }else {
    res.send('error')
  }

})


app.listen(8888,err => {
  if(!err) console.log('服务器连接成功')
  else console.log(err)
})











    //实现自动回复

