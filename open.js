const { SIGNATURE } = require('../config/settings')

module.exports = async ({ sock, from, isGroup, isOwner }) => {
    if (!isGroup) return await sock.sendMessage(from, { text: '⚠️ _Groupe seulement._' })

    await sock.groupSettingUpdate(from, 'not_announcement')
    await sock.sendMessage(from, {
        text: `┌──────────────────────┐
├────( 🔓 O P E N )
│
│  グループ開放…
│  _Group opened…_
│  群组已开放…
│
├──────────────────────┤
│ ✅ *Groupe ouvert !*
│ _Tous peuvent envoyer_
└──────────────────────┘
${SIGNATURE}`
    })
}
