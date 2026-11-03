# Course Framework

Framework para crear cursos de certificación publicados en Smart C3 (Xperienceed).

## Inicio rápido

### 1. Configura tu curso
Edita `course.config.js` con el nombre, certificación, paleta y voces de tu curso.

### 2. Coloca el PDF del examen
Copia el PDF de objetivos oficiales en la raíz de esta carpeta.

### 3. Inicializa el curso
Abre esta carpeta con Claude Code y ejecuta:
```
/init-course
```
Claude leerá el PDF, llenará la estructura de unidades/lecciones/temas en `course.config.js` y creará todas las carpetas.

### 4. Produce contenido tema a tema
```
/word-content 1.1.1    → teoría en Word
/questions 1.1.1       → preguntas de evaluación
/activities 1.1.1      → actividad interactiva HTML
/html-content 1.1.1    → fragmento para el ebook
/upload 1.1.1          → sube a Smart C3
/videos 1.1.1          → video (solo cuando se necesite)
```

## Dependencias
- Node.js ≥ 18 + npm
- Python 3.9+ con `pymupdf` (`pip3 install pymupdf`)
- ElevenLabs API key en `_video_kit/.env` (solo para videos)
- Chrome con extensión Claude in Chrome (solo para subida a SmartC3)

## Estructura
```
course.config.js    ← configura aquí tu curso
_fuente-assets/     ← runtime de actividades (no modificar)
_tools/             ← herramientas internas (no modificar)
_video_kit/         ← pipeline de videos (no modificar)
Unidad N - .../     ← contenido del curso (lo crea /init-course)
```
