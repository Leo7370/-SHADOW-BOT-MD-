import { WAMessageStubType } from '@whiskeysockets/baileys';
import fetch from 'node-fetch';

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return !0;

  let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => welcome);
  let pp2 = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => adios);
  let img = await (await fetch(`${pp}`)).buffer();
  let img2 = await (await fetch(`${pp2}`)).buffer();

  let chat = global.db.data.chats[m.chat];

  if (chat.welcome && m.messageStubType == 27) {
    let wel = chat.welcome ? chat.welcome : ` ┌─★ 𝐊𝐚𝐤𝐚𝐫𝐨𝐭𝐨-𝐁𝐨𝐭-𝐌𝐃 ☁️ \n │「 𝐁𝐈𝐄𝐍𝐕𝐄𝐍𝐈𝐃𝐎/A 👋 」\n └┬★ 「 @${m.messageStubParameters[0].split`@`[0]} 」\n   │┃🙏  PUEDES AYUDAR A LEGAR A NUESTRA META DE SEGUIDORES\n  ┃🐉 https://whatsapp.com/channel/0029VagYdbFEwEk5htUejk0t\n   │🐲  ${groupMetadata.subject}\n   └───────────────┈ ⳹`;
    await conn.sendMini(m.chat, packname, dev, wel, img, img, channel, fkontak);
  }

  if (chat.bye && m.messageStubType == 28) {
    let bye = chat.bye ? chat.bye : ` ┌─★ 𝐊𝐚𝐤𝐚𝐫𝐨𝐭𝐨-𝐁𝐨𝐭-𝐌𝐃 ☁️ \n │「 𝐀𝐃𝐈Ó𝐒 🗣️‼️ 」\n └┬★ 「 @${m.messageStubParameters[0].split`@`[0]} 」\n   │🐲  𝐒𝐄 𝐅𝐔𝐄 𝐄𝐒𝐄 𝐏𝐔𝐓𝐎\n   ┃🐉 𝐍𝐮𝐧𝐜𝐚 𝐭𝐞 𝐪𝐮𝐢𝐬𝐢𝐦𝐨𝐬 𝐚𝐪𝐮í 𝐒𝐚𝐢𝐲𝐚𝐧 𝐝𝐞 𝐂𝐮𝐚𝐫𝐭𝐚\n   ┃🙏  PUEDES AYUDAR A LEGAR A NUESTRA\n   ┃META DE SEGUIDORES\n   ┃🐉 https://whatsapp.com/channel/0029VagYdbFEwEk5htUejk0t\n   └───────────────┈ ⳹`;
    await conn.sendMini(m.chat, packname, dev, bye, img2, img2, channel, fkontak);
  }

  if (chat.bye && m.messageStubType == 32) {
    let kick = chat.bye ? chat.bye : ` ┌─★ 𝐊𝐚𝐤𝐚𝐫𝐨𝐭𝐨-𝐁𝐨𝐭-𝐌𝐃 ☁️\n │「 𝐀𝐃𝐈Ó𝐒 😈‼️ 」\n └┬★ 「 @${m.messageStubParameters[0].split`@`[0]} 」\n   │🐲  𝐒𝐄 𝐅𝐔𝐄 𝐄𝐒𝐄 𝐏𝐔𝐓𝐎\n   │🐉 𝐍𝐮𝐧𝐜𝐚 𝐭𝐞 𝐪𝐮𝐢𝐬𝐢𝐦𝐨𝐬 𝐚𝐪𝐮í 𝐒𝐚𝐢𝐲𝐚𝐧 𝐝𝐞 𝐂𝐮𝐚𝐫𝐭𝐚\n   ┃🙏  PUEDES AYUDAR A LEGAR A NUESTRA\n   ┃META DE SEGUIDORES\n   ┃🐉 https://whatsapp.com/channel/0029VagYdbFEwEk5htUejk0t\n   └───────────────┈ ⳹`;
    await conn.sendMini(m.chat, packname, dev, kick, img2, img2, channel, fkontak);
  }
}
