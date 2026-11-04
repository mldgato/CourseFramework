# Course Framework

Framework para crear cursos de certificación y publicarlos en Smart C3 (Xperienceed).
Se parte del PDF oficial del examen; Claude (Claude Code) genera, **tema por tema**, la teoría,
las preguntas, la actividad interactiva y el ebook, y los sube a la plataforma.

```
PDF del examen ─ /init-course ─► course.config.js (unidades → lecciones → temas) + carpetas
                                         │  por cada tema X.Y.Z
                                         ▼
 /word-content → /questions → /activities → /html-content → /upload → (/videos)
```

## Datos de este repositorio

| Dato | Valor |
|------|-------|
| Curso | Data Analytics (`id: data-analytics`) |
| Certificación | ITS: Data Analytics |
| PDF del examen | `ITS OD 202 Data Analytics 0525.pdf` (en la raíz) |
| ID en la plataforma | `DA-FULL-01` |
| Voces de video | Jorge (por defecto) y Liz, en `course.config.js` |

## Requisitos

| Qué | Para qué | Obligatorio |
|-----|----------|-------------|
| [Claude Code](https://claude.com/claude-code) | Ejecutar los comandos | Sí |
| Node.js 18+ | Generar Word y probar actividades | Sí |
| Python 3.9+ | Leer el PDF (`pymupdf`) y convertir Word a HTML | Sí |
| Chrome + extensión Claude in Chrome | `/upload` a Smart C3 | Solo para subir |
| `_video_kit/` + clave ElevenLabs en `_video_kit/.env` | `/videos` | Solo para videos (el kit **no** viene en este repo) |

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
   Instala `pymupdf` (Python) y las librerías de `_tools/` (Node).
3. **Revisar `course.config.js`**: nombre, certificación, paleta y voces. Ya viene llenado para Data Analytics.
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
| `/upload 1.1.1` | Sube a Smart C3 (acepta `actividad`, `html` o `video`) | Smart C3 |
| `/videos 1.1.1` | Video completo (solo si lo pides; requiere `_video_kit/`) | `Videos/` |

Para `/upload`: inicia tú sesión en Smart C3 antes. Claude nunca escribe contraseñas.

## Solución de problemas

| Síntoma | Causa y solución |
|---------|------------------|
| `Unknown command: /init-course` | Claude Code se abrió fuera de esta carpeta o antes de actualizar el repo. Ciérralo y ábrelo con `claude` dentro de `CourseFramework`. |
| `No module named 'fitz'` | Falta `pymupdf`: ejecuta `node setup.js` (o `pip install -r requirements.txt`). |
| `Cannot find module 'docx'` | Falta instalar `_tools`: ejecuta `node setup.js` (o `cd _tools && npm install`). |
| `python3` no existe (Windows) | Usa `python`. Los comandos deciden cuál existe. |
| `/videos` falla | Falta `_video_kit/` y su `.env`. Es opcional; pídelo al responsable del framework. |
| El pegado en Smart C3 no toma | Pasa a veces: verifica el contenido en el editor y repite. Detalles en `.claude/commands/upload.md`. |

## Estructura

```
course.config.js     ← configuración del curso (el autor la edita al inicio)
CLAUDE.md            ← guía que Claude lee al abrir la sesión
setup.js             ← instalador de dependencias (node setup.js)
requirements.txt     ← dependencias de Python
.claude/commands/    ← los comandos /init-course, /word-content, … (no editar)
_fuente-assets/      ← runtime de actividades (no tocar)
_tools/              ← herramientas internas (no tocar)
_video_kit/          ← kit de videos (opcional, no incluido)
Unidad N - …/        ← contenido del curso (lo crea /init-course)
```
