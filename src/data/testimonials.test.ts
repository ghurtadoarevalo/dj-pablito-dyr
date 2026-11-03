import { describe, expect, it } from "vitest";
import { INSTAGRAM_PROFILE_URL, TESTIMONIALS } from "./testimonials";

describe("TESTIMONIALS", () => {
  it("carries the five real client comments with a verifiable handle", () => {
    expect(TESTIMONIALS).toHaveLength(5);
    for (const testimonial of TESTIMONIALS) {
      expect(testimonial.handle.startsWith("@")).toBe(true);
      expect(testimonial.handle).not.toContain(" ");
      expect(testimonial.quote.length).toBeGreaterThan(40);
      expect(testimonial.sourceUrl).toContain("instagram.com");
    }
    expect(INSTAGRAM_PROFILE_URL).toBe(
      "https://www.instagram.com/dj_dyr_producciones/",
    );
  });

  it("keeps the highlighted testimonial among the five", () => {
    expect(
      TESTIMONIALS.filter((testimonial) => testimonial.highlighted),
    ).toHaveLength(1);
  });
});
