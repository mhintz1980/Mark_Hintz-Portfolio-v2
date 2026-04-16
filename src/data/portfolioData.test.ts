import { describe, expect, it } from "vitest";

import { portfolioData } from "./portfolioData";

describe("portfolioData projects", () => {
  it("keeps the software project last and the pump package project second to last", () => {
    expect(portfolioData.projects.map((project) => project.title)).toEqual([
      "Industrial Torque Wrench",
      "Armament Components & Receiver Systems",
      "Renderings & Visualizations",
      "Pump Package Design System (Skids, Enclosures, Mounts, Lifting)",
      "PumpTracker (Production Scheduling + Capacity Planning)",
    ]);
  });

  it("includes the armament project with the requested public image set", () => {
    const armamentProject = portfolioData.projects.find(
      (project) => project.title === "Armament Components & Receiver Systems",
    );

    expect(armamentProject).toBeDefined();
    expect(armamentProject?.image).toBe("assets/images/AR-15 Lower Reciever-Forged.JPG");
    expect(armamentProject?.gallery).toEqual([
      "assets/images/709870988691 - BARREL NUT.webp",
      "assets/images/308 KB.webp",
      "assets/images/3D View-3.webp",
      "assets/images/Rendering of Upper and Lower Receiver Assembly for an AR15 That I designed for a Leader in the weapons Industry.jpg",
      "assets/images/TAURUS-8.875-1P-3K-Rev1-3 view.webp",
    ]);
  });

  it("adds the hydraulic torque rendering to the renderings project gallery", () => {
    const renderingsProject = portfolioData.projects.find(
      (project) => project.title === "Renderings & Visualizations",
    );

    expect(renderingsProject?.gallery).toContain("assets/images/HYDRAULIC-TORQUE-MXT03-ASSY.jpg");
  });
});
