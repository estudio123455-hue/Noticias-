# ⚠️ Seguridad en Supabase (RLS)

Para que la web cargue noticias correctamente:

1. **Activa RLS** en la tabla `noticias` (Table Editor → tabla `noticias` → RLS: ON).

2. **Crea una policy pública solo para lectura (SELECT)**:
   - Policy name: `Permitir lectura pública`
   - Allowed operation: **SELECT**
   - Target roles: `anon`
   - USING expression: `true` (todos pueden leer)

Así solo se permite leer; nadie puede insertar/actualizar/borrar desde la clave anónima.

---

**Estructura esperada de la tabla `noticias`:**
- `id` (number, auto)
- `titulo` (text)
- `slug` (text, único) — ej: `mi-noticia-importante`
- `resumen` (text)
- `contenido` (text, puede ser HTML)

Si n8n o tu automatización inserta por `id` y no tienes `slug`, en el código se usa `id` como respaldo cuando no hay `slug`.
