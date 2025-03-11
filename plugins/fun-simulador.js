let handler = async (m, { conn, usedPrefix, command, args }) => {
    // Verifica el evento proporcionado
    let event = args[0];
    if (!event) {
        return await conn.reply(m.chat, `❱❱ 𝙄 𝙉 𝙁 𝙊 𝙍 𝙈 𝘼 𝘾 𝙄 𝙊 𝙉 ❰❰\n\n🔮 𝙁𝙤𝙧𝙢𝙖𝙩𝙤 𝙞𝙣𝙘𝙤𝙧𝙧𝙚𝙘𝙩𝙤\n\n» 𝙐𝙨𝙚 𝙚𝙡 𝙘𝙤𝙢𝙖𝙣𝙙𝙤:\n𝘌𝘫𝘦𝘮𝘱𝘭𝘰: ${usedPrefix + command} <evento> @usuario\n\n𝙇𝙞𝙨𝙩𝙖𝙨 𝙙𝙚 𝙨𝙞𝙢𝙪𝙡𝙖𝙘𝙞𝙤𝙣𝙚𝙨:\n${usedPrefix + command} welcome @user\n${usedPrefix + command} bye @user\n${usedPrefix + command} promote @user\n${usedPrefix + command} demote @user`, m, null, [['Welcome', `${usedPrefix + command} welcome`], ['Bye', `${usedPrefix + command} bye`]]);
    }

    // Procesa las menciones
    let mentions = m.text.replace(event, '').trimStart();
    let who = mentions ? conn.parseMention(mentions) : [];
    let part = who.length ? who : [m.sender];
    let act = false;

    m.reply(`*Simulando evento: ${event}...*`);
    
    // Mapeo de eventos a acciones
    const eventActions = {
        'add': 'add',
        'invite': 'add',
        'welcome': 'add',
        'bye': 'remove',
        'kick': 'remove',
        'leave': 'remove',
        'remove': 'remove',
        'promote': 'promote',
        'demote': 'demote'
    };

    // Verifica si el evento es válido
    if (eventActions[event.toLowerCase()]) {
        act = eventActions[event.toLowerCase()];
        return conn.participantsUpdate({
            id: m.chat,
            participants: part,
            action: act
        });
    } else {
        return conn.reply(m.chat, `❌ Evento "${event}" no reconocido.`, m);
    }
}

// Configuración del handler
handler.help = ['simular <evento> [@mención]'];
handler.tags = ['owner'];
handler.rowner = true;
handler.command = /^(simular|simulasi)$/i;

export default handler;