const { OWNER_NAME, TELEGRAM_OWNER_LINK, SIGNATURE } = require('../config/settings')

module.exports = async ({ sock, from }) => {
    const ownerNumber = '50943768238'
    const ownerJid = `${ownerNumber}@s.whatsapp.net`

    await sock.sendMessage(from, {
        text: `┌──────────────────────┐
├────( 👑 O W N E R )
│
│  創造者への連絡…
│  _Contact the creator…_
│  联系创造者…
│
├──────────────────────┤
│ 🖤 *${OWNER_NAME}*
│ ⚡ Creator of Noxtalis
│ 📲 ${TELEGRAM_OWNER_LINK}
│ 📱 @${ownerNumber}
└──────────────────────┘

${SIGNATURE}`,
        mentions: [ownerJid]
    })

    // Envoyer aussi le contact directement
    await sock.sendMessage(from, {
        contacts: {
            displayName: OWNER_NAME,
            contacts: [{
                vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:${OWNER_NAME}\nTEL;type=CELL;type=VOICE;waid=${ownerNumber}:+${ownerNumber}\nEND:VCARD`
            }]
        }
    })
}
