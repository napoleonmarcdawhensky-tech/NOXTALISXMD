const { SIGN, IMG, PREFIX } = require('../config/settings')

module.exports = async ({ sock, from }) => {
    const caption = `┌──────────────────────┐
├────( ⚡ M A I N  M E N U )
│
│  殺し屋のコマンド一覧
│  _Commands of the Assassin_
│  刺客的命令列表
│
├──────────────────────┤
│
│ 🤖 *BOT*
│ › .ping › .uptime › .owner
│ › .prefix › .stats › .runtime
│
│ 👥 *GROUP*
│ › .promote › .demote › .kick
│ › .kickall › .tagall › .list
│ › .add › .remove › .link
│ › .open › .close › .setname
│ › .goodbye on/off
│
│ 🎵 *MEDIA*
│ › .play › .video › .sticker
│ › .toimg › .gif › .tiktok
│ › .youtube › .spotify
│
│ 🧬 *AI*
│ › .ai › .gpt › .imagine
│ › .translate › .define › .wiki
│
│ 🔗 *PAIR*
│ › .pair [numéro avec indicatif]
│
│ 🛠️ *TOOLS*
│ › .menu › .help › .qr
│ › .weather › .calc › .id
│
└──────────────────────┘
_⚡ NOXTALIS · 45 cmds · Online_
_${SIGN}_`

    await sock.sendMessage(from, {
        image: { url: IMG.MAIN_MENU },
        caption
    })
}
