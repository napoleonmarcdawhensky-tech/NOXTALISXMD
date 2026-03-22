const { SIGNATURE } = require('../config/settings')

module.exports = async ({ sock, from, args, isGroup, isOwner }) => {
    if (!isGroup) return await sock.sendMessage(from, { text: '⚠️ _Groupe seulement._' })

    const action = args[0]?.toLowerCase()

    if (action === 'on') {
        global.goodbyeGroups.set(from, true)
        await sock.sendMessage(from, {
            text: `┌──────────────────────┐
├────( 👋 G O O D B Y E )
│
│  さようならモード有効…
│  _Goodbye mode enabled…_
│  再见模式已启用…
│
├──────────────────────┤
│ ✅ *Goodbye activé !*
│ _Les départs seront notifiés._
└──────────────────────┘
${SIGNATURE}`
        })
    } else if (action === 'off') {
        global.goodbyeGroups.delete(from)
        await sock.sendMessage(from, {
            text: `┌──────────────────────┐
├────( 👋 G O O D B Y E )
│
│  さようならモード無効…
│  _Goodbye mode disabled…_
│  再见模式已禁用…
│
├──────────────────────┤
│ ❌ *Goodbye désactivé.*
└──────────────────────┘
${SIGNATURE}`
        })
    } else {
        await sock.sendMessage(from, {
            text: `┌──────────────────────┐
├────( 👋 G O O D B Y E )
│
│ Usage: *.goodbye on* / *.goodbye off*
│
└──────────────────────┘
${SIGNATURE}`
        })
    }
}
