import {interpolate, useCurrentFrame} from "remotion";
import {COLORS, FONTS, H, W} from "../constants";

interface SpecReadoutProps {
  value: string;
  label: string;
  startFrame?: number;
  accent?: boolean;
}

export const BlueprintField: React.FC<{
  opacity?: number;
  cell?: number;
  majorEvery?: number;
}> = ({opacity = 0.16, cell = 60, majorEvery = 4}) => {
  const columns = Math.ceil(W / cell);
  const rows = Math.ceil(H / cell);

  return (
    <svg
      width={W}
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      style={{position: "absolute", inset: 0, opacity, pointerEvents: "none"}}
    >
      {Array.from({length: columns + 1}, (_, index) => (
        <line
          key={`v-${index}`}
          x1={index * cell}
          y1={0}
          x2={index * cell}
          y2={H}
          stroke={index % majorEvery === 0 ? COLORS.gridLineBright : COLORS.gridLine}
          strokeWidth={index % majorEvery === 0 ? 0.8 : 0.45}
        />
      ))}
      {Array.from({length: rows + 1}, (_, index) => (
        <line
          key={`h-${index}`}
          x1={0}
          y1={index * cell}
          x2={W}
          y2={index * cell}
          stroke={index % majorEvery === 0 ? COLORS.gridLineBright : COLORS.gridLine}
          strokeWidth={index % majorEvery === 0 ? 0.8 : 0.45}
        />
      ))}
    </svg>
  );
};

export const SpecReadout: React.FC<SpecReadoutProps> = ({
  value,
  label,
  startFrame = 0,
  accent = false,
}) => {
  const frame = useCurrentFrame();

  const valueOpacity = interpolate(frame, [startFrame, startFrame + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const valueY = interpolate(frame, [startFrame, startFrame + 14], [18, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: (t) => 1 - Math.pow(1 - t, 3),
  });
  const labelOpacity = interpolate(frame, [startFrame + 6, startFrame + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        minWidth: 170,
        padding: "14px 14px 12px",
        border: `1px solid ${accent ? COLORS.borderStrong : COLORS.border}`,
        background: COLORS.panel,
      }}
    >
      <span
        style={{
          fontFamily: FONTS.mono,
          fontSize: 30,
          fontWeight: 700,
          letterSpacing: "-0.04em",
          lineHeight: 1,
          color: accent ? COLORS.accent : COLORS.text,
          opacity: valueOpacity,
          transform: `translateY(${valueY}px)`,
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontFamily: FONTS.mono,
          fontSize: 10,
          textTransform: "uppercase",
          letterSpacing: "0.16em",
          color: COLORS.textSecondary,
          opacity: labelOpacity,
        }}
      >
        {label}
      </span>
    </div>
  );
};

export const ScanlineOverlay: React.FC<{opacity?: number}> = ({opacity = 0.06}) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      backgroundImage:
        "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,1) 3px, rgba(0,0,0,1) 4px)",
      opacity,
      pointerEvents: "none",
      zIndex: 100,
    }}
  />
);

export const CornerMark: React.FC<{
  position: "tl" | "tr" | "bl" | "br";
  size?: number;
  opacity?: number;
}> = ({position, size = 24, opacity = 0.6}) => {
  const transforms: Record<string, React.CSSProperties> = {
    tl: {top: 24, left: 24},
    tr: {top: 24, right: 24, transform: "rotate(90deg)"},
    bl: {bottom: 24, left: 24, transform: "rotate(-90deg)"},
    br: {bottom: 24, right: 24, transform: "rotate(180deg)"},
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={{position: "absolute", zIndex: 50, opacity, ...transforms[position]}}
    >
      <path d="M0 12 L0 0 L12 0" stroke={COLORS.accent} strokeWidth="1.5" fill="none" />
    </svg>
  );
};

export const SectionLabel: React.FC<{
  label: string;
  startFrame?: number;
  style?: React.CSSProperties;
}> = ({label, startFrame = 0, style}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [startFrame, startFrame + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const y = interpolate(frame, [startFrame, startFrame + 12], [10, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        fontFamily: FONTS.mono,
        fontSize: 11,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: COLORS.accent,
        opacity,
        transform: `translateY(${y}px)`,
        ...style,
      }}
    >
      {label}
    </div>
  );
};

export const TechnicalPanel: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({children, style}) => (
  <div
    style={{
      border: `1px solid ${COLORS.border}`,
      background: COLORS.panel,
      boxShadow: `0 0 0 1px rgba(255,255,255,0.02) inset`,
      ...style,
    }}
  >
    {children}
  </div>
);

export const CalloutChip: React.FC<{
  label: string;
  index?: number;
  startFrame?: number;
  active?: boolean;
}> = ({label, index = 0, startFrame = 0, active = false}) => {
  const frame = useCurrentFrame();
  const delay = startFrame + index * 4;
  const opacity = interpolate(frame, [delay, delay + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const x = interpolate(frame, [delay, delay + 12], [18, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 10px",
        border: `1px solid ${active ? COLORS.borderStrong : COLORS.border}`,
        background: active ? COLORS.accentSoft : "rgba(8, 15, 24, 0.82)",
        color: active ? COLORS.text : COLORS.textSecondary,
        fontFamily: FONTS.mono,
        fontSize: 10,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        opacity,
        transform: `translateX(${x}px)`,
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: 999,
          background: active ? COLORS.accent : COLORS.textMuted,
        }}
      />
      {label}
    </div>
  );
};

export const HRule: React.FC<{startFrame?: number; color?: string; opacity?: number}> = ({
  startFrame = 0,
  color = COLORS.gridLineBright,
  opacity = 1,
}) => {
  const frame = useCurrentFrame();
  const scaleX = interpolate(frame, [startFrame, startFrame + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: (t) => 1 - Math.pow(1 - t, 3),
  });

  return (
    <div
      style={{
        width: "100%",
        height: 1,
        background: color,
        opacity,
        transformOrigin: "left center",
        transform: `scaleX(${scaleX})`,
      }}
    />
  );
};

export const SkillsTicker: React.FC<{
  skills: string[];
  speed?: number;
}> = ({skills, speed = 1.1}) => {
  const frame = useCurrentFrame();
  const fullText =
    skills.map((skill) => `${skill}  /  `).join("") + skills.map((skill) => `${skill}  /  `).join("");
  const totalWidth = fullText.length * 7;
  const offset = (frame * speed) % (totalWidth / 2);

  return (
    <div
      style={{
        overflow: "hidden",
        width: "100%",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          whiteSpace: "nowrap",
          transform: `translateX(-${offset}px)`,
          fontFamily: FONTS.mono,
          fontSize: 12,
          color: COLORS.textSecondary,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
        }}
      >
        {fullText}
      </div>
    </div>
  );
};
