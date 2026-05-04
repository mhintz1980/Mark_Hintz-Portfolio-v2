import { motion, motionValue, useTransform, type MotionValue } from 'framer-motion';
import { useEffect, useState } from 'react';

type Point = [number, number];

const sectionTicks = [
  { x: 470, y: 20, label: 'A' },
  { x: 970, y: 20, label: 'B' },
  { x: 1450, y: 20, label: 'C' },
  { x: 20, y: 350, label: 'A' },
  { x: 20, y: 760, label: 'B' },
  { x: 20, y: 1120, label: 'C' },
  { x: 1900, y: 350, label: 'A' },
  { x: 1900, y: 760, label: 'B' },
  { x: 1900, y: 1120, label: 'C' },
];

const serviceRows = [
  ['CAD', 'SOLIDWORKS', 'ASME PACKAGE'],
  ['DFM', 'MACHINING REVIEW', 'ACTIONABLE REDLINES'],
  ['PDM', 'VAULT WORKFLOW', 'REV CONTROL'],
  ['AI', 'SHOP FLOOR TOOLS', 'AUTOMATION'],
  ['DOC', 'DRAWING AUDIT', 'GD&T REVIEW'],
  ['CAP', 'SCHEDULING', 'CAPACITY PLAN'],
];

/**
 * DrawingBackground renders the sheet itself. It should read as a mechanical
 * drawing first, with page content floating over a complete blueprint surface.
 */
export function DrawingBackground({ scrollYProgress }: { scrollYProgress?: MotionValue<number> }) {
  const line = 'rgba(230,239,250,0.48)';
  const lineDim = 'rgba(230,239,250,0.22)';
  const lineFaint = 'rgba(230,239,250,0.12)';
  const lineStrong = 'rgba(245,249,255,0.72)';
  const blue = 'rgba(41,145,255,0.78)';
  const blueDim = 'rgba(41,145,255,0.34)';
  const [isMobile, setIsMobile] = useState(false);
  const fallbackProgress = motionValue(0);
  const progress = scrollYProgress ?? fallbackProgress;
  const parallaxScale = isMobile ? 0.45 : 1;

  useEffect(() => {
    const query = window.matchMedia('(max-width: 767px)');
    const updateIsMobile = () => setIsMobile(query.matches);

    updateIsMobile();
    query.addEventListener('change', updateIsMobile);

    return () => query.removeEventListener('change', updateIsMobile);
  }, []);

  const plateX = useTransform(progress, [0, 1], [0, -34 * parallaxScale]);
  const plateY = useTransform(progress, [0, 1], [0, -26 * parallaxScale]);
  const drawingX = useTransform(progress, [0, 1], [0, -92 * parallaxScale]);
  const drawingY = useTransform(progress, [0, 1], [0, -76 * parallaxScale]);
  const detailX = useTransform(progress, [0, 1], [0, -150 * parallaxScale]);
  const detailY = useTransform(progress, [0, 1], [0, -116 * parallaxScale]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <svg
        viewBox="0 0 1920 1400"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="minor-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke={lineFaint} strokeWidth="0.55" />
          </pattern>
          <pattern id="major-grid" width="200" height="200" patternUnits="userSpaceOnUse">
            <path d="M 200 0 L 0 0 0 200" fill="none" stroke={lineDim} strokeWidth="0.9" />
          </pattern>
          <radialGradient id="sheet-vignette" cx="50%" cy="50%" r="68%">
            <stop offset="0%" stopColor="rgba(18,26,36,0)" />
            <stop offset="70%" stopColor="rgba(9,14,22,0.30)" />
            <stop offset="100%" stopColor="rgba(4,8,14,0.72)" />
          </radialGradient>
          <filter id="line-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="0.9" floodColor="rgba(188,220,255,0.28)" />
          </filter>
        </defs>

        <rect width="1920" height="1400" fill="url(#minor-grid)" />
        <rect width="1920" height="1400" fill="url(#major-grid)" />
        <rect width="1920" height="1400" fill="url(#sheet-vignette)" />

        <motion.g style={{ x: plateX, y: plateY }} filter="url(#line-glow)">
          <SheetFrame line={lineStrong} lineDim={lineDim} />
          <TitleBlock x={44} y={34} line={lineStrong} lineDim={lineDim} blue={blue} />
          <RevisionBlock x={1254} y={34} line={line} lineDim={lineDim} blue={blue} />
          <FooterBlock x={1060} y={1228} line={lineStrong} lineDim={lineDim} blue={blue} />

          {sectionTicks.map((tick) => (
            <SectionTick key={`${tick.x}-${tick.y}`} {...tick} line={lineStrong} />
          ))}
        </motion.g>

        <motion.g style={{ x: drawingX, y: drawingY }} filter="url(#line-glow)">
          <ProjectDrawingBoard x={90} y={458} line={lineStrong} lineDim={lineDim} lineFaint={lineFaint} blue={blue} blueDim={blueDim} />
          <IsometricHousing x={610} y={192} scale={1.05} line={line} lineDim={lineDim} />
          <IsometricMotor x={1258} y={166} scale={1.22} line={line} lineDim={lineDim} />
          <LargeAssemblyGhost x={1380} y={590} scale={1.55} line={lineDim} lineFaint={lineFaint} />
          <ServicesTable x={1090} y={780} line={lineStrong} lineDim={lineDim} blue={blue} />
          <Testimonials x={1090} y={1040} line={line} lineDim={lineDim} />
        </motion.g>

        <motion.g style={{ x: detailX, y: detailY }} filter="url(#line-glow)">
          <LeaderNetwork line={blue} blueDim={blueDim} />
          <DetailBubble cx={310} cy={620} r={170} label="DETAIL A" line={lineStrong} blue={blue} />
          <DetailBubble cx={670} cy={1030} r={142} label="DETAIL B" line={lineStrong} blue={blue} />
          <DetailBubble cx={1215} cy={470} r={146} label="DETAIL C" line={lineStrong} blue={blue} />
          <DetailBubble cx={360} cy={1188} r={138} label="DETAIL D" line={lineStrong} blue={blue} />
          <CalloutText x={1450} y={442} line={lineStrong} blue={blue} />
          <CalloutText x={148} y={930} line={lineStrong} blue={blue} compact />
          <CalloutText x={575} y={1186} line={lineStrong} blue={blue} compact />
        </motion.g>
      </svg>
    </div>
  );
}

