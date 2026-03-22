const { SIGN, IMG } = require('../config/settings')

module.exports = async ({ sock, from }) => {
    const caption = `┌──────────────────────┐
├────( ☣️ B U G  M E N U )
│
│  崩壊プロトコル起動中
│  _Crash Protocol Loading…_
│  崩溃协议加载中…
│
├──────────────────────┤
│
│ 💀 *CRASH*
│ › .crash › .hardcrash
│ › .crashv2 › .nuke
│
│ ⏳ *DELAY*
│ › .delay › .delayhard
│ › .delayinvis › .freeze
│ › .lagshot › .delayloop
│
│ 👻 *INVISIBLE*
│ › .blankinvis › .blankclick
│ › .ghostmsg › .voidmsg
│
│ 🎯 *EMOJI BUG*
│ › .xbug🎯 › .xbug🌹
│ › .xbug💀 › .xbug👾
│ › .xbug🤖 › .xbug🦠
│
│ 👥 *GROUP BUG*
│ › .groupxbug › .xgroup
│ › .crashgroup › .delaygc
│ › .blankgc
│
│ 🔇 *NET*
│ › .net30 › .netlag
│ › .disconnect › .timeout
│
└──────────────────────┘
_死を招く — Shi wo maneku_
_⚡ NOXTALIS · CRASH MODE…_
_${SIGN}_`

    await sock.sendMessage(from, {
        image: { url: IMG.BUG_MENU },
        caption
    })
}
