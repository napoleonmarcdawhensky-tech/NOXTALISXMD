const { SIGNATURE } = require('../config/settings')

module.exports = async ({ sock, from, isOwner, args }, command) => {
    if (!isOwner) return await sock.sendMessage(from, {
        text: `┌──────────────────────┐
├────( ⛔ A C C E S S )
│
│ ❌ *ACCÈS REFUSÉ*
│ _Owner only…_
└──────────────────────┘
${SIGNATURE}`
    })

    if (command === 'self') {
        global.botMode = 'self'
        await sock.sendMessage(from, {
            text: `┌──────────────────────┐
├────( 🔒 M O D E )
│
│  自己モード有効…
│  _Self mode enabled…_
│  自我模式已启用…
│
├──────────────────────┤
│ ✅ Mode : *SELF*
│ _Seul le owner peut utiliser_
└──────────────────────┘
${SIGNATURE}`
        })
    } else if (command === 'public') {
        global.botMode = 'public'
        await sock.sendMessage(from, {
            text: `┌──────────────────────┐
├────( 🌍 M O D E )
│
│  パブリックモード有効…
│  _Public mode enabled…_
│  公共模式已启用…
│
├──────────────────────┤
│ ✅ Mode : *PUBLIC*
│ _Tout le monde peut utiliser_
└──────────────────────┘
${SIGNATURE}`
        })
    }
}
