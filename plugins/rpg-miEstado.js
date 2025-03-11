let handler = async function (m, { conn, text, command, usedPrefix }) {
    // Configuración de contacto para el mensaje
    let fkontak = {
        key: {
            participants: "0@s.whatsapp.net",
            remoteJid: "status@broadcast",
            fromMe: false,
            id: "Halo"
        },
        message: {
            contactMessage: {
                vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
            }
        },
        participant: "0@s.whatsapp.net"
    };

    let user = global.db.data.users[m.sender];
    let name = await conn.getName(m.sender);

    // Emojis y sus significados
    let emoji = ['😀', '😃', '😄', '😁', '😆', '🥹', '😅', '😂', '🤣', '🥲', /* ... más emojis ... */ ];
    let significado = ['Animado/a', 'Contento/a', 'Feliz', /* ... más significados ... */ ];

    // Sección de selección de estado
    let sections = emoji.map((emoticon, index) => ({
        title: `🤔 𝘏𝘰𝘭𝘢 𝘩𝘶𝘮𝘢𝘯𝘰 𝘤𝘰𝘮𝘰 𝘦𝘴𝘵𝘢𝘴 𝘦𝘭 𝘥𝘪𝘢 𝘥𝘦 𝘩𝘰𝘺?`,
        rows: [{
            title: `» ${emoticon}${emoticon}${emoticon}${emoticon}`,
            description: `${index + 1}. ${significado[index]}`,
            rowId: `${usedPrefix}${command} ${significado[index]} ${emoticon}`
        }]
    }));

    if (command === 'miestado') {
        if (!text) {
            return conn.sendMessage(m.chat, {
                text: `❖ 𝘏𝘰𝘭𝘢 𝘩𝘶𝘮𝘢𝘯𝘰 𝘤𝘰𝘮𝘰 𝘦𝘴𝘵𝘢𝘴 𝘦𝘭 𝘥𝘪𝘢 𝘥𝘦 𝘩𝘰𝘺? 🤔 ${user.registered ? user.name : name}\n\n👋 *SELECCIONE SU ESTADO ACTUAL POR FAVOR*\n*❖ SU ESTADO ACTUAL:* ${typeof user.miestado === 'string' ? user.miestado : 'Estado no asignado'}\n❖ Ejemplo /miestado 😃`,
            }, { quoted: fkontak });
        }

        // Actualiza el estado del usuario
        let miEstado = text.trim();
        user.miestado = miEstado;

        // Respuesta al usuario
        return conn.sendMessage(m.chat, {
            text: `*GENIAL!! SE HA AGREGADO UN ESTADO*\n*❖ SU ESTADO:* ${user.miestado}`
        }, { quoted: fkontak });
    }
};

handler.command = ['miestado'];
handler.register = true;

export default handler;