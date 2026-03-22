const { SIGNATURE } = require('../config/settings')

module.exports = async ({ sock, from, isGroup, isOwner, groupMembers, sender }) => {
    if (!isGroup) return await sock.sendMessage(from, { text: '⚠️ _Groupe seulement._' })

    await sock.sendMessage(from, {
        text: `┌──────────────────────┐
├────( ☢️ K I C K  A L L )
│
│  全員排除開始…
│  _Eliminating everyone…_
│  清除所有人…
│
└──────────────────────┘`
    })

    const toKick = groupMembers
        .filter(m => m.id !== sender && m.admin !== 'superadmin')
        .map(m => m.id)

    for (const user of toKick) {
        try {
            await sock.groupParticipantsUpdate(from, [user], 'remove')
            await new Promise(r => setTimeout(r, 500))
        } catch {}
    }

    await sock.sendMessage(from, {
        text: `┌──────────────────────┐
├────( ☢️ K I C K  A L L )
│
│  完了…任務達成…
│  _Mission complete…_
│  任务完成…
│
├──────────────────────┤
│ ✅ *${toKick.length} membres expulsés*
└──────────────────────┘
${SIGNATURE}`
    })
}
