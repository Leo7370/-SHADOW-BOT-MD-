import fetch from 'node-fetch';

const handler = async (m, { text, usedPrefix, command }) => {
    // Verifica si se ha ingresado un país
    if (!text) {
        throw `*[❗] 𝙸𝙽𝙶𝚁𝙴𝚂𝙴 𝙴𝙻 𝙽𝙾𝙼𝙱𝚁𝙴 𝙳𝙴 𝚄𝙽 𝙿𝙰𝙸𝚂, 𝙴𝙹𝙴𝙼𝙿𝙻𝙾: ${usedPrefix + command} Mexico*`;
    }
    
    // Realiza la solicitud a la API
    const apiUrl = global.API('https://covid19.mathdro.id', '/api/countries/' + encodeURIComponent(text));
    const res = await fetch(apiUrl);
    
    // Maneja posibles errores en la respuesta
    if (!res.ok) {
        throw await res.text();
    }
    
    const json = await res.json();
    
    // Verifica si se obtuvieron datos sobre el país
    if (!json.confirmed) {
        throw 'País no encontrado o datos no disponibles.';
    }

    // Envía la información sobre COVID-19
    m.reply(`
🌏 País: ${text}
✅ Confirmados: ${json.confirmed.value}
📉 Curados: ${json.recovered.value}
☠️ Muertes: ${json.deaths.value}
💌 Info Actualizada: ${json.lastUpdate}
`.trim());
};

// Configuración del handler
handler.help = ['covid'].map((v) => v + ' <país>');
handler.tags = ['info'];
handler.command = /^(corona|covid|covid19)$/i;

export default handler;