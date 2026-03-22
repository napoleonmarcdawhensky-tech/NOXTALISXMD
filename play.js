const { SIGNATURE, IMAGES } = require('../config/settings')
const axios = require('axios')
const fs = require('fs')
const path = require('path')

module.exports = async ({ sock, from, args }) => {
    if (!args[0]) return await sock.sendMessage(from, {
        text: `┌──────────────────────┐
├────( 🎵 P L A Y )
│
│ ⚠️ Usage: *.play [titre]*
│ Exemple: *.play Killua OST*
│
└──────────────────────┘
${SIGNATURE}`
    })

    const query = args.join(' ')

    await sock.sendMessage(from, {
        text: `┌──────────────────────┐
├────( 🎵 P L A Y )
│
│  音楽を検索中…
│  _Searching music…_
│  搜索音乐中…
│
│ 🔍 *${query}*
└──────────────────────┘`
    })

    try {
        // Étape 1 — Chercher sur YouTube
        const searchRes = await axios.get(
            `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`,
            { headers: { 'User-Agent': 'Mozilla/5.0' } }
        )

        const videoMatch = searchRes.data.match(/"videoId":"([a-zA-Z0-9_-]{11})"/)
        if (!videoMatch) throw new Error('Vidéo introuvable')
        const videoId = videoMatch[1]

        const titleMatch = searchRes.data.match(/"title":{"runs":\[{"text":"([^"]+)"/)
        const songTitle = titleMatch ? titleMatch[1] : query

        // Étape 2 — Télécharger audio via API gratuite
        // On utilise cobalt.tools API (gratuite, pas de clé)
        const cobaltRes = await axios.post('https://api.cobalt.tools/api/json', {
            url: `https://youtu.be/${videoId}`,
            isAudioOnly: true,
            aFormat: 'mp3',
            filenamePattern: 'basic'
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            timeout: 30000
        })

        const audioUrl = cobaltRes.data?.url
        if (!audioUrl) throw new Error('Audio URL manquante')

        // Étape 3 — Télécharger le fichier audio
        const audioRes = await axios.get(audioUrl, { responseType: 'arraybuffer', timeout: 60000 })
        const audioBuffer = Buffer.from(audioRes.data)

        // Étape 4 — Envoyer la photo + info
        await sock.sendMessage(from, {
            image: { url: IMAGES.MISC_1 },
            caption: `┌──────────────────────┐
├────( 🎵 N O W  P L A Y I N G )
│
│  音楽再生中…
│  _Now playing…_
│  正在播放…
│
├──────────────────────┤
│
│ 🎵 *${songTitle}*
│ ⚡ Status : *Sending…*
│
└──────────────────────┘
${SIGNATURE}`
        })

        // Étape 5 — Envoyer l'audio
        await sock.sendMessage(from, {
            audio: audioBuffer,
            mimetype: 'audio/mp4',
            pttAudio: false
        })

    } catch (err) {
        await sock.sendMessage(from, {
            text: `┌──────────────────────┐
├────( ⚠️ E R R O R )
│
│  見つかりません…
│  _Not found…_
│  未找到…
│
│ ❌ *"${query}"* introuvable
│ _Réessaie avec un autre titre_
│
└──────────────────────┘
${SIGNATURE}`
        })
    }
}
