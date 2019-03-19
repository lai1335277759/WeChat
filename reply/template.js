/*
  用于定义回复用户消息的6种模板模块
*/

module.exports = (options) => {
  let replyMessage = `<xml>
<ToUserName><![CDATA[${options.toUserName}]]></ToUserName>
<FromUserName><![CDATA[${options.fromUserName}]]></FromUserName>
<CreateTime>${options.createTime}</CreateTime>
<MsgType><![CDATA[${options.msgType}]]></MsgType>\n`

  if(options.msgType === 'text'){
    replyMessage += `<Content><![CDATA[${options.content}]]></Content>`
  }else if(options.msgType === 'image'){
    replyMessage += `<Image>
    <MediaId><![CDATA[${options.mediaId}]]></MediaId>
  </Image>`
  }else if(options.msgType === 'voice'){
    replyMessage += `<Voice>
    <MediaId><![CDATA[${options.mediaId}]]></MediaId>
  </Voice>`
  }else if(options.msgType === 'video'){
    replyMessage += `<Video>
    <MediaId><![CDATA[${options.mediaId}]]></MediaId>
    <Title><![CDATA[${options.Title}]]></Title>
    <Description><![CDATA[${options.description}]]></Description>
  </Video>`
  }else if(options.msgType === 'music'){
    replyMessage += `<Music>
    <Title><![CDATA[${options.Title}]]></Title>
    <Description><![CDATA[${options.description}]]></Description>
    <MusicUrl><![CDATA[${options.musicUrl}]]></MusicUrl>
    <HQMusicUrl><![CDATA[${options.hqMusicUrl}]]></HQMusicUrl>
    <ThumbMediaId><![CDATA[${options.mediaId}]]></ThumbMediaId>
  </Music>`
  }else if(options.msgType === 'news'){
    replyMessage +=  `<ArticleCount>${options.content.length}</ArticleCount>
      <Articles>`
     options.content.reduce((prev,curr) => {
      return prev + `<item>
      <Title><![CDATA[${curr.title}]]></Title>
      <Description><![CDATA[${curr.description}]]></Description>
      <PicUrl><![CDATA[${curr.picurl}]]></PicUrl>
      <Url><![CDATA[${curr.url}]]></Url>
      </item>`
     })

    replyMessage += `</Articles>`
  }

 replyMessage += '\n</xml>'

  return replyMessage
}
