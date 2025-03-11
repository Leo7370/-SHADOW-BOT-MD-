let handler = async (m, { conn, groupMetadata }) => { 
    // Obtiene el código de invitación del grupo
    let inviteCode = await conn.groupInviteCode(m.chat);
    let groupLink = `https://chat.whatsapp.com/${inviteCode}`;
    
    // Mensaje de respuesta
    let responseMessage = `\n*Invitación al grupo: ${groupMetadata.subject}*\n\n${groupLink}`;
    
    // Envía la respuesta al grupo
    conn.reply(m.chat, responseMessage, m, { detectLink: true });
}

// Configuración del handler
handler.help = ['link', 'enlace'];  // Múltiples comandos para mayor versatilidad
handler.tags = ['grupo'];
handler.command = ['linkgroup', 'link', 'enlacegrupo']; // Comandos más diversos
handler.group = true; // Solo se permite en grupos
handler.botAdmin = true; // El bot debe ser admin

export default handler;