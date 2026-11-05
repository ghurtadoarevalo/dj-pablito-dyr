---
target: la página completa (index.astro)
total_score: 21
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 3
target_identity: "file:/Users/n4m999/Documents/Repos/dj-pablito-dyr/src/pages/index.astro"
target_fingerprint: "sha256:1475fa5ca7468d9048e0f91410471266094bf56edbc4a2a8a181b3261921ae5b"
target_path: /Users/n4m999/Documents/Repos/dj-pablito-dyr/src/pages/index.astro
timestamp: 2026-11-05T05-44-27Z
slug: src-pages-index-astro
---
# Critique: página completa (`src/pages/index.astro`)

Método: ⚠️ DEGRADED — single-context (`sub-agent spawn failed: Permission denied: subagent`). A y B corridas en secuencia, A terminada antes de que B entrara a la síntesis.

## Veredicto de especificidad de diseño

**Evaluación LLM**: La página tiene dos piezas genuinamente autoradas y cinco que podría publicar cualquier DJ de Instagram. El hero (ground de consola al 90% de scrim, lockup de marca a 420px con pulse, precio ancla en Bebas ámbar) y el sistema de precios (plan rows desplegables, comparador de dos packs, resumen sticky) son de esta marca y de ninguna otra: "Numbers Are Content" sostenido de punta a punta. Testimonios, Mixes y Bio son la categoría por defecto: carrusel de reseñas de Instagram, grilla de miniaturas de YouTube con botón de play, y tres párrafos de "soy un amante de la música". Un competidor cambiaría el logo y el handle y el 70% restante seguiría funcionando igual.

**Scan determinista**: 1 hallazgo. `overused-font` en `src/layouts/Layout.astro:216` (Google Fonts: Montserrat), severidad `warning`, categoría `slop`. Es falso positivo contra el sistema: `DESIGN.md` fija el par Bebas Neue + Montserrat como compromiso de marca (The Two Families Rule). El detector señala el cuerpo, no la display. No se corrige.

**Overlays visuales**: inyección exitosa en el servidor de visualización (`:8400`), consola del navegador: `[impeccable] No anti-patterns found.` El overlay no dibuja nada porque el detector de DOM no encuentra patrones; el único hallazgo del CLI es de fuente, que el overlay no evalúa.

## Puntaje de salud de diseño

| # | Heurística | Puntaje | Problema clave |
|---|---|---|---|
| 1 | Visibility of System Status | 2 | El botón de pausa del carrusel informa un movimiento que no ocurre: el estado que declara es falso. |
| 2 | Match System / Real World | 3 | Español chileno natural y precios en CLP; "Mixes" y "Barwoman/Garzones" conviven sin glosa. |
| 3 | User Control and Freedom | 3 | Pausa, flechas, Escape en el menú móvil, formulario libre; no hay trampas. |
| 4 | Consistency and Standards | 2 | 5 de 8 etiquetas de nav no coinciden con el H2 al que llevan; Testimonios rompe el ritmo de sección; borde ámbar de 2px en tarjeta; glifos Unicode como iconos. |
| 5 | Error Prevention | 3 | Validación inline, selects con opción por defecto, fecha con `color-scheme: dark`; sin acciones destructivas. |
| 6 | Recognition Rather Than Recall | 3 | Precios y packs visibles, pero el comparador exige recordar qué pack se eligió antes. |
| 7 | Flexibility and Efficiency | n/a | Superficie Persuade: no hay flujo experto que acelerar. |
| 8 | Aesthetic and Minimalist Design | 2 | Hero impecable; Mixes carga 12 marcas ámbar y Bio un muro de 130 palabras sin respiro. |
| 9 | Error Recovery | 3 | `role="alert"` con foco al primer campo inválido y mensajes en español. |
| 10 | Help and Documentation | n/a | El FAQ es contenido de producto, no documentación de uso. |
| **Total** | | **21/32** | **Aceptable (66%)** |

## Carga cognitiva

Checklist de 8: **3 fallas → carga moderada.**

- **Chunking (falla)**: Testimonios monta 14 slides (7 reales duplicados) y Mixes 6 tarjetas equivalentes; ningún grupo se queda en ≤4.
- **Jerarquía visual (falla parcial)**: en Mixes las 6 tarjetas pesan exactamente lo mismo, con el mismo botón ámbar en el centro; nada dice cuál mirar primero.
- **Memoria de trabajo (falla)**: el comparador de packs obliga a recordar la selección anterior para interpretar la diferencia.
- **Divulgación progresiva (bien)**: los packs abren en `<details>`, con el recomendado abierto.
- **Un foco (bien)**: cada sección tiene una sola tarea; el hero resuelve "qué es y cuánto".

