const { Telegraf, Markup } = require('telegraf')
const { TELEGRAM_TOKEN, TELEGRAM_OWNER_ID, WA_GROUP, WA_CHANNEL, TELEGRAM_OWNER_LINK, OWNER_NAME, BOT_NAME } = require('../config/settings')

const sessions = new Map()

function startTelegramBot() {
    if (!TELEGRAM_TOKEN || TELEGRAM_TOKEN === 'METS_TON_TOKEN_ICI') {
        console.log('⚠️ TELEGRAM_TOKEN manquant dans .env')
        return
    }

    const bot = new Telegraf(TELEGRAM_TOKEN)

    async function showMainMenu(ctx) {
        await ctx.replyWithPhoto({ url: 'https://files.catbox.moe/ruwxgu.jpg' }, {
            caption: `┌──────────────────────┐\n├────( ⚡ N O X T A L I S )\n│\n│  私は楽しみのために殺さない\n│  I don't kill for pleasure…\n│\n├──────────────────────┤\n│\n⚙️ CONTROL PANEL\n│ 🟢 Status   : Online\n│ 🔗 Mode     : Bailey Pairing\n│ 🌍 Platform : Node.js\n│\n│ ⚡ /start    → Ce menu\n│ 🔗 /pair     → Connecter WhatsApp\n│ 📡 /status   → Vérifier connexion\n│ 🗑️ /delete   → Supprimer session\n│ 👑 /owner    → Contacter le dev\n│ 📋 /listpair → Liste 🔒\n│\n└──────────────────────┘\n\n🖤 *Dev · ${OWNER_NAME}*`,
            parse_mode: 'Markdown',
            ...Markup.inlineKeyboard([
                [Markup.button.callback('🔗 Link WhatsApp', 'do_pair')],
                [Markup.button.callback('📡 My Status', 'do_status'), Markup.button.callback('🗑️ Delete Session', 'do_delete')],
                [Markup.button.url('👑 Owner', TELEGRAM_OWNER_LINK)]
            ])
        })
    }

    bot.start(async (ctx) => {
        const userId = ctx.from.id.toString()
        if (!sessions.get(`joined_${userId}`)) {
            await ctx.replyWithPhoto({ url: 'https://files.catbox.moe/ruwxgu.jpg' }, {
                caption: `┌──────────────────────┐\n├────( ⚡ N O X T A L I S )\n│\n│  私は楽しみのために殺さない\n│\n├──────────────────────┤\n│\n│ ⚠️ *AVANT DE CONTINUER*\n│\n│ Rejoins d'abord :\n│ 📢 Notre Channel WhatsApp\n│ 👥 Notre Groupe WhatsApp\n│\n│ _Puis clique VERIFY_\n│\n└──────────────────────┘\n\n🖤 *Dev · ${OWNER_NAME}*`,
                parse_mode: 'Markdown',
                ...Markup.inlineKeyboard([
                    [Markup.button.url('📢 Rejoindre le Channel', WA_CHANNEL)],
                    [Markup.button.url('👥 Rejoindre le Groupe', WA_GROUP)],
                    [Markup.button.callback('✅ J\'ai rejoint — VERIFY', 'verify')]
                ])
            })
        } else {
            await showMainMenu(ctx)
        }
    })

    bot.action('verify', async (ctx) => {
        const userId = ctx.from.id.toString()
        sessions.set(`joined_${userId}`, true)
        await ctx.answerCbQuery('✅ Vérifié !')
        await showMainMenu(ctx)
    })

    async function askNumber(ctx) {
        const userId = ctx.from.id.toString()
        sessions.set(`waiting_${userId}`, true)
        await ctx.reply(`┌──────────────────────┐\n├────( 🔗 P A I R )\n│\n│  番号を入力してください…\n│  Enter your number…\n│\n├──────────────────────┤\n│ 📱 Format : *+15141234567*\n│ _Avec le + et code pays_\n└──────────────────────┘`, { parse_mode: 'Markdown' })
    }

    bot.command('pair', askNumber)
    bot.action('do_pair', async (ctx) => { await ctx.answerCbQuery(); await askNumber(ctx) })

    bot.on('text', async (ctx) => {
        const userId = ctx.from.id.toString()
        const text = ctx.message.text
        if (text.startsWith('/')) return
        if (!sessions.get(`waiting_${userId}`)) return

        const cleanNumber = text.replace(/\D/g, '')
        if (cleanNumber.length < 10 || cleanNumber.length > 15) {
            return await ctx.reply(`┌──────────────────────┐\n├────( ⚠️ E R R O R )\n│\n│ ❌ *Format invalide !*\n│ ✅ Correct : +15141234567\n│ ❌ Wrong   : 15141234567\n└──────────────────────┘`, { parse_mode: 'Markdown' })
        }

        sessions.delete(`waiting_${userId}`)
        await ctx.reply('⚡ _Génération du code…_', { parse_mode: 'Markdown' })

        try {
            // ➜ Remplace 'XXXX-XXXX' par: const code = await global.sock.requestPairingCode(cleanNumber)
            const rawCode = 'XXXXXXXX'
            const code = rawCode.match(/.{1,4}/g).join('-')

            sessions.set(`session_${userId}`, { number: cleanNumber, date: new Date().toLocaleDateString() })

            await ctx.replyWithPhoto({ url: 'https://files.catbox.moe/sh8dec.jpg' }, {
                caption: `┌──────────────────────┐\n├────( ⚡ P A I R I N G )\n│\n│  鍵が生成された…\n│  The key has been forged…\n│  密钥已生成…\n│\n├──────────────────────┤\n│\n│ 🔑 YOUR CODE :\n│\n│  ❯❯  *${code}*\n│\n│ ⏳ Expire dans 60s\n│\n└──────────────────────┘\n\n┌──────────────────────┐\n├────( 📖 T U T O R I A L )\n│\n│ STEP 1 📱 Ouvre WhatsApp\n│ STEP 2 ⚙️ Paramètres\n│ STEP 3 🔗 Appareils liés\n│ STEP 4 ➕ Lier un appareil\n│ STEP 5 🔑 Lier avec numéro\n│ STEP 6 ✅ Entre : *${code}*\n│\n└──────────────────────┘\n\n⚠️ Ne partage pas ce code…\n秘密を守れ…\n\n🖤 *Dev · ${OWNER_NAME}*`,
                parse_mode: 'Markdown'
            })
        } catch (err) {
            await ctx.reply('❌ Erreur. Réessaie avec /pair', { parse_mode: 'Markdown' })
        }
    })

    bot.command('status', async (ctx) => {
        const userId = ctx.from.id.toString()
        const s = sessions.get(`session_${userId}`)
        if (!s) return await ctx.reply('❌ Aucune session. Utilise /pair', { parse_mode: 'Markdown' })
        await ctx.reply(`┌──────────────────────┐\n├────( 📡 S T A T U S )\n│\n│ 🟢 Status : *Active*\n│ 📱 Numéro : *+${s.number}*\n│ 🕐 Paired : *${s.date}*\n└──────────────────────┘\n\n🖤 *Dev · ${OWNER_NAME}*`, { parse_mode: 'Markdown' })
    })

    bot.action('do_status', async (ctx) => {
        await ctx.answerCbQuery()
        const userId = ctx.from.id.toString()
        const s = sessions.get(`session_${userId}`)
        if (!s) return await ctx.reply('❌ Aucune session.', { parse_mode: 'Markdown' })
        await ctx.reply(`🟢 *Active* · +${s.number} · ${s.date}`, { parse_mode: 'Markdown' })
    })

    bot.command('delete', async (ctx) => {
        const userId = ctx.from.id.toString()
        sessions.delete(`session_${userId}`)
        await ctx.reply(`┌──────────────────────┐\n├────( 🗑️ D E L E T E )\n│\n│ ✅ Session supprimée !\n└──────────────────────┘\n\n🖤 *Dev · ${OWNER_NAME}*`, { parse_mode: 'Markdown' })
    })

    bot.action('do_delete', async (ctx) => {
        await ctx.answerCbQuery('🗑️ Supprimée')
        const userId = ctx.from.id.toString()
        sessions.delete(`session_${userId}`)
        await ctx.reply('✅ Session supprimée.', { parse_mode: 'Markdown' })
    })

    bot.command('owner', async (ctx) => {
        await ctx.reply(`┌──────────────────────┐\n├────( 👑 O W N E R )\n│\n│ 🖤 *${OWNER_NAME}*\n│ ⚡ Creator of ${BOT_NAME}\n│ 📲 ${TELEGRAM_OWNER_LINK}\n└──────────────────────┘`, { parse_mode: 'Markdown' })
    })

    bot.command('listpair', async (ctx) => {
        const userId = ctx.from.id.toString()
        if (userId !== TELEGRAM_OWNER_ID) {
            return await ctx.reply(`┌──────────────────────┐\n├────( ⛔ A C C E S S )\n│\n│  ここに来るべきではない…\n│  You were not meant to be here…\n│\n│ ❌ *ACCÈS REFUSÉ*\n└──────────────────────┘`, { parse_mode: 'Markdown' })
        }
        const all = []
        for (const [key, val] of sessions.entries()) {
            if (key.startsWith('session_')) all.push(val)
        }
        if (!all.length) return await ctx.reply('📋 Aucune session active.')
        let list = `┌──────────────────────┐\n├────( 📋 L I S T  P A I R )\n│\n`
        all.forEach((s, i) => { list += `│ ❯ #${i+1} · +${s.number} · ${s.date}\n` })
        list += `│\n│ 📊 Total : *${all.length}*\n└──────────────────────┘\n\n🖤 *Dev · ${OWNER_NAME}*`
        await ctx.reply(list, { parse_mode: 'Markdown' })
    })

    bot.launch()
    console.log(`⚡ Telegram ${BOT_NAME} · Online`)
    process.once('SIGINT', () => bot.stop('SIGINT'))
    process.once('SIGTERM', () => bot.stop('SIGTERM'))
}

module.exports = { startTelegramBot }
