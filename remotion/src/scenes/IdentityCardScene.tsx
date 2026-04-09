import {
  AbsoluteFill,
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
  SpecReadout,
  TechnicalPanel,
} from "../components/UIAtoms";
import {COLORS, FONTS, MARK} from "../constants";

export const IdentityCardScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const textOpacity = interpolate(frame, [10, fps * 1.6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const textY = interpolate(frame, [10, fps * 1.6], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const photoOpacity = interpolate(frame, [fps * 1.1, fps * 2.4], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const photoScale = interpolate(frame, [fps * 1.1, fps * 3.5], [1.05, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #08111b 0%, #071019 48%, #03080f 100%)",
        overflow: "hidden",
      }}
    >
      <BlueprintField opacity={0.14} cell={58} majorEvery={4} />
      <ScanlineOverlay opacity={0.05} />
      <CornerMark position="tl" opacity={0.55} />
      <CornerMark position="tr" opacity={0.55} />
      <CornerMark position="bl" opacity={0.55} />
      <CornerMark position="br" opacity={0.55} />

      <div
        style={{
          position: "absolute",
          inset: 0,
          padding: "58px 72px 54px",
          display: "grid",
          gridTemplateColumns: "1.45fr 0.78fr",
          gap: 32,
        }}
      >
        <div style={{display: "flex", flexDirection: "column"}}>
          <SectionLabel label="Profile Sheet / Engineering Dossier" startFrame={0} />

          <div style={{marginTop: 16, opacity: textOpacity, transform: `translateY(${textY}px)`}}>
            <div
              style={{
                fontFamily: FONTS.mono,
                fontSize: 74,
                lineHeight: 0.92,
                letterSpacing: "-0.06em",
                fontWeight: 700,
                textTransform: "uppercase",
                color: COLORS.text,
              }}
            >
              {MARK.name}
            </div>
            <div
              style={{
                marginTop: 14,
                fontFamily: FONTS.sans,
                fontSize: 26,
                lineHeight: 1.25,
                color: COLORS.textSecondary,
                maxWidth: 720,
              }}
            >
              {MARK.headline}
            </div>
          </div>

          <div style={{marginTop: 22}}>
            <HRule startFrame={20} />
          </div>

          <div style={{display: "flex", gap: 14, marginTop: 26, flexWrap: "wrap"}}>
            <SpecReadout value={MARK.tolerance} label="Tolerance" startFrame={fps * 1.4} accent />
            <SpecReadout value={MARK.experience} label="Experience" startFrame={fps * 1.6} />
            <SpecReadout value={MARK.location} label="Location" startFrame={fps * 1.8} />
          </div>

          <div
            style={{
              marginTop: 22,
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: 14,
            }}
          >
            {MARK.credentials.map((credential, index) => (
              <TechnicalPanel
                key={credential.label}
                style={{
                  padding: "16px 16px 18px",
                  opacity: interpolate(frame, [fps * 2 + index * 5, fps * 2.6 + index * 5], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }),
                  transform: `translateY(${interpolate(
                    frame,
                    [fps * 2 + index * 5, fps * 2.6 + index * 5],
                    [18, 0],
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
                    marginBottom: 10,
                  }}
                >
                  {credential.label}
                </div>
                <div
                  style={{
                    fontFamily: FONTS.sans,
                    fontSize: 18,
                    lineHeight: 1.35,
                    color: COLORS.text,
                  }}
                >
                  {credential.value}
                </div>
              </TechnicalPanel>
            ))}
          </div>

          <TechnicalPanel
            style={{
              marginTop: 18,
              padding: "18px 20px",
              opacity: interpolate(frame, [fps * 3.3, fps * 4.4], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            <div
              style={{
                fontFamily: FONTS.mono,
                fontSize: 10,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: COLORS.textMuted,
                marginBottom: 10,
              }}
            >
              Dossier summary
            </div>
            <div
              style={{
                fontFamily: FONTS.sans,
                fontSize: 22,
                lineHeight: 1.4,
                color: COLORS.text,
                maxWidth: 760,
              }}
            >
              {MARK.primaryTagline}
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
              {MARK.secondaryTagline}
            </div>
            <div
              style={{
                marginTop: 10,
                fontFamily: FONTS.sans,
                fontSize: 16,
                lineHeight: 1.45,
                color: COLORS.textMuted,
              }}
            >
              {MARK.softwareTagline}
            </div>
          </TechnicalPanel>

          <div style={{display: "flex", gap: 10, flexWrap: "wrap", marginTop: "auto"}}>
            {MARK.focusAreas.map((item, index) => (
              <CalloutChip
                key={item}
                label={item}
                index={index}
                startFrame={fps * 4.8}
                active={index === 0}
              />
            ))}
          </div>
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
              <span>Candidate profile</span>
              <span>MH-2026</span>
            </div>
          </TechnicalPanel>

          <TechnicalPanel
            style={{
              position: "relative",
              flex: 1,
              overflow: "hidden",
              opacity: photoOpacity,
            }}
          >
            <Img
              src={staticFile("assets/images/profile.webp")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
                transform: `scale(${photoScale})`,
                filter: "saturate(0.75) contrast(1.04)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(7,16,25,0.22) 0%, rgba(7,16,25,0.06) 30%, rgba(7,16,25,0.42) 100%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(90deg, rgba(7,16,25,0.14) 0%, rgba(7,16,25,0.52) 100%)",
              }}
            />
            <BlueprintField opacity={0.1} cell={48} majorEvery={5} />
            <div
              style={{
                position: "absolute",
                top: 16,
                left: 16,
                right: 16,
                display: "flex",
                justifyContent: "space-between",
                fontFamily: FONTS.mono,
                fontSize: 10,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: COLORS.textSecondary,
              }}
            >
              <span>{MARK.dossierLabel}</span>
              <span>Profile reference</span>
            </div>
            <div
              style={{
                position: "absolute",
                left: 18,
                bottom: 18,
                right: 18,
                borderTop: `1px solid ${COLORS.border}`,
                paddingTop: 12,
                fontFamily: FONTS.mono,
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: COLORS.textSecondary,
                lineHeight: 1.4,
              }}
            >
              Design credibility is reinforced by direct exposure to machining, assembly, and
              inspection realities.
            </div>
          </TechnicalPanel>
        </div>
      </div>
    </AbsoluteFill>
  );
};
