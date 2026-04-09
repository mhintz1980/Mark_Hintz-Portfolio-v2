import {FONTS} from "../constants";
import type {RemixTheme} from "../remixSchema";

export const getRemixBackground = (theme: RemixTheme) =>
  `radial-gradient(circle at 20% 10%, ${theme.bgPanel} 0%, ${theme.bg} 46%, ${theme.bgDeep} 100%)`;

export const remixFonts = FONTS;

export const directionToAxis = (direction: "left" | "right" | "up" | "down") =>
  direction === "left" || direction === "right" ? "x" : "y";

export const directionToSign = (direction: "left" | "right" | "up" | "down") => {
  if (direction === "left" || direction === "up") {
    return 1;
  }

  return -1;
};
