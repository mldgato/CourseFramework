---
description: Genera las preguntas de evaluación en Word para UN tema específico. Uso: /questions X.Y.Z
argument-hint: X.Y.Z
---

# Skill: Generar Preguntas en Word (un tema a la vez)

**Argumento recibido:** `$ARGUMENTS` (el tema, p. ej. `1.1.1`). Si viene vacío, pídelo al autor.

## Uso
```
/questions 1.1.1
```

## Lo que hace
Genera 2–5 preguntas de evaluación para el tema indicado y las agrega al Word de preguntas de la lección. El autor no toca ningún archivo de código.

## Pasos internos (invisibles para el autor)

### 1. Leer el contexto
- Lee `course.config.js` → encuentra el tema X.Y.Z
- Lee el Word de teoría del tema si ya existe (para basar las preguntas en el contenido real)

### 2. Diseñar las preguntas
**Reglas:**
- 2–5 preguntas según la complejidad del tema
- Mezcla al menos 2 tipos diferentes
- Los distractores son errores reales, no inventados
- Usa el escenario del curso en los enunciados cuando aplique
- Sin emojis

**Los 7 tipos disponibles:**

| Tipo | Descripción |
|------|-------------|
| `mc` | Opción múltiple (una correcta), respuesta inmediata |
| `ms` | Selección múltiple (varias correctas) + botón Comprobar |
| `cloze` | Completar huecos arrastrando palabras de un banco |
| `sort` | Clasificar elementos en 2–3 categorías |
| `match` | Emparejar dos columnas con `<select>` |
| `order` | Ordenar una secuencia arrastrando |
| `dragmatch` | Emparejar arrastrando palabras a sus definiciones |

### 3. Generar el Word (invisible)
Crea un script temporal, lo ejecuta y lo elimina:
```bash
node _tools/_tmp_preguntasXYZ.js "ruta/salida.docx"
```

### 4. Inyectar en la actividad (si existe)
Si ya existe la actividad HTML del tema (`Actividades/X.Y.Z Título.html`), ejecuta:
```bash
python _tools/inject_preguntas.py "Unidad N - ..."
```
Esto agrega las preguntas como último paso de la actividad.

### 5. Entregar
Confirma al autor:
- Cuántas preguntas se generaron y de qué tipos
- Ruta del Word de preguntas
- Si se inyectaron en la actividad

## Carpeta de salida
`Unidad N - .../Preguntas/Lección X.Y - Preguntas.docx`
