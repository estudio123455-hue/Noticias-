# Noticias — CMS automático sin CMS

Sitio de noticias con **HTML estático + Supabase + (opcional) n8n**. Sin framework: solo HTML, Tailwind y JavaScript.

- **Portada** (`index.html`): lista todas las noticias desde Supabase.
- **Detalle** (`noticia.html?slug=...`): muestra una noticia por slug, con SEO (meta, canonical, JSON-LD) y espacio para AdSense.

## Cómo funciona

1. Las noticias viven en Supabase (tabla `noticias`: `id`, `titulo`, `slug`, `resumen`, `contenido`).
2. La web las lee con la clave anónima (solo lectura). Ver [SUPABASE-RLS.md](SUPABASE-RLS.md).
3. Opcional: n8n u otro flujo inserta noticias en Supabase; la web las muestra sin tocar código.

## Desarrollo local

- Abre `index.html` en el navegador (o sirve la carpeta con un servidor local).
- Para regenerar el sitemap: `npm install` y luego `npm run sitemap`. Configura `SITE_URL` en `generate-sitemap.js` o con la variable de entorno.

## Despliegue

- Sube la carpeta a cualquier hosting estático (GitHub Pages, Netlify, Vercel, etc.).
- Sustituye `https://TU-DOMINIO.com` en `robots.txt`, `sitemap.xml` y en `SITE_URL` de `generate-sitemap.js` por la URL real de tu sitio.
- Ver [FASE-2.md](FASE-2.md) para SEO, sitemap y Google Search Console.

## Licencia

Privado / uso propio. Añade una LICENSE si quieres compartir.
