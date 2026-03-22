const { IMAGES, SIGNATURE } = require('../config/settings')

module.exports = async ({ sock, from, isGroup, groupMetadata, groupMembers, isOwner }) => {
    if (!isGroup) return await sock.sendMessage(from, { text: '⚠️ _Groupe seulement._' })

    const mentions = groupMembers.map(m => m.id)
    const tags = mentions.map(m => `@${m.replace('@s.whatsapp.net', '')}`).join(' ')
    const groupName = groupMetadata.subject
    const total = groupMembers.length
    const images = [IMAGES.TAGALL_1, IMAGES.TAGALL_2, IMAGES.TAGALL_3]
    const randomImg = images[Math.floor(Math.random() * images.length)]

    await sock.sendMessage(from, {
        image: { url: randomImg },
        caption: `┌──────────────────────┐
├────( 📢 T A G  A L L )
│
│  全員集合せよ…
│  _Everyone, gather now…_
│  所有人，现在集合…
│
├──────────────────────┤
│
│ 🏠 Groupe : *${groupName}*
│ 👥 Membres : *${total}*
│
│ ${tags}
│
└──────────────────────┘

${SIGNATURE}`,
        mentions
    })
}
