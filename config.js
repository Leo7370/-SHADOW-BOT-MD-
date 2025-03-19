import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone' 

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

//BETA: Si quiere evitar escribir el número que será bot en la consola, agregué desde aquí entonces:
//Sólo aplica para opción 2 (ser bot con código de texto de 8 digitos)
global.botNumberCode = '' //Ejemplo: +573218138672
global.confirmCode = ''

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.owner = [
  ['5216633900512', '⋆Creador ༺Ƹ (ꐦ ◣‸◢) 𝙼𝙰𝚁𝚃𝙸𝙽𝙴𝚉', true],
  ['584241836217', '𝓔𝓶𝓶𝓪 𝓥𝓲𝓸𝓵𝓮𝓽𝓼 𝓥𝓮𝓻𝓼𝓲ó𝓷', true],
  ['5491166401905', 'legend', true],
  ['5216633900512', 'Brayan', true],
  ['527713387229', 'Leo' true],
];

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.mods = ['5216641804242', '584120515006', '5216633900512', '573004828388', '573154062343']
global.suittag = ['584241836217']
global.prems = []
global.numcreador = '526633900512'

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.libreria = 'Baileys'
global.baileys = 'V 6.7.9' 
global.languaje = 'Español'
global.vs = '2.1.5'
global.vsJB = '5.0'
global.nameqr = '𝐁𝐔𝐋𝐌𝐀-𝐁𝐎𝐓-𝐌𝐃'
global.namebot = '✿◟𝐁𝐔𝐋𝐌𝐀-𝐁𝐎𝐓-𝐌𝐃◞✿'
global.sessions = 'Sessions'
global.jadi = 'JadiBots' 
global.yukiJadibts = true

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.packsticker =`°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°\n✦ Bσƚ:\n✦ Pɾσριҽƚαɾισ:\n✦ Fҽƈԋα ԃҽ Cɾҽαƈιóɳ:\n✦ Hσɾα ԃҽ Cɾҽαƈιóɳ:\n♾━━━━━━━━`
global.packsticker2 = `━━━━━━━━♾\n⪛·:*¨♱𝐁𝐔𝐋𝐌𝐀-𝐁𝐎𝐓-𝐌𝐃♱ ¨*:·⪜\n⋆ ༺Ƹ (ꐦ ◣‸◢) 𝙼𝙰𝚁𝚃𝙸𝙽𝙴𝚉\n⇝ ${moment.tz('Mexico/Baja California').format('02/07/2007')}\n⇝ ${moment.tz('Mexico/Baja california').format('08:07:2007')} \n°.⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸⎯ܴ⎯̶᳞͇ࠝ⎯⃘̶⎯̸.°\n\nѕτιϲκєя ϐγ: 𝐁𝐔𝐋𝐌𝐀-𝐁𝐎𝐓-𝐌𝐃`

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.packname = `⪛✰¨♱𝐁𝐔𝐋𝐌𝐀-𝐁𝐎𝐓-𝐌𝐃¨*:·`
global.botname = '·:*¨♱𝐁𝐔𝐋𝐌𝐀-𝐁𝐎𝐓-𝐌𝐃♱ ¨*:·'
global.wm = 'ৎ୭࠭͢𓆪͟͞ 𝐁𝐔𝐋𝐌𝐀-𝐁𝐎𝐓-𝐌𝐃'
global.author = 'Made By (ꐦ ◣‸◢) 𝙼𝙰𝚁𝚃𝙸𝙽𝙴𝚉'
global.dev = '© ⍴᥆ᥕᥱrᥱძ ᑲᥡ  (ꐦ ◣‸◢) 𝙼𝙰𝚁𝚃𝙸𝙽𝙴𝚉'
global.textbot = ' (ꐦ ◣‸◢) 𝙼𝙰𝚁𝚃𝙸𝙽𝙴𝚉 • P·:*¨♱𝐁𝐔𝐋𝐌𝐀-𝐁𝐎𝐓-𝐌𝐃♱ ¨*:·'

