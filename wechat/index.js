/**
 * 实现微信公众号提供的各个接口
 */

//引入 request 请求模块
const rq = require('request-promise-native')
//引入access-token
const  fetchAccessToken = require('./access-token')

const URL_PREFIX = 'https://api.weixin.qq.com/cgi-bin/'

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
//创建菜单  创建菜单前必须删除之前的菜单
async function createMenu() {
  const {access_token} = await fetchAccessToken()
  const url = `${URL_PREFIX}menu/create?access_token=${access_token}`
  const result = rq({method:'POST', url, json:true, body:menu})
  return result
}
//删除菜单
async function deleteMenu() {
  const {access_token} = await fetchAccessToken()
  const url = `${URL_PREFIX}menu/delete?access_token=${access_token}`
  const result = rq({method:'GET', url, json:true})
  return result
}
//创建标签
async function createUsersTag(name) {
  const {access_token} = await fetchAccessToken()
  const url = `${URL_PREFIX}tags/create?access_token=${access_token}`
  return await rq({method:'POST', url, json: true,body:{tag: {name} }})
}
//添加用户到标签
async function batchUsersTag(openid_list,tagid) {
  const {access_token} = await fetchAccessToken()
  const url = `${URL_PREFIX}tags/members/batchtagging?access_token=${access_token}`
  return await rq({method:'POST', url, json: true,body:{openid_list ,tagid}})
}
// 获取标签下的用户
async function getTagUsers(tagid,next_openid = '') {
  const {access_token} = await fetchAccessToken()
  const url = `${URL_PREFIX}user/tag/get?access_token=${access_token}`
  return await rq({method:'POST', url, json: true,body:{ tagid ,next_openid}})
}
//消息群发
async function sendMessage(body) {
  // 获取access_token
  const { access_token } = await fetchAccessToken();
  // 定义请求
  const url = `${URL_PREFIX}message/mass/sendall?access_token=${access_token}`;
  // 发送请求
  return await rq({method: 'POST', url, json: true, body});
}
// 测试

(async () => {
  const body = {
    "filter":{
      "is_to_all":false,  // 是否添加进历史记录
      "tag_id": 100
    },
    "text":{
      "content": '测试群发消息~ \n点击提前学习后面的课程 \n<a href="https://segmentfault.com/a/1190000018534625">webpack4开发教程</a>'
    },
    "msgtype":"text"
  }
  let result = await sendMessage(body)
  console.log(result)
})()