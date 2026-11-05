import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const ROOTS = ["src/components", "src/layouts"];
const BANNED = [
  /\bslate-\d/,
  /\bgray-\d/,
  /\byellow-\d/,
  /\bzinc-\d/,
  /#141416/i,
  /#171719/i,
  /#f6c945/i,
  /#eab308/i,
  /#0b0b0d/i,
  /\bbg-green-/,
  /rounded-t-l-xl/,
  /bg-white\/100/,
  /\bpaper-muted\b/,
  /\bsurface-muted\b/,
];

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    return statSync(full).isDirectory() ? files(full) : [full];
  });
}

describe("design tokens", () => {
  it("no component or layout reintroduces a legacy visual value", () => {
    const offenders: string[] = [];
    for (const file of ROOTS.flatMap(files)) {
      const text = readFileSync(file, "utf8");
      for (const pattern of BANNED) {
        if (pattern.test(text)) offenders.push(`${file}: ${pattern}`);
      }
    }
    expect(offenders).toEqual([]);
  });
});
