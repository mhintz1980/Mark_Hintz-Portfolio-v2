import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  BlueprintField,
  CalloutChip,
  CornerMark,
  HRule,
  ScanlineOverlay,
  SectionLabel,
  TechnicalPanel,
} from "../components/UIAtoms";
import {COLORS, FONTS} from "../constants";

export interface ProjectSceneProps {
  title: string;
  subtitle: string;
  category: string;
  reviewLabel: string;
  emphasis: "primary" | "secondary";
  outcome: string;
  outcomeLabel: string;
  image: string;
  tags: readonly string[];
  problem: string;
  constraint: string;
  decision: string;
  validation: string;
  callouts: readonly string[];
  wipeDirection?: "left" | "right";
  projectIndex?: number;
}

export const ProjectScene: React.FC<ProjectSceneProps> = ({
  title,
  subtitle,
  category,
  reviewLabel,
  emphasis,
  outcome,
  outcomeLabel,
  image,
  tags,
  problem,
  constraint,
  decision,
  validation,
  callouts,
  wipeDirection = "left",
  projectIndex = 0,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const revealProgress = interpolate(frame, [0, fps * 1.15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });
  const pct = interpolate(revealProgress, [0, 1], [100, 0]);
  const clipPath =
    wipeDirection === "left" ? `inset(0 ${pct}% 0 0)` : `inset(0 0 0 ${pct}%)`;

  const panelOpacity = interpolate(frame, [fps * 0.8, fps * 1.8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const panelX = interpolate(frame, [fps * 0.8, fps * 1.8], [36, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const imageScale = interpolate(frame, [0, fps * 12], [1.05, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #08111b 0%, #071019 52%, #03080f 100%)",
        overflow: "hidden",
      }}
    >
      <BlueprintField opacity={0.12} cell={64} majorEvery={4} />
      <ScanlineOverlay opacity={0.05} />
      <CornerMark position="tl" opacity={0.4} />
      <CornerMark position="br" opacity={0.4} />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          gridTemplateColumns: "1.18fr 0.95fr",
        }}
      >
        <div
          style={{
            position: "relative",
            clipPath,
            overflow: "hidden",
            borderRight: `1px solid ${COLORS.border}`,
          }}
        >
          <Img
            src={staticFile(image)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              transform: `scale(${imageScale})`,
              filter: emphasis === "secondary" ? "saturate(0.82)" : "saturate(0.96)",
            }}
          />

          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, rgba(7,16,25,0.16) 0%, rgba(7,16,25,0.24) 34%, rgba(7,16,25,0.86) 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(0deg, rgba(7,16,25,0.78) 0%, rgba(7,16,25,0.08) 40%, rgba(7,16,25,0.38) 100%)",
            }}
          />

          <div style={{position: "absolute", top: 28, left: 28, right: 28}}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 18,
                fontFamily: FONTS.mono,
                fontSize: 10,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: COLORS.textSecondary,
              }}
            >
              <span>{`Project .0${projectIndex + 1}`}</span>
              <span>{reviewLabel}</span>
            </div>

            <div style={{display: "flex", gap: 10, flexWrap: "wrap", maxWidth: 420}}>
              {callouts.map((callout, index) => (
                <CalloutChip
                  key={callout}
                  label={callout}
                  index={index}
                  startFrame={fps * 1.2}
                  active={index === 0}
                />
              ))}
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              left: 28,
              bottom: 28,
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: 12,
              width: 380,
            }}
          >
            {[
              ["Category", category],
              ["Signal", emphasis === "primary" ? "Mechanical lead proof" : "Systems support proof"],
            ].map(([label, value]) => (
              <TechnicalPanel key={label} style={{padding: "12px 14px"}}>
                <div
                  style={{
                    fontFamily: FONTS.mono,
                    fontSize: 9,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: COLORS.textMuted,
                    marginBottom: 6,
                  }}
                >
                  {label}
                </div>
                <div
                  style={{
                    fontFamily: FONTS.sans,
                    fontSize: 15,
                    lineHeight: 1.3,
                    color: COLORS.text,
                  }}
                >
                  {value}
                </div>
              </TechnicalPanel>
            ))}
          </div>
        </div>

        <div
          style={{
            padding: "56px 56px 48px 44px",
            display: "flex",
            flexDirection: "column",
            opacity: panelOpacity,
            transform: `translateX(${panelX}px)`,
          }}
        >
          <SectionLabel
            label={emphasis === "primary" ? "Engineering review" : "Supporting systems review"}
            startFrame={fps * 0.7}
          />

          <div
            style={{
              marginTop: 14,
              fontFamily: FONTS.mono,
              fontSize: 44,
              lineHeight: 0.92,
              letterSpacing: "-0.05em",
              fontWeight: 700,
              textTransform: "uppercase",
              color: COLORS.text,
            }}
          >
            {title}
          </div>

          <div
            style={{
              marginTop: 10,
              fontFamily: FONTS.sans,
              fontSize: 20,
              lineHeight: 1.35,
              color: COLORS.textSecondary,
            }}
          >
            {subtitle}
          </div>

          <div style={{marginTop: 18}}>
            <HRule startFrame={fps * 0.9} />
          </div>

          <div style={{display: "flex", flexDirection: "column", gap: 14, marginTop: 20}}>
            {[
              ["Problem", problem],
              ["Constraint", constraint],
              ["Decision", decision],
              ["Validation", validation],
            ].map(([label, value], index) => (
              <TechnicalPanel
                key={label}
                style={{
                  padding: "14px 16px 16px",
                  opacity: interpolate(
                    frame,
                    [fps * 1.15 + index * 6, fps * 1.8 + index * 6],
                    [0, 1],
                    {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    },
                  ),
                  transform: `translateY(${interpolate(
                    frame,
                    [fps * 1.15 + index * 6, fps * 1.8 + index * 6],
                    [16, 0],
                    {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    },
                  )}px)`,
                }}
              >
                <div
                  style={{
                    fontFamily: FONTS.mono,
                    fontSize: 10,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: COLORS.accent,
                    marginBottom: 8,
                  }}
                >
                  {label}
                </div>
                <div
                  style={{
                    fontFamily: FONTS.sans,
                    fontSize: label === "Validation" ? 17 : 18,
                    lineHeight: 1.35,
                    color: label === "Validation" ? COLORS.textSecondary : COLORS.text,
                  }}
                >
                  {value}
                </div>
              </TechnicalPanel>
            ))}
          </div>

          <TechnicalPanel
            style={{
              marginTop: "auto",
              padding: "18px 20px 20px",
              background: COLORS.panelStrong,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                gap: 16,
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: FONTS.mono,
                    fontSize: 10,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: COLORS.textMuted,
                    marginBottom: 6,
                  }}
                >
                  Result
                </div>
                <div
                  style={{
                    fontFamily: FONTS.mono,
                    fontSize: 52,
                    lineHeight: 1,
                    fontWeight: 700,
                    letterSpacing: "-0.05em",
                    color: COLORS.accent,
                  }}
                >
                  {outcome}
                </div>
                <div
                  style={{
                    marginTop: 4,
                    fontFamily: FONTS.mono,
                    fontSize: 11,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: COLORS.textSecondary,
                  }}
                >
                  {outcomeLabel}
                </div>
              </div>

              <div style={{display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-end"}}>
                {tags.map((tag, index) => (
                  <CalloutChip
                    key={tag}
                    label={tag}
                    index={index}
                    startFrame={fps * 3.2}
                    active={false}
                  />
                ))}
              </div>
            </div>
          </TechnicalPanel>
        </div>
      </div>
    </AbsoluteFill>
  );
};
