const { SIGNATURE, OWNER_NAME } = require('../config/settings')
const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys')

module.exports = async ({ sock, from, args, senderNumber }) => {
    let number = args[0]

    if (!number) return await sock.sendMessage(from, {
        text: `┌──────────────────────┐
├────( 🔗 P A I R )
│
│ ⚠️ Usage: *.pair +1234567890*
│ _Inclus le code pays_
│
└──────────────────────┘
${SIGNATURE}`
    })

    // Validation du numéro
    const cleanNumber = number.replace(/\D/g, '')
    if (cleanNumber.length < 10 || cleanNumber.length > 15) {
        return await sock.sendMessage(from, {
            text: `┌──────────────────────┐
├────( ⚠️ E R R O R )
│
│  番号が無効です…
│  _Invalid number format…_
│  号码格式无效…
│
├──────────────────────┤
│ ❌ *Numéro invalide !*
│
│ ✅ Correct : *+15141234567*
│ ❌ Wrong   : *15141234567*
│ ❌ Wrong   : *+1514 123 4567*
│
│ _Inclus le + et le code pays_
│ _No spaces or dashes_
└──────────────────────┘
${SIGNATURE}`
        })
    }

    await sock.sendMessage(from, {
        text: `┌──────────────────────┐
├────( 🔗 P A I R )
│
│  コード生成中…
│  _Generating code…_
│  生成代码中…
│
└──────────────────────┘`
    })

    try {
        const code = await sock.requestPairingCode(cleanNumber)
        const formatted = code.match(/.{1,4}/g).join('-')

        await sock.sendMessage(from, {
            text: `┌──────────────────────┐
├────( ⚡ P A I R I N G )
│
│  鍵が生成された…
│  _The key has been forged…_
│  密钥已生成…
│
├──────────────────────┤
│
│ 🔑 *YOUR CODE :*
│
│  ❯❯  *${formatted}*
│
│ ⏳ _Expires in 60 seconds_
│
└──────────────────────┘

┌──────────────────────┐
├────( 📖 T U T O R I A L )
│
│ *STEP 1* 📱
│ › Ouvre *WhatsApp*
│
│ *STEP 2* ⚙️
│ › Va dans *Paramètres*
│
│ *STEP 3* 🔗
│ › Clique *Appareils liés*
│
│ *STEP 4* ➕
│ › Clique *Lier un appareil*
│
│ *STEP 5* 🔑
│ › Clique *Lier avec numéro*
│ › _de téléphone_
│
│ *STEP 6* ✅
│ › Entre le code : *${formatted}*
│
└──────────────────────┘

⚠️ _Ne partage pas ce code…_
_秘密を守れ… Guard your secret…_

${SIGNATURE}`
        })
    } catch (err) {
        await sock.sendMessage(from, {
            text: `┌──────────────────────┐
├────( ⚠️ E R R O R )
│
│ ❌ Impossible de générer le code
│ _Vérifie le numéro et réessaie_
│
└──────────────────────┘
${SIGNATURE}`
        })
    }
}
