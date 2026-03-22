const { SIGN } = require('../config/settings')

module.exports = async ({ sock, from }) => {
    const start = Date.now()
    await sock.sendMessage(from, { text: '⚡ ...' })
    const ping = Date.now() - start

    await sock.sendMessage(from, {
        text: `┌──────────────────────┐
├────( ⚡ P I N G )
│
│  システム応答時間
│  _System response time…_
│  系统响应时间
│
├──────────────────────┤
│
│ 🏓 Ping   : *${ping}ms*
│ 🟢 Status : *Online*
│ ⚡ Bot    : *Noxtalis*
│
└──────────────────────┘
_${SIGN}_`
    })
}
