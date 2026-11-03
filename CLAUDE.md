# CLAUDE.md — Guía maestra del framework de cursos

> Lee este archivo al abrir una sesión en esta carpeta.
> Si algo aquí contradice una instrucción del usuario, gana el usuario.

---

## Lo primero: leer course.config.js

Antes de cualquier acción lee `course.config.js`. Ahí están:
- El nombre del curso y la certificación
- El escenario pedagógico (empresa ficticia de todos los ejemplos)
- La paleta de colores
- La estructura completa de Unidades → Lecciones → Temas
- Los IDs de voz para los videos

---

## Los skills disponibles

| Skill | Uso | Qué hace |
|-------|-----|----------|
| `/init-course` | Al iniciar un curso nuevo | Lee el PDF del examen → llena course.config.js → crea carpetas |
| `/word-content 1.1.1` | Por tema | Genera la teoría en Word para ese tema |
| `/questions 1.1.1` | Por tema | Genera las preguntas de evaluación en Word |
| `/html-content 1.1.1` | Por tema | Genera el fragmento HTML para el ebook |
| `/activities 1.1.1` | Por tema | Genera la actividad HTML interactiva |
| `/videos 1.1.1` | Por tema (solo cuando se pide) | Produce el video completo |
| `/upload 1.1.1` | Por tema | Sube el contenido a Smart C3 |

**Todos los skills de contenido trabajan un tema a la vez.** Nunca generar toda la lección de golpe.

---

## Flujo de trabajo por tema

```
/word-content X.Y.Z   →   revisa el Word
/questions X.Y.Z      →   revisa las preguntas
/activities X.Y.Z     →   revisa la actividad en el navegador
/html-content X.Y.Z   →   revisa el fragmento HTML
/upload X.Y.Z         →   sube a Smart C3
/videos X.Y.Z         →   solo cuando el usuario lo pida
```

---

## Reglas generales

- **El escenario** siempre es el de `course.config.js → scenario.name`. Nunca inventar otro.
- **Word:** sin emojis, moneda `$`
- **Actividades:** emojis permitidos
- **IDs de actividades:** `{config.id}-X.Y.Z`
- **Videos:** no producir a menos que el usuario lo pida explícitamente
- **El autor no toca ningún archivo en `_tools/`** ni escribe código

---

## Estructura del proyecto

```
course.config.js       ← configuración (el autor la edita al inicio)
CLAUDE.md              ← este archivo
.claude/agents/        ← skills (el autor no los edita)
_fuente-assets/        ← runtime de actividades (no tocar)
_tools/                ← herramientas internas (no tocar)
_video_kit/            ← kit de videos (no tocar)
Unidad N - Nombre/     ← carpetas del curso (las crea /init-course)
  Teoría/
  Preguntas/
  Actividades/
  Contenido HTML/
  Proyecto/
```
