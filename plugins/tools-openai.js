import Groq from 'groq-sdk';

const handler = async (m, { conn, text, usedPrefix, command }) => {
    const groq = new Groq({ apiKey: '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' });
    conn.sylph = conn.sylph || {};

    // Manejo del texto a enviar
    let userInput = text || (m.quoted ? m.quoted.text : null);
    if (!userInput) {
        throw `\`\`\`[ 🍄 ] Por favor ingresa un texto. Ejemplo: ${usedPrefix + command} Hola\`\`\``;
    }

    try {
        // Enviar un mensaje de espera
        let { key } = await conn.sendMessage(m.chat, { text: 'Espera un momento...' }, { quoted: m });

        // Configuración inicial para el usuario
        if (!(m.sender in conn.sylph)) {
            conn.sylph[m.sender] = [{
                role: 'system',
                content: `Eres Sylph, una inteligencia artificial creada por I'm Fz. Responde de manera clara y concisa. El nombre del usuario será: ${conn.getName(m.sender)}`,
            }];
        }

        // Limitar la longitud del historial de mensajes
        if (conn.sylph[m.sender].length > 10) {
            conn.sylph[m.sender] = conn.sylph[m.sender].slice(-10); // Mantiene solo los últimos 10 mensajes
        }

        // Agregar el mensaje del usuario
        conn.sylph[m.sender].push({
            role: 'user',
            content: userInput,
        });

        // Preparar el payload para la API
        const payloads = {
            messages: conn.sylph[m.sender],
            model: 'llama-3.1-70b-versatile'
        };

        // Llamada a la API de Groq
        const json = await groq.chat.completions.create(payloads);
        let message = json.choices[0].message.content;

        // Almacenar la respuesta del sistema
        conn.sylph[m.sender].push({
            role: "system",
            content: message,
        });

        // Enviar la respuesta al usuario
        await conn.sendMessage(m.chat, { text: message, edit: key }, { quoted: m });
    } catch (e) {
        // Manejo de errores
        return m.reply(e.message || 'Ocurrió un error. Por favor, intenta de nuevo.');
    }
};

// Configuración del handler
handler.command = ['ai2', 'openai', 'ia', 'chatgpt'];
handler.help = ['openai', 'ia', 'chatgpt'];
handler.tags = ['ia'];

export default handler;