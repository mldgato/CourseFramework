---
description: Genera el fragmento HTML del ebook para UN tema específico. Uso: /html-content X.Y.Z
argument-hint: X.Y.Z
---

# Skill: Generar Contenido HTML del Ebook (un tema a la vez)

**Argumento recibido:** `$ARGUMENTS` (el tema, p. ej. `1.1.1`). Si viene vacío, pídelo al autor.

## Uso
```
/html-content 1.1.1
```

## Lo que hace
Genera el fragmento HTML que se sube al editor de la plataforma (ebook). Es un fragmento — sin `<html>/<head>/<body>` — pensado para pegar en el editor Monaco de Smart C3.

## Pasos internos (invisibles para el autor)

### 1. Leer el contexto
- Lee `course.config.js` → título y datos del tema
- Lee el Word de teoría del tema si existe (es la fuente principal del contenido)
- Si no hay Word todavía, genera el contenido directamente desde el PDF del examen

### 2. Convertir (si hay Word)
```bash
python _tools/docx2html.py --split \
  "Unidad N - .../Teoría/Lección X.Y - Título.docx" \
  "Unidad N - .../Contenido HTML" "X.Y"
```
Esto genera un archivo por tema. Luego toma solo el del tema solicitado.

### 3. Reglas del fragmento

**Estructura obligatoria** (el script la genera automáticamente):
```html
<div style="background:#fbfdff; background-image: linear-gradient(#e3edf5 1px, transparent 1px), linear-gradient(90deg, #e3edf5 1px, transparent 1px); background-size: 26px 26px;">
  <div style="max-width:900px; padding:0 24px; font-family:helvetica,arial,sans-serif">
    <!-- contenido aquí -->
  </div>
</div>
```

**Paleta** (desde `course.config.js → palette`):
- Encabezados y negritas → `navy`
- Subtítulos y acentos → `steel`
- Texto → `#1e2f3f`; fondos de recuadro → `#eaf4fb`
- Cada `<td>` lleva `background:#ffffff`

**Jerarquía:** título de tema → `<h2>`, subtítulo → `<h3>`, sub-subtítulo → `<h4>`

**Regla de contenido:** solo repaso y exploración. Sin quizzes ni preguntas de evaluación (eso es exclusivo de las Actividades).

### 4. Retrofit interactivo (opcional)
Si el tema tiene una tabla de clasificación o glosario con dos columnas, puedes aplicar tarjetas flip:
```bash
python _tools/add_flashcards.py "Contenido HTML/X.Y.Z Título.html"
```
Pregunta al autor antes de aplicarlo. **Nunca forzar interactividad donde no hay tabla adecuada.**

### 5. Entregar
- Ruta del archivo generado
- Longitud aproximada en caracteres
- Si se aplicó o no el retrofit de tarjetas

## ⚠️ Aviso importante
Si el archivo ya tiene tarjetas flip o timeline aplicados manualmente, **NO volver a ejecutar `--split`** sobre ese tema: destruiría el `<style>/<script>` interactivo. En ese caso, editar el archivo directamente.

## Carpeta de salida
`Unidad N - .../Contenido HTML/X.Y.Z Título.html`
