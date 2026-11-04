---
description: Produce el video para UN tema específico (guion, narración, animación, render). Uso: /videos X.Y.Z
argument-hint: X.Y.Z
---

# Skill: Producir Video (un tema a la vez)

**Argumento recibido:** `$ARGUMENTS` (el tema, p. ej. `1.1.1`). Si viene vacío, pídelo al autor.

## Uso
```
/videos 1.1.1
```

## Prerequisito
La carpeta `_video_kit/` debe existir en la raíz del proyecto. Si no existe, avisa al autor que el kit de videos no está instalado (ver README) y detente.

El archivo `_video_kit/.env` debe existir con:
```
ELEVENLABS_API_KEY=sk-...
```
Si no existe, pedirlo al autor antes de continuar.

## Lo que hace
Produce el video completo del tema: guion → narración con ElevenLabs → animación → render.

## Pasos (invisibles para el autor salvo en puntos de revisión)

### 1. Scaffolding
```bash
python _video_kit/kit.py scaffold X.Y.Z
```
Crea `Videos/Unidad N/_fuente_X.Y.Z/` con la estructura de trabajo.

### 2. Escribir el guion
Lee el Word de teoría del tema y el PDF del examen. Escribe `SCRIPT.md` con:
- **330–460 palabras** (2–3 min)
- Español neutro; cifras y términos técnicos en palabras
- **Sin mencionar el examen, la certificación ni el nombre del proveedor**
- Ejemplos con el escenario de `course.config.js → scenario.name`
- Etiquetas de tono `[curious]`/`[warmly]`/`[softly]` al inicio de frases clave
- Moneda: "dólares"

**⏸ Punto de revisión:** muestra el guion al autor y espera aprobación antes de narrar.

### 3. Narrar
Lee `course.config.js → voices` para elegir la voz. Si no está especificada para esta lección, usa `voices.default`.
```bash
python _video_kit/kit.py narrate X.Y.Z --voice VOICE_ID --voice-name NombreVoz
```

**⏸ Punto de revisión:** muestra `cues.txt` al autor para verificar que la voz no leyó etiquetas de tono ni deformó términos. Corregir con `narrate --force` si es necesario.

### 4. Construir y renderizar
```bash
python _video_kit/tools/build_anim.py X.Y.Z
python _video_kit/tools/assemble_scenes.py X.Y.Z
python _video_kit/tools/snap_ends.py X.Y.Z
python _video_kit/kit.py render X.Y.Z
python _video_kit/tools/check_video.py X.Y.Z
```

### 5. Entregar
- Ruta del video generado
- Duración
- Si pasó la verificación

## Estructura del video
- Intro 3 s: logo del curso
- Contenido narrado con motion graphics
- Cierre ~4.6 s: logo de la institución

## Nota
Los archivos `.mp4` y `.mp3` **no van a git** (están en `.gitignore`). Solo se versionan guiones y el kit.
