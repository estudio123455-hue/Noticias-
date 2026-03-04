# ⚠️ Seguridad en Supabase (RLS)

Si la portada carga el header "NOTICIAS 24/7" pero **no se ven noticias**, casi siempre es porque RLS está activado y no hay policy de lectura. El frontend recibe `[]` y la página queda vacía.

## Pasos para que la web muestre las noticias

1. **Activa RLS** en la tabla `noticias`: Table Editor → tabla **noticias** → pestaña/opción RLS → **ON**.

2. **Crea una policy pública solo para lectura (SELECT)**. Puedes hacerlo de dos formas:

   **Opción A — Desde la UI:**  
   En la misma tabla `noticias` → Policies → New policy (o Create policy):
   - Name: `Permitir lectura pública` (o "Allow public read")
   - Allowed operation: **SELECT**
   - Target roles: **anon**
   - USING expression: **`true`**

   **Opción B — SQL (Supabase → SQL Editor):**  
   Ejecuta esto (la tabla en tu proyecto es **noticias**, no "news"):

   ```sql
   CREATE POLICY "Allow public read"
   ON noticias
   FOR SELECT
   TO anon
   USING (true);
   ```

3. Comprueba que RLS está **ON** y que existe al menos una policy de **SELECT** para el rol **anon**. Sin eso, el frontend (clave anónima) no puede leer filas y recibirá `[]`.

Así solo se permite **leer**; nadie puede insertar/actualizar/borrar desde la clave anónima.

---

**Estructura esperada de la tabla `noticias`:**
- `id` (number, auto)
- `titulo` (text)
- `slug` (text, único) — ej: `mi-noticia-importante`
- `resumen` (text)
- `contenido` (text, puede ser HTML)

Si n8n o tu automatización inserta por `id` y no tienes `slug`, en el código se usa `id` como respaldo cuando no hay `slug`.
