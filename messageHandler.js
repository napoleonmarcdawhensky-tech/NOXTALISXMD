const { getContentType } = require('@whiskeysockets/baileys')
const { PREFIX, OWNER_NUMBER, SIGNATURE } = require('../config/settings')

const menu = require('../commands/menu')
const mainMenu = require('../commands/mainMenu')
const bugMenu = require('../commands/bugMenu')
const ping = require('../commands/ping')
const owner = require('../commands/owner')
const tagall = require('../commands/tagall')
const play = require('../commands/play')
const goodbye = require('../commands/goodbye')
const promote = require('../commands/promote')
const demote = require('../commands/demote')
const kick = require('../commands/kick')
const kickall = require('../commands/kickall')
const pair = require('../commands/pair')
const bugCommands = require('../commands/bugCommands')
const antilink = require('../commands/antilink')
const antiregion = require('../commands/antiregion')
const add = require('../commands/add')
const remove = require('../commands/remove')
const link = require('../commands/link')
const open = require('../commands/open')
const close = require('../commands/close')
const vv = require('../commands/vv')
const vv2 = require('../commands/vv2')
const modeCmd = require('../commands/modeCmd')

global.antilinkGroups = global.antilinkGroups || new Map()
global.antiregionGroups = global.antiregionGroups || new Map()
global.warnMap = global.warnMap || new Map()
global.botMode = global.botMode || 'public'

const bugCmds = [
    'crash','hardcrash','crashv2','nuke',
    'delay','delayhard','delayinvis','freeze','lagshot','delayloop',
    'blankinvis','blankclick','ghostmsg','voidmsg',
    'xbug🎯','xbug🌹','xbug💀','xbug👾','xbug🤖','xbug🦠',
    'groupxbug','xgroup','crashgroup','delaygc','blankgc',
    'net30','netlag','disconnect','timeout'
]

async function handleMessage(sock, msg) {
    try {
        const from = msg.key.remoteJid
        const isGroup = from.endsWith('@g.us')
        const sender = isGroup ? msg.key.participant : msg.key.remoteJid
        const senderNumber = sender?.replace('@s.whatsapp.net', '')
        const isOwner = senderNumber === OWNER_NUMBER?.replace(/\D/g, '')
        const pushName = msg.pushName || senderNumber

        const type = getContentType(msg.message)
        const body =
            type === 'conversation' ? msg.message.conversation
            : type === 'extendedTextMessage' ? msg.message.extendedTextMessage?.text
            : type === 'imageMessage' ? msg.message.imageMessage?.caption
            : type === 'videoMessage' ? msg.message.videoMessage?.caption
            : ''

        // ============================================
        // MODE SELF — bloque tout sauf owner
        // ============================================
        if (global.botMode === 'self' && !isOwner) return

        // ============================================
        // ANTILINK
        // ============================================
        if (isGroup && !isOwner && global.antilinkGroups.get(from)) {
            const linkRegex = /(https?:\/\/|www\.|chat\.whatsapp\.com|t\.me\/)[^\s]*/i
            if (linkRegex.test(body)) {
                await sock.sendMessage(from, { delete: msg.key })
                const warnKey = `${from}_${senderNumber}`
                const warns = (global.warnMap.get(warnKey) || 0) + 1
                global.warnMap.set(warnKey, warns)

                if (warns >= 3) {
                    global.warnMap.delete(warnKey)
                    await sock.groupParticipantsUpdate(from, [sender], 'remove')
                    await sock.sendMessage(from, {
                        text: `┌──────────────────────┐
├────( 🔗 A N T I L I N K )
│
│ 💀 *${pushName}* kické !
│ ⚠️ 3/3 warns atteint
└──────────────────────┘
${SIGNATURE}`,
                        mentions: [sender]
                    })
                } else {
                    await sock.sendMessage(from, {
                        text: `┌──────────────────────┐
├────( ⚠️ W A R N I N G )
│
│ ⚠️ *${pushName}*
│ 🔢 Warn : *${warns}/3*
│ _${3 - warns} warn(s) avant kick_
└──────────────────────┘
${SIGNATURE}`,
                        mentions: [sender]
                    })
                }
                return
            }
        }

        if (!body?.startsWith(PREFIX)) return

        const args = body.slice(PREFIX.length).trim().split(/\s+/)
        const command = args.shift().toLowerCase()

        let groupMetadata = null
        let groupMembers = []
        if (isGroup) {
            groupMetadata = await sock.groupMetadata(from)
            groupMembers = groupMetadata.participants
        }

        const ctx = { sock, msg, from, sender, senderNumber, isOwner, isGroup, groupMetadata, groupMembers, args, body, pushName }

        if (bugCmds.includes(command)) return await bugCommands(ctx, command)

        switch (command) {
            case 'menu':       return await menu(ctx)
            case 'mainmenu':   return await mainMenu(ctx)
            case 'bugmenu':    return await bugMenu(ctx)
            case 'ping':       return await ping(ctx)
            case 'owner':      return await owner(ctx)
            case 'tagall':     return await tagall(ctx)
            case 'play':       return await play(ctx)
            case 'goodbye':    return await goodbye(ctx)
            case 'promote':    return await promote(ctx)
            case 'demote':     return await demote(ctx)
            case 'kick':       return await kick(ctx)
            case 'kickall':    return await kickall(ctx)
            case 'pair':       return await pair(ctx)
            case 'antilink':   return await antilink(ctx)
            case 'antiregion': return await antiregion(ctx)
            case 'add':        return await add(ctx)
            case 'remove':     return await remove(ctx)
            case 'link':       return await link(ctx)
            case 'open':       return await open(ctx)
            case 'close':      return await close(ctx)
            case 'vv':         return await vv(ctx)
            case 'vv2':        return await vv2(ctx)
            case 'self':       return await modeCmd(ctx, 'self')
            case 'public':     return await modeCmd(ctx, 'public')
        }
    } catch (err) {
        console.error('⚠️ MessageHandler error:', err)
    }
}

module.exports = { handleMessage }