function SheetFrame({ line, lineDim }: { line: string; lineDim: string }) {
  return (
    <g>
      <rect x="28" y="28" width="1864" height="1328" fill="none" stroke={line} strokeWidth="2.2" />
      <rect x="50" y="50" width="1820" height="1284" fill="none" stroke={lineDim} strokeWidth="1" />
      <line x1="28" y1="128" x2="1888" y2="128" stroke={lineDim} strokeWidth="1" />
      <line x1="28" y1="1210" x2="1888" y2="1210" stroke={lineDim} strokeWidth="1" />
    </g>
  );
}

function SectionTick({ x, y, label, line }: { x: number; y: number; label: string; line: string }) {
  const vertical = x < 40 || x > 1880;
  return (
    <g>
      {vertical ? (
        <line x1={x} y1={y - 40} x2={x} y2={y + 40} stroke={line} strokeWidth="1.4" />
      ) : (
        <line x1={x - 55} y1={y} x2={x + 55} y2={y} stroke={line} strokeWidth="1.4" />
      )}
      <text x={x + (vertical ? 18 : 0)} y={y + (vertical ? 4 : 20)} fill={line} fontSize="18" fontFamily="monospace" textAnchor={vertical ? 'start' : 'middle'}>
        {label}
      </text>
    </g>
  );
}

