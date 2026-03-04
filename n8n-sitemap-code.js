// Pegar en nodo "Code" de n8n. NO usar require('@supabase/supabase-js') — no permitido en n8n Cloud.
// Antes de este nodo: Supabase "Get Many" en tabla noticias, campos slug (y opcional id).
// Los ítems llegan por $input.all().

const SITE_URL = "https://estudio123455-hue.github.io/Noticias-";

function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

const base = SITE_URL.replace(/\/$/, "");
const items = $input.all();
const urls = [];

// Portada
urls.push({ loc: base + "/", changefreq: "daily", priority: "1.0" });
// Noticias (importante: barra entre base y noticia.html)
items.forEach((item) => {
  const slug = item.json.slug || item.json.id;
  urls.push({
    loc: base + "/noticia.html?slug=" + encodeURIComponent(slug),
    changefreq: "weekly",
    priority: "0.8",
  });
});

let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
urls.forEach((u) => {
  xml += '  <url>\n    <loc>' + escapeXml(u.loc) + '</loc>\n';
  if (u.changefreq) xml += '    <changefreq>' + u.changefreq + '</changefreq>\n';
  if (u.priority) xml += '    <priority>' + u.priority + '</priority>\n';
  xml += '  </url>\n';
});
xml += '</urlset>';

// Salida: sitemap (como tu script) y sitemapXml para el nodo GitHub
return [{ json: { sitemap: xml, sitemapXml: xml, urlCount: urls.length } }];
