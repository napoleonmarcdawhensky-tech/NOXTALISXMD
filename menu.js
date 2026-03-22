const { PREFIX, OWNER_NAME, IMAGES, JP_QUOTE } = require('../config/settings')

module.exports = async ({ sock, from, sender, senderNumber, msg }) => {
    // Récupérer le nom de la personne
    const pushName = msg.pushName || senderNumber

    const text = `┌──────────────────────┐
├────( ⚡ N O X T A L I S )
│
│  私は楽しみのために殺さない
│  _I don't kill for pleasure…_
│  我不是为了乐趣而杀戮
│
├──────────────────────┤
│
│ ⛩️ SYSTEM   : Node.js
│ 🖤 DEV      : ${OWNER_NAME}
│ 👤 USER     : *${pushName}*
│ ⚡ PREFIX   : ${PREFIX}
│ 🌍 PLATFORM : Linux
│ 🕐 RUNTIME  : Node.js v20.x
│ 🌐 MODE     : public
│
└──────────────────────┘

_⚡ NOXTALIS · ONLINE…_
🖤 *Dev · ${OWNER_NAME}*`

    await sock.sendMessage(from, {
        image: { url: IMAGES.MENU },
        caption: text,
        mentions: [sender],
        buttons: [
            { buttonId: `${PREFIX}mainmenu`, buttonText: { displayText: '🧬 MAIN MENU' }, type: 1 },
            { buttonId: `${PREFIX}bugmenu`, buttonText: { displayText: '☣️ BUG MENU' }, type: 1 },
            { buttonId: `${PREFIX}menu`, buttonText: { displayText: '↩ BACK TO MENU' }, type: 1 }
        ],
        headerType: 1
    })
}
