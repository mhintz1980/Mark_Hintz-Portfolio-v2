/**
 * Data specific to the "Drawing Package" portfolio variation.
 * Extends portfolioData with title block metadata, per-project callout notes,
 * and revision table entries.
 */

export const titleBlock = {
  drawingTitle: "DESIGN + MANUFACTURING BRIDGE",
  name: "MARK HINTZ",
  revision: "C",
  date: "2026-04-30",
  sheetLabel: "SHEET 1 OF 1",
  scale: "NTS",
  drawnBy: "M. HINTZ",
  checkedBy: "SHOP FLOOR",
};

export const revisionTable = [
  { rev: "A", date: "2010", description: "INITIAL RELEASE — DRAFTING & CNC SUPPORT" },
  { rev: "B", date: "2018", description: "ADDED GEARBOX DESIGN & DFM REVIEW" },
  { rev: "C", date: "2026", description: "CURRENT — FULL STACK + AI TOOLING" },
];

export type CalloutNote = {
  label: string;
  value: string;
  /** Angle in degrees for leader line direction from detail view center */
  angle: number;
};

export type ProjectDetail = {
  id: string;
  title: string;
  detailLabel: string;
  image: string;
  videoSrc?: string;
  calloutNotes: CalloutNote[];
};

export const projectDetails: ProjectDetail[] = [
  {
    id: "torque-wrench",
    title: "Industrial Torque Wrench",
    detailLabel: "DETAIL A",
    image: "assets/images/torque-wrench-hero.webp",
    calloutNotes: [
      { label: "MATERIAL", value: "17-4PH SS & 4340 ALLOY | HARDENED TO 40 HRC", angle: 45 },
      { label: "TOLERANCE", value: "±0.0005\" ON BORE & SHAFT INTERFACES", angle: 135 },
      { label: "PROCESS", value: "7-AXIS MILL-TURN | PLANETARY GEAR ASSEMBLY", angle: 225 },
      { label: "OUTCOME", value: "DFM REVIEW CUT MFG COST BY 22%", angle: 315 },
    ],
  },
  {
    id: "armament",
    title: "Armament Components & Receiver Systems",
    detailLabel: "DETAIL B",
    image: "assets/images/AR-15 Lower Reciever-Forged.jpg",
    calloutNotes: [
      { label: "MATERIAL", value: "7075-T6 ALUMINUM | FORGED RECEIVER", angle: 45 },
      { label: "GEOMETRY", value: "FIT & FUNCTION RESOLVED FOR ASSEMBLY", angle: 135 },
      { label: "DRAWINGS", value: "FULL MFG PACKAGE FOR 5-AXIS CNC", angle: 225 },
      { label: "SCOPE", value: "UPPER, LOWER, BARREL NUT, HANDGUARD", angle: 315 },
    ],
  },
  {
    id: "pump-package",
    title: "Pump Package Design System",
    detailLabel: "DETAIL C",
    image: "assets/images/pump-package-hero.webp",
    calloutNotes: [
      { label: "ACOUSTIC", value: "STAGGERED BAFFLES | TORTUOUS PATH DESIGN", angle: 45 },
      { label: "STRUCTURE", value: "11 GA STEEL | SHEET METAL + WELDMENTS", angle: 135 },
      { label: "ISOLATION", value: "VIBRATION DECOUPLING | MLV + OPEN CELL FOAM", angle: 225 },
      { label: "SYSTEM", value: "SKIDS, ENCLOSURES, MOUNTS, LIFTING", angle: 315 },
    ],
  },
  {
    id: "pumptracker",
    title: "PumpTracker",
    detailLabel: "DETAIL D",
    image: "assets/images/pumptracker-hero.webp",
    calloutNotes: [
      { label: "STACK", value: "REACT + TYPESCRIPT | FIREBASE & SUPABASE", angle: 45 },
      { label: "PROBLEM", value: "PRODUCTION SCHEDULING WAS TRIBAL KNOWLEDGE", angle: 135 },
      { label: "OUTCOME", value: "30+ HRS/WEEK RECOVERED FROM MANUAL WORK", angle: 225 },
      { label: "SCOPE", value: "CAPACITY PLANNING + PROCUREMENT VISIBILITY", angle: 315 },
    ],
  },
  {
    id: "renderings",
    title: "Renderings & Visualizations",
    detailLabel: "DETAIL E",
    image: "assets/images/renderings-hero.webp",
    calloutNotes: [
      { label: "TOOLS", value: "PHOTOVIEW 360 | SOLIDWORKS VISUALIZE", angle: 45 },
      { label: "QUALITY", value: "PHOTOREALISTIC PRODUCT RENDERS | HDRI LIT", angle: 135 },
      { label: "OUTCOME", value: "ELIMINATED PHYSICAL MOCKUP COST", angle: 225 },
      { label: "USE", value: "SALES COLLATERAL | DESIGN REVIEW | QC REF", angle: 315 },
    ],
  },
];
