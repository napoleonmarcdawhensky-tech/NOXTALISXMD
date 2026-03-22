const { SIGNATURE } = require('../config/settings')

module.exports = async ({ sock, from, msg, isGroup, isOwner, groupMembers }) => {
    if (!isGroup) return await sock.sendMessage(from, { text: '⚠️ _Groupe seulement._' })

    const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid || []
    if (!mentioned.length) return await sock.sendMessage(from, { text: '⚠️ _Mentionne un membre. Ex: .promote @user_' })

    for (const user of mentioned) {
        await sock.groupParticipantsUpdate(from, [user], 'promote')
    }

    const tags = mentioned.map(m => `@${m.replace('@s.whatsapp.net', '')}`).join(' ')

    await sock.sendMessage(from, {
        text: `┌──────────────────────┐
├────( 👑 P R O M O T E )
│
│  昇格が完了…
│  _Promotion complete…_
│  晋升完成…
│
├──────────────────────┤
│ ✅ *Promu en admin :*
│ ${tags}
└──────────────────────┘
${SIGNATURE}`,
        mentions: mentioned
    })
}
