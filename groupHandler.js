const { IMAGES, SIGNATURE } = require('../config/settings')

async function handleGroupUpdate(sock, update) {
    try {
        const { id, participants, action } = update

        // ============================================
        // GOODBYE
        // ============================================
        if (action === 'remove' && global.goodbyeGroups?.get(id)) {
            const groupMeta = await sock.groupMetadata(id)
            const groupName = groupMeta.subject
            const totalMembers = groupMeta.participants.length

            for (const participant of participants) {
                const number = participant.replace('@s.whatsapp.net', '')
                await sock.sendMessage(id, {
                    image: { url: IMAGES.GOODBYE },
                    caption: `┌──────────────────────┐
├────( 👋 G O O D B Y E )
│
│  また会う日まで…
│  _Until we meet again…_
│  再见，直到我们再次相遇
│
├──────────────────────┤
│ 👤 @${number} a quitté
│ 📱 +${number}
│
│  一人の戦士が去った…
│  _A warrior has left…_
│
├──────────────────────┤
│ 👥 Membres : *${totalMembers}*
│ 🏠 Groupe  : *${groupName}*
└──────────────────────┘
${SIGNATURE}`,
                    mentions: [participant]
                })
            }
        }

        // ============================================
        // ANTIREGION — Kick dès que le num rejoint
        // ============================================
        if (action === 'add') {
            const blockedCodes = global.antiregionGroups?.get(id)
            if (!blockedCodes || !blockedCodes.length) return

            for (const participant of participants) {
                const number = participant.replace('@s.whatsapp.net', '')
                const isBlocked = blockedCodes.some(code => number.startsWith(code))

                if (isBlocked) {
                    await sock.groupParticipantsUpdate(id, [participant], 'remove')
                    await sock.sendMessage(id, {
                        text: `┌──────────────────────┐
├────( 🌍 A N T I R E G I O N )
│
│  地域制限…
│  _Region blocked…_
│  地区已封锁…
│
├──────────────────────┤
│ 🚫 *+${number}* kické !
│ _Région non autorisée_
└──────────────────────┘
${SIGNATURE}`
                    })
                }
            }
        }

    } catch (err) {
        console.error('⚠️ GroupHandler error:', err)
    }
}

module.exports = { handleGroupUpdate }
