/*
  用于定义回复用户消息的6种模板模块
*/

module.exports = (options) => {
  let replyMessage = `<xml>
<ToUserName><![CDATA[${options.ToUserName}]]></ToUserName>
<FromUserName><![CDATA[${options.FromUserName}]]></FromUserName>
<CreateTime>${options.CreateTime}</CreateTime>
<MsgType><![CDATA[${options.MsgType}]]></MsgType>\n`

  if(options.MsgType === 'text'){
    replyMessage += `<Content><![CDATA[${options.Content}]]></Content>`
  }else if(options.MsgType === 'image'){
    replyMessage += `<Image>
    <MediaId><![CDATA[${options.mediaId}]></MediaId>
  </Image>`
  }else if(options.MsgType === 'voice'){
    replyMessage += `<Voice>
    <MediaId><![CDATA[${options.mediaId}]]></MediaId>
  </Voice>`
  }else if(options.MsgType === 'video'){
    replyMessage += `<Video>
    <MediaId><![CDATA[${options.mediaId}]]></MediaId>
    <Title><![CDATA[${options.Title}]]></Title>
    <Description><![CDATA[${options.description}]]></Description>
  </Video>`
  }else if(options.MsgType === 'music'){
    replyMessage += `<Music>
    <Title><![CDATA[${options.Title}]]></Title>
    <Description><![CDATA[${options.description}]]></Description>
    <MusicUrl><![CDATA[${options.musicUrl}]]></MusicUrl>
    <HQMusicUrl><![CDATA[${options.hqMusicUrl}]]></HQMusicUrl>
    <ThumbMediaId><![CDATA[${options.mediaId}]]></ThumbMediaId>
  </Music>`
  }else if(options.MsgType === 'news'){
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
