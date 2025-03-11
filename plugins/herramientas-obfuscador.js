import JavaScriptObfuscator from 'javascript-obfuscator';

let handler = async (m, { conn, text }) => {
    // Verifica si se ha proporcionado un texto para ofuscar
    if (!text) {
        return m.reply(`*𝙄𝙉𝙂𝙍𝙀𝙎𝘼 𝙀𝙇 𝘾𝙊́𝘿𝙄𝙂𝙊 𝙌𝙐𝙀 𝙑𝘼𝙎 𝘼 𝙊𝙁𝙐𝙎𝘾𝘼𝙍*`);
    }

    // Función para ofuscar el código
    function obfuscateCode(code) {
        return JavaScriptObfuscator.obfuscate(code, {
            compact: false,
            controlFlowFlattening: true,
            deadCodeInjection: true,
            simplify: true,
            numbersToExpressions: true
        }).getObfuscatedCode();
    }

    // Ofuscar el código proporcionado
    let obfuscatedCode = obfuscateCode(text);
    
    // Enviar el código ofuscado al chat
    conn.sendMessage(m.chat, { text: obfuscatedCode }, { quoted: m });
};

// Configuración del handler
handler.help = ["ofuscar *<texto>*"];
handler.tags = ["fun"];
handler.command = /^(ofuscar|ofuscador)$/i;

export default handler;