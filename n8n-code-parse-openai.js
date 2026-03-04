// Ruta de tu nodo OpenAI: output[0].content[0].text
let rawText = $json.output[0].content[0].text;

// Eliminar bloques ```json ``` si existen
rawText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();

// Si empieza con "Lo siento" o no es JSON, no enviar nada (evita el error de JSON.parse)
if (/^\s*Lo siento/i.test(rawText) || !rawText.startsWith('{')) {
  return [];
}

let parsed;
try {
  parsed = JSON.parse(rawText);
} catch (e) {
  // Intentar extraer un objeto JSON del texto
  const match = rawText.match(/\{[\s\S]*\}/);
  if (match) {
    try {
      parsed = JSON.parse(match[0]);
    } catch (e2) {
      return [];
    }
  } else {
    return [];
  }
}

if (!parsed.titulo || !parsed.slug) {
  return [];
}

return {
  titulo: parsed.titulo,
  resumen: parsed.resumen ?? '',
  contenido: parsed.contenido ?? '',
  slug: parsed.slug,
  meta_description: parsed.meta_description ?? parsed.resumen ?? ''
};
