# Services Visual Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rediseñar visualmente la sección de servicios para mejorar legibilidad usando chips consistentes por pack, manteniendo toda la información completa.

**Architecture:** Se modifica el componente `Service.tsx` para renderizar chips y una nueva estructura de card (destacada vs regular), y `Services.astro` para definir los datos de chips y reorganizar el layout en destacado + grid de 2 columnas. Tailwind CSS maneja todo el estilo responsive.

**Tech Stack:** Astro, React, TypeScript, Tailwind CSS, react-icons.

---

## Existing Context

- `src/components/Services.astro` contiene el arreglo `services` con título, precio, descripción, features, flag `featured` y mensaje de WhatsApp.
- `src/components/Service.tsx` recibe un objeto `service` y renderiza una card estilizada según `featured`.
- No hay tests unitarios configurados; la verificación se hace con `npm run build`.

---

## File Structure

| File | Responsibility |
|------|----------------|
| `src/components/Service.tsx` | Renderizar cada card de servicio con chips, precio, descripción, lista completa y botón de WhatsApp. Soportar variantes destacada y regular. |
| `src/components/Services.astro` | Definir los datos de cada pack incluyendo `chips`, reorganizar el layout (destacado arriba, regulares en grid de 2 columnas), mantener JSON-LD. |

---

### Task 1: Extender la interfaz de servicio para incluir chips

**Files:**
- Modify: `src/components/Service.tsx`
- Modify: `src/components/Services.astro`

- [ ] **Step 1: Actualizar `ServiceInterface` en `Service.tsx`**

Agregar el campo `chips` de tipo `string[]` a la interfaz:

```typescript
interface ServiceInterface {
  title: string;
  price: string;
  description: string;
  features: string[];
  chips: string[];
  featured: boolean;
  wspMessage: string;
}
```

- [ ] **Step 2: Actualizar `ServiceInterface` en `Services.astro`**

Agregar el mismo campo `chips: string[]` a la interfaz definida en el frontmatter.

- [ ] **Step 3: Agregar chips a cada pack en `Services.astro`**

Actualizar cada objeto del arreglo `services` agregando el arreglo `chips` con las categorías consistentes definidas en el diseño:

**Celebration:**
```typescript
chips: ["⏱️ 4 horas", "💡 Iluminación básica", "💰 Hora extra $25.000"]
```

**Full Dancing:**
```typescript
chips: ["⏱️ 5 horas", "🎤 Animación", "💡 Iluminación mejorada", "💨 Máquina de humo", "💰 Hora extra $30.000"]
```

**Karaoke Dancing (featured):**
```typescript
chips: ["⏱️ 6 horas", "🎤 Animación", "💡 Iluminación avanzada", "🎤 Karaoke + Pantalla", "🎙️ 2 micrófonos", "💨 Máquina de humo", "💰 Hora extra $35.000"]
```

**Gold Karaoke:**
```typescript
chips: ["⏱️ 7 horas", "🎤 Animación", "💡 Iluminación avanzada", "🎤 Karaoke + Proyector", "🎙️ 2 micrófonos", "💨 Máquina de humo", "💰 Hora extra $35.000"]
```

**Premium Infinity:**
```typescript
chips: ["⏱️ 8 horas", "🎤 Animación + Co Animación", "💡 Iluminación pro", "🎤 Karaoke + Proyector", "🎙️ 2 micrófonos", "💨 Máquina de humo", "💰 Hora extra $40.000"]
```

- [ ] **Step 4: Commit parcial**

```bash
git add src/components/Service.tsx src/components/Services.astro
git commit -m "feat(services): add chips field to service data model"
```

---

### Task 2: Rediseñar el componente `Service.tsx`

**Files:**
- Modify: `src/components/Service.tsx`

- [ ] **Step 1: Reescribir el renderizado de la card destacada**

La card destacada debe:
- Ocupar todo el ancho disponible.
- Tener fondo dorado semitransparente con borde dorado.
- Mostrar badge "Más contratado".
- Título a la izquierda, precio grande a la derecha.
- Descripción corta debajo del título.
- Fila de chips con `flex-wrap`.
- Lista completa de características.
- Botón de WhatsApp al final.

Reemplazar la rama `service.featured ? (...)` por:

