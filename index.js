require('dotenv').config()
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys')
const { Boom } = require('@hapi/boom')
const pino = require('pino')
const { handleMessage } = require('./handlers/messageHandler')
const { handleGroupUpdate } = require('./handlers/groupHandler')
const { startTelegramBot } = require('./telegram/bot')

global.goodbyeGroups = new Map()

async function startNoxtalis() {
    try {
        const { state, saveCreds } = await useMultiFileAuthState('./session')
        const { version } = await fetchLatestBaileysVersion()

        const sock = makeWASocket({
            version,
            auth: state,
            printQRInTerminal: false,
            logger: pino({ level: 'silent' }),
            browser: ['Noxtalis', 'Chrome', '1.0.0'],
            getMessage: async () => ({ conversation: '' })
        })

        sock.ev.on('creds.update', saveCreds)

        sock.ev.on('connection.update', ({ connection, lastDisconnect }) => {
            if (connection === 'close') {
                const code = (new Boom(lastDisconnect?.error))?.output?.statusCode
                const shouldReconnect = code !== DisconnectReason.loggedOut
                console.log('⚡ NOXTALIS · Disconnected · Code:', code)
                if (shouldReconnect) startNoxtalis()
                else console.log('⚡ Session expirée. Reconnecte via Telegram /pair')
            } else if (connection === 'open') {
                console.log('⚡ NOXTALIS · ONLINE · Dev: LordEmeraude')
            }
        })

        sock.ev.on('messages.upsert', async ({ messages, type }) => {
            if (type !== 'notify') return
            const msg = messages[0]
            if (!msg?.message) return
            if (msg.key.fromMe) return
            try {
                await handleMessage(sock, msg)
            } catch (e) {
                console.error('⚠️ Message error:', e.message)
            }
        })

        sock.ev.on('group-participants.update', async (update) => {
            try {
                await handleGroupUpdate(sock, update)
            } catch (e) {
                console.error('⚠️ Group error:', e.message)
            }
        })

        return sock
    } catch (e) {
        console.error('⚠️ Start error:', e.message)
        setTimeout(startNoxtalis, 5000)
    }
}

startNoxtalis()
startTelegramBot()
