import { describe, expect, it } from "vitest";

import { getStackCardProgressState, getStackProjectMediaItems } from "./StackedCardsProject";

describe("getStackCardProgressState", () => {
  it("moves cards through sequential upward exit windows", () => {
    const total = 6;
    const first = getStackCardProgressState(0.2, 0, total);
    const second = getStackCardProgressState(0.2, 1, total);

    expect(first.exit).toBeGreaterThan(0);
    expect(second.exit).toBe(0);
    expect(first.depth).toBe(0);
    expect(second.depth).toBeLessThan(1);
  });

  it("finishes the final card before the section releases", () => {
    const total = 6;
    const finalCard = getStackCardProgressState(0.97, total - 1, total);

    expect(finalCard.exit).toBe(1);
    expect(finalCard.opacity).toBe(0);
    expect(finalCard.end).toBeLessThan(1);
  });

  it("reuses normalized project media metadata for the stack frames", () => {
    const items = getStackProjectMediaItems({
      title: "Torque Wrench",
      category: "Mechanical design",
      image: "assets/images/torque-wrench-hero.webp",
      gallery: [
        "assets/images/torque-wrench-hero.webp",
        "assets/images/torque-wrench-01.webp",
        "assets/images/torque-wrench-02.webp",
        "assets/images/torque-wrench-03.webp",
        "assets/images/torque-wrench-04.webp",
        "assets/images/torque-wrench-05.webp",
        "assets/images/torque-wrench-06.webp",
      ],
      tags: ["SolidWorks"],
    });

    expect(items).toHaveLength(6);
    expect(items[0]).toMatchObject({
      src: "assets/images/torque-wrench-hero.webp",
      label: "Primary view",
      overlayLabel: "Primary review frame",
    });
    expect(items[1]).toMatchObject({
      src: "assets/images/torque-wrench-01.webp",
      label: "Detail view 01",
      overlayLabel: "Supporting detail",
    });
    expect(items[5].src).toBe("assets/images/torque-wrench-05.webp");
  });
});
