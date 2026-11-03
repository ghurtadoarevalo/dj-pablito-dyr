import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// Visitor-facing copy is Chilean Spanish (es-CL), which uses tuteo, never voseo.
// Testimonials in src/data quote real Instagram comments and are out of scope.
const ROOTS = ["src/components", "src/layouts", "src/pages"];
const VOSEO = [
  /\bvos\b/i,
  /\bpodés\b/i,
  /\btenés\b/i,
  /\bsabés\b/i,
  /\bquerés\b/i,
  /\bpreferís\b/i,
  /\bpodrías\b/i,
  /\bcoordinás\b/i,
  /\bcontás\b/i,
  /\brevisá\b/i,
  /\bescribí\b/i,
  /\bcontame\b/i,
  /\bmirá\b/i,
  /\belegí\b/i,
  /\bfijate\b/i,
  /\bacordate\b/i,
  /\bhacé\b/i,
  /\bdecime\b/i,
  /\bmándame\b/i,
  /\breservá\b/i,
  /\bandá\b/i,
  /\bvení\b/i,
  /\bprobá\b/i,
  /\bllamá\b/i,
  /\bmandá\b/i,
];

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    return statSync(full).isDirectory() ? files(full) : [full];
  });
}

describe("copy locale", () => {
  it("uses Chilean Spanish, never voseo", () => {
    const offenders: string[] = [];
    for (const file of ROOTS.flatMap(files)) {
      if (!/\.(astro|tsx?)$/.test(file)) continue;
      const text = readFileSync(file, "utf8");
      for (const pattern of VOSEO) {
        const match = text.match(pattern);
        if (match) offenders.push(`${file}: ${match[0]}`);
      }
    }
    expect(offenders).toEqual([]);
  });
});