function TitleBlock({ x, y, line, lineDim, blue }: { x: number; y: number; line: string; lineDim: string; blue: string }) {
  return (
    <g>
      <rect x={x} y={y} width="900" height="168" fill="rgba(9,16,25,0.34)" stroke={line} strokeWidth="1.7" />
      <line x1={x} y1={y + 84} x2={x + 900} y2={y + 84} stroke={line} strokeWidth="1.1" />
      <line x1={x + 520} y1={y + 84} x2={x + 520} y2={y + 168} stroke={lineDim} strokeWidth="1" />
      <line x1={x + 660} y1={y + 84} x2={x + 660} y2={y + 168} stroke={lineDim} strokeWidth="1" />
      <text x={x + 18} y={y + 28} fill={line} fontSize="15" fontFamily="monospace">DRAWING TITLE:</text>
      <text x={x + 70} y={y + 72} fill={line} fontSize="43" fontFamily="monospace" letterSpacing="4">DESIGN + MANUFACTURING BRIDGE</text>
      <text x={x + 18} y={y + 115} fill={line} fontSize="15" fontFamily="monospace">NAME:</text>
      <text x={x + 70} y={y + 154} fill={line} fontSize="31" fontFamily="monospace" letterSpacing="2">MARK HINTZ</text>
      <text x={x + 540} y={y + 115} fill={lineDim} fontSize="14" fontFamily="monospace">REVISION:</text>
      <text x={x + 585} y={y + 154} fill={blue} fontSize="32" fontFamily="monospace">C</text>
      <text x={x + 680} y={y + 115} fill={lineDim} fontSize="14" fontFamily="monospace">DATE:</text>
      <text x={x + 720} y={y + 154} fill={line} fontSize="28" fontFamily="monospace">2026</text>
      <path d={`M ${x + 520} ${y + 168} v 40 h 35`} fill="none" stroke={line} strokeWidth="1.1" />
      <text x={x + 552} y={y + 221} fill={line} fontSize="20" fontFamily="monospace">A</text>
    </g>
  );
}

function RevisionBlock({ x, y, line, lineDim, blue }: { x: number; y: number; line: string; lineDim: string; blue: string }) {
  return (
    <g>
      <rect x={x} y={y} width="520" height="64" fill="rgba(9,16,25,0.28)" stroke={line} strokeWidth="1.2" />
      <line x1={x + 84} y1={y} x2={x + 84} y2={y + 64} stroke={lineDim} />
      <line x1={x + 330} y1={y} x2={x + 330} y2={y + 64} stroke={lineDim} />
      <line x1={x} y1={y + 24} x2={x + 520} y2={y + 24} stroke={lineDim} />
      <text x={x + 18} y={y + 17} fill={line} fontSize="10" fontFamily="monospace">REV</text>
      <text x={x + 104} y={y + 17} fill={line} fontSize="10" fontFamily="monospace">DESCRIPTION</text>
      <text x={x + 350} y={y + 17} fill={line} fontSize="10" fontFamily="monospace">DATE</text>
      {['A', 'B'].map((rev, index) => (
        <g key={rev}>
          <text x={x + 24} y={y + 42 + index * 16} fill={blue} fontSize="12" fontFamily="monospace">{rev}</text>
          <text x={x + 104} y={y + 42 + index * 16} fill={lineDim} fontSize="10" fontFamily="monospace">
            {index === 0 ? 'INITIAL RELEASE' : 'DRAWING PACKAGE BUILD'}
          </text>
          <text x={x + 350} y={y + 42 + index * 16} fill={lineDim} fontSize="10" fontFamily="monospace">
            {index === 0 ? '2024' : '2026'}
          </text>
        </g>
      ))}
    </g>
  );
}

function FooterBlock({ x, y, line, lineDim, blue }: { x: number; y: number; line: string; lineDim: string; blue: string }) {
  const columns = ['CONTACT', 'LINKS', 'CAPABILITY', 'SHEET NOTES'];
  return (
    <g>
      <rect x={x} y={y} width="760" height="86" fill="rgba(9,16,25,0.36)" stroke={line} strokeWidth="1.4" />
      {columns.map((label, i) => (
        <g key={label}>
          {i > 0 && <line x1={x + i * 190} y1={y} x2={x + i * 190} y2={y + 86} stroke={lineDim} />}
          <text x={x + 18 + i * 190} y={y + 25} fill={line} fontSize="13" fontFamily="monospace">{label}</text>
          <text x={x + 18 + i * 190} y={y + 50} fill={blue} fontSize="10" fontFamily="monospace">MARKWORKS.DEV</text>
          <text x={x + 18 + i * 190} y={y + 67} fill={lineDim} fontSize="10" fontFamily="monospace">FIELD READY</text>
        </g>
      ))}
    </g>
  );
}

