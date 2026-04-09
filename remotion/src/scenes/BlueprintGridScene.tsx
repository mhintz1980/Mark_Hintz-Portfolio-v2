import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from "remotion";
import {TypewriterText} from "../components/AnimationPrimitives";
import {
  BlueprintField,
  CalloutChip,
  CornerMark,
  HRule,
  ScanlineOverlay,
  SectionLabel,
  TechnicalPanel,
} from "../components/UIAtoms";
import {COLORS, FONTS, MARK} from "../constants";
import {defaultShowreelProps, type ShowreelProps} from "../schemas";

const OPENING_VERBS = ["DESIGN", "MANUFACTURE", "ASSEMBLE", "INSPECT"] as const;

type BlueprintGridSceneProps = Pick<
  ShowreelProps,
  "introHeadlineTop" | "introHeadlineAccent" | "introHeadlineBottom" | "introBody"
>;

export const BlueprintGridScene: React.FC<Partial<BlueprintGridSceneProps>> = ({
  introHeadlineTop = defaultShowreelProps.introHeadlineTop,
  introHeadlineAccent = defaultShowreelProps.introHeadlineAccent,
  introHeadlineBottom = defaultShowreelProps.introHeadlineBottom,
  introBody = defaultShowreelProps.introBody,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const titleOpacity = interpolate(frame, [fps * 1.3, fps * 2.6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [fps * 1.3, fps * 2.6], [28, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bodyOpacity = interpolate(frame, [fps * 2.2, fps * 3.6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(circle at 50% 30%, #0a1725 0%, #071019 48%, #03080f 100%)",
        overflow: "hidden",
      }}
    >
      <BlueprintField opacity={0.2} cell={56} majorEvery={4} />
      <ScanlineOverlay opacity={0.05} />
      <CornerMark position="tl" />
      <CornerMark position="tr" />
      <CornerMark position="bl" />
      <CornerMark position="br" />

      <div
        style={{
          position: "absolute",
          inset: 0,
          padding: "58px 72px 52px",
          display: "grid",
          gridTemplateColumns: "1.55fr 0.9fr",
          gap: 36,
        }}
      >
        <div style={{display: "flex", flexDirection: "column"}}>
          <SectionLabel label="Opening Sheet / Design Review Reel" startFrame={0} />

          <div
            style={{
              marginTop: 18,
              fontFamily: FONTS.mono,
              fontSize: 14,
              letterSpacing: "0.16em",
              color: COLORS.accent,
            }}
          >
            <TypewriterText text={MARK.superHeader} startFrame={10} speed={20} />
          </div>

          <div style={{marginTop: 22}}>
            <HRule startFrame={22} />
          </div>

          <div
            style={{
              marginTop: 30,
              opacity: titleOpacity,
              transform: `translateY(${titleY}px)`,
              fontFamily: FONTS.mono,
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 0.94,
              letterSpacing: "-0.05em",
              textTransform: "uppercase",
              color: COLORS.text,
            }}
            >
              {introHeadlineTop}
              <br />
              <span style={{color: COLORS.accent}}>{introHeadlineAccent}</span>
              <br />
              {introHeadlineBottom}
            </div>

          <div
            style={{
              marginTop: 24,
              maxWidth: 760,
              opacity: bodyOpacity,
              fontFamily: FONTS.sans,
              fontSize: 20,
              lineHeight: 1.45,
              color: COLORS.textSecondary,
            }}
            >
            {introBody}
          </div>

          <div style={{display: "flex", gap: 12, flexWrap: "wrap", marginTop: 28}}>
            {OPENING_VERBS.map((verb, index) => (
              <CalloutChip key={verb} label={verb} index={index} startFrame={fps * 2.8} active />
            ))}
          </div>

          <div
            style={{
              marginTop: "auto",
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              gap: 12,
              opacity: interpolate(frame, [fps * 4, fps * 5.4], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            {MARK.focusAreas.map((item) => (
              <TechnicalPanel key={item} style={{padding: "14px 14px 12px"}}>
                <div
                  style={{
                    fontFamily: FONTS.mono,
                    fontSize: 10,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: COLORS.textSecondary,
                  }}
                >
                  {item}
                </div>
              </TechnicalPanel>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            opacity: interpolate(frame, [fps * 2.6, fps * 3.8], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <TechnicalPanel style={{padding: "18px 18px 20px"}}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 18,
                fontFamily: FONTS.mono,
                fontSize: 10,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: COLORS.textMuted,
              }}
            >
              <span>Review package</span>
              <span>Rev B.02</span>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 14,
                fontFamily: FONTS.sans,
              }}
            >
              {[
                ["Positioning", "Design + manufacturing bridge"],
                ["Primary signal", "Manufacturable mechanical execution"],
                ["Supporting proof", "Systems thinking and software leverage"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "110px 1fr",
                    gap: 16,
                    alignItems: "start",
                  }}
                >
                  <div
                    style={{
                      fontFamily: FONTS.mono,
                      fontSize: 10,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: COLORS.textMuted,
                    }}
                  >
                    {label}
                  </div>
                  <div
                    style={{
                      fontSize: 16,
                      lineHeight: 1.35,
                      color: COLORS.text,
                    }}
                  >
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </TechnicalPanel>

          <TechnicalPanel style={{padding: "16px 18px"}}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: 12,
              }}
            >
              {[
                ["Location", MARK.location],
                ["Experience", MARK.experience],
                ["Tolerance", MARK.tolerance],
                ["Thesis", "Design that survives reality"],
              ].map(([label, value]) => (
                <div key={label}>
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
                      fontFamily: FONTS.mono,
                      fontSize: 16,
                      lineHeight: 1.2,
                      color: label === "Tolerance" ? COLORS.accent : COLORS.textSecondary,
                    }}
                  >
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </TechnicalPanel>
        </div>
      </div>
    </AbsoluteFill>
  );
};
