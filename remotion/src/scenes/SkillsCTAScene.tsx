import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from "remotion";
import {
  BlueprintField,
  CalloutChip,
  CornerMark,
  HRule,
  ScanlineOverlay,
  SectionLabel,
  SkillsTicker,
  TechnicalPanel,
} from "../components/UIAtoms";
import {COLORS, FONTS, MARK, SKILLS_TICKER} from "../constants";
import {defaultShowreelProps, type ShowreelProps} from "../schemas";

type SkillsCTASceneProps = Pick<
  ShowreelProps,
  | "closingHeadlineTop"
  | "closingHeadlineBottom"
  | "closingBody"
  | "closingSummaryPrimary"
  | "closingSummarySecondary"
  | "contactEmail"
>;

export const SkillsCTAScene: React.FC<Partial<SkillsCTASceneProps>> = ({
  closingHeadlineTop = defaultShowreelProps.closingHeadlineTop,
  closingHeadlineBottom = defaultShowreelProps.closingHeadlineBottom,
  closingBody = defaultShowreelProps.closingBody,
  closingSummaryPrimary = defaultShowreelProps.closingSummaryPrimary,
  closingSummarySecondary = defaultShowreelProps.closingSummarySecondary,
  contactEmail = defaultShowreelProps.contactEmail,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const headlineOpacity = interpolate(frame, [fps * 0.5, fps * 1.6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const headlineY = interpolate(frame, [fps * 0.5, fps * 1.6], [26, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bodyOpacity = interpolate(frame, [fps * 1.6, fps * 2.8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #08111b 0%, #071019 52%, #03080f 100%)",
        overflow: "hidden",
      }}
    >
      <BlueprintField opacity={0.14} cell={64} majorEvery={4} />
      <ScanlineOverlay opacity={0.05} />
      <CornerMark position="tl" />
      <CornerMark position="tr" />
      <CornerMark position="bl" />
      <CornerMark position="br" />

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 44,
          display: "flex",
          alignItems: "center",
          padding: "0 26px",
          borderBottom: `1px solid ${COLORS.border}`,
          background: "rgba(7, 16, 25, 0.78)",
        }}
      >
        <SkillsTicker skills={SKILLS_TICKER} speed={1.15} />
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          padding: "92px 96px 70px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <SectionLabel label="Closing Statement / Availability" startFrame={0} />

        <div
          style={{
            marginTop: 20,
            opacity: headlineOpacity,
            transform: `translateY(${headlineY}px)`,
            fontFamily: FONTS.mono,
            fontSize: 84,
            fontWeight: 700,
            lineHeight: 0.92,
            letterSpacing: "-0.06em",
            textTransform: "uppercase",
            color: COLORS.text,
          }}
        >
          {closingHeadlineTop}
          <br />
          <span style={{color: COLORS.accent}}>{closingHeadlineBottom}</span>
        </div>

        <div
          style={{
            marginTop: 20,
            maxWidth: 820,
            opacity: bodyOpacity,
            fontFamily: FONTS.sans,
            fontSize: 24,
            lineHeight: 1.45,
            color: COLORS.textSecondary,
          }}
        >
          {closingBody}
        </div>

        <div style={{marginTop: 26, width: "100%", maxWidth: 700}}>
          <HRule startFrame={fps * 1.4} />
        </div>

        <div style={{display: "flex", gap: 10, flexWrap: "wrap", marginTop: 28, justifyContent: "center"}}>
          {[
            "DESIGN THAT SURVIVES REALITY",
            "INSPECTION-AWARE",
            "ASSEMBLY-LITERATE",
            "SOFTWARE AS SUPPORTING PROOF",
          ].map((label, index) => (
            <CalloutChip
              key={label}
              label={label}
              index={index}
              startFrame={fps * 2}
              active={index === 0}
            />
          ))}
        </div>

        <TechnicalPanel
          style={{
            marginTop: 32,
            maxWidth: 900,
            padding: "22px 28px",
            opacity: interpolate(frame, [fps * 2.6, fps * 3.8], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 10,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: COLORS.textMuted,
              marginBottom: 10,
            }}
          >
            Positioning summary
          </div>
          <div
            style={{
              fontFamily: FONTS.sans,
              fontSize: 22,
              lineHeight: 1.45,
              color: COLORS.text,
            }}
          >
            {closingSummaryPrimary}
          </div>
          <div
            style={{
              marginTop: 10,
              fontFamily: FONTS.sans,
              fontSize: 18,
              lineHeight: 1.45,
              color: COLORS.textSecondary,
            }}
          >
            {closingSummarySecondary}
          </div>
        </TechnicalPanel>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 16,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: COLORS.textSecondary,
            }}
          >
            {MARK.name}
          </div>
          <TechnicalPanel style={{padding: "14px 28px"}}>
            <div
              style={{
                fontFamily: FONTS.mono,
                fontSize: 18,
                letterSpacing: "0.08em",
                color: COLORS.accent,
                textTransform: "uppercase",
              }}
            >
              {contactEmail}
            </div>
          </TechnicalPanel>
        </div>
      </div>
    </AbsoluteFill>
  );
};
