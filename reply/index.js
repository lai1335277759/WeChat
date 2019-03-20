/*
  中间件函数模块
*/
//引入 sha1 对sortedArr进行加密
const sha1 = require('sha1')

const template = require('./template')
const handleResponse = require('./handleResponse')
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
      // 将xml格式转换成JS对象
      const jsData = parseXMLData(xmlData)
      // 格式化获取到的用户信息
      const userData = reviewJsData(jsData)
      // 处理用户数据 返回响应信息
      const options = handleResponse(userData)
      // 处理6种信息 并返回响应
      const replyMessage =  template(options)
      res.send(replyMessage)
      console.log(replyMessage)
    }else {
      res.send('error')
    }

  }
}