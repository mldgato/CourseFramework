---
description: Genera la actividad HTML interactiva para UN tema específico. Uso: /activities X.Y.Z
argument-hint: X.Y.Z
---

# Skill: Generar Actividad Interactiva (un tema a la vez)

**Argumento recibido:** `$ARGUMENTS` (el tema, p. ej. `1.1.1`). Si viene vacío, pídelo al autor.

## Uso
```
/activities 1.1.1
```

## Lo que hace
Genera un archivo HTML autocontenido con la actividad interactiva del tema. Incluye el runtime embebido (quiz, deck, contrato con la plataforma). El autor no toca ningún archivo de código.

## Pasos internos (invisibles para el autor)

### 1. Leer el contexto
- Lee `course.config.js` → título del tema, lección, unidad, ID del curso
- Lee el Word de teoría del tema si existe (para basar el contenido en el material real)
- Lee las preguntas del tema si existen (para incluirlas en el paso de Evaluación)

### 2. Diseñar la actividad
**Estructura de pasos:**
1. **Repaso** — resumen del tema: texto + lista de puntos clave + un callout. Sin evaluación.
2. **Práctica** — 1–2 ejercicios interactivos (`QuizChoice`, `QuizSort`, tabla, etc.)
3. **Evaluación** — 2–4 preguntas que suman al puntaje (o se inyectan desde las preguntas del Word)

**Reglas de diseño:**
- Paleta slate + índigo, compatible con modo oscuro
- Sin scroll de página; el contenido va dentro de `.step`
- Badge `practica` (índigo) o `analogia` (ámbar) según el tipo
- Los emojis sí se permiten en las actividades
- ID de la actividad: `{config.id}-X.Y.Z` (ej. `<id>-1.1.1`)
- **Objetivo de certificación (discreto pero visible):** en el paso Repaso, una etiqueta pequeña (chip tenue, texto ~11–12 px, junto al badge) que diga `Objetivo {topic.id}` y, en `title`/tooltip, `{certification} · Objetivo {lesson.id}: {lesson.objective}`. No debe competir con el contenido ni ocupar más de una línea. Datos de `course.config.js`.

### 3. Widgets disponibles
```js
QuizChoice(sel, {options:[{label, ok, fb}]})     // opción múltiple, clic inmediato
QuizMulti(sel, {options:[{label, ok}], hint})    // varias correctas + Comprobar
QuizSort(sel, {items:[{label,cat}], cats:[...]}) // clasificar en categorías
QuizMatch(sel, {pairs:[{l, r}]})                 // emparejar con <select>
QuizOrder(sel, {items:[...]})                    // ordenar arrastrando
QuizDragMatch(sel, {pairs:[{l,r}]})              // emparejar arrastrando
```

### 4. Escribir el HTML
El archivo embebe inline (en `<script>`) las versiones minificadas de:
- `_fuente-assets/xperienceed.js`
- `_fuente-assets/deck.js`
- `_fuente-assets/quiz.js`

Termina siempre con:
```js
Xp.init({ id: "COURSE_ID-X.Y.Z", title: "Título del tema" });
// configuración de quizzes
Deck.init();
```

### 5. Verificar
```bash
node _tools/test_activity_smoke.js "Actividades/X.Y.Z Título.html"
```
Verifica: sin errores de consola, envía `html-task-result`, restaura estado.

### 6. Entregar
Confirma al autor:
- Ruta del archivo generado
- Número de pasos y ejercicios evaluables
- Si pasó la verificación automática

## Carpeta de salida
`Unidad N - .../Actividades/X.Y.Z Título.html`
