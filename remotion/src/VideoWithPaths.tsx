import {TransitionSeries, linearTiming, springTiming} from "@remotion/transitions";
import {fade} from "@remotion/transitions/fade";
import {wipe} from "@remotion/transitions/wipe";
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from "remotion";
import {interpolate, Easing} from "remotion";

import {COLORS, FPS, TRANSITION_FRAMES} from "./constants";
import {BlueprintGridScene} from "./scenes/BlueprintGridScene";
import {IdentityCardScene} from "./scenes/IdentityCardScene";
import {ProjectScene} from "./scenes/ProjectScene";
import {SkillsCTAScene} from "./scenes/SkillsCTAScene";
import {defaultShowreelProps, type ShowreelProps} from "./schemas";

// CAD-style dimension line component
const CADDimensionLine: React.FC<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  startFrame: number;
  duration: number;
  color?: string;
  showArrows?: boolean;
}> = ({ x1, y1, x2, y2, startFrame, duration, color = COLORS.accent, showArrows = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const progress = interpolate(
    frame,
    [startFrame, startFrame + duration * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad) }
  );
  
  const endX = x1 + (x2 - x1) * progress;
  const endY = y1 + (y2 - y1) * progress;
  
  return (
    <g>
      {/* Extension line 1 */}
      <line x1={x1} y1={y1 - 15} x2={x1} y2={y1 + 15} stroke={color} strokeWidth={1} opacity={progress > 0.1 ? 0.8 : 0} />
      {/* Extension line 2 */}
      <line x1={endX} y1={endY - 15} x2={endX} y2={endY + 15} stroke={color} strokeWidth={1} opacity={progress > 0.8 ? 0.8 : 0} />
      {/* Main dimension line */}
      <line x1={x1} y1={y1} x2={endX} y2={endY} stroke={color} strokeWidth={1.5} />
      {/* Arrow at end */}
      {showArrows && progress > 0.3 && (
        <polygon 
          points={`${endX},${endY} ${endX - 6},${endY - 4} ${endX - 6},${endY + 4}`}
          fill={color}
        />
      )}
    </g>
  );
};

// CAD-style centerline component
const CADCenterline: React.FC<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  startFrame: number;
  duration: number;
  color?: string;
}> = ({ x1, y1, x2, y2, startFrame, duration, color = COLORS.accent }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const progress = interpolate(
    frame,
    [startFrame, startFrame + duration * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad) }
  );
  
  const endX = x1 + (x2 - x1) * progress;
  const endY = y1 + (y2 - y1) * progress;
  
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  const dashLen = len / 10;
  
  return (
    <line 
      x1={x1} y1={y1} x2={endX} y2={endY} 
      stroke={color} 
      strokeWidth={1.5}
      strokeDasharray={`${dashLen * 0.3} ${dashLen * 0.2} ${dashLen * 0.3} ${dashLen * 0.2}`}
      opacity={0.9}
    />
  );
};

// CAD-style callout with leader line
const CADCallout: React.FC<{
  points: [number, number][];
  startFrame: number;
  duration: number;
  color?: string;
  label?: string;
}> = ({ points, startFrame, duration, color = COLORS.accent, label }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const progress = interpolate(
    frame,
    [startFrame, startFrame + duration * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad) }
  );
  
  const totalLength = points.reduce((acc, p, i) => {
    if (i === 0) return 0;
    const dx = p[0] - points[i-1][0];
    const dy = p[1] - points[i-1][1];
    return acc + Math.sqrt(dx * dx + dy * dy);
  }, 0);
  
  const currentLength = totalLength * progress;
  
  let drawnLength = 0;
  let pathD = "";
  let lastPoint: [number, number] = [0, 0];
  
  for (let i = 0; i < points.length; i++) {
    if (i === 0) {
      pathD += `M ${points[i][0]} ${points[i][1]}`;
      lastPoint = points[i];
      continue;
    }
    
    const dx = points[i][0] - lastPoint[0];
    const dy = points[i][1] - lastPoint[1];
    const segLen = Math.sqrt(dx * dx + dy * dy);
    
    if (drawnLength + segLen <= currentLength) {
      pathD += ` L ${points[i][0]} ${points[i][1]}`;
      drawnLength += segLen;
      lastPoint = points[i];
    } else {
      const remaining = currentLength - drawnLength;
      const ratio = remaining / segLen;
      const px = lastPoint[0] + dx * ratio;
      const py = lastPoint[1] + dy * ratio;
      pathD += ` L ${px} ${py}`;
      break;
    }
  }
  
  return (
    <g>
      <path d={pathD} stroke={color} strokeWidth={1.5} fill="none" />
      {progress > 0.5 && label && (
        <text x={points[points.length - 1][0] + 10} y={points[points.length - 1][1]} 
          fill={color} fontSize="11" fontFamily="monospace">
          {label}
        </text>
      )}
    </g>
  );
};

