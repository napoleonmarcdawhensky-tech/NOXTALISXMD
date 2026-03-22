const { SIGN, SIGN_JP, SIGN_CN } = require('../config/settings')

// Signature universelle bas de message
const sig = () => `\n└──────────────────────┘\n_${SIGN}_\n_${SIGN_JP}_`

// Réponse avec image + texte
const sendImg = async (sock, from, url, caption, mentions = []) => {
    try {
        await sock.sendMessage(from, { image: { url }, caption, mentions })
    } catch {
        await sock.sendMessage(from, { text: caption, mentions })
    }
}

// Réponse texte simple
const sendText = async (sock, from, text, mentions = []) => {
    await sock.sendMessage(from, { text, mentions })
}

// Check si owner
const isOwner = (senderNumber, ownerNumber) => {
    const clean = (n) => n?.replace(/[^0-9]/g, '')
    return clean(senderNumber) === clean(ownerNumber)
}

module.exports = { sig, sendImg, sendText, isOwner }
