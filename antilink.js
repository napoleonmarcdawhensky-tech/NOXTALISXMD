const { SIGNATURE } = require('../config/settings')

module.exports = async ({ sock, from, args, isGroup, isOwner }) => {
    if (!isGroup) return await sock.sendMessage(from, { text: '⚠️ _Groupe seulement._' })

    const action = args[0]?.toLowerCase()

    if (action === 'on') {
        global.antilinkGroups = global.antilinkGroups || new Map()
        global.antilinkGroups.set(from, true)
        await sock.sendMessage(from, {
            text: `┌──────────────────────┐
├────( 🔗 A N T I L I N K )
│
│  リンク禁止モード有効…
│  _Antilink enabled…_
│  防链接模式已启用…
│
├──────────────────────┤
│ ✅ *Antilink activé !*
│ ⚠️ 3 warns → kick auto
└──────────────────────┘
${SIGNATURE}`
        })
    } else if (action === 'off') {
        global.antilinkGroups?.delete(from)
        await sock.sendMessage(from, {
            text: `┌──────────────────────┐
├────( 🔗 A N T I L I N K )
│
│  リンク禁止モード無効…
│  _Antilink disabled…_
│  防链接模式已禁用…
│
├──────────────────────┤
│ ❌ *Antilink désactivé.*
└──────────────────────┘
${SIGNATURE}`
        })
    } else {
        await sock.sendMessage(from, {
            text: `┌──────────────────────┐
├────( 🔗 A N T I L I N K )
│
│ Usage: *.antilink on/off*
│
└──────────────────────┘
${SIGNATURE}`
        })
    }
}