// Animated crosshair with CAD styling
const CADCrosshair: React.FC<{
  cx: number;
  cy: number;
  size?: number;
  startFrame: number;
  rotation?: number;
}> = ({ cx, cy, size = 50, startFrame, rotation = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const progress = interpolate(
    frame,
    [startFrame, startFrame + fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  
  const currentSize = size * progress;
  
  return (
    <g transform={`translate(${cx}, ${cy}) rotate(${rotation})`}>
      {/* Horizontal line */}
      <line x1={-currentSize} y1={0} x2={-currentSize * 0.3} y2={0} stroke={COLORS.accent} strokeWidth={1} opacity={0.9} />
      <line x1={currentSize * 0.3} y1={0} x2={currentSize} y2={0} stroke={COLORS.accent} strokeWidth={1} opacity={0.9} />
      {/* Vertical line */}
      <line x1={0} y1={-currentSize} x2={0} y2={-currentSize * 0.3} stroke={COLORS.accent} strokeWidth={1} opacity={0.9} />
      <line x1={0} y1={currentSize * 0.3} x2={0} y2={currentSize} stroke={COLORS.accent} strokeWidth={1} opacity={0.9} />
      {/* Circle */}
      <circle cx={0} cy={0} r={currentSize * 0.15} stroke={COLORS.accent} strokeWidth={1} fill="none" opacity={progress > 0.5 ? 0.8 : 0} />
    </g>
  );
};

// Animated square/rectangle frame
const CADRectangle: React.FC<{
  x: number;
  y: number;
  width: number;
  height: number;
  startFrame: number;
  duration: number;
  color?: string;
}> = ({ x, y, width, height, startFrame, duration, color = COLORS.accent }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const progress = interpolate(
    frame,
    [startFrame, startFrame + duration * fps],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad) }
  );
  
  const currentW = width * progress;
  const currentH = height * progress;
  
  return (
    <rect 
      x={x} 
      y={y} 
      width={currentW} 
      height={currentH} 
      stroke={color} 
      strokeWidth={1.5} 
      fill="none"
      opacity={0.8}
    />
  );
};

// Component that adds industrial CAD animations to scenes
const IndustrialOverlay: React.FC<{ children: React.ReactNode; sceneName: string; frameOffset?: number }> = ({
  children,
  sceneName,
  frameOffset = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Subtle noise texture for blueprint feel
  const noiseIntensity = 0.035;

  return (
    <AbsoluteFill style={{ position: "relative" }}>
      {children}
      
      {/* Subtle noise overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: noiseIntensity,
          background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: "overlay",
        }}
      />
      
      <svg width={1280} height={720} style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {/* Scene-specific CAD animations */}
        {sceneName === "BlueprintGridScene" && (
          <>
            {/* Dimension lines for header area */}
            <CADDimensionLine x1={60} y1={80} x2={400} y2={80} startFrame={frameOffset + 30} duration={1.5} />
            <CADDimensionLine x1={60} y1={140} x2={500} y2={140} startFrame={frameOffset + 60} duration={1.5} />
            
            {/* Crosshairs at key positions */}
            <CADCrosshair cx={100} cy={100} startFrame={frameOffset + 15} rotation={0} />
            <CADCrosshair cx={1180} cy={100} startFrame={frameOffset + 20} rotation={0} />
            <CADCrosshair cx={100} cy={620} startFrame={frameOffset + 25} rotation={0} />
            <CADCrosshair cx={1180} cy={620} startFrame={frameOffset + 30} rotation={0} />
            
            {/* Centerlines */}
            <CADCenterline x1={640} y1={50} x2={640} y2={150} startFrame={frameOffset + 45} duration={1.5} />
            <CADCenterline x1={50} y1={360} x2={200} y2={360} startFrame={frameOffset + 50} duration={1} />
            <CADCenterline x1={1080} y1={360} x2={1230} y2={360} startFrame={frameOffset + 55} duration={1} />
            
            {/* Rectangle frame around key section */}
            <CADRectangle x={80} y={200} width={1120} height={320} startFrame={frameOffset + 40} duration={2} />
            
            {/* Callouts to labels */}
            <CADCallout 
              points={[[80, 250], [120, 250], [120, 280]]} 
              startFrame={frameOffset + 80} 
              duration={1} 
              label="DESIGN"
            />
            <CADCallout 
              points={[[80, 320], [150, 320], [150, 350]]} 
              startFrame={frameOffset + 95} 
              duration={1} 
              label="MANUFACTURE"
            />
            <CADCallout 
              points={[[80, 390], [180, 390], [180, 420]]} 
              startFrame={frameOffset + 110} 
              duration={1} 
              label="ASSEMBLE"
            />
            <CADCallout 
              points={[[80, 460], [160, 460], [160, 490]]} 
              startFrame={frameOffset + 125} 
              duration={1} 
              label="INSPECT"
            />
          </>
        )}
        
        {sceneName === "IdentityCardScene" && (
          <>
            {/* Crosshairs around profile */}
            <CADCrosshair cx={950} cy={250} size={40} startFrame={frameOffset + 20} rotation={45} />
            <CADCrosshair cx={950} cy={550} size={40} startFrame={frameOffset + 30} rotation={45} />
            
            {/* Dimension lines for name/title */}
            <CADDimensionLine x1={70} y1={120} x2={700} y2={120} startFrame={frameOffset + 45} duration={1.5} />
            <CADDimensionLine x1={70} y1={180} x2={600} y2={180} startFrame={frameOffset + 65} duration={1.5} />
            
            {/* Centerlines for credentials */}
            <CADCenterline x1={100} y1={320} x2={100} y2={480} startFrame={frameOffset + 80} duration={1.2} />
            <CADCenterline x1={400} y1={320} x2={400} y2={480} startFrame={frameOffset + 90} duration={1.2} />
            <CADCenterline x1={700} y1={320} x2={700} y2={480} startFrame={frameOffset + 100} duration={1.2} />
            
            {/* Rectangle around spec readouts */}
            <CADRectangle x={70} y={280} width={600} height={180} startFrame={frameOffset + 50} duration={1.5} />
            
            {/* Callouts to tolerance spec */}
            <CADCallout 
              points={[[250, 540], [250, 580], [400, 580]]} 
              startFrame={frameOffset + 120} 
              duration={1} 
              label={'±0.0005"'}
            />
            <CADCallout 
              points={[[450, 540], [450, 580], [600, 580]]} 
              startFrame={frameOffset + 135} 
              duration={1} 
              label="15+ YRS"
            />
          </>
        )}
        
        {sceneName === "ProjectScene" && (
          <>
            {/* Crosshairs in image area */}
            <CADCrosshair cx={550} cy={300} size={60} startFrame={frameOffset + 15} rotation={0} />
            <CADCrosshair cx={850} cy={300} size={60} startFrame={frameOffset + 25} rotation={0} />
            <CADCrosshair cx={550} cy={500} size={60} startFrame={frameOffset + 35} rotation={0} />
            <CADCrosshair cx={850} cy={500} size={60} startFrame={frameOffset + 45} rotation={0} />
            
            {/* Dimension lines for project title */}
            <CADDimensionLine x1={870} y1={120} x2={1200} y2={120} startFrame={frameOffset + 50} duration={1.2} />
            
            {/* Rectangle around problem/constraint/decision */}
            <CADRectangle x={870} y={180} width={380} height={400} startFrame={frameOffset + 60} duration={2} />
            
            {/* Callouts */}
            <CADCallout 
              points={[[880, 220], [920, 220], [920, 250]]} 
              startFrame={frameOffset + 80} 
              duration={0.8} 
              label="PROBLEM"
            />
            <CADCallout 
              points={[[880, 300], [930, 300], [930, 330]]} 
              startFrame={frameOffset + 100} 
              duration={0.8} 
              label="CONSTRAINT"
            />
            <CADCallout 
              points={[[880, 380], [910, 380], [910, 410]]} 
              startFrame={frameOffset + 120} 
              duration={0.8} 
              label="DECISION"
            />
            <CADCallout 
              points={[[880, 460], [940, 460], [940, 490]]} 
              startFrame={frameOffset + 140} 
              duration={0.8} 
              label="VALIDATION"
            />
            
            {/* Centerline for result */}
            <CADCenterline x1={900} y1={600} x2={1150} y2={600} startFrame={frameOffset + 160} duration={1.5} />
          </>
        )}
        
        {sceneName === "SkillsCTAScene" && (
          <>
            {/* Crosshairs */}
            <CADCrosshair cx={640} cy={150} size={50} startFrame={frameOffset + 20} rotation={0} />
            <CADCrosshair cx={200} cy={500} size={40} startFrame={frameOffset + 30} rotation={45} />
            <CADCrosshair cx={1080} cy={500} size={40} startFrame={frameOffset + 40} rotation={45} />
            
            {/* Dimension line for headline */}
            <CADDimensionLine x1={200} y1={200} x2={1080} y2={200} startFrame={frameOffset + 50} duration={2} />
            
            {/* Rectangle around summary */}
            <CADRectangle x={190} y={350} width={900} height={180} startFrame={frameOffset + 70} duration={2} />
            
            {/* Callouts */}
            <CADCallout 
              points={[[220, 380], [280, 380], [280, 410]]} 
              startFrame={frameOffset + 90} 
              duration={1} 
              label="FROM CONCEPT"
            />
            <CADCallout 
              points={[[500, 380], [560, 380], [560, 410]]} 
              startFrame={frameOffset + 105} 
              duration={1} 
              label="TO FLOOR"
            />
            <CADCallout 
              points={[[800, 380], [850, 380], [850, 410]]} 
              startFrame={frameOffset + 120} 
              duration={1} 
              label="DESIGN + MFG"
            />
          </>
        )}
      </svg>
    </AbsoluteFill>
  );
};

const SCENE_BLUEPRINT = 8 * FPS;
const SCENE_IDENTITY = 10 * FPS;
const SCENE_PROJECT = 12 * FPS;
const SCENE_CTA = 8 * FPS;

export const ShowreelWithPathsVideo: React.FC<ShowreelProps> = ({
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
          <IndustrialOverlay sceneName="BlueprintGridScene" frameOffset={0}>
            <BlueprintGridScene
              introHeadlineTop={introHeadlineTop}
              introHeadlineAccent={introHeadlineAccent}
              introHeadlineBottom={introHeadlineBottom}
              introBody={introBody}
            />
          </IndustrialOverlay>
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({durationInFrames: TRANSITION_FRAMES})}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_IDENTITY}>
          <IndustrialOverlay sceneName="IdentityCardScene" frameOffset={SCENE_BLUEPRINT + TRANSITION_FRAMES}>
            <IdentityCardScene />
          </IndustrialOverlay>
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={wipe({direction: "from-left"})}
          timing={springTiming({config: {damping: 200}, durationInFrames: TRANSITION_FRAMES})}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_PROJECT}>
          <IndustrialOverlay sceneName="ProjectScene" frameOffset={SCENE_BLUEPRINT + SCENE_IDENTITY + TRANSITION_FRAMES * 2}>
            <ProjectScene {...projectOne} wipeDirection="left" projectIndex={0} />
          </IndustrialOverlay>
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={wipe({direction: "from-right"})}
          timing={springTiming({config: {damping: 200}, durationInFrames: TRANSITION_FRAMES})}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_PROJECT}>
          <IndustrialOverlay sceneName="ProjectScene" frameOffset={SCENE_BLUEPRINT + SCENE_IDENTITY + SCENE_PROJECT + TRANSITION_FRAMES * 3}>
            <ProjectScene {...projectTwo} wipeDirection="right" projectIndex={1} />
          </IndustrialOverlay>
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={wipe({direction: "from-left"})}
          timing={springTiming({config: {damping: 200}, durationInFrames: TRANSITION_FRAMES})}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_PROJECT}>
          <IndustrialOverlay sceneName="ProjectScene" frameOffset={SCENE_BLUEPRINT + SCENE_IDENTITY + SCENE_PROJECT * 2 + TRANSITION_FRAMES * 4}>
            <ProjectScene {...projectThree} wipeDirection="left" projectIndex={2} />
          </IndustrialOverlay>
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({durationInFrames: TRANSITION_FRAMES})}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE_CTA}>
          <IndustrialOverlay sceneName="SkillsCTAScene" frameOffset={SCENE_BLUEPRINT + SCENE_IDENTITY + SCENE_PROJECT * 3 + TRANSITION_FRAMES * 5}>
            <SkillsCTAScene
              closingHeadlineTop={closingHeadlineTop}
              closingHeadlineBottom={closingHeadlineBottom}
              closingBody={closingBody}
              closingSummaryPrimary={closingSummaryPrimary}
              closingSummarySecondary={closingSummarySecondary}
              contactEmail={contactEmail}
            />
          </IndustrialOverlay>
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
