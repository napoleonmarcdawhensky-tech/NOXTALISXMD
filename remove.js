const { SIGNATURE } = require('../config/settings')

module.exports = async ({ sock, from, msg, args, isGroup, isOwner }) => {
    if (!isGroup) return await sock.sendMessage(from, { text: '⚠️ _Groupe seulement._' })

    const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid || []
    if (!mentioned.length) return await sock.sendMessage(from, { text: '⚠️ Mentionne un membre. Ex: *.remove @user*' })

    for (const user of mentioned) {
        await sock.groupParticipantsUpdate(from, [user], 'remove')
    }
    const tags = mentioned.map(m => `@${m.replace('@s.whatsapp.net','')}`).join(' ')
    await sock.sendMessage(from, {
        text: `┌──────────────────────┐
├────( ➖ R E M O V E )
│
│  排除完了…
│  _Member removed…_
│  成员已移除…
│
├──────────────────────┤
│ ✅ *${tags}* retiré !
└──────────────────────┘
${SIGNATURE}`,
        mentions: mentioned
    })
}
