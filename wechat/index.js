/**
 * 实现微信公众号提供的各个接口
 */

//引入 request 请求模块
const rq = require('request-promise-native')
//引入access-token
const  fetchAccessToken = require('./access-token')

const menu =  {
  "button":[
    {
      "type":"click",
      "name":"洗脑神曲🎶",
      "key":"V1001_TODAY_MUSIC"
    },
    {
      "name":"菜单🏡",
      "sub_button":[
        {
          "type":"view",
          "name":"搜索",
          "url":"http://www.baidu.com/"
        },
        {
          "type": "pic_sysphoto",
          "name": "系统拍照发图",
          "key": "rselfmenu_1_0",
        },
        {
          "type": "pic_photo_or_album",
          "name": "拍照或者相册发图",
          "key": "rselfmenu_1_1",
        },
        {
          "type": "pic_weixin",
          "name": "微信相册发图",
          "key": "rselfmenu_1_2",
        },
        {
          "name": "发送位置",
          "type": "location_select",
          "key": "rselfmenu_2_0"
        }
      ]
    },
    {
      "name": "扫码👻",
      "sub_button": [
        {
          "type": "scancode_waitmsg",
          "name": "扫码带提示",
          "key": "rselfmenu_0_0",
        },
        {
          "type": "scancode_push",
          "name": "扫码推事件",
          "key": "rselfmenu_0_1",
        },
        {
          "type":"click",
          "name":"赞一下我们",
          "key":"V1001_GOOD"
        }
      ]
    }
  ]
}
//创建  创建菜单前必须删除之前的菜单
async function createMenu() {
  const {access_token} = await fetchAccessToken()
  const url = `https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${access_token}`
  const result = rq({method:'POST', url, json:true, body:menu})
  return result
}
//删除
async function deleteMenu() {
  const {access_token} = await fetchAccessToken()
  const url = `https://api.weixin.qq.com/cgi-bin/menu/delete?access_token=${access_token}`
  const result = rq({method:'GET', url, json:true})
  return result
}
// 测试

// (async () => {
//   let result = await deleteMenu()
//   console.log(result)
//   result = await createMenu()
//   console.log(result)
// })()