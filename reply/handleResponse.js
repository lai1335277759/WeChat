/*
处理用户数据,返回响应信息
*/

module.exports = (userData) => {
  let options = {
    toUserName: userData.FromUserName,
    fromUserName: userData.ToUserName,
    createTime: Date.now(),
    msgType: 'text',
    content:'一脸懵逼'
  }

  if (userData.MsgType === 'text') {
    if(userData.Content === '牛逼'){
      options.content = '你牛逼,你闪电,你拿几把戳电线'
    }else if(userData.Content&&userData.Content.indexOf('摸鱼') !== -1){
      options.content = '摸鱼一时爽,一直摸一直爽'
    }
  }else if (userData.MsgType === 'image') {
    //将用户发送的图片，返回回去
    options.mediaId = userData.MediaId;
    options.msgType = 'image';
  }else if(userData.MsgType === 'voice'){
    options.content = userData.Recognition
  }else if(userData.MsgType === 'location'){
    options.content = `地理位置维度: ${userData.Location_X}
    \n 地理位置经度: ${userData.Location_Y}
    \n 地图缩放大小:${userData.Scale}
    \n 地理位置信息:${userData.Label}`
  }else if(userData.MsgType === 'event'){
    if(userData.Event === 'subscribe'){
      //关注事件
      options.content = '你好,欢迎关注公众号!'
      if(userData.EventKey){
        options.content = '你好,欢迎扫码关注公众号!'
      }
    }else if(userData.Event === 'unsubscribe'){
      options.content = ''
    }else if(userData.Event === 'CLICK'){
      options.content = '网络故障 稍后再试'
    }
  }

  return options
}
