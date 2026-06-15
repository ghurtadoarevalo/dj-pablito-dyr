# Mejora de la vista de equipamiento

## Contexto

El sitio de DJ Pablito Dyr está construido con Astro, React, Tailwind CSS y TypeScript. La sección "Equipamiento" (`#equipment`) muestra actualmente 11 equipos en una grilla de tarjetas con imagen, cantidad, nombre y descripción. El objetivo de este cambio es elevar la percepción visual y profesional de la sección sin agregar funcionalidades ni alterar el contenido informativo.

## Objetivo

Rediseñar la sección de equipamiento para que se vea más elegante, premium y coherente con el resto del sitio, manteniendo la información actual y sin sugerir interacciones que no existen.

## Decisiones de diseño aprobadas

- **Estilo visual:** elegante y premium, manteniendo la paleta actual del sitio (fondos oscuros, acento amarillo `#facc15`, tipografía clara).
- **Estructura de información:** tarjetas limpias con poca información: imagen del equipo, cantidad (`x1`, `x2`, etc.), nombre y una descripción corta de 1-2 líneas.
- **Layout:** grid simétrico uniforme.
  - Desktop: 3 columnas.
  - Tablet: 2 columnas.
  - Móvil: 1 columna.
- **Animaciones:** solo animación de entrada al hacer scroll (fade-in suave con leve desplazamiento hacia arriba y stagger entre tarjetas). **No hay efectos hover interactivos** porque la sección es puramente informativa.
- **Accesibilidad:** respetar `prefers-reduced-motion` desactivando las animaciones para usuarios que lo tengan configurado.

## Componentes afectados

- `src/components/Equipment.astro`: tarjeta individual de equipo.
- `src/components/Equipments.astro`: contenedor de la grilla, header de sección y animación de entrada.

## Arquitectura y data flow

- No se modifica la estructura de datos del array `equipements` en `Equipments.astro`.
- Se mantienen las props actuales de `Equipment.astro`: `name`, `description`, `imgName`, `quantity`, `label`.
- Se sigue usando `astro:assets` con el componente `Image` para la optimización automática de imágenes.
- La animación de entrada se implementa con un pequeño script inline que usa `IntersectionObserver`, sin agregar dependencias externas.

## Especificaciones visuales

### Header de sección

- Título "Equipamiento" centrado.
- Subtítulo breve opcional: "Sonido, iluminación y tecnología profesional para tu evento".
- Mayor espaciado vertical que el actual.

### Tarjeta de equipo

- Fondo sutil: `bg-white/5` o similar con transparencia.
- Borde fino: `border-white/10`.
- Bordes redondeados grandes: `rounded-3xl`.
- Padding generoso.
- Imagen del equipo centrada y con protagonismo visual.
- Cantidad en texto pequeño, color amarillo de acento.
- Nombre en mayúsculas, negrita, con `tracking-wider`, color blanco puro.
- Descripción en texto pequeño, color blanco con opacidad reducida (`text-white/60`).

### Grid

- Gap amplio y consistente entre tarjetas.
- Margen lateral adecuado para no tocar los bordes de pantalla.
- Comportamiento responsive claro: 3 / 2 / 1 columnas.

## Animaciones

- Al entrar la sección en el viewport, las tarjetas aparecen con:
  - `opacity` de `0` a `1`.
  - `translateY` de `16px` a `0`.
  - Duración aproximada de `600ms` con easing `ease`.
  - Stagger de `~80ms` entre tarjetas.
- Si el usuario tiene `prefers-reduced-motion: reduce`, las animaciones se desactivan completamente.
- No se aplican transformaciones ni cambios visuales en hover.

## Error handling

- Mantener el `aria-labelledby` en el `<section>` para preservar la accesibilidad.
- Asegurar que el `alt` de las imágenes siga usando el `label` descriptivo de cada equipo.
- Verificar que el script de animación no falle si la sección no está presente en el DOM.

## Testing

- Ejecutar `pnpm build` (o `npm run build`) para verificar que Astro check y la compilación pasen sin errores.
- Revisar responsive en las vistas móvil, tablet y desktop usando las DevTools del navegador.
- Verificar contraste de textos y accesibilidad básica.
- Validar que `prefers-reduced-motion` desactive las animaciones.

## Dependencias

No se agregan nuevas dependencias. Se usan Astro, Tailwind CSS y la API nativa de `IntersectionObserver`.

## Archivos a modificar

- `src/components/Equipment.astro`
- `src/components/Equipments.astro`

## Notas

- El contenido textual de los equipos no cambia.
- No se agregan nuevas páginas ni rutas.
- El enlace del navbar a `#equipment` sigue funcionando igual.
