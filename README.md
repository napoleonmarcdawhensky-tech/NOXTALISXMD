<div align="center">

```
╔══════════════════════════════════════╗
║                                      ║
║   ⚡  N  O  X  T  A  L  I  S  ⚡    ║
║                                      ║
║   私は楽しみのために殺さない          ║
║   I don't kill for pleasure…         ║
║   我不是为了乐趣而杀戮               ║
║                                      ║
╚══════════════════════════════════════╝
```

![Node](https://img.shields.io/badge/Node.js-v20+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Baileys](https://img.shields.io/badge/Baileys-Latest-black?style=for-the-badge)
![Telegram](https://img.shields.io/badge/Telegram-Bot-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)
![License](https://img.shields.io/badge/Dev-LordEmeraude-blueviolet?style=for-the-badge)

</div>

---

## ⚡ Description

**Noxtalis** est un bot WhatsApp multi-fonctions basé sur **Baileys** avec pairing via **Telegram**. Style assassin, dark, inspiré de Killua — chaque commande a son identité visuelle japonaise et chinoise unique.

---

## 🚀 Installation

```bash
# 1. Clone le repo
git clone https://github.com/TON_USERNAME/noxtalis.git
cd noxtalis

# 2. Installe les dépendances
npm install

# 3. Crée ton fichier .env
cp .env.example .env

# 4. Remplis le .env avec ton token et numéro

# 5. Lance
npm start
```

---

## ⚙️ Configuration `.env`

```env
PREFIX=.
BOT_NAME=Noxtalis
OWNER_NAME=LordEmeraude
OWNER_NUMBER=50943768238
TELEGRAM_TOKEN=ton_token_botfather
TELEGRAM_OWNER_ID=ton_id_telegram
WA_GROUP=https://chat.whatsapp.com/...
WA_CHANNEL=https://whatsapp.com/channel/...
TELEGRAM_OWNER_LINK=https://t.me/lordemeraude99
```

---

## 📋 Commandes WhatsApp

### 🌍 Public
| Commande | Description |
|---|---|
| `.menu` | Menu d'accueil avec infos |
| `.mainmenu` | Liste des commandes |
| `.bugmenu` | Menu des bugs |
| `.ping` | Vitesse du bot |
| `.owner` | Contact du développeur |
| `.play [titre]` | Envoie l'audio directement |
| `.pair [numéro]` | Connecter WhatsApp |
| `.vv2` | View once → ton DM |

### 👥 Groupe
| Commande | Description |
|---|---|
| `.tagall` | Tag tous les membres |
| `.promote @user` | Promouvoir en admin |
| `.demote @user` | Retirer admin |
| `.kick @user` | Expulser un membre |
| `.kickall` | Expulser tout le monde |
| `.add +num` | Ajouter un membre |
| `.remove @user` | Retirer un membre |
| `.link` | Lien d'invitation |
| `.open` | Ouvrir le groupe |
| `.close` | Fermer le groupe |
| `.goodbye on/off` | Message de départ |
| `.antilink on/off` | Anti-lien 3x warn → kick |
| `.antiregion on 33 1` | Bloquer des régions |

### 🔒 Owner Only
| Commande | Description |
|---|---|
| `.vv` | View once → ton DM privé |
| `.self` | Bot en mode privé |
| `.public` | Bot en mode public |

### ☣️ Bug Menu
| Catégorie | Commandes |
|---|---|
| 💀 Crash | `.crash` `.hardcrash` `.crashv2` `.nuke` |
| ⏳ Delay | `.delay` `.delayhard` `.delayinvis` `.freeze` `.lagshot` `.delayloop` |
| 👻 Invisible | `.blankinvis` `.blankclick` `.ghostmsg` `.voidmsg` |
| 🎯 Emoji Bug | `.xbug🎯` `.xbug🌹` `.xbug💀` `.xbug👾` `.xbug🤖` `.xbug🦠` |
| 👥 Group Bug | `.groupxbug` `.xgroup` `.crashgroup` `.delaygc` `.blankgc` |
| 🔇 Net | `.net30` `.netlag` `.disconnect` `.timeout` |

---

## 🤖 Commandes Telegram

| Commande | Description |
|---|---|
| `/start` | Menu principal |
| `/pair` | Connecter WhatsApp via code |
| `/status` | Vérifier la connexion |
| `/delete` | Supprimer la session |
| `/owner` | Contacter le développeur |
| `/listpair` | Liste des sessions 🔒 |

---

## 📁 Structure

```
noxtalis/
├── index.js              ← Point d'entrée
├── package.json
├── .env.example          ← Config template
├── settings.js           ← Paramètres globaux
├── messageHandler.js     ← Router des commandes
├── groupHandler.js       ← Goodbye + Antiregion
├── bot.js                ← Bot Telegram
├── menu.js / mainMenu.js / bugMenu.js
├── bugCommands.js        ← Tes scripts bug ici
├── ping.js / owner.js / tagall.js / play.js
├── goodbye.js / promote.js / demote.js
├── kick.js / kickall.js / pair.js
├── add.js / remove.js / link.js
├── open.js / close.js
├── antilink.js / antiregion.js
├── vv.js / vv2.js / modeCmd.js
└── helper.js
```

---

## ☣️ Ajouter tes scripts Bug

Ouvre `bugCommands.js` et trouve le `if` de la commande :

```javascript
// 💀 CRASH
if (command === 'crash') {
    // ➜ MET TON SCRIPT ICI
}

// ⏳ DELAY
if (command === 'delay') {
    // ➜ MET TON SCRIPT ICI
}
```

Le reste est automatique — photo + succès + signature ✅

---

<div align="center">

```
◇═✦═◇═✦═◇═✦═◇═✦═◇
  死を招く — Shi wo maneku
  腹の中を見たいから殺す
◇═✦═◇═✦═◇═✦═◇═✦═◇
```

**🖤 Dev · LordEmeraude**
[t.me/lordemeraude99](https://t.me/lordemeraude99)

</div>

---

## 👑 Developer

<div align="center">

```
╔══════════════════════════════════════════╗
║                                          ║
║   🖤  L O R D  E M E R A U D E  🖤      ║
║                                          ║
║   殺し屋の創造者 · 闇の支配者             ║
║   Creator of shadows · Master of dark    ║
║   我是黑暗的创造者 · 暗影之主             ║
║                                          ║
║   死を招く者 · He who invites death      ║
║   腹の中を見たいから殺す                  ║
║   I kill to see what's inside            ║
║   我杀戮是为了看清内心                    ║
║                                          ║
║   影の中に生きる · Living in the shadows  ║
║   战斗在黑暗之中 · 誰も止められない        ║
║   No one can stop what's coming          ║
║                                          ║
╠══════════════════════════════════════════╣
║                                          ║
║   ⚡ Architect of Noxtalis               ║
║   ⚡ Builder of digital weapons          ║
║   ⚡ Coder of the unseen                 ║
║   ⚡ 見えないものを作る者                  ║
║   ⚡ 数字武器的建造者                     ║
║                                          ║
╠══════════════════════════════════════════╣
║                                          ║
║   📲 t.me/lordemeraude99                 ║
║                                          ║
╚══════════════════════════════════════════╝
```

*「影の中に生きる者は、光の中で死ぬ」*
*Those who live in shadows, die in the light.*
*生活在阴影中的人，在光明中消亡。*

---

**🖤 Dev · LordEmeraude** — *Creator of Noxtalis*
*Not just a developer. An architect of the unseen.*
*単なる開発者ではない。見えないものの建築家。*
*不仅仅是开发者，更是无形世界的建筑师。*

</div>
