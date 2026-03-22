const { SIGNATURE } = require('../config/settings')
const { downloadMediaMessage } = require('@whiskeysockets/baileys')

module.exports = async ({ sock, msg, from, sender, senderNumber }) => {
    const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage
    if (!quoted) return await sock.sendMessage(from, {
        text: `┌──────────────────────┐
├────( 📸 V V 2 )
│
│ ⚠️ *Reply sur une photo/vidéo*
│ _vue unique pour utiliser .vv2_
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
        const fakeMsg = {
            message: quoted.viewOnceMessage?.message ||
                     quoted.viewOnceMessageV2?.message ||
                     quoted
        }

        const buffer = await downloadMediaMessage(
            fakeMsg,
            'buffer',
            {},
            { logger: { info: () => {}, error: () => {}, warn: () => {} }, reuploadRequest: sock.updateMediaMessage }
        )

        // Envoyer dans le DM de CELUI QUI A FAIT .vv2
        const userJid = `${senderNumber}@s.whatsapp.net`

        if (isImage) {
            await sock.sendMessage(userJid, {
                image: buffer,
                caption: `┌──────────────────────┐
├────( 📸 V V 2  C A P T U R E D )
│
│  秘密を捕らえた…
│  _Secret captured…_
│  秘密已捕获…
│
└──────────────────────┘
${SIGNATURE}`
            })
        } else {
            await sock.sendMessage(userJid, {
                video: buffer,
                caption: `┌──────────────────────┐
├────( 🎥 V V 2  C A P T U R E D )
│
│  秘密を捕らえた…
│  _Secret captured…_
│  秘密已捕获…
│
└──────────────────────┘
${SIGNATURE}`
            })
        }

        await sock.sendMessage(from, {
            text: `┌──────────────────────┐
├────( 📸 V V 2 )
│
│  捕獲成功…
│  _Captured…_
│
│ ✅ *Envoyé dans ton DM*
└──────────────────────┘
${SIGNATURE}`
        })

    } catch (err) {
        await sock.sendMessage(from, { text: '❌ Erreur capture. Réessaie.' })
        console.error('VV2 error:', err)
    }
}
