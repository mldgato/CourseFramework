---
description: Sube el contenido de UN tema a Smart C3 (Xperienceed) via Chrome. Uso: /upload X.Y.Z [tipo]
argument-hint: X.Y.Z [actividad|html|video]
disable-model-invocation: true
---

# Skill: Subir a Smart C3 (un tema a la vez)

**Argumento recibido:** `$ARGUMENTS` (el tema, p. ej. `1.1.1`). Si viene vacío, pídelo al autor.

## Uso
```
/upload 1.1.1              # pregunta qué tipo subir
/upload 1.1.1 actividad    # sube solo la actividad
/upload 1.1.1 html         # sube solo el Contenido HTML
/upload 1.1.1 video        # sube solo el video
```

## Prerequisito
La sesión en Smart C3 la inicia el usuario. Claude nunca escribe contraseñas.
Si hay dos navegadores conectados, usar `list_connected_browsers` → `select_browser` y preguntar cuál tiene la sesión.

## Verificar que el archivo existe
Antes de intentar subir, confirma que el archivo del tema existe en su carpeta. Si no, avisar al autor y sugerir ejecutar el skill correspondiente primero.

## Tipos de subida

### Contenido HTML
1. Navegar a `content-manager/ebook` → localizar el tema en el outline
2. Abrir editor → pestaña **HTML EDITOR** → marcar **"Allow html styles"** → Monaco
3. Pegar el contenido del archivo:
   ```bash
   node _tools/copy_to_clipboard.js "Unidad N - .../Contenido HTML/X.Y.Z Título.html"
   ```
   En Monaco: seleccionar todo → `Ctrl+V` (`Cmd+V` en Mac) → esperar 2 s → SAVE
4. Verificar con `getValue()` que el contenido guardó correctamente

### Actividad HTML
1. Navegar a `content-manager/tasks` → Unidad → Courses → marcar el courseId de `course.config.js`
2. Seleccionar el tema → "+" → **HTML**
3. Title = nombre del archivo sin `.html`
4. Pegar el `.html` completo (`copy_to_clipboard.js` + `Ctrl+V` / `Cmd+V`) → SAVE
5. Icono **Certification Parameters** → Level = **Default** → SAVE
6. Cerrar el modal → **marcar el checkbox** de la fila
7. Verificar que el contenido apareció

### Video
Ver `_video_kit/tools/split_for_upload.sh` para el procedimiento de subida.
Camino B para reemplazar: subir como "Calidad 2" → borrar el anterior → renombrar → SAVE → verificar.

## Trampas conocidas de la plataforma
- El primer intento de pegar a veces no toma; verificar antes de continuar
- Clic en un nodo ya expandido lo cierra
- Escape puede cerrar el modal completo; clicar el título del modal para descartarlo
- El visor puede mostrar contenido obsoleto al cambiar de tema; verificar siempre con `getValue()`
