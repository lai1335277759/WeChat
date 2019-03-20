/*
  定义获取 access_token 模块
*/

//引入 request 请求模块
const rq = require('request-promise-native')
//利用 fs 文件系统 存 取 access_token
const {writeFile,readFile} = require('fs')
//存
async function getAccessToken () {
  const appId = 'wx873ef112342fdd3c'
  const appSecret = '47f0ea0a6fb90d5da1ffe9e7379645ef'
  const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`

//发送请求 获取 access_token
  const result = await rq({method:'GET',url,json:true})
  // access_token 的过期时间
  result.expires_in = Date.now() + 7200000 - 300000
  //将 access_token 保存起来
  writeFile('./accessToken.txt',JSON.stringify(result),err => {
    if(!err)console.log('文件保存成功')
    else console.log(err)
  })

  return  result
}

//取
module.exports = function fetchAccessToken () {
  return new Promise((resolve,reject) => {
    readFile('./accessToken.txt',(err,data) => {
      if(!err){
        //将 json 对象转为 JS 对象
        resolve(JSON.parse(data.toString()))
      }else{
        reject(err)
      }
    })
  })
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
