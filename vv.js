const { SIGNATURE, OWNER_NUMBER } = require('../config/settings')
const { downloadMediaMessage } = require('@whiskeysockets/baileys')

module.exports = async ({ sock, msg, from, sender, senderNumber, isOwner }) => {
    if (!isOwner) return await sock.sendMessage(from, {
        text: `┌──────────────────────┐
├────( ⛔ A C C E S S )
│
│  ここに来るべきではない…
│  _Owner only…_
│
│ ❌ *ACCÈS REFUSÉ*
└──────────────────────┘
${SIGNATURE}`
    })

    // Récupérer le message cité (reply)
    const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage
    if (!quoted) return await sock.sendMessage(from, {
        text: `┌──────────────────────┐
├────( 📸 V V )
│
│ ⚠️ *Reply sur une photo/vidéo*
│ _vue unique pour utiliser .vv_
│
└──────────────────────┘
${SIGNATURE}`
    })

    const isImage = quoted.viewOnceMessage?.message?.imageMessage ||
                    quoted.viewOnceMessageV2?.message?.imageMessage ||
                    quoted.imageMessage

    const isVideo = quoted.viewOnceMessage?.message?.videoMessage ||
                    quoted.viewOnceMessageV2?.message?.videoMessage ||
                    quoted.videoMessage

    if (!isImage && !isVideo) return await sock.sendMessage(from, {
        text: '⚠️ _Reply sur une image ou vidéo vue unique._'
    })

    try {
        // Construire le message pour télécharger
        const fakeMsg = {
            key: msg.message.extendedTextMessage.contextInfo.stanzaId
                ? { ...msg.key, id: msg.message.extendedTextMessage.contextInfo.stanzaId }
                : msg.key,
            message: quoted.viewOnceMessage?.message ||
                     quoted.viewOnceMessageV2?.message ||
                     quoted
        }

        const buffer = await downloadMediaMessage(
            { message: fakeMsg.message, key: fakeMsg.key },
            'buffer',
            {},
            { logger: { info: () => {}, error: () => {}, warn: () => {} }, reuploadRequest: sock.updateMediaMessage }
        )

        // Envoyer dans TON DM (owner)
        const ownerJid = `${OWNER_NUMBER.replace(/\D/g, '')}@s.whatsapp.net`

        if (isImage) {
            await sock.sendMessage(ownerJid, {
                image: buffer,
                caption: `┌──────────────────────┐
├────( 📸 V V  C A P T U R E D )
│
│  秘密を捕らえた…
│  _Secret captured…_
│  秘密已捕获…
│
├──────────────────────┤
│ 👤 De     : *@${senderNumber}*
│ 🏠 Groupe : *${from}*
└──────────────────────┘
${SIGNATURE}`
            })
        } else {
            await sock.sendMessage(ownerJid, {
                video: buffer,
                caption: `┌──────────────────────┐
├────( 🎥 V V  C A P T U R E D )
│
│  秘密を捕らえた…
│  _Secret captured…_
│  秘密已捕获…
│
├──────────────────────┤
│ 👤 De     : *@${senderNumber}*
│ 🏠 Groupe : *${from}*
└──────────────────────┘
${SIGNATURE}`
            })
        }

        // Confirmation discrète dans le chat
        await sock.sendMessage(from, {
            text: `┌──────────────────────┐
├────( 📸 V V )
│
│  捕獲成功…
│  _Captured successfully…_
│  捕获成功…
│
├──────────────────────┤
│ ✅ *Envoyé dans ton DM*
└──────────────────────┘
${SIGNATURE}`
        })

    } catch (err) {
        await sock.sendMessage(from, {
            text: `❌ Erreur capture. Réessaie.`
        })
        console.error('VV error:', err)
    }
}