Puntos de decisión con más de 4 opciones visibles: el ledger de estilos del hero (8), la grilla de Mixes (6), el carrusel (14 slides).

## Viaje emocional

Apertura fuerte: consola + crest + precio resuelven identidad y costo antes del primer scroll. El pico es el hero. Testimonios entra inmediatamente como prueba social y sostiene la confianza, pero llega antes de que el visitante sepa qué se vende en detalle. El valle está en **Bio**: tres párrafos sin acción, precedidos por una selfie con dominante magenta que contradice la fotografía nocturna y el crest dorado; es el punto donde el interés personal no tiene salida. El cierre (Contacto) es correcto y el pie remata con el crédito del desarrollador como último elemento visible, un anticlímax después de la marca.

## Lo que funciona

1. **El hero como objeto iluminado.** Ground de consola al 90% de scrim, crest a 420px respirando con pulse de 4s y el precio ancla a escala de display: tres decisiones que solo tienen sentido con este negocio y que sostienen el posicionamiento en la primera pantalla.
2. **El argumento del precio, sostenido.** Plan rows con horas en display, comparador de dos packs y resumen sticky: la regla "los números son contenido" se cumple en toda la página, no solo en el hero.
3. **La densidad por hairline.** Secciones separadas por `border-t border-line` en vez de aire: nueve bloques que se leen como un set continuo, sin la respiración de landing genérica.

## Problemas prioritarios

1. **[P1] Testimonios: el carrusel automático no avanza.**
   - **Qué**: medido en Chrome a 1440×900, con `prefers-reduced-motion` apagado y pausa en "reproducir": **0 px/s**. Causa raíz: `track.scrollLeft += 0.028 * 16 ≈ 0.45` por frame, pero `scrollLeft` cuantiza a enteros — `element.scrollLeft = 100.4` vuelve a leerse como `100`. El incremento fraccionario se descarta en cada frame y nunca acumula.
   - **Por qué importa**: el botón declara "Pausar el carrusel" y la ayuda invita a "pausa el movimiento". Ninguna de las dos cosas existe: el control miente y la sección queda estática con tres controles que solo dos cumplen. En la sección que carga la prueba social.
   - **Arreglo**: acumular en coma flotante y aplicar solo la parte entera (`acc += SPEED*delta; const whole = Math.trunc(acc); if (whole) { track.scrollLeft += whole; acc -= whole; }`).
   - **Comando sugerido**: `$impeccable harden`

2. **[P1] Mixes: doce marcas ámbar en una sección.**
   - **Qué**: cada tarjeta lleva un círculo ámbar de 56px con un `▶` y una etiqueta "YOUTUBE" también ámbar. Seis tarjetas = 12 marcas del único acento, más el botón de canal. La sección además repite en el pie "6 mixes · 6 noches de fiesta", contando lo que el ojo ya cuenta.
   - **Por qué importa**: rompe la Scarcity Rule que el resto del sitio respeta; el acento deja de señalar y pasa a ser decoración de grilla. Y "YOUTUBE" seis veces repite el dato que el lead ya dice una vez.
   - **Arreglo**: un solo elemento ámbar por tarjeta — el play pasa a borde hairline con glifo en `paper` y se enciende en ámbar solo en hover; eliminar la etiqueta "YOUTUBE" y la línea de conteo.
   - **Comando sugerido**: `$impeccable quieter`

3. **[P1] Bio: la foto contradice la marca y el texto no tiene salida.**
   - **Qué**: el retrato es una selfie con dominante magenta y ventana quemada, la única imagen humana de la página. En móvil mide 585px de alto: la primera pantalla de Bio es 100% esa foto. Debajo, 130 palabras en tres párrafos sin subtítulo ni acción; la sección cierra con cuatro iconos sociales.
   - **Por qué importa**: es el punto donde el visitante decide si este señor es serio. La foto dice "celular en el local" mientras el crest y la consola dicen "producción". Y quien llega hasta acá ya está interesado: no hay ningún camino a packs o WhatsApp.
   - **Arreglo**: pedir un retrato profesional del cliente en la misma luz cálida del hero; si no existe, recortar la actual a un plano más cerrado y reducirla a 320px de alto en móvil, con el texto primero. Cerrar la sección con la acción principal.
   - **Comando sugerido**: `$impeccable layout`

