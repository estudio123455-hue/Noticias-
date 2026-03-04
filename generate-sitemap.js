/**
 * Genera sitemap.xml con todas las URLs de noticias desde Supabase.
 * Ejecutar: node generate-sitemap.js
 * (Antes de ejecutar: npm install @supabase/supabase-js si hace falta)
 *
 * Opcional: define SITE_URL antes de ejecutar, ej.:
 *   Windows: set SITE_URL=https://tusitio.com && node generate-sitemap.js
 *   Linux/Mac: SITE_URL=https://tusitio.com node generate-sitemap.js
 */
const SUPABASE_URL = "https://excasgwodircmbpgbgni.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4Y2FzZ3dvZGlyY21icGdiZ25pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1NDg4NzMsImV4cCI6MjA4ODEyNDg3M30.EebprT1Ioema0yJMKFgaWz7hqvsfAq2t4ZEJ_zPnk8c";
const SITE_URL = process.env.SITE_URL || "https://TU-DOMINIO.com";

const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

async function main() {
  const base = SITE_URL.replace(/\/$/, "");
  const { data: noticias, error } = await supabase
    .from("noticias")
    .select("slug, id")
    .order("id", { ascending: false });

  if (error) {
    console.error("Error Supabase:", error.message);
    process.exit(1);
  }

  const urls = [];
  urls.push({ loc: base + "/index.html", lastmod: new Date().toISOString().slice(0, 10), changefreq: "daily", priority: "1.0" });

  (noticias || []).forEach((n) => {
    const slug = n.slug || n.id;
    urls.push({
      loc: `${base}/noticia.html?slug=${encodeURIComponent(slug)}`,
      changefreq: "weekly",
      priority: "0.8",
    });
  });

  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls
      .map(
        (u) =>
          "  <url>\n" +
          `    <loc>${escapeXml(u.loc)}</loc>\n` +
          (u.lastmod ? `    <lastmod>${u.lastmod}</lastmod>\n` : "") +
          (u.changefreq ? `    <changefreq>${u.changefreq}</changefreq>\n` : "") +
          (u.priority ? `    <priority>${u.priority}</priority>\n` : "") +
          "  </url>\n"
      )
      .join("") +
    "</urlset>";

  const outPath = path.join(__dirname, "sitemap.xml");
  fs.writeFileSync(outPath, xml, "utf8");
  console.log("sitemap.xml generado en", outPath, "(" + urls.length + " URLs)");
}

main();
