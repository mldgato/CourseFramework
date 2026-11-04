---
description: Genera el contenido de teoría en Word para UN tema específico. Uso: /word-content X.Y.Z
argument-hint: X.Y.Z
---

# Skill: Generar Teoría en Word (un tema a la vez)

**Argumento recibido:** `$ARGUMENTS` (el tema, p. ej. `1.1.1`). Si viene vacío, pídelo al autor.

## Uso
```
/word-content 1.1.1
```

## Lo que hace
Genera el documento Word de teoría para el tema indicado y lo coloca en la carpeta `Teoría/` de la lección correspondiente. El autor no toca ningún archivo de código.

## Pasos internos (invisibles para el autor)

### 1. Leer el contexto
- Lee `course.config.js` → encuentra el tema X.Y.Z: su título, la lección a la que pertenece y la unidad
- Lee el PDF del examen (si existe en la raíz) para obtener el detalle del sub-objetivo

### 2. Redactar el contenido
Escribe el contenido del tema con estas reglas:
- **Objetivo de certificación (obligatorio, explícito):** inmediatamente después del título del tema, un recuadro `el.callout()` con: `Objetivo de certificación {certification} · {topic.id} {topic.title}` y debajo `Objetivo {lesson.id}: {lesson.objective}` (datos de `course.config.js`, sin inventar). Además, el recuadro "Para la evaluación" debe nombrar ese mismo objetivo.
- **3–5 párrafos** de desarrollo (empieza con el "por qué" antes del "qué")
- **Ejemplo trabajado** usando el escenario de `course.config.js → scenario.name`
- **Tabla comparativa** si aplica (conceptos vs. características, antes vs. después, etc.)
- **Recuadro "Error común"** con el malentendido más frecuente
- **Recuadro "Para la evaluación"** con lo que el examen mide de este tema
- Sin emojis (el Word es sobrio)
- Moneda: `$` (nunca "quetzales" u otras)

### 3. Generar el Word (invisible)
Crea un script temporal en `_tools/`, lo ejecuta con `node` y lo elimina:
```bash
cd _tools && npm install --silent  # solo si no está instalado
node _tmp_leccionXYZ.js "ruta/salida.docx"
rm _tmp_leccionXYZ.js   # (en PowerShell: Remove-Item)
```

El script usa `lib-leccion.js` y los elementos `el.p()`, `el.h1()`, `el.h2()`, `el.table()`, `el.callout()`, etc.

### 4. Entregar
Confirma al autor:
- Ruta del archivo generado
- Número aproximado de caracteres
- Si hay más temas pendientes en la misma lección

## Carpeta de salida
`Unidad N - .../Teoría/Lección X.Y - Título.docx`

Si el archivo ya existe, pregunta antes de sobreescribir.

## Notas
- Genera SOLO el tema solicitado, no toda la lección
- Si el tema es el último de la lección, agrega la sección "Resumen de la lección" al final del Word
- Si ya existe el Word de la lección (con otros temas), añade el tema al final del archivo existente
