# Project Instructions

## Stack

- Astro 4 with React 18 islands.
- TypeScript strict mode.
- Tailwind CSS 3.
- pnpm for dependency management.

## Commands

- `pnpm dev` starts the local site.
- `pnpm build` runs Astro checks and the production build.
- `pnpm test` runs the Vitest suite.

## Dev server

- The site is served on **port 4321, and only on 4321**. The human runs it; never
  start it yourself.
- If nothing is listening on 4321, stop and tell the human. Never fall back to
  another port, never run a second instance, and never accept Astro's automatic
  port bump — a dev server on 4322 or 4330 is exactly the confusion this rule
  prevents.
- Before working with the rendered site, confirm the port instead of assuming:
  `lsof -nP -iTCP:4321 -sTCP:LISTEN`.

## Browser checks

- When the Chrome MCP is used, every tab opened for the work is closed before
  finishing: `list_pages`, then `close_page` for each one.
- The MCP cannot close the last remaining tab. Navigate it to `about:blank` and
  say so in the final message, so no tab is left pointing at a dead or stale
  server.

## Standards

- Visitor-facing copy is Spanish (`es-CL`).
- Keep TypeScript strict; do not introduce `any`, unused locals, or unused parameters.
- Prefer semantic HTML and accessible controls over clickable containers.
- Design mobile layouts first and verify narrow viewports.
- Add focused tests for pricing, domain rules, and user-facing state transitions.
- Preserve existing SEO metadata and structured data unless a task explicitly changes it.
- Use conventional commits without AI attribution.
