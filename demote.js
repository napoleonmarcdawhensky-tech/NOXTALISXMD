const { SIGNATURE } = require('../config/settings')

module.exports = async ({ sock, from, msg, isGroup, isOwner }) => {
    if (!isGroup) return await sock.sendMessage(from, { text: '⚠️ _Groupe seulement._' })

    const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid || []
    if (!mentioned.length) return await sock.sendMessage(from, { text: '⚠️ _Mentionne un membre._' })

    for (const user of mentioned) {
        await sock.groupParticipantsUpdate(from, [user], 'demote')
    }

    const tags = mentioned.map(m => `@${m.replace('@s.whatsapp.net', '')}`).join(' ')

    await sock.sendMessage(from, {
        text: `┌──────────────────────┐
├────( 📉 D E M O T E )
│
│  降格が完了…
│  _Demotion complete…_
│  降级完成…
│
├──────────────────────┤
│ ✅ *Retiré des admins :*
│ ${tags}
└──────────────────────┘
${SIGNATURE}`,
        mentions: mentioned
    })
}