function ProjectDrawingBoard({
  x,
  y,
  line,
  lineDim,
  lineFaint,
  blue,
  blueDim,
}: {
  x: number;
  y: number;
  line: string;
  lineDim: string;
  lineFaint: string;
  blue: string;
  blueDim: string;
}) {
  return (
    <g>
      <text x={x + 18} y={y - 34} fill={line} fontSize="34" fontFamily="monospace" letterSpacing="2">PROJECTS</text>
      <rect x={x} y={y} width="720" height="520" fill="rgba(9,16,25,0.20)" stroke={line} strokeWidth="1.6" />
      <rect x={x + 16} y={y + 16} width="688" height="488" fill="none" stroke={lineDim} strokeWidth="0.9" />
      <line x1={x + 16} y1={y + 86} x2={x + 704} y2={y + 86} stroke={lineDim} />
      <line x1={x + 16} y1={y + 320} x2={x + 704} y2={y + 320} stroke={lineDim} />
      <line x1={x + 350} y1={y + 86} x2={x + 350} y2={y + 504} stroke={lineDim} />
      <OrthographicGearbox x={x + 390} y={y + 100} scale={1.02} line={line} lineDim={lineDim} lineFaint={lineFaint} />
      <OrthographicPump x={x + 120} y={y + 325} scale={1.1} line={line} lineDim={lineDim} lineFaint={lineFaint} />
      <SectionMarker x={x - 40} y={y + 132} label="A" line={line} />
      <SectionMarker x={x + 730} y={y + 132} label="B" line={line} />
      <SectionMarker x={x - 40} y={y + 384} label="A" line={line} />
      <SectionMarker x={x + 730} y={y + 384} label="B" line={line} />
      <circle cx={x + 620} cy={y + 28} r="10" fill="none" stroke={blue} strokeWidth="2" />
      <polyline points={`${x + 620},${y + 28} ${x + 910},${y + 28} ${x + 1070},${y - 110}`} fill="none" stroke={blueDim} strokeWidth="1.7" />
      <polyline points={`${x + 520},${y + 498} ${x + 810},${y + 680} ${x + 990},${y + 650}`} fill="none" stroke={blueDim} strokeWidth="1.7" />
    </g>
  );
}

function SectionMarker({ x, y, label, line }: { x: number; y: number; label: string; line: string }) {
  return (
    <g>
      <line x1={x} y1={y} x2={x + 34} y2={y} stroke={line} strokeWidth="1.2" />
      <line x1={x + 16} y1={y - 36} x2={x + 16} y2={y + 36} stroke={line} strokeWidth="1.2" />
      <text x={x + 8} y={y - 44} fill={line} fontSize="18" fontFamily="monospace">{label}</text>
    </g>
  );
}

function DetailBubble({ cx, cy, r, label, line, blue }: { cx: number; cy: number; r: number; label: string; line: string; blue: string }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="rgba(21,36,56,0.28)" stroke={blue} strokeWidth="2.2" />
      <circle cx={cx} cy={cy} r={r - 18} fill="none" stroke="rgba(230,239,250,0.16)" strokeWidth="0.9" />
      <text x={cx} y={cy + r + 38} fill={blue} fontSize="17" fontFamily="monospace" textAnchor="middle">{label}</text>
      <text x={cx + 72} y={cy + r + 38} fill={line} fontSize="13" fontFamily="monospace">SCALE 2:1</text>
      <IsometricMotor x={cx - 95} y={cy - 72} scale={0.52} line={line} lineDim="rgba(230,239,250,0.34)" />
    </g>
  );
}

