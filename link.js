const { SIGNATURE } = require('../config/settings')

module.exports = async ({ sock, from, isGroup, isOwner }) => {
    if (!isGroup) return await sock.sendMessage(from, { text: '⚠️ _Groupe seulement._' })

    const code = await sock.groupInviteCode(from)
    const groupMeta = await sock.groupMetadata(from)

    await sock.sendMessage(from, {
        text: `┌──────────────────────┐
├────( 🔗 L I N K )
│
│  グループリンク…
│  _Group invite link…_
│  群组邀请链接…
│
├──────────────────────┤
│ 🏠 *${groupMeta.subject}*
│
│ 🔗 https://chat.whatsapp.com/${code}
│
└──────────────────────┘
${SIGNATURE}`
    })
}
