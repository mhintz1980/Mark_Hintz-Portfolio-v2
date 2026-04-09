import { Fragment } from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { CaseStudyScene } from "../scenes/experiments/case-studies/CaseStudyScene";
import { CASE_STUDIES, COLORS } from "../constants";
import { CornerMark, ScanlineOverlay } from "../components/UIAtoms";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { wipe } from "@remotion/transitions/wipe";
import {defaultCaseStudiesProps, type CaseStudiesProps} from "../schemas";

export const CaseStudiesVideo: React.FC<CaseStudiesProps> = ({
  sequenceLabelPrefix = defaultCaseStudiesProps.sequenceLabelPrefix,
  imageFooterNote = defaultCaseStudiesProps.imageFooterNote,
}) => {
  const { fps } = useVideoConfig();

  const SCENE_DURATION = 12 * fps; // 12 seconds per case study
  const TRANSITION_FRAMES = 20;

  return (
    <AbsoluteFill style={{ background: COLORS.bg, overflow: "hidden" }}>
      <ScanlineOverlay opacity={0.05} />
      <CornerMark position="tl" opacity={0.4} />
      <CornerMark position="tr" opacity={0.4} />
      <CornerMark position="bl" opacity={0.4} />
      <CornerMark position="br" opacity={0.4} />

      <TransitionSeries>
        {CASE_STUDIES.map((study, index) => {
          const {key, ...sceneProps} = study;

          return (
          <Fragment key={key}>
            <TransitionSeries.Sequence durationInFrames={SCENE_DURATION}>
              <CaseStudyScene
                {...sceneProps}
                index={index}
                sequenceLabelPrefix={sequenceLabelPrefix}
                imageFooterNote={imageFooterNote}
              />
            </TransitionSeries.Sequence>

            {index < CASE_STUDIES.length - 1 && (
              <TransitionSeries.Transition
                presentation={wipe({ direction: index % 2 === 0 ? "from-left" : "from-right" })}
                timing={springTiming({ config: { damping: 200 }, durationInFrames: TRANSITION_FRAMES })}
              />
            )}
          </Fragment>
        );
        })}
      </TransitionSeries>
    </AbsoluteFill>
  );
};