function LeaderNetwork({ line, blueDim }: { line: string; blueDim: string }) {
  return (
    <g>
      <polyline points="310,620 650,620 835,770 1030,770" fill="none" stroke={line} strokeWidth="1.7" />
      <polyline points="670,1030 850,830 1215,470" fill="none" stroke={line} strokeWidth="1.7" />
      <polyline points="360,1188 500,1080 670,1030" fill="none" stroke={line} strokeWidth="1.7" />
      <polyline points="1215,470 1380,470 1440,442" fill="none" stroke={line} strokeWidth="1.7" />
      <circle cx="835" cy="770" r="7" fill="none" stroke={line} strokeWidth="1.5" />
      <circle cx="1030" cy="770" r="4" fill={line} />
      <path d="M 70 1220 C 310 1110, 580 1180, 845 1325" fill="none" stroke={blueDim} strokeWidth="1.2" />
      <path d="M 970 210 C 1130 150, 1310 210, 1518 342" fill="none" stroke={blueDim} strokeWidth="1.2" />
    </g>
  );
}

function CalloutText({ x, y, line, blue, compact = false }: { x: number; y: number; line: string; blue: string; compact?: boolean }) {
  const rows = compact
    ? [
        ['MAT', '6061-T6 ALUMINUM'],
        ['TOL', '+/- 0.005 MM'],
        ['PROC', '5-AXIS CNC MILLING'],
        ['OUT', 'TESTED PACKAGE'],
      ]
    : [
        ['MATERIAL', '7075-T6 ALUMINUM'],
        ['TOLERANCE', '+/- 0.0005 IN'],
        ['PROCESS', 'MILL-TURN + INSPECTION'],
        ['OUTCOME', 'FIELD-READY PACKAGE'],
      ];

  return (
    <g>
      {rows.map(([label, value], index) => (
        <g key={label}>
          <text x={x} y={y + index * 25} fill={line} fontSize={compact ? 14 : 17} fontFamily="monospace">{label}:</text>
          <text x={x + (compact ? 62 : 118)} y={y + index * 25} fill={index === rows.length - 1 ? blue : line} fontSize={compact ? 14 : 17} fontFamily="monospace">{value}</text>
        </g>
      ))}
    </g>
  );
}

function ServicesTable({ x, y, line, lineDim, blue }: { x: number; y: number; line: string; lineDim: string; blue: string }) {
  return (
    <g>
      <text x={x} y={y - 28} fill={line} fontSize="34" fontFamily="monospace" letterSpacing="2">SERVICES</text>
      <rect x={x} y={y} width="670" height="252" fill="rgba(9,16,25,0.26)" stroke={line} strokeWidth="1.5" />
      <line x1={x + 210} y1={y} x2={x + 210} y2={y + 252} stroke={lineDim} />
      <line x1={x + 445} y1={y} x2={x + 445} y2={y + 252} stroke={lineDim} />
      <text x={x + 18} y={y + 26} fill={line} fontSize="14" fontFamily="monospace">CAPABILITY</text>
      <text x={x + 230} y={y + 26} fill={line} fontSize="14" fontFamily="monospace">REQUIREMENTS</text>
      <text x={x + 465} y={y + 26} fill={line} fontSize="14" fontFamily="monospace">COMPLIANCE NOTES</text>
      {serviceRows.map(([cap, req, note], index) => {
        const rowY = y + 40 + index * 34;
        return (
          <g key={cap}>
            <line x1={x} y1={rowY} x2={x + 670} y2={rowY} stroke={lineDim} />
            <text x={x + 18} y={rowY + 23} fill={blue} fontSize="13" fontFamily="monospace">{cap}</text>
            <text x={x + 230} y={rowY + 23} fill={line} fontSize="13" fontFamily="monospace">{req}</text>
            <text x={x + 465} y={rowY + 23} fill={lineDim} fontSize="13" fontFamily="monospace">{note}</text>
          </g>
        );
      })}
    </g>
  );
}

