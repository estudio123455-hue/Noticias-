# Fase 2 — Proyecto listo para Google

Resumen de lo implementado para que el sitio sea **estable, indexable y monetizable**.

---

## 1. Sitemap automático

- **`sitemap.xml`**: archivo estático con la portada. Se puede regenerar con todas las noticias.
- **`generate-sitemap.js`**: script que lee desde Supabase y escribe `sitemap.xml` con todas las URLs (portada + cada noticia por slug).

**Uso:**

```bash
# Instalar dependencia (solo la primera vez)
npm install

# Definir tu URL pública y generar sitemap
# Windows (PowerShell):
$env:SITE_URL="https://tudominio.com"; node generate-sitemap.js

# Windows (CMD):
set SITE_URL=https://tudominio.com && node generate-sitemap.js

# Linux/Mac:
SITE_URL=https://tudominio.com node generate-sitemap.js
```

O edita `SITE_URL` dentro de `generate-sitemap.js` y ejecuta:

```bash
npm run sitemap
```

**Recomendación:** Ejecutar el script después de que n8n publique noticias nuevas (cron, o paso final del flujo n8n con “Execute Command” si tu hosting lo permite).

---

## 2. robots.txt

- **`robots.txt`**: permite todo y apunta al sitemap.

**Qué hacer:** Sustituir `https://TU-DOMINIO.com` por tu URL real (en `robots.txt` y en `generate-sitemap.js` / `sitemap.xml`).

---

## 3. Meta dinámico (SEO)

En **noticia.html** ya está implementado:

- `document.title` = título de la noticia + sitio
- `<meta name="description">` = resumen (hasta 160 caracteres)
- Open Graph: `og:title`, `og:description`, `og:url`, `og:type`, `og:locale`
- `<link rel="canonical">` con la URL canónica de la noticia

Todo se rellena con JavaScript cuando carga la noticia desde Supabase.

---

## 4. Structured Data (JSON-LD)

En **noticia.html** se inyecta un bloque:

```json
{
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": "...",
  "description": "...",
  "url": "...",
  "datePublished": "...",  // si existe en Supabase
  "dateModified": "..."    // si existe en Supabase
}
```

Si en tu tabla `noticias` tienes columnas `created_at` y `updated_at`, el script las usa automáticamente.

---

## 5. Google Search Console

Pasos manuales (no hay código que ejecutar):

1. Entra en [Google Search Console](https://search.google.com/search-console).
2. **Añadir propiedad**: indica la URL de tu sitio (ej. `https://tudominio.com`).
3. **Verificar dominio**: por archivo HTML, meta tag o DNS, según lo que te ofrezca la consola.
4. **Enviar sitemap**: en “Sitemaps” añade la URL `https://tudominio.com/sitemap.xml`.
5. Opcional: usa “Inspección de URLs” para pedir la indexación de páginas importantes.

Sin sitemap, la indexación suele ser más lenta; con sitemap + Search Console, Google descubre antes tus noticias.

---

## Recordatorio sobre arquitectura

El sitio es **HTML estático + JS**: el contenido se carga por JavaScript. Google hoy rastrea JS, pero para **SEO muy fuerte** a largo plazo suele ir mejor:

- Contenido renderizado en servidor (SSR), o
- Sitio estático generado (SSG), o
- Prerender de las páginas.

Para arrancar y monetizar, lo que tienes ahora es suficiente; luego puedes valorar migrar a Next.js, generación estática o un servicio de prerender.