```tsx
return service.featured ? (
  <article
    className="relative w-full bg-yellow-500/15 border border-yellow-500/50 px-5 py-7 rounded-3xl text-white/90 shadow-lg shadow-yellow-500/10"
    itemScope
    itemType="http://schema.org/Offer"
  >
    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3 mb-4">
      <div>
        <span className="inline-block bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
          Más contratado
        </span>
        <header className="mt-2 flex items-center gap-3 text-xl font-mono">
          <SiDiscogs className="text-2xl text-yellow-400" />
          <span itemProp="name">{service.title.toUpperCase()}</span>
        </header>
      </div>
      <div className="text-left md:text-right">
        <h2 className="text-4xl font-bold font-customFont">
          *<span itemProp="price">{service.price}</span>
        </h2>
        <meta itemProp="priceCurrency" content="CLP" />
      </div>
    </div>

    <p className="text-lg opacity-90 mb-4" itemProp="description">
      {service.description}
    </p>

    <div className="flex flex-wrap gap-2 mb-5">
      {service.chips.map((chip, index) => (
        <span
          key={`chip-featured-${index}`}
          className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg px-3 py-1.5 text-sm"
        >
          {chip}
        </span>
      ))}
    </div>

    <ul className="list-disc pl-5 mb-20 space-y-1.5 text-balance text-base opacity-95">
      {service.features.map((feature: string, index: number) => (
        <li key={`featured-${index}`}>{feature}</li>
      ))}
    </ul>

    <a
      aria-label="Chat on WhatsApp"
      href={`https://wa.me/56971768418?text=${service.wspMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      className="absolute bottom-6 left-0 right-0 mx-auto w-2/3"
    >
      <button className="w-full hover:bg-white/20 bg-white/10 text-white outline outline-2 outline-green-500/60 rounded-xl p-3 font-mono transition-colors">
        <div className="flex items-center justify-center gap-2">
          <FaWhatsapp className="text-2xl text-green-500" />
          <span className="text-lg">Contáctame</span>
        </div>
      </button>
    </a>
  </article>
) : (
```

- [ ] **Step 2: Reescribir el renderizado de la card regular**

La card regular debe:
- Tener fondo zinc oscuro con bordes redondeados.
- Título a la izquierda, precio a la derecha.
- Descripción corta.
- Fila de chips con `flex-wrap`.
- Lista completa.
- Botón de WhatsApp al final.

Reemplazar la rama `: (...)` por:

```tsx
  <article
    className="relative w-full bg-zinc-800 px-5 py-7 rounded-3xl text-white/90"
    itemScope
    itemType="http://schema.org/Offer"
  >
    <div className="flex justify-between items-start gap-3 mb-3">
      <header className="flex items-center gap-2 text-lg font-mono">
        <SiDiscogs className="text-xl text-yellow-500" />
        <span itemProp="name">{service.title.toUpperCase()}</span>
      </header>
      <h2 className="text-2xl font-bold font-customFont whitespace-nowrap">
        *<span itemProp="price">{service.price}</span>
      </h2>
      <meta itemProp="priceCurrency" content="CLP" />
    </div>

    <p className="text-base opacity-85 mb-3" itemProp="description">
      {service.description}
    </p>

    <div className="flex flex-wrap gap-2 mb-4">
      {service.chips.map((chip, index) => (
        <span
          key={`chip-standard-${index}`}
          className="bg-zinc-700 rounded-md px-2.5 py-1 text-xs"
        >
          {chip}
        </span>
      ))}
    </div>

    <ul className="list-disc pl-5 mb-20 space-y-1 text-balance text-sm opacity-90" style={{ listStyleType: "circle" }}>
      {service.features.map((feature: string, index: number) => (
        <li key={`standard-${index}`}>{feature}</li>
      ))}
    </ul>

    <a
      aria-label="Chat on WhatsApp"
      href={`https://wa.me/56971768418?text=${service.wspMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      className="absolute bottom-6 left-0 right-0 mx-auto w-2/3"
    >
      <button className="w-full hover:bg-white/20 bg-green-500/10 text-white outline outline-1 outline-green-500/80 rounded-lg p-3 font-mono transition-colors">
        <div className="flex items-center justify-center gap-2">
          <FaWhatsapp className="text-2xl text-green-500" />
          <span className="text-base">Contáctame</span>
        </div>
      </button>
    </a>
  </article>
);
```

- [ ] **Step 3: Verificar que el archivo compila**

Run:
```bash
npx astro check
```

Expected: No TypeScript errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/Service.tsx
git commit -m "feat(services): redesign service card with chips and improved layout"
```

---

### Task 3: Reorganizar el layout en `Services.astro`

**Files:**
- Modify: `src/components/Services.astro`

- [ ] **Step 1: Renderizar el pack destacado separado de los regulares**

Dentro de `<section id="services">`, reemplazar el mapeo actual de todos los servicios por un layout de dos partes:

```astro
{
  services
    .filter((service) => service.featured)
    .map((service: ServiceInterface) => <Service client:load {service} />)
}

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
  {
    services
      .filter((service) => !service.featured)
      .map((service: ServiceInterface) => <Service client:load {service} />)
  }
</div>
```

- [ ] **Step 2: Ajustar el contenedor exterior**

Asegurar que el contenedor padre no fuerce `flex-row` en desktop. Reemplazar:

```astro
<div class="flex flex-col md:grid md:grid-cols-2 lg:flex lg:flex-row gap-3 place-content-between mx-3 mt-5">
```

por:

```astro
<div class="flex flex-col gap-4 mx-3 mt-5">
```

- [ ] **Step 3: Build para verificar el layout**

Run:
```bash
npm run build
```

Expected: Build completa sin errores.

- [ ] **Step 4: Commit**

```bash
git add src/components/Services.astro
git commit -m "feat(services): reorganize layout with featured pack on top and regular grid below"
```

---

### Task 4: Ajustar lista de features para evitar duplicación con chips

**Files:**
- Modify: `src/components/Services.astro`

- [ ] **Step 1: Revisar y simplificar features**

Eliminar de cada `features` los ítems que ya están representados por chips (como "Máquina de humo", "2 micrófonos inalámbricos", horas extra) para evitar repetición visual, manteniendo el detalle técnico en la lista.

Ejemplo para **Full Dancing**, cambiar:
```typescript
features: [
  "5 horas de baile non stop",
  "DJ - Animación",
  "Playlist personalizada",
  "Iluminación mejorada: 2 LED Spider RGB, 2 Luces LED RGB 18, 2 Beam 360°, 2 Láser RGB",
  "2 atriles de iluminación",
  "Amplificación profesional",
  "2 parlantes profesionales JBL",
  "Máquina de humo",
  "2 Pantallas Led Luminosas personalizadas con el nombre del festejado(a)",
  "$30.000 por hora extra",
]
```

a:
```typescript
features: [
  "DJ - Animación · Playlist personalizada",
  "Iluminación mejorada: 2 LED Spider RGB, 2 Luces LED RGB 18, 2 Beam 360°, 2 Láser RGB",
  "2 atriles de iluminación",
  "Amplificación profesional · 2 parlantes profesionales JBL",
  "2 Pantallas Led Luminosas personalizadas con el nombre del festejado(a)",
]
```

Aplicar el mismo criterio a los 5 packs:
- Eliminar la línea de duración si existe como ítem separado.
- Eliminar "Máquina de humo" si está en chips.
- Eliminar "2 micrófonos inalámbricos" si está en chips.
- Eliminar "Karaoke" / "Videos" / "Pantalla" / "Proyector" si está en chips, manteniendo el detalle técnico cuando sea relevante.
- Eliminar la línea de hora extra (ya está en chips).

- [ ] **Step 2: Build para verificar**

Run:
```bash
npm run build
```

Expected: Build completa sin errores.

- [ ] **Step 3: Commit**

```bash
git add src/components/Services.astro
git commit -m "feat(services): deduplicate features list using chips"
```

---

### Task 5: Verificación final

**Files:**
- All modified files

- [ ] **Step 1: Build de producción**

Run:
```bash
npm run build
```

Expected:
```
Result (N files):
- 0 errors
- 0 warnings
...
[build] Complete!
```

- [ ] **Step 2: Revisión visual manual**

Abrir `dist/index.html` en un navegador o correr:
```bash
npm run preview
```

Verificar:
- Pack Karaoke Dancing aparece arriba, destacado visualmente.
- Los otros 4 packs aparecen en 2 columnas en desktop.
- Cada pack muestra sus chips consistentes.
- La lista completa sigue visible.
- El botón de WhatsApp funciona y lleva el mensaje correcto.
- En móvil todo se apila en 1 columna.

- [ ] **Step 3: Commit final**

```bash
git add .
git commit -m "feat(services): complete visual redesign with consistent chips and improved layout"
```

---

## Self-Review Checklist

- [ ] Spec coverage: chips consistentes, layout destacado + grid, información completa preservada.
- [ ] No placeholders: cada paso incluye código o comandos concretos.
- [ ] Type consistency: `ServiceInterface` incluye `chips: string[]` en ambos archivos.
- [ ] WhatsApp links y JSON-LD se mantienen.