function Testimonials({ x, y, line, lineDim }: { x: number; y: number; line: string; lineDim: string }) {
  return (
    <g>
      <text x={x} y={y - 32} fill={line} fontSize="31" fontFamily="monospace" letterSpacing="2">TESTIMONIALS</text>
      {[0, 1, 2, 3].map((index) => {
        const col = index % 3;
        const row = Math.floor(index / 3);
        const boxX = x + col * 210;
        const boxY = y + row * 86;
        return (
          <g key={index}>
            <rect x={boxX} y={boxY} width="180" height="72" fill="rgba(9,16,25,0.22)" stroke={line} strokeWidth="1.1" />
            <text x={boxX + 14} y={boxY + 25} fill={line} fontSize="24" fontFamily="serif">"</text>
            <line x1={boxX + 130} y1={boxY + 70} x2={boxX + 178} y2={boxY + 22} stroke={lineDim} />
            <text x={boxX + 34} y={boxY + 30} fill={lineDim} fontSize="9" fontFamily="monospace">SHOP FLOOR PROOF</text>
            <text x={boxX + 34} y={boxY + 48} fill={lineDim} fontSize="9" fontFamily="monospace">QUALITY SCORE 100</text>
          </g>
        );
      })}
    </g>
  );
}

function IsometricHousing({ x, y, scale, line, lineDim }: { x: number; y: number; scale: number; line: string; lineDim: string }) {
  const s = (points: Point[]) => points.map(([px, py]) => `${x + px * scale},${y + py * scale}`).join(' ');
  return (
    <g>
      <polygon points={s([[0, 60], [120, 0], [270, 76], [150, 140]])} fill="none" stroke={line} strokeWidth="1.2" />
      <polygon points={s([[0, 60], [0, 210], [150, 292], [150, 140]])} fill="none" stroke={line} strokeWidth="1.2" />
      <polygon points={s([[150, 140], [270, 76], [270, 226], [150, 292]])} fill="none" stroke={lineDim} strokeWidth="1.1" />
      <polygon points={s([[42, 76], [122, 36], [222, 86], [142, 130]])} fill="none" stroke={lineDim} strokeWidth="1" />
      <circle cx={x + 72 * scale} cy={y + 177 * scale} r={38 * scale} fill="none" stroke={line} strokeWidth="1" />
      <circle cx={x + 72 * scale} cy={y + 177 * scale} r={19 * scale} fill="none" stroke={lineDim} strokeWidth="0.8" />
      <path d={`M ${x + 270 * scale} ${y + 126 * scale} l ${54 * scale} ${-28 * scale} v ${118 * scale} l ${-54 * scale} ${30 * scale}`} fill="none" stroke={lineDim} strokeWidth="1" />
      <path d={`M ${x + 118 * scale} ${y - 18 * scale} v ${46 * scale} h ${24 * scale}`} fill="none" stroke={line} strokeWidth="1" />
      <text x={x + 148 * scale} y={y - 20 * scale} fill={line} fontSize={18 * scale} fontFamily="monospace">A</text>
      <path d={`M ${x + 270 * scale} ${y + 226 * scale} h ${50 * scale} v ${34 * scale}`} fill="none" stroke={line} strokeWidth="1" />
      <text x={x + 330 * scale} y={y + 275 * scale} fill={line} fontSize={18 * scale} fontFamily="monospace">B</text>
    </g>
  );
}

