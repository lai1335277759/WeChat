//引入 request 请求模块
const rq = require('request-promise-native')
const {writeFileAsync,readFileAsync} = require('../utils/tools')
const fetchAccessToken = require('./access-token')
const {wxUrl} = require('../config')
//存
async function getTicket() {
  const {access_token} = await fetchAccessToken()
  console.log(access_token)
  const url = `${wxUrl}/ticket/getticket?access_token=${access_token}&type=jsapi`

  const result = await rq({method:'GET',url,json:true})
  result.expires_in = Date.now() + 7200000 - 300000
  const ticket = {
    ticket: result.ticket,
    expires_in: result.expires_in
  }
 await writeFileAsync('./ticket.txt',ticket)

  return  ticket
}

//取
function fetchTicket () {
   return readFileAsync('./ticket.txt')
    .then(res => {
      if(Date.now() < res.expires_in){
        return res
      }else{
        return getTicket ()
      }
    })
    .catch(err => {
      return getTicket ()
    })

}
// (async ()=>{
//  const result =  getTicket()
//   console.log(result)
// })()

module.exports = fetchTicket

