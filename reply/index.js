/*
  中间件函数模块
*/
//引入 sha1 对sortedArr进行加密
const sha1 = require('sha1')

const template = require('./template')
const {getUserDataAsync,parseXMLData,reviewJsData} = require('../utils/tools')

module.exports = () => {
  return async (req,res) => {
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
      const xmlData = await getUserDataAsync(req)
      const jsData = parseXMLData(xmlData)
      const userData = reviewJsData(jsData)
      let options = {
        ToUserName: userData.FromUserName,
        FromUserName: userData.ToUserName,
        CreateTime: Date.now(),
        MsgType: 'text',
        Content:'一脸懵逼'
      }
      if(userData.Content === '牛逼'){
        options.Content += '你牛逼,你闪电,你拿几把戳电线'
      }else if(userData.Content&&userData.Content.indexOf('摸鱼') !== -1){
        options.Content += '摸鱼一时爽,一直摸一直爽'
      }
      if (userData.MsgType === 'image') {
        //将用户发送的图片，返回回去
        options.mediaId = userData.MediaId;
        options.type = 'image';
      }
      if(userData.MsgType === 'voice'){
        options.mediaId = userData.MediaId;
        options.type = 'voice';
      }
      const replyMessage =  template(options)
      res.send(replyMessage)
    }else {
      res.send('error')
    }

  }
}