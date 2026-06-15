# Mejora de la vista de equipamiento — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rediseñar la sección de equipamiento del sitio DJ Pablito Dyr con un estilo premium, grid uniforme y animación de entrada sutil al scroll.

**Architecture:** Se modifican dos componentes Astro existentes: `Equipment.astro` (tarjeta individual) y `Equipments.astro` (contenedor, grid y animación). No se agregan dependencias; la animación se implementa con un script inline usando `IntersectionObserver` y clases CSS con Tailwind. El contenido y la estructura de datos permanecen iguales.

**Tech Stack:** Astro 4, Tailwind CSS 3, TypeScript, `astro:assets`.

---

## File Structure

- `src/components/Equipment.astro` — Tarjeta individual de equipo. Responsabilidad: renderizar imagen, cantidad, nombre y descripción con estilo premium. Props: `name`, `description`, `imgName`, `quantity`, `label`.
- `src/components/Equipments.astro` — Sección contenedora. Responsabilidad: header de sección, grid responsive, animación de entrada con `IntersectionObserver`.

---

### Task 1: Rediseñar la tarjeta individual `Equipment.astro`

**Files:**
- Modify: `src/components/Equipment.astro`

- [ ] **Step 1: Abrir `Equipment.astro` y revisar su estado actual**

  Leer el archivo completo: `src/components/Equipment.astro`.

- [ ] **Step 2: Reemplazar el markup de la tarjeta por la versión premium**

  Reemplazar todo el contenido del componente (frontmatter + template) con:

  ```astro
  ---
  import { Image } from "astro:assets";
  import ddj400 from "@assets/equipments/ddj400.png";
  import beam30 from "@assets/equipments/beam30.png";
  import ledLight from "@assets/equipments/ledLight.png";
  import jbl115 from "@assets/equipments/jbl115.png";
  import tvsamsung from "@assets/equipments/tvsamsung.png";
  import fogmachine from "@assets/equipments/fogmachine.png";
  import mics from "@assets/equipments/mics.png";
  import arcoatril from "@assets/equipments/arcoatril.webp";
  import ledspider from "@assets/equipments/ledspider.png";
  import lightBoard from "@assets/equipments/lightBoard.png";
  import projector from "@assets/equipments/projector.png";

  interface Props {
    name: string;
    description: string;
    imgName: string;
    quantity: number;
    label: string;
  }

  interface Dictionary<T> {
    [Key: string]: T;
  }

  const imgs: Dictionary<ImageMetadata> = {
    ddj400,
    beam30,
    ledLight,
    jbl115,
    tvsamsung,
    fogmachine,
    mics,
    arcoatril,
    ledspider,
    lightBoard,
    projector,
  };

  const { name, description, imgName, quantity, label } = Astro.props;
  ---

  <article
    class="equipment-card flex flex-col items-center rounded-3xl border border-white/10 bg-white/5 px-6 py-8 text-center"
  >
    <Image
      src={imgs[imgName]}
      alt={label}
      title={name}
      width={160}
      height={110}
      class="mb-6 h-auto w-36 object-contain"
      loading="lazy"
    />
    <p class="mb-2 text-sm font-medium text-yellow-400">×{quantity}</p>
    <h3 class="mb-3 text-base font-bold uppercase tracking-wider text-white">
      {name}
    </h3>
    <p class="max-w-xs text-sm leading-relaxed text-white/60">
      {description}
    </p>
  </article>
  ```

- [ ] **Step 3: Verificar que el componente compila**

  Run: `pnpm astro check`
  Expected: No errors in `src/components/Equipment.astro`.

- [ ] **Step 4: Commit parcial**

  ```bash
  git add src/components/Equipment.astro
  git commit -m "feat(equipment): redesign individual equipment card with premium style"
  ```

---

### Task 2: Rediseñar el contenedor `Equipments.astro`

**Files:**
- Modify: `src/components/Equipments.astro`

- [ ] **Step 1: Abrir `Equipments.astro` y revisar su estado actual**

  Leer el archivo completo: `src/components/Equipments.astro`.

- [ ] **Step 2: Reemplazar el markup de la sección por la versión premium con animación**

  Reemplazar todo el contenido del archivo (frontmatter + template) con:

  ```astro
  ---
  import Equipment from "./Equipment.astro";

  const equipements = [
    {
      name: "Pionner ddj400",
      description:
        "Controlador DJ de 2 canales para rekordbox. Todo el poder de la mezcla en un solo lugar.",
      imgName: "ddj400",
      quantity: 1,
      label:
        "Controlador Pioneer DDJ-400 - Equipo profesional de DJ usado por DJ Pablito Dyr",
    },
    {
      name: "SPOT 30W",
      description:
        "Cabezal movil led de 30 watts. Ideal para iluminar la pista con un toque profesional.",
      imgName: "beam30",
      quantity: 2,
      label:
        "Cabezal móvil LED SPOT 30W - Iluminación profesional para eventos y fiestas",
    },
    {
      name: "Luz led RGB",
      description: "Luz de escenario DJ. Led RGB de 18 luces Control DMX.",
      imgName: "ledLight",
      quantity: 10,
      label:
        "Luz LED RGB de escenario - Iluminación profesional con control DMX para eventos",
    },
    {
      name: "jbl jrx 115",
      description:
        "Sistema de altavoces de refuerzo de sonido bidireccional. Más de 1000W de potencia con el mejor sonido.",
      imgName: "jbl115",
      quantity: 2,
      label:
        "Parlantes JBL JRX 115 - Sistema de sonido profesional de 1000W para eventos",
    },
    {
      name: "Pantalla / Proyector + Telón",
      description:
        'Pantalla de 43" o Telón de 80" aproximadamente con proyector, según espacio y preferencia del cliente. Ideal para karaokes y videos acompañados con la mejor música.',
      imgName: "tvsamsung",
      quantity: 1,
      label:
        "Pantalla 43 pulgadas o Telón 80 pulgadas con proyector - Para karaoke y videos en eventos",
    },
    {
      name: "máquina de humo",
      description:
        "Máquina de humo de 1200 a 1500 Watts. Lleva tu fiesta a otro nivel.",
      imgName: "fogmachine",
      quantity: 1,
      label:
        "Máquina de humo profesional 1500W - Efectos especiales para fiestas y eventos",
    },
    {
      name: "Micrófono inhalambrico",
      description:
        "Micrófono inhalambrico de alta calidad, para que no hayan excusas para cantar y/o animar tus fiestas.",
      imgName: "mics",
      quantity: 2,
      label:
        "Micrófonos inalámbricos profesionales - Equipo de audio para karaoke y animación",
    },
    {
      name: "Spider Beam RGB",
      description: "Cabezas móviles RGB para iluminar todo al ritmo de la música",
      imgName: "ledspider",
      quantity: 2,
      label:
        "Spider Beam RGB - Cabezales móviles de iluminación LED para eventos y fiestas",
    },
    {
      name: "Atril Iluminación Carverpro",
      description:
        "Atril de iluminación doble. Ajustable de 1.8m a 3.45m de altura y 3.6m de ancho. Para todos aquellos que quieran una pista o escenario con un toque profesional.",
      imgName: "arcoatril",
      quantity: 2,
      label:
        "Atril de iluminación Carverpro - Sistema profesional de montaje de luces para eventos",
    },
    {
      name: "Pizarra Led Luminosa",
      description:
        "Pizarra Led luminosa donde se puede escribir con el nombre de los festejados o el mensaje que tú quieras.",
      imgName: "lightBoard",
      quantity: 2,
      label: "Pizarra Led luminosa - Pizarra profesional para eventos y fiestas",
    },
    {
      name: "Proyector y telón",
      description:
        "Proyector de alta resolución acompañado de un telón de gran formato. Perfecto para proyectar videos, fotografías, presentaciones o animar tu fiesta con un increíble karaoke.",
      imgName: "projector",
      quantity: 1,
      label:
        "Proyector y telón de gran formato - Equipo audiovisual profesional para videos, presentaciones y karaoke en eventos",
    },
  ];
  ---

  <section
    id="equipment"
    aria-labelledby="equipment-title"
    class="bg-zinc-800 py-16 md:py-24"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <header class="mb-12 text-center md:mb-16">
        <h2
          id="equipment-title"
          class="font-customFont text-3xl text-white md:text-4xl"
        >
          Equipamiento
        </h2>
        <p class="mx-auto mt-4 max-w-2xl text-base text-white/60">
          Sonido, iluminación y tecnología profesional para tu evento
        </p>
      </header>

      <div
        class="equipment-grid grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {
          equipements.map((equipment) => (
            <Equipment
              name={equipment.name}
              description={equipment.description}
              imgName={equipment.imgName}
              quantity={equipment.quantity}
              label={equipment.label}
            />
          ))
        }
      </div>
    </div>
  </section>

  <style>
    .equipment-card {
      opacity: 0;
      transform: translateY(1rem);
      transition:
        opacity 600ms ease,
        transform 600ms ease;
    }

    .equipment-card.is-visible {
      opacity: 1;
      transform: translateY(0);
    }

    @media (prefers-reduced-motion: reduce) {
      .equipment-card {
        opacity: 1;
        transform: none;
        transition: none;
      }
    }
  </style>

  <script>
    (function () {
      const grid = document.querySelector(".equipment-grid");
      if (!grid) return;

      const cards = grid.querySelectorAll<HTMLElement>(".equipment-card");
      if (cards.length === 0) return;

      const stagger = 80;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const index = Array.from(cards).indexOf(
                entry.target as HTMLElement,
              );
              const delay = index * stagger;
              setTimeout(() => {
                entry.target.classList.add("is-visible");
              }, delay);
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: "0px 0px -50px 0px",
        },
      );

      cards.forEach((card) => observer.observe(card));
    })();
  </script>
  ```