4. **[P2] La navegación no nombra las secciones a las que lleva.**
   - **Qué**: 5 de 8 etiquetas no coinciden con el H2 destino — "Equipos"→"Equipamiento", "Biografía"→"Bio", "Precios"→"Packs y precios", "Eventos"→"Así se vive", "Preguntas"→"Preguntas frecuentes". Además "Testimonios" no tiene entrada en el nav.
   - **Por qué importa**: `DESIGN.md` exige que cada ítem nombre la sección donde aterriza; incumplido, el visitante que usa el nav y luego lee el título no puede confirmar que llegó.
   - **Arreglo**: renombrar los ítems al título real (o los H2 al ítem) y decidir si Testimonios merece entrada.
   - **Comando sugerido**: `$impeccable clarify`

5. **[P2] Testimonios: borde ámbar de 2px y ayuda redundante.**
   - **Qué**: la tarjeta destacada lleva `border-l-2 border-l-accent`, borde izquierdo de color >1px que el craft floor prohíbe y que además no se explica: nada dice por qué esa reseña merece un filo ámbar. La línea "Desliza, usa las flechas o pausa el movimiento" explica controles que ya tienen etiqueta accesible.
   - **Por qué importa**: el filo parece un error de CSS, no una distinción; y la ayuda compite con el CTA "Ver más reseñas en Instagram" en la misma fila.
   - **Arreglo**: quitar el borde y marcar la destacada con una chip del sistema ("Más elegido" pattern) o no marcarla; borrar la línea de ayuda.
   - **Comando sugerido**: `$impeccable distill`

## Banderas por persona

**Jordan (primerizo)**: lee "EQUIPOS" en el nav, aterriza en un título que dice "Equipamiento" y duda si es la misma página. En Mixes ve seis miniaturas con caras de YouTube y un play: no sabe si son mixes completos, reels o videos de eventos hasta leer el lead. En Testimonios aprieta pausa, luego play, y nada se mueve: concluye que la página está rota.

**Casey (móvil distraída)**: en Testimonios los controles (←, →, pausa) están arriba a la izquierda, fuera de la zona del pulgar, mientras las tarjetas ocupan el centro. Mixes mide 1954px en móvil: **2,2 pantallas** de tarjetas idénticas antes de llegar a packs. Bio arranca con 585px de selfie antes de una sola palabra. El formulario, en cambio, está bien: campos grandes, validación inline.

**Riley (rompe todo)**: encuentra el carrusel congelado y el botón de pausa que no pausa nada. Cambia `prefers-reduced-motion` y el botón sigue diciendo "Pausar". Abre una tarjeta de Mixes cuyo thumbnail de YouTube trae barras negras porque el `maxresdefault` de ese video no es 16:9 puro: la grilla queda despareja. En el comparador de packs elige el mismo pack dos veces y el sitio responde correctamente, pero tiene que recordar la selección anterior para leer la diferencia.

## Observaciones menores

- Ritmo de sección: Testimonios usa `pt-8 pb-12 md:pt-10 md:pb-16` mientras el sistema fija `py-12 md:py-20`; es la única sección con aire distinto.
- Bio usa `text-paper/75` en dos párrafos; el valor documentado para copy primario suavizado es `/80`.
- Los glifos `←`, `→`, `❚❚`, `▶` hacen de iconos en Testimonios y Mixes; la página no tiene sistema de iconos y estos cuatro salen de la fuente del sistema.
- El pie cierra con el crédito del desarrollador como último elemento: el último mensaje de la página es de otra marca.
- Consola en desarrollo: un aviso "A form field element should have an id or name attribute" que ningún campo real reproduce (los 6 del DOM tienen `id`); viene de un embed.

## Preguntas para pensar

1. Si el carrusel de testimonios no se mueve, ¿por qué existe el botón de pausa? ¿Y si en vez de carrusel fueran tres reseñas fijas, elegidas por fuerza de mensaje?
2. ¿Una grilla de seis miniaturas de YouTube prueba que este DJ anima una fiesta, o prueba que tiene un canal? ¿Qué pondrías en su lugar para un matrimonio?
3. La Bio cuenta la historia de una persona; el resto del sitio vende una productora. ¿Cuál de las dos es la marca, y por qué la foto no coincide con ninguna?
4. ¿Qué pasaría si Mixes y Testimonios se unificaran en una sola sección de prueba real, en vez de dos grillas equivalentes?
5. ¿Cuánto de la página sobrevive si le cambiás el logo? Eso mide cuánto es marca y cuánto es plantilla.
