# Course Framework

Framework para crear cursos de certificación.
Se parte del PDF oficial del examen; Claude (Claude Code) genera, **tema por tema**, la teoría,
las preguntas, la actividad interactiva y el ebook.

```
PDF del examen ─ /init-course ─► course.config.js (unidades → lecciones → temas) + carpetas
                                         │  por cada tema X.Y.Z
                                         ▼
 /word-content → /questions → /activities → /html-content → (/videos)
```

## Datos de este repositorio

| Dato | Valor |
|------|-------|
| Curso y certificación | Definidos en `course.config.js` |
| PDF del examen | El PDF del examen del curso (en la raíz) |
| Voces de video | Jorge (por defecto) y Liz, en `course.config.js` |

## Requisitos

| Qué | Para qué | Obligatorio |
|-----|----------|-------------|
| [Claude Code](https://claude.com/claude-code) | Ejecutar los comandos | Sí |
| Node.js 18+ | Generar Word y probar actividades | Sí |
| Python 3.9+ | Leer el PDF (`pymupdf`) y convertir Word a HTML | Sí |
| Google Chrome | Renderizar los videos | Solo para `/videos` |
| Cuenta de ElevenLabs + clave API (`.env`) | Voz de los videos | Solo para `/videos` (ver [Videos](#videos-con-voces-de-elevenlabs)) |

Funciona en Windows, Mac y Linux.

## Puesta en marcha (primera vez)

1. **Clonar** el repositorio y abrir una terminal en la carpeta:
   ```
   git clone https://github.com/mldgato/CourseFramework.git
   cd CourseFramework
   ```
2. **Instalar dependencias** (un solo comando):
   ```
   node setup.js
   ```
   Instala `pymupdf` (Python), las librerías de `_tools/` (Node) y el kit de videos (`ffmpeg`, `ffprobe`), y crea el archivo `.env` si no existe.
3. **Revisar `course.config.js`**: nombre, certificación, paleta y voces. Ahí vive toda la información del curso.
4. **Abrir Claude Code en esta carpeta**:
   ```
   claude
   ```
   Los comandos `/…` se cargan al abrir la sesión. Si abriste Claude Code antes de actualizar el repo, ciérralo y ábrelo otra vez.
5. **Inicializar el curso**:
   ```
   /init-course
   ```
   Claude lee el PDF, llena `units` en `course.config.js`, crea las carpetas `Unidad N - …/` y propone un
   escenario (empresa ficticia). **Confirma o cambia el escenario**: todos los ejemplos del curso lo usan.
   Se ejecuta una sola vez.

## Producción tema por tema

Los números son el ID del tema en `course.config.js` (unidad.lección.tema). Revisa el resultado de cada paso antes de pasar al siguiente.

| Comando | Resultado | Carpeta de salida |
|---------|-----------|-------------------|
| `/word-content 1.1.1` | Teoría en Word | `Unidad N - …/Teoría/` |
| `/questions 1.1.1` | Preguntas de evaluación en Word | `…/Preguntas/` |
| `/activities 1.1.1` | Actividad HTML interactiva (ábrela en el navegador) | `…/Actividades/` |
| `/html-content 1.1.1` | Fragmento HTML del ebook | `…/Contenido HTML/` |
| `/videos 1.1.1` | Video completo con voz de ElevenLabs (solo si lo pides; requiere la clave, ver abajo) | `Videos/Unidad N/` |

## Videos con voces de ElevenLabs

`/videos X.Y.Z` escribe el guion, narra con ElevenLabs (`eleven_v3`), anima y renderiza el `.mp4` completo (intro, contenido, cierre). El kit ya viene en `_video_kit/`; solo falta tu clave:

1. **Crear la clave API** en [elevenlabs.io](https://elevenlabs.io) → *Developers* → *API Keys* → *Create API Key*. Con el plan gratuito solo funcionan voces predefinidas; para las voces de la biblioteca (Jorge, Liz) hace falta un plan de pago.
2. **Crear tu `.env`** en la raíz del proyecto (`node setup.js` ya lo copia; si no existe):
   ```
   # Mac / Linux
   cp .env.example .env
   # Windows (PowerShell)
   Copy-Item .env.example .env
   ```
3. **Pegar la clave** en `.env`, sin comillas ni espacios:
   ```
   ELEVENLABS_API_KEY=tu_clave
   ```
   `.env` está en `.gitignore`: nunca se sube a git. No pegues la clave en el chat ni en `.env.example`.
4. **Verificar** (opcional pero recomendado):
   ```
   python _video_kit/kit.py doctor      # todo debe decir OK
   python _video_kit/kit.py selftest    # video de prueba, sin gastar créditos
   ```
5. **Logo del curso** (opcional): copia tu logo como `LogoCurso.png` en la raíz. Aparece en la intro de cada video; si no existe, la intro muestra el nombre del curso.
6. **Voces**: se definen en `course.config.js → voices` (nombre → ID de voz de ElevenLabs). Para usar otra, agrega su ID ahí y pide `/videos 1.1.1 con la voz Liz`.

Notas:
- Narrar **gasta créditos** (≈ un crédito por carácter, ~2,000 por video). Un `narration.mp3` existente nunca se regenera sin pedirlo.
- Requiere Node.js 22+ y Google Chrome. El primer render descarga HyperFrames con `npx` (necesita internet).
- Los `.mp4` y `.mp3` no van a git; respáldalos aparte.

## Solución de problemas

| Síntoma | Causa y solución |
|---------|------------------|
| `Unknown command: /init-course` | Claude Code se abrió fuera de esta carpeta o antes de actualizar el repo. Ciérralo y ábrelo con `claude` dentro de `CourseFramework`. |
| `No module named 'fitz'` | Falta `pymupdf`: ejecuta `node setup.js` (o `pip install -r requirements.txt`). |
| `Cannot find module 'docx'` | Falta instalar `_tools`: ejecuta `node setup.js` (o `cd _tools && npm install`). |
| `python3` no existe (Windows) | Usa `python`. Los comandos deciden cuál existe. |
| `/videos`: no encuentra `ELEVENLABS_API_KEY` | Falta `.env` en la raíz o la clave sigue como `pega_aqui_tu_clave`. Ver [Videos](#videos-con-voces-de-elevenlabs). |
| `/videos`: falta ffmpeg / venv | Ejecuta `python _video_kit/kit.py setup` (o `node setup.js`). |
| `/videos`: `402 paid_plan_required` | La voz es de biblioteca y tu plan de ElevenLabs es gratuito: usa una voz predefinida o sube de plan. |
| `/videos`: `401` de ElevenLabs | La clave es incorrecta o fue revocada: genera otra y actualiza `.env`. |

## Estructura

```
course.config.js     ← configuración del curso (el autor la edita al inicio)
CLAUDE.md            ← guía que Claude lee al abrir la sesión
setup.js             ← instalador de dependencias (node setup.js)
requirements.txt     ← dependencias de Python
.claude/commands/    ← los comandos /init-course, /word-content, … (no editar)
_fuente-assets/      ← runtime de actividades (no tocar)
_tools/              ← herramientas internas (no tocar)
_video_kit/          ← kit de videos (no tocar); herramientas en _video_kit/entorno/ (las crea setup)
.env.example         ← plantilla de la clave de ElevenLabs (copiar a .env)
Videos/              ← videos y control de avance (lo crea /videos)
Unidad N - …/        ← contenido del curso (lo crea /init-course)
```