- [ ] **Step 3: Verificar que el componente compila**

  Run: `pnpm astro check`
  Expected: No errors en `src/components/Equipments.astro` ni `Equipment.astro`.

- [ ] **Step 4: Commit parcial**

  ```bash
  git add src/components/Equipments.astro
  git commit -m "feat(equipment): redesign equipment section grid, header and scroll animation"
  ```

---

### Task 3: Verificar build y responsive

**Files:**
- No modifications.

- [ ] **Step 1: Ejecutar el build de producción**

  Run: `pnpm build`
  Expected: El comando finaliza con éxito y no hay errores de TypeScript ni Astro.

- [ ] **Step 2: Iniciar preview y revisar visualmente**

  Run: `pnpm preview`
  Expected: El servidor de preview se levanta sin errores.

- [ ] **Step 3: Revisar responsive con DevTools**

  Abrir el sitio en el navegador y verificar:
  - Móvil (< 640px): 1 columna, tarjetas legibles, imágenes centradas.
  - Tablet (640px - 1024px): 2 columnas, espaciado consistente.
  - Desktop (> 1024px): 3 columnas, grid alineado.

- [ ] **Step 4: Validar animación de entrada**

  Hacer scroll hacia la sección "Equipamiento" y verificar:
  - Las tarjetas aparecen con fade-in suave.
  - El efecto es escalonado (cada tarjeta aparece ligeramente después que la anterior).
  - No hay efectos hover visuales al pasar el mouse.

- [ ] **Step 5: Validar accesibilidad de animación**

  Activar `prefers-reduced-motion` en el navegador y recargar la página.
  Expected: Las tarjetas se ven estáticas; no hay animación de entrada.

- [ ] **Step 6: Commit de verificación**

  Si solo se hicieron ajustes menores, commitearlos; si no, este paso se omite.

---

### Task 4: Limpieza y handoff

**Files:**
- No modifications.

- [ ] **Step 1: Detener el servidor de preview si está corriendo**

  Usar `Ctrl + C` en la terminal donde corre `pnpm preview`.

- [ ] **Step 2: Revisar git status**

  Run: `git status`
  Expected: Solo los archivos `src/components/Equipment.astro` y `src/components/Equipments.astro` están modificados/commiteados.

- [ ] **Step 3: Resumen final**

  Confirmar que:
  - El diseño visual es premium y coherente.
  - No se agregaron dependencias.
  - Las animaciones son solo de entrada y respetan `prefers-reduced-motion`.
  - El build pasa correctamente.

---

## Spec Coverage Check

- **Grid uniforme 3/2/1 columnas:** Task 2, Step 2 (`sm:grid-cols-2 lg:grid-cols-3`).
- **Tarjetas premium con poca info:** Task 1, Step 2.
- **Header de sección con aire y subtítulo:** Task 2, Step 2.
- **Animación de entrada al scroll con stagger:** Task 2, Step 2 (`<style>` y `<script>`).
- **Sin hover interactivo:** Task 1, Step 2 (no clases hover) y Task 3, Step 4.
- **Respeto a `prefers-reduced-motion`:** Task 2, Step 2 (`@media (prefers-reduced-motion: reduce)`).
- **Mantener `aria-labelledby` y `alt`:** Task 2, Step 2.
- **Build sin errores:** Task 3, Step 1.

## Placeholder Scan

- No hay TBD, TODO, "implement later" ni referencias vagas.
- Todos los pasos incluyen código o comandos concretos.
- Las rutas de archivos son exactas.
