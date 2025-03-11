import fs from 'fs';
import path from 'path';

let handler = async (m, { conn, usedPrefix }) => {
  if (!m.isGroup) throw 'Este comando solo funciona en grupos';

  let who = m.mentionedJid[0] || m.quoted?.sender;
  if (!who) throw 'Etiqueta o menciona a alguien';

  let name = conn.getName(who);
  let name2 = conn.getName(m.sender);

  if (global.db.data.users[m.sender].casado || global.db.data.users[who].casado) {
    throw 'Uno de ustedes ya está casado.';
  }

  let str = `${name2} se ha casado con ${name}! Felicidades!`.trim();
  let img = getRandomImage(['https://qu.ax/OpVX.mp4', 'https://qu.ax/ChmG.mp4', 'https://qu.ax/yUBa.mp4']);
  
  conn.sendMessage(m.chat, { video: { url: img }, gifPlayback: true, caption: str, mentions: [m.sender] }, { quoted: m });

  global.db.data.users[m.sender].casado = true;
  global.db.data.users[who].casado = true;
  global.db.data.users[m.sender].pareja = who;
  global.db.data.users[who].pareja = m.sender;
};

function getRandomImage(imgs) {
  return imgs[Math.floor(Math.random() * imgs.length)];
}

handler.help = ['casarse @tag'];
handler.tags = ['fun'];
handler.command = ['casarse', 'marry'];
handler.group = true;

export default handler;