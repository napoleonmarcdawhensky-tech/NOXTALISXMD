const { SIGNATURE } = require('../config/settings')

module.exports = async ({ sock, from, msg, isGroup, isOwner }) => {
    if (!isGroup) return await sock.sendMessage(from, { text: '⚠️ _Groupe seulement._' })

    const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid || []
    if (!mentioned.length) return await sock.sendMessage(from, { text: '⚠️ _Mentionne un membre._' })

    const tags = mentioned.map(m => `@${m.replace('@s.whatsapp.net', '')}`).join(' ')

    for (const user of mentioned) {
        await sock.groupParticipantsUpdate(from, [user], 'remove')
    }

    await sock.sendMessage(from, {
        text: `┌──────────────────────┐
├────( 🦵 K I C K )
│
│  排除が完了…
│  _Target eliminated…_
│  目标已清除…
│
├──────────────────────┤
│ ✅ *Expulsé :*
│ ${tags}
└──────────────────────┘
${SIGNATURE}`,
        mentions: mentioned
    })
}
