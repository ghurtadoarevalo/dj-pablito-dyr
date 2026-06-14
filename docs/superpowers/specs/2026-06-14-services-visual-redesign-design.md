# Diseño: Rediseño visual de la sección Servicios

## Fecha
2026-06-14

## Estado
Aprobado por el usuario.

## Contexto
La sección de servicios del sitio de DJ Pablito Dyr muestra 5 packs con listas extensas de características. El usuario reportó que la sección se veía cargada de texto y poco legible, pero sin perder la información completa de lo que incluye cada pack.

## Objetivo
Mejorar la legibilidad y jerarquía visual de la sección de servicios manteniendo toda la información de cada pack, y haciendo evidente la diferencia entre planes.

## Enfoque seleccionado
**Opción C: Mixto con chips destacados + lista completa.**
- Cada card muestra chips con los atributos más relevantes del pack.
- Debajo de los chips se conserva la lista completa de características.
- El pack destacado (Karaoke Dancing) ocupa todo el ancho y recibe tratamiento visual especial.
- Los otros 4 packs se muestran en una cuadrícula de 2 columnas.

## Estructura visual

### Pack destacado (Karaoke Dancing)
- Ocupa el 100% del ancho disponible.
- Fondo dorado semitransparente (`rgba(251, 191, 36, 0.12)`) con borde dorado.
- Badge "Más contratado" en la esquina superior.
- Título del pack a la izquierda, precio grande a la derecha.
- Descripción corta debajo del título.
- Fila de chips con categorías consistentes.
- Lista completa de características.
- Botón de contacto al final del card.

### Packs regulares (Celebration, Full Dancing, Gold Karaoke, Premium Infinity)
- Se muestran en cuadrícula de 2 columnas en desktop.
- Fondo zinc oscuro (`#27272a`) con bordes redondeados.
- Título a la izquierda, precio a la derecha.
- Descripción corta.
- Fila de chips con categorías consistentes.
- Lista completa de características.
- Botón de contacto al final de cada card.

## Categorías consistentes de chips
Cada pack muestra chips de las siguientes categorías cuando aplica:

| Categoría | Icono | Valores posibles |
|-----------|-------|------------------|
| Duración | ⏱️ | 4 horas, 5 horas, 6 horas, 7 horas, 8 horas |
| Animación | 🎤 | DJ, Animación, Animación + Co Animación |
| Iluminación | 💡 | Básica, Mejorada, Avanzada, Pro |
| Karaoke / Pantalla / Proyector | 🎤 | Pantalla, Karaoke + Pantalla, Karaoke + Proyector |
| Micrófonos | 🎙️ | 2 micrófonos |
| Máquina de humo | 💨 | Máquina de humo |
| Hora extra | 💰 | Hora extra $X |

## Datos por pack

### Celebration — $150.000
- **Chips:** ⏱️ 4 horas, 💡 Iluminación básica, 💰 Hora extra $25.000
- **Lista:** DJ · Playlist personalizada · Iluminación: 2 LED Spider RGB, 2 Luces LED 18 RGB, 2 Beam 360° · 2 atriles · Amplificación profesional · 2 parlantes JBL · 2 Pantallas Led Luminosas

### Full Dancing — $200.000
- **Chips:** ⏱️ 5 horas, 🎤 Animación, 💡 Iluminación mejorada, 💨 Máquina de humo, 💰 Hora extra $30.000
- **Lista:** DJ + Animación · Playlist personalizada · Iluminación mejorada: 2 Spider RGB, 2 LED RGB 18, 2 Beam 360°, 2 Láser RGB · 2 atriles · Amplificación · 2 parlantes JBL · Máquina de humo · 2 Pantallas Led Luminosas

### Karaoke Dancing — $250.000 (destacado)
- **Chips:** ⏱️ 6 horas, 🎤 Animación, 💡 Iluminación avanzada, 🎤 Karaoke + Pantalla, 🎙️ 2 micrófonos, 💨 Máquina de humo, 💰 Hora extra $35.000
- **Lista:** DJ + Animación · Playlist personalizada · Iluminación avanzada: 2 LED Spider RGB, 4 Luces LED RGB 18, 2 Beam 360°, 2 Láser RGB · 2 atriles o arco · Videos · Karaoke · Amplificación profesional · 2 parlantes JBL · 2 Pantallas Led Luminosas

### Gold Karaoke — $320.000
- **Chips:** ⏱️ 7 horas, 🎤 Animación, 💡 Iluminación avanzada, 🎤 Karaoke + Proyector, 🎙️ 2 micrófonos, 💨 Máquina de humo, 💰 Hora extra $35.000
- **Lista:** DJ + Animación · Playlist personalizada · Iluminación avanzada: 2 Spider RGB, 6 LED RGB 18, 2 Beam RGB 360°, 3 Láser RGB · 2 atriles o arco · Telón · Proyector · Videos · Karaoke · 2 micrófonos · Amplificación · 2 parlantes JBL · Máquina de humo · 2 Pantallas Led Luminosas

### Premium Infinity — $400.000
- **Chips:** ⏱️ 8 horas, 🎤 Animación + Co Animación, 💡 Iluminación pro, 🎤 Karaoke + Proyector, 🎙️ 2 micrófonos, 💨 Máquina de humo, 💰 Hora extra $40.000
- **Lista:** DJ + Animación · Co Animación (si fuese necesario) · Playlist personalizada · Iluminación pro: 2 Spider RGB, 10 LED RGB 18, 2 Beam RGB 360°, 3 Láser RGB · Arco de iluminación Full · Telón · Proyector · Videos · Karaoke · 2 micrófonos · Amplificación · 2 parlantes JBL · Máquina de humo · 2 Pantallas Led Luminosas

## Responsive
- Desktop: pack destacado a ancho completo + 4 packs en 2 columnas.
- Tablet: mantener 2 columnas para packs regulares si el ancho lo permite; de lo contrario, 1 columna.
- Mobile: todos los packs en 1 columna, chips con `flex-wrap`.

## Componentes a modificar
- `src/components/Services.astro`: actualizar la estructura de presentación de los cards y la información adicional.
- `src/components/Service.tsx`: adaptar el componente React para soportar chips, precio alineado a la derecha, botón más visible, y variantes destacada/regular.

## Notas
- Se mantiene toda la información textual original; no se oculta contenido tras interacciones.
- Se conservan los enlaces de WhatsApp por pack.
- Se conserva el structured data (JSON-LD) de ofertas.
- Se mantiene la sección informativa inferior sobre traslado, pago y beneficios adicionales.
