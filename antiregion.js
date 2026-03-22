const { SIGNATURE } = require('../config/settings')

module.exports = async ({ sock, from, args, isGroup, isOwner }) => {
    if (!isGroup) return await sock.sendMessage(from, { text: '⚠️ _Groupe seulement._' })

    const action = args[0]?.toLowerCase()
    global.antiregionGroups = global.antiregionGroups || new Map()

    if (action === 'on') {
        const codes = args.slice(1)
        if (!codes.length) return await sock.sendMessage(from, {
            text: `┌──────────────────────┐
├────( 🌍 A N T I R E G I O N )
│
│ ⚠️ Usage:
│ *.antiregion on 33 1 44*
│ _Bloque +33 +1 +44_
│
└──────────────────────┘
${SIGNATURE}`
        })

        global.antiregionGroups.set(from, codes)
        await sock.sendMessage(from, {
            text: `┌──────────────────────┐
├────( 🌍 A N T I R E G I O N )
│
│  地域制限有効…
│  _Region block enabled…_
│  地区封锁已启用…
│
├──────────────────────┤
│ ✅ *Antiregion activé !*
│ 🚫 Bloqués : *+${codes.join(', +')}*
│ ⚡ Kick auto dès l'entrée
└──────────────────────┘
${SIGNATURE}`
        })
    } else if (action === 'off') {
        global.antiregionGroups.delete(from)
        await sock.sendMessage(from, {
            text: `┌──────────────────────┐
├────( 🌍 A N T I R E G I O N )
│
│ ❌ *Antiregion désactivé.*
└──────────────────────┘
${SIGNATURE}`
        })
    } else if (action === 'list') {
        const codes = global.antiregionGroups.get(from)
        if (!codes) return await sock.sendMessage(from, { text: '⚠️ _Aucune région bloquée._' })
        await sock.sendMessage(from, {
            text: `┌──────────────────────┐
├────( 🌍 R É G I O N S  B L O Q U É E S )
│
│ 🚫 *+${codes.join('\n│ 🚫 +')}*
│
└──────────────────────┘
${SIGNATURE}`
        })
    } else {
        await sock.sendMessage(from, {
            text: `┌──────────────────────┐
├────( 🌍 A N T I R E G I O N )
│
│ *.antiregion on 33 1 44*
│ *.antiregion off*
│ *.antiregion list*
│
└──────────────────────┘
${SIGNATURE}`
        })
    }
}
