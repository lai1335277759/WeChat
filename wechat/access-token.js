/*
  定义获取 access_token 模块
*/

//引入 request 请求模块
const rq = require('request-promise-native')
const {wxUrl,appId,appSecret} = require('../config')
const {writeFileAsync,readFileAsync} = require('../utils/tools')
//利用 fs 文件系统 存 取 access_token
const {writeFile,readFile} = require('fs')
//存
async function getAccessToken () {
  const url = `${wxUrl}/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`

//发送请求 获取 access_token
  const result = await rq({method:'GET',url,json:true})
  // access_token 的过期时间
  result.expires_in = Date.now() + 7200000 - 300000
  //将 access_token 保存起来
  await writeFileAsync('./accessToken.txt',result)

  return  result
}

//取
module.exports = function fetchAccessToken () {
  return readFileAsync('./accessToken.txt')
    .then(res => {
      if(Date.now() < res.expires_in){
        return res
      }else{
        // promise 对象里面有 access_token
        return getAccessToken ()
      }
    })
    .catch(err => {
      // promise 对象里面有 access_token
      return getAccessToken ()
    })

}
