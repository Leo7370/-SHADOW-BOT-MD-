import fetch from "node-fetch";
import yts from "yt-search"; // Asegúrate de tener instalado yt-search

// Código Oficial De MediaHub TM
const encodedApiUrl = "aHR0cHM6Ly9hcGkuYWdhdHoueHl6L2FwaS95dG1wNA==";

// Función para realizar reintentos al obtener la URL de descarga con un tiempo de espera ajustado
const fetchWithRetries = async (url, maxRetries = 3, timeout = 60000) => {
  let attempt = 0;
  while (attempt <= maxRetries) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(url, { signal: controller.signal });
      const data = await response.json();

      clearTimeout(timeoutId); // Limpiar el timeout si la respuesta es exitosa

      if (data && data.status === 200 && data.data && data.data.downloadUrl) {
        return data.data; // Retorna el resultado si es válido
      }
    } catch (error) {
      console.error(`Error en el intento ${attempt + 1}:`, error.message);
      if (error.name === "AbortError") {
        console.error("La solicitud fue cancelada debido al tiempo de espera.");
      }
    }
    attempt++;
  }
  throw new Error("⚠️Ups Algo Afectó Mi Servidor Por Favor Inténtalo Nuevamente☺️.");
};

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.sendMessage(m.chat, {
      text: `⚠️ *¡Atención!*\n\n💡 *Por favor ingresa un término de búsqueda para encontrar el video.*\n\n📌 *Ejemplo:* ${usedPrefix}${command} Never Gonna Give You Up`,
    });
  }

  // Enviar mensaje inicial
  const reactionMessage = await conn.sendMessage(m.chat, {
    text: `🔍 *Buscando el video...*`,
  });

  // Reaccionar al mensaje con 📀 mientras se busca
  await conn.sendMessage(m.chat, {
    react: { text: "📀", key: reactionMessage.key },
  });

  try {
    // Búsqueda en YouTube
    const searchResults = await yts(text);
    const video = searchResults.videos[0]; // Tomamos el primer resultado

    if (!video) {
      // Reaccionar con ❌ en caso de error
      await conn.sendMessage(m.chat, {
        react: { text: "❌", key: reactionMessage.key },
      });
      return conn.sendMessage(m.chat, {
        text: `❌ *No se encontraron resultados para:* ${text}`,
      });
    }

    const { title, url: videoUrl, timestamp, views, author, image, ago } = video;

    // Decodificar la URL de la API
    const apiUrl = `${Buffer.from(encodedApiUrl, "base64").toString("utf-8")}?url=${encodeURIComponent(videoUrl)}`;
    const apiData = await fetchWithRetries(apiUrl, 2, 60000);

    const { title: apiTitle, downloadUrl, image: apiImage } = apiData;

    // Obtener el tamaño del archivo
    const fileResponse = await fetch(downloadUrl, { method: "HEAD" });
    const fileSize = parseInt(fileResponse.headers.get("content-length") || 0);
    const fileSizeInMB = fileSize / (1024 * 1024); // Convertir bytes a MB

    // Reaccionar con ✅️ si es exitoso
    await conn.sendMessage(m.chat, {
      react: { text: "✅️", key: reactionMessage.key },
    });

    // Formato del mensaje de información
    const videoInfo = `
⌘━─━─[BarbozaBot-Ai]─━─━⌘

➷ *Título⤿:* ${apiTitle}
➷ *Subido⤿:* ${ago}
➷ *Duración⤿:* ${timestamp}
➷ *Vistas⤿:* ${(views / 1000).toFixed(1)}k (${views.toLocaleString()})
➷ *URL⤿:* ${videoUrl}

➤ *Su Resultado Se Está Enviando Por Favor Espere....* 

> _*©Código Oficial De MediaHub™*_
    `;

    await conn.sendMessage(m.chat, { image: { url: apiImage }, caption: videoInfo });

    if (fileSizeInMB > 70) {
      await conn.sendMessage(
        m.chat,
        {
          document: { url: downloadUrl },
          mimetype: "video/mp4",
          fileName: apiTitle || `${title}.mp4`,
          caption: `📂 *Video en Formato Documento:* \n🎵 *Título:* ${apiTitle}\n📦 *Tamaño:* ${fileSizeInMB.toFixed(2)} MB`,
        },
        { quoted: m }
      );
    } else {
      await conn.sendMessage(
        m.chat,
        {
          video: { url: downloadUrl },
          mimetype: "video/mp4",
          fileName: apiTitle || `${title}.mp4`,
          caption: `🎥 *Video Descargado:* \n🎵 *Título:* ${apiTitle}\n📦 *Tamaño:* ${fileSizeInMB.toFixed(2)} MB`,
        },
        { quoted: m }
      );
    }
  } catch (error) {
    console.error("Error al descargar el video:", error);
    // Reaccionar con ❌ en caso de error
    await conn.sendMessage(m.chat, {
      react: { text: "❌", key: reactionMessage.key },
    });
    await conn.sendMessage(m.chat, {
      text: `❌ *Ocurrió un error al intentar procesar tu solicitud:*\n${error.message || "Error desconocido"}`,
    });
  }
};

handler.command = /^play2$/i;

export default handler;