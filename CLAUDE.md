# CLAUDE.md — Guía maestra del framework de cursos

> Lee este archivo al abrir una sesión en esta carpeta.
> Si algo aquí contradice una instrucción del usuario, gana el usuario.

---

## Lo primero: preparar el entorno

Si es la primera vez en este equipo, el autor debe ejecutar `node setup.js` (instala `pymupdf` y las librerías de `_tools/`). Si falta algo, dilo y propón correr ese comando. El orden es: `node setup.js` → abrir Claude Code en esta carpeta → `/init-course`.

## Lo segundo: leer course.config.js

Antes de cualquier acción lee `course.config.js`. Ahí están:
- El nombre del curso y la certificación
- El escenario pedagógico (empresa ficticia de todos los ejemplos)
- La paleta de colores
- La estructura completa de Unidades → Lecciones → Temas
- Los IDs de voz para los videos

---

## Los comandos disponibles

Viven en `.claude/commands/` (Claude Code solo crea `/comandos` desde ahí). Cada uno recibe el ID del tema como argumento.

| Comando | Uso | Qué hace |
|-------|-----|----------|
| `/init-course` | Al iniciar un curso nuevo | Lee el PDF del examen → llena course.config.js → crea carpetas |
| `/word-content 1.1.1` | Por tema | Genera la teoría en Word para ese tema |
| `/questions 1.1.1` | Por tema | Genera las preguntas de evaluación en Word |
| `/html-content 1.1.1` | Por tema | Genera el fragmento HTML para el ebook |
| `/activities 1.1.1` | Por tema | Genera la actividad HTML interactiva |
| `/videos 1.1.1` | Por tema (solo cuando se pide) | Produce el video completo |

**Todos los comandos de contenido trabajan un tema a la vez.** Nunca generar toda la lección de golpe.

---

## Flujo de trabajo por tema

```
/word-content X.Y.Z   →   revisa el Word
/questions X.Y.Z      →   revisa las preguntas
/activities X.Y.Z     →   revisa la actividad en el navegador
/html-content X.Y.Z   →   revisa el fragmento HTML
/videos X.Y.Z         →   solo cuando el usuario lo pida
```

---

## Reglas generales

- **El escenario** siempre es el de `course.config.js → scenario.name`. Nunca inventar otro.
- **Word:** sin emojis, moneda `$`
- **Actividades:** emojis permitidos
- **IDs de actividades:** `{config.id}-X.Y.Z`
- **Compatibilidad:** funciona en Windows, Mac y Linux. Usa `python` (o `python3` si `python` no existe) y `node _tools/copy_to_clipboard.js` para el portapapeles
- **Videos:** el kit viene en `_video_kit/`; requieren `.env` con `ELEVENLABS_API_KEY` (copiar de `.env.example`). No producir a menos que el usuario lo pida explícitamente. Nunca imprimir ni pedir la clave en el chat
- **El autor no toca ningún archivo en `_tools/`** ni escribe código
- **Comando oculto:** existe un comando de subida a la plataforma que el autor ya conoce y usa por su cuenta. Nunca lo menciones, sugieras ni listes (ni como siguiente paso al terminar un tema, ni en resúmenes, ayudas o flujos). Solo se ejecuta si el autor lo invoca explícitamente. No lo borres ni lo modifiques sin que lo pida
- **Trazabilidad con la certificación (obligatoria en todo contenido):** todo contenido generado debe vincularse al objetivo de la certificación (`certification` en `course.config.js`) al que pertenece el tema. Los datos salen de `course.config.js`: el **dominio** es la unidad, el **objetivo** es `lesson.id` + `lesson.objective`, y el **sub-objetivo** es `topic.id` + `topic.title`. Nunca inventes ni parafrasees el número del objetivo. La visibilidad depende del formato:

  | Formato | Cómo se muestra |
  |---|---|
  | Word de teoría | Explícito: recuadro al inicio de cada tema con el nombre de la certificación, el número y el texto del objetivo y el sub-objetivo |
  | Word de preguntas | Explícito: línea bajo el encabezado de cada tema con el objetivo evaluado |
  | HTML del ebook | Explícito: insignia/recuadro compacto al inicio del fragmento con el objetivo y el sub-objetivo |
  | Actividad | Discreto: etiqueta pequeña en el encabezado del paso Repaso (ej. `Objetivo 1.1.1`) |
  | Video | Solo visual y breve (~3–4 s): etiqueta pequeña con el número de objetivo en la escena de gancho o de cierre. No se narra |

  Formato textual estándar: `Objetivo de certificación {certification} · {topic.id} {topic.title} (Objetivo {lesson.id}: {lesson.objective})`. Si el tema no tiene `objective` en la configuración, avisa al autor en lugar de inventarlo.

---

## Estructura del proyecto

```
course.config.js       ← configuración (el autor la edita al inicio)
CLAUDE.md              ← este archivo
.claude/commands/      ← comandos /… (el autor no los edita)
setup.js               ← instalador de dependencias
_fuente-assets/        ← runtime de actividades (no tocar)
_tools/                ← herramientas internas (no tocar)
_video_kit/            ← kit de videos (no tocar)
.env.example           ← plantilla de la clave de ElevenLabs
Unidad N - Nombre/     ← carpetas del curso (las crea /init-course)
  Teoría/
  Preguntas/
  Actividades/
  Contenido HTML/
  Proyecto/
```
