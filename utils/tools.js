/*
  工具函数模块
*/
//引入xml2js库将xml文件转成js对象
const {parseString} = require('xml2js')
//利用 fs 文件系统 存 取 access_token
const {writeFile,readFile} = require('fs')

const {resolve} = require('path')


module.exports = {
  /**
   * 用来获取用户发送的信息
   * @param req
   * @return {promise<async>}
   */
  getUserDataAsync (req) {
   return new Promise((resolve,reject) => {
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
  },
  /**
   * 将xml数据转成 js 对象
   * @param xmlData
   * @return jsData
   */
  parseXMLData (xmlData) {
    let jsData = null
    //使用xml2js 方法 将获取的数据转成 js 对象
    parseString(xmlData,{trim:true},(err, result) => {
      if(!err){
        jsData = result
      }else{
        jsData = {}
      }
    })
    return jsData
  },
  /**
   * 格式化 js 对象的方法
   * @param jsData
   * @return userData
   */
  reviewJsData (jsData) {
    //格式化数据
    const {xml} = jsData
    const userData = {}
    for(let key in xml){
      const value = xml[key]
      userData[key] = value[0]
    }
    return userData
  },

  /**
   *
   * @param filePath //文件路径
   * @param data  数据
   * @returns {promise}
   */
  writeFileAsync(filePath,data) {
    filePath = resolve(__dirname,'../wechat',filePath)
    return writeFile(filePath,JSON.stringify(data),err => {
      if(!err)console.log('文件保存成功')
      else console.log(err)
    })

  },
  /**
   *
   * @param filePath //文件路径
   * @returns {promise}
   */
  readFileAsync(filePath) {
    filePath = resolve(__dirname,'../wechat',filePath)
    return new Promise((resolve,reject) => {
      readFile(filePath,(err,data) => {
        if(!err){
          //将 json 对象转为 JS 对象
          resolve(JSON.parse(data.toString()))
        }else{
          reject(err)
        }
      })
    })
  }

}