function IsometricMotor({ x, y, scale, line, lineDim }: { x: number; y: number; scale: number; line: string; lineDim: string }) {
  const sx = (value: number) => x + value * scale;
  const sy = (value: number) => y + value * scale;

  return (
    <g>
      <ellipse cx={sx(210)} cy={sy(120)} rx={92 * scale} ry={54 * scale} fill="none" stroke={line} strokeWidth="1.2" transform={`rotate(23 ${sx(210)} ${sy(120)})`} />
      <ellipse cx={sx(315)} cy={sy(120)} rx={70 * scale} ry={48 * scale} fill="none" stroke={lineDim} strokeWidth="1" transform={`rotate(23 ${sx(315)} ${sy(120)})`} />
      <line x1={sx(138)} y1={sy(86)} x2={sx(272)} y2={sy(52)} stroke={lineDim} strokeWidth="1" />
      <line x1={sx(164)} y1={sy(174)} x2={sx(338)} y2={sy(188)} stroke={lineDim} strokeWidth="1" />
      {Array.from({ length: 18 }).map((_, i) => (
        <line
          key={i}
          x1={sx(155 + i * 8)}
          y1={sy(76 - i * 0.8)}
          x2={sx(185 + i * 8)}
          y2={sy(166 + i * 1.2)}
          stroke={lineDim}
          strokeWidth="0.75"
        />
      ))}
      <rect x={sx(85)} y={sy(98)} width={110 * scale} height={40 * scale} fill="none" stroke={line} strokeWidth="1" transform={`rotate(23 ${sx(140)} ${sy(118)})`} />
      <line x1={sx(14)} y1={sy(106)} x2={sx(110)} y2={sy(118)} stroke={line} strokeWidth="4" />
      <line x1={sx(14)} y1={sy(92)} x2={sx(110)} y2={sy(104)} stroke={lineDim} strokeWidth="1" />
      <line x1={sx(14)} y1={sy(122)} x2={sx(110)} y2={sy(134)} stroke={lineDim} strokeWidth="1" />
      <rect x={sx(172)} y={sy(170)} width={190 * scale} height={52 * scale} fill="none" stroke={lineDim} strokeWidth="1" transform={`rotate(2 ${sx(172)} ${sy(170)})`} />
      <line x1={sx(185)} y1={sy(222)} x2={sx(118)} y2={sy(280)} stroke={lineDim} strokeWidth="1" />
      <line x1={sx(340)} y1={sy(224)} x2={sx(402)} y2={sy(278)} stroke={lineDim} strokeWidth="1" />
      <circle cx={sx(286)} cy={sy(94)} r={9 * scale} fill="none" stroke={line} strokeWidth="1" />
      <circle cx={sx(246)} cy={sy(164)} r={9 * scale} fill="none" stroke={line} strokeWidth="1" />
    </g>
  );
}

function OrthographicGearbox({ x, y, scale, line, lineDim, lineFaint }: { x: number; y: number; scale: number; line: string; lineDim: string; lineFaint: string }) {
  const sx = (value: number) => x + value * scale;
  const sy = (value: number) => y + value * scale;

  return (
    <g>
      <rect x={sx(0)} y={sy(0)} width={260 * scale} height={126 * scale} fill="none" stroke={line} strokeWidth="1.1" />
      <rect x={sx(30)} y={sy(28)} width={198 * scale} height={70 * scale} fill="none" stroke={lineDim} strokeWidth="0.9" />
      <circle cx={sx(130)} cy={sy(63)} r={38 * scale} fill="none" stroke={line} strokeWidth="1" />
      <circle cx={sx(130)} cy={sy(63)} r={18 * scale} fill="none" stroke={lineDim} strokeWidth="0.8" />
      <line x1={sx(-18)} y1={sy(63)} x2={sx(278)} y2={sy(63)} stroke={lineDim} strokeDasharray="24 6 4 6" />
      <line x1={sx(130)} y1={sy(-22)} x2={sx(130)} y2={sy(148)} stroke={lineDim} strokeDasharray="24 6 4 6" />
      <rect x={sx(18)} y={sy(174)} width={240 * scale} height={80 * scale} fill="none" stroke={lineDim} strokeWidth="0.9" />
      <line x1={sx(48)} y1={sy(174)} x2={sx(48)} y2={sy(254)} stroke={lineFaint} strokeDasharray="12 8" />
      <line x1={sx(108)} y1={sy(174)} x2={sx(108)} y2={sy(254)} stroke={lineFaint} strokeDasharray="12 8" />
      <line x1={sx(168)} y1={sy(174)} x2={sx(168)} y2={sy(254)} stroke={lineFaint} strokeDasharray="12 8" />
      <line x1={sx(228)} y1={sy(174)} x2={sx(228)} y2={sy(254)} stroke={lineFaint} strokeDasharray="12 8" />
      <text x={sx(85)} y={sy(288)} fill={lineDim} fontSize={13 * scale} fontFamily="monospace">SIDE VIEW</text>
    </g>
  );
}

