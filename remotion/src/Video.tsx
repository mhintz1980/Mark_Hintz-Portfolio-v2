import {TransitionSeries, linearTiming, springTiming} from "@remotion/transitions";
import {fade} from "@remotion/transitions/fade";
import {wipe} from "@remotion/transitions/wipe";
import {AbsoluteFill} from "remotion";

import {FPS, TRANSITION_FRAMES} from "./constants";
import {BlueprintGridScene} from "./scenes/BlueprintGridScene";
import {IdentityCardScene} from "./scenes/IdentityCardScene";
import {ProjectScene} from "./scenes/ProjectScene";
import {SkillsCTAScene} from "./scenes/SkillsCTAScene";
import {defaultShowreelProps, type ShowreelProps} from "./schemas";

const SCENE_BLUEPRINT = 8 * FPS;
const SCENE_IDENTITY = 10 * FPS;
const SCENE_PROJECT = 12 * FPS;
const SCENE_CTA = 8 * FPS;

export const ShowreelVideo: React.FC<ShowreelProps> = ({
  introHeadlineTop = defaultShowreelProps.introHeadlineTop,
  introHeadlineAccent = defaultShowreelProps.introHeadlineAccent,
  introHeadlineBottom = defaultShowreelProps.introHeadlineBottom,
  introBody = defaultShowreelProps.introBody,
  closingHeadlineTop = defaultShowreelProps.closingHeadlineTop,
  closingHeadlineBottom = defaultShowreelProps.closingHeadlineBottom,
  closingBody = defaultShowreelProps.closingBody,
  closingSummaryPrimary = defaultShowreelProps.closingSummaryPrimary,
  closingSummarySecondary = defaultShowreelProps.closingSummarySecondary,
  contactEmail = defaultShowreelProps.contactEmail,
  projects = defaultShowreelProps.projects,
}) => {
  const [projectOneRaw, projectTwoRaw, projectThreeRaw] = projects;
  const {key: _projectOneKey, ...projectOne} = projectOneRaw;
  const {key: _projectTwoKey, ...projectTwo} = projectTwoRaw;
  const {key: _projectThreeKey, ...projectThree} = projectThreeRaw;

  return (
    <AbsoluteFill>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={SCENE_BLUEPRINT}>
          <BlueprintGridScene
            introHeadlineTop={introHeadlineTop}
            introHeadlineAccent={introHeadlineAccent}
            introHeadlineBottom={introHeadlineBottom}
            introBody={introBody}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({durationInFrames: TRANSITION_FRAMES})}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_IDENTITY}>
          <IdentityCardScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={wipe({direction: "from-left"})}
          timing={springTiming({config: {damping: 200}, durationInFrames: TRANSITION_FRAMES})}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_PROJECT}>
          <ProjectScene {...projectOne} wipeDirection="left" projectIndex={0} />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={wipe({direction: "from-right"})}
          timing={springTiming({config: {damping: 200}, durationInFrames: TRANSITION_FRAMES})}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_PROJECT}>
          <ProjectScene {...projectTwo} wipeDirection="right" projectIndex={1} />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={wipe({direction: "from-left"})}
          timing={springTiming({config: {damping: 200}, durationInFrames: TRANSITION_FRAMES})}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_PROJECT}>
          <ProjectScene {...projectThree} wipeDirection="left" projectIndex={2} />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({durationInFrames: TRANSITION_FRAMES})}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_CTA}>
          <SkillsCTAScene
            closingHeadlineTop={closingHeadlineTop}
            closingHeadlineBottom={closingHeadlineBottom}
            closingBody={closingBody}
            closingSummaryPrimary={closingSummaryPrimary}
            closingSummarySecondary={closingSummarySecondary}
            contactEmail={contactEmail}
          />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
