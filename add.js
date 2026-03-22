const { SIGNATURE } = require('../config/settings')

module.exports = async ({ sock, from, args, isGroup, isOwner }) => {
    if (!isGroup) return await sock.sendMessage(from, { text: '⚠️ _Groupe seulement._' })
    if (!args[0]) return await sock.sendMessage(from, { text: `⚠️ Usage: *.add +15141234567*` })

    const number = args[0].replace(/\D/g, '') + '@s.whatsapp.net'
    try {
        await sock.groupParticipantsUpdate(from, [number], 'add')
        await sock.sendMessage(from, {
            text: `┌──────────────────────┐
├────( ➕ A D D )
│
│  追加完了…
│  _Member added…_
│  成员已添加…
│
├──────────────────────┤
│ ✅ *+${args[0].replace(/\D/g,'')}* ajouté !
└──────────────────────┘
${SIGNATURE}`
        })
    } catch {
        await sock.sendMessage(from, { text: '❌ Impossible d\'ajouter ce numéro.' })
    }
}
