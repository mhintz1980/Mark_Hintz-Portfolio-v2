import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {TypewriterText} from "../../../components/AnimationPrimitives";
import {
  BlueprintField,
  CalloutChip,
  CornerMark,
  HRule,
  ScanlineOverlay,
  TechnicalPanel,
} from "../../../components/UIAtoms";
import {COLORS, FONTS} from "../../../constants";
import {defaultCaseStudiesProps, type CaseStudiesProps} from "../../../schemas";

export interface CaseStudySceneProps {
  title: string;
  problem: string;
  constraint: string;
  approach: string;
  validation: string;
  outcome: string;
  image: string;
  index: number;
  sequenceLabelPrefix?: CaseStudiesProps["sequenceLabelPrefix"];
  imageFooterNote?: CaseStudiesProps["imageFooterNote"];
}

export const CaseStudyScene: React.FC<CaseStudySceneProps> = ({
  title,
  problem,
  constraint,
  approach,
  validation,
  outcome,
  image,
  index,
  sequenceLabelPrefix = defaultCaseStudiesProps.sequenceLabelPrefix,
  imageFooterNote = defaultCaseStudiesProps.imageFooterNote,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const panelOpacity = interpolate(frame, [10, fps * 1.4], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const imageReveal = interpolate(frame, [fps * 1.2, fps * 2.6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #08111b 0%, #071019 52%, #03080f 100%)",
        overflow: "hidden",
      }}
    >
      <BlueprintField opacity={0.12} cell={60} majorEvery={4} />
      <ScanlineOverlay opacity={0.05} />
      <CornerMark position="tl" opacity={0.5} />
      <CornerMark position="tr" opacity={0.5} />
      <CornerMark position="bl" opacity={0.5} />
      <CornerMark position="br" opacity={0.5} />

      <div
        style={{
          position: "absolute",
          inset: 0,
          padding: "58px 72px 52px",
          display: "grid",
          gridTemplateColumns: "1fr 0.92fr",
          gap: 28,
        }}
      >
        <div style={{display: "flex", flexDirection: "column", opacity: panelOpacity}}>
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 12,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: COLORS.accent,
            }}
          >
            <TypewriterText text={`${sequenceLabelPrefix} .0${index + 1}`} startFrame={8} speed={20} />
          </div>

          <div
            style={{
              marginTop: 18,
              fontFamily: FONTS.mono,
              fontSize: 46,
              lineHeight: 0.94,
              fontWeight: 700,
              letterSpacing: "-0.05em",
              textTransform: "uppercase",
              color: COLORS.text,
            }}
          >
            {title}
          </div>

          <div style={{marginTop: 18}}>
            <HRule startFrame={16} />
          </div>

          <div style={{display: "flex", flexDirection: "column", gap: 14, marginTop: 20}}>
            {[
              ["Problem", problem],
              ["Constraint", constraint],
              ["Approach", approach],
              ["Validation", validation],
            ].map(([label, value], sectionIndex) => (
              <TechnicalPanel
                key={label}
                style={{
                  padding: "15px 16px 16px",
                  opacity: interpolate(
                    frame,
                    [fps * 1 + sectionIndex * 8, fps * 1.7 + sectionIndex * 8],
                    [0, 1],
                    {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    },
                  ),
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
                    fontSize: 18,
                    lineHeight: 1.38,
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
              padding: "18px 20px",
              background: COLORS.panelStrong,
            }}
          >
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
              Outcome
            </div>
            <div
              style={{
                fontFamily: FONTS.mono,
                fontSize: 46,
                lineHeight: 0.96,
                fontWeight: 700,
                letterSpacing: "-0.05em",
                color: COLORS.accent,
                textTransform: "uppercase",
              }}
            >
              {outcome}
            </div>
          </TechnicalPanel>
        </div>

        <div style={{display: "flex", flexDirection: "column", gap: 14}}>
          <TechnicalPanel style={{padding: "14px 16px"}}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontFamily: FONTS.mono,
                fontSize: 10,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: COLORS.textMuted,
              }}
            >
              <span>Technical narrative</span>
              <span>{`Sheet ${index + 1}`}</span>
            </div>
          </TechnicalPanel>

          <TechnicalPanel style={{position: "relative", flex: 1, overflow: "hidden"}}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                clipPath: `inset(0 ${100 - imageReveal * 100}% 0 0)`,
                overflow: "hidden",
              }}
            >
              <Img
                src={staticFile(image)}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  transform: `scale(${interpolate(frame, [0, fps * 12], [1.05, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  })})`,
                }}
              />
            </div>
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(90deg, rgba(7,16,25,0.18) 0%, rgba(7,16,25,0.28) 42%, rgba(7,16,25,0.74) 100%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 18,
                left: 18,
                right: 18,
                display: "flex",
                gap: 10,
                flexWrap: "wrap",
              }}
            >
              {["PROBLEM", "CONSTRAINT", "OUTCOME"].map((label, labelIndex) => (
                <CalloutChip
                  key={label}
                  label={label}
                  index={labelIndex}
                  startFrame={fps * 2}
                  active={labelIndex === 0}
                />
              ))}
            </div>
            <div
              style={{
                position: "absolute",
                left: 18,
                right: 18,
                bottom: 18,
                borderTop: `1px solid ${COLORS.border}`,
                paddingTop: 12,
                fontFamily: FONTS.sans,
                fontSize: 18,
                lineHeight: 1.35,
                color: COLORS.textSecondary,
              }}
            >
              {imageFooterNote}
            </div>
          </TechnicalPanel>
        </div>
      </div>
    </AbsoluteFill>
  );
};