global.moneda = 'dragones'
global.welcom1 = 'Edita Con #setwelcome'
global.welcom2 = 'Edita Con #setbye'
global.banner = 'https://tinyurl.com/27d7rnhu'
global.catalogo = 'https://tinyurl.com/25ru293g'

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.imagen1 = fs.readFileSync('./src/menus/Menu2.jpg');
global.imagen2 = fs.readFileSync('./src/anime.jpg');
global.imagen3 = fs.readFileSync('./src/menus/Menu3.jpg');
global.imagen4 = fs.readFileSync('./src/menus/Menu.jpg');
global.imagen5 = fs.readFileSync('./src/+18.jpg');
global.imagen6 = fs.readFileSync('./src/menus/Menu3.jpg');
global.imagen7 = fs.readFileSync('./src/menus/Menu5.jpg');
global.imagen8 = fs.readFileSync('./src/menus/Menu4.jpg')
global.imagen9 = fs.readFileSync('./src/menu_en.png')
global.imagen10 = fs.readFileSync('./src/nuevobot.jpg')
global.miniurl = fs.readFileSync('./src/Grupo.jpg');
global.logo2 = fs.readFileSync('./src/logo2.jpg')
global.logo3 = fs.readFileSync('./src/logo3.jpg')
global.catalogo = fs.readFileSync('./src/logo6.png')
global.logo4 = fs.readFileSync('./src/logo4.jpg')
global.logo5 = fs.readFileSync('./src/logo5.jpg')
global.logo7 = fs.readFileSync('./src/Logo7.png')
global.logo8 = fs.readFileSync('./src/Logo8.jpg')
global.rule = fs.readFileSync('./src/rule.jpg')

global.photoSity = [imagen8, imagen1, imagen4, imagen6]

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.gp4 = 'https://chat.whatsapp.com/DWVnDWaepEQCn7uzOPxmHq'
global.gp1 = 'https://chat.whatsapp.com/DWVnDWaepEQCn7uzOPxmHq' 
global.gp2 = 'https://chat.whatsapp.com/FdBottjrmTvIzD1XTc8vyH'
global.comunidad1 = 'https://chat.whatsapp.com/DiahfK9brw0Azwsk4R9tku'
global.channel = 'https://whatsapp.com/channel/0029VagYdbFEwEk5htUejk0t'
global.channel2 = 'https://whatsapp.com/channel/0029VagYdbFEwEk5htUejk0t'
global.md = 'https://whatsapp.com/channel/0029VagYdbFEwEk5htUejk0t'
global.correo = 'https://whatsapp.com/channel/0029VagYdbFEwEk5htUejk0t'
global.cn ='https://chat.whatsapp.com/FdBottjrmTvIzD1XTc8vyH';

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.estilo = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: '❀ ᥎ᥱgᥱ𝗍ᥲ-sᥙ⍴ᥱr-ᑲ᥆𝗍 ☄︎︎', orderTitle: 'Bang', thumbnail: catalogo, sellerJid: '0@s.whatsapp.net'}}}

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.ch = {
ch1: '120363323286489957@newsletter',
ch2: '120363323286489957@newsletter',
}

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment   

global.rpg = {
  emoticon(string) {
    string = string.toLowerCase();
    const emot = {
      level: '🌟 Nivel',
      coin: '💸 Coin',
      exp: '✨ Experiencia',
      bank: '🏦 Banco',
      diamond: '💎 Diamante',
      health: '❤️ Salud',
      kyubi: '🌀 Magia',
      joincount: '💰 Token',
      emerald: '♦️ Esmeralda',
      stamina: '⚡ Energía',
      role: '⚜️ Rango',
      premium: '🎟️ Premium',
      pointxp: '📧 Puntos Exp',
      gold: '👑 Mot',
      iron: '⛓️ Hierro',
      coal: '🌑 Carbón',
      stone: '🪨 Piedra',
      potion: '🥤 Poción',
    };
    const results = Object.keys(emot).map((v) => [v, new RegExp(v, 'gi')]).filter((v) => v[1].test(string));
    if (!results.length) return '';
    else return emot[results[0][0]];
  }};
global.rpgg = { 
  emoticon(string) {
    string = string.toLowerCase();
    const emott = {
      level: '🌟',
      coin: '💸',
      exp: '✨',
      bank: '🏦',
      diamond: '💎',
      health: '❤️',
      kyubi: '🌀',
      joincount: '💰',
      emerald: '♦️',
      stamina: '⚡',
      role: '⚜️',
      premium: '🎟️',
      pointxp: '📧',
      gold: '👑',
      iron: '⛓️',
      coal: '🌑',
      stone: '🪨',
      potion: '🥤',
    };
    const results = Object.keys(emott).map((v) => [v, new RegExp(v, 'gi')]).filter((v) => v[1].test(string));
    if (!results.length) return '';
    else return emott[results[0][0]];
  }};  

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.multiplier = 69
global.maxwarn = '3'

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})