function OrthographicPump({ x, y, scale, line, lineDim, lineFaint }: { x: number; y: number; scale: number; line: string; lineDim: string; lineFaint: string }) {
  const sx = (value: number) => x + value * scale;
  const sy = (value: number) => y + value * scale;

  return (
    <g>
      <circle cx={sx(70)} cy={sy(70)} r={62 * scale} fill="none" stroke={line} strokeWidth="1.1" />
      <circle cx={sx(70)} cy={sy(70)} r={32 * scale} fill="none" stroke={lineDim} strokeWidth="0.9" />
      <circle cx={sx(70)} cy={sy(70)} r={13 * scale} fill="none" stroke={lineDim} strokeWidth="0.7" />
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i / 16) * Math.PI * 2;
        return (
          <line
            key={i}
            x1={sx(70 + Math.cos(angle) * 33)}
            y1={sy(70 + Math.sin(angle) * 33)}
            x2={sx(70 + Math.cos(angle) * 62)}
            y2={sy(70 + Math.sin(angle) * 62)}
            stroke={lineFaint}
            strokeWidth="0.8"
          />
        );
      })}
      <line x1={sx(-20)} y1={sy(70)} x2={sx(160)} y2={sy(70)} stroke={lineDim} strokeDasharray="24 6 4 6" />
      <line x1={sx(70)} y1={sy(-20)} x2={sx(70)} y2={sy(160)} stroke={lineDim} strokeDasharray="24 6 4 6" />
      <rect x={sx(230)} y={sy(6)} width={95 * scale} height={124 * scale} fill="none" stroke={line} strokeWidth="1" />
      <circle cx={sx(278)} cy={sy(68)} r={32 * scale} fill="none" stroke={lineDim} strokeWidth="0.9" />
      <line x1={sx(210)} y1={sy(68)} x2={sx(344)} y2={sy(68)} stroke={lineDim} strokeDasharray="24 6 4 6" />
      <line x1={sx(278)} y1={sy(0)} x2={sx(278)} y2={sy(138)} stroke={lineDim} strokeDasharray="24 6 4 6" />
    </g>
  );
}

function LargeAssemblyGhost({ x, y, scale, line, lineFaint }: { x: number; y: number; scale: number; line: string; lineFaint: string }) {
  const sx = (value: number) => x + value * scale;
  const sy = (value: number) => y + value * scale;

  return (
    <g opacity="0.9">
      <path d={`M ${sx(10)} ${sy(110)} l ${sx(170) - sx(10)} ${sy(-30) - sy(110)} l ${sx(360) - sx(170)} ${sy(25) - sy(-30)} l ${sx(205) - sx(360)} ${sy(180) - sy(25)} Z`} fill="none" stroke={line} strokeWidth="1" />
      <ellipse cx={sx(255)} cy={sy(82)} rx={78 * scale} ry={42 * scale} fill="none" stroke={line} strokeWidth="0.9" transform={`rotate(-18 ${sx(255)} ${sy(82)})`} />
      <ellipse cx={sx(185)} cy={sy(118)} rx={58 * scale} ry={34 * scale} fill="none" stroke={lineFaint} strokeWidth="0.9" transform={`rotate(-18 ${sx(185)} ${sy(118)})`} />
      <line x1={sx(-60)} y1={sy(126)} x2={sx(120)} y2={sy(95)} stroke={line} strokeWidth="1.2" />
      <line x1={sx(320)} y1={sy(56)} x2={sx(465)} y2={sy(22)} stroke={lineFaint} strokeWidth="1" />
      <line x1={sx(44)} y1={sy(220)} x2={sx(350)} y2={sy(220)} stroke={lineFaint} strokeDasharray="16 10" />
      <line x1={sx(132)} y1={sy(-70)} x2={sx(132)} y2={sy(250)} stroke={lineFaint} strokeDasharray="16 10" />
    </g>
  );
}
