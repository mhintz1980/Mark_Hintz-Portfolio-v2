// CAD Mechanical Drawing SVGs — high visibility for tuning
// 6 distinct drawings: Gear, Bracket, Shaft, Housing, ToleranceZone, DimensionDetail

export const GearDrawing = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 300 300"
    className={`w-full h-full fill-none ${className ?? ''}`}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="150" cy="150" r="120" className="stroke-cad-line-primary/70 stroke-2" />
    <circle cx="150" cy="150" r="100" className="stroke-cad-line-secondary/50 stroke-[1px]" />
    {Array.from({ length: 24 }).map((_, i) => {
      const angle = (i * 15 * Math.PI) / 180;
      return (
        <line
          key={i}
          x1={150 + 100 * Math.cos(angle)}
          y1={150 + 100 * Math.sin(angle)}
          x2={150 + 120 * Math.cos(angle)}
          y2={150 + 120 * Math.sin(angle)}
          className="stroke-cad-line-primary/70 stroke-2"
        />
      );
    })}
    <circle cx="150" cy="150" r="25" className="stroke-cad-line-primary/70 stroke-2" />
    <line x1="20" y1="150" x2="280" y2="150" className="stroke-cad-centerline/40 stroke-[0.5px]" strokeDasharray="12 3 3 3" />
    <line x1="150" y1="20" x2="150" y2="280" className="stroke-cad-centerline/40 stroke-[0.5px]" strokeDasharray="12 3 3 3" />
  </svg>
);

export const BracketDrawing = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 250 200"
    className={`w-full h-full fill-none ${className ?? ''}`}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20,20 L20,180 L230,180 L230,140 L60,140 L60,20 Z" className="stroke-cad-line-primary/70 stroke-2" />
    <line x1="60" y1="60" x2="230" y2="60" className="stroke-cad-hidden/40 stroke-[1px]" strokeDasharray="5 3" />
    <circle cx="40" cy="40" r="8" className="stroke-cad-line-primary/70 stroke-2" />
    <circle cx="40" cy="160" r="8" className="stroke-cad-line-primary/70 stroke-2" />
  </svg>
);

export const ShaftDrawing = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 400 80"
    className={`w-full h-full fill-none ${className ?? ''}`}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="20" y1="40" x2="380" y2="40" className="stroke-cad-centerline/40 stroke-[0.5px]" strokeDasharray="12 3 3 3" />
    <rect x="50" y="20" width="300" height="40" className="stroke-cad-line-primary/70 stroke-2" />
    <rect x="150" y="20" width="60" height="12" className="stroke-cad-line-primary/80 stroke-[1.5px]" />
  </svg>
);

export const HousingDrawing = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 350 250"
    className={`w-full h-full fill-none ${className ?? ''}`}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M30,30 L320,30 L320,220 L30,220 Z M60,60 L290,60 L290,190 L60,190 Z" className="stroke-cad-line-primary/70 stroke-2" />
    <circle cx="175" cy="125" r="40" className="stroke-cad-line-primary/80 stroke-[1.5px]" />
    <circle cx="50" cy="50" r="6" className="stroke-cad-line-primary/70 stroke-2" />
    <circle cx="300" cy="50" r="6" className="stroke-cad-line-primary/70 stroke-2" />
    <circle cx="50" cy="200" r="6" className="stroke-cad-line-primary/70 stroke-2" />
    <circle cx="300" cy="200" r="6" className="stroke-cad-line-primary/70 stroke-2" />
    <line x1="100" y1="125" x2="250" y2="125" className="stroke-cad-centerline/40 stroke-[0.5px]" strokeDasharray="12 3 3 3" />
  </svg>
);

export const ToleranceZoneDrawing = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 120 80"
    className={`w-full h-full fill-none ${className ?? ''}`}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="10" y="10" width="100" height="60" className="stroke-cad-line-primary/80 stroke-[1.5px]" />
    <line x1="10" y1="35" x2="110" y2="35" className="stroke-cad-line-secondary/50 stroke-[1px]" />
    <text x="60" y="28" textAnchor="middle" className="fill-cad-line-primary/60" style={{ fontSize: '9px', fontFamily: 'JetBrains Mono, monospace' }}>⌀ 0.001</text>
    <text x="60" y="52" textAnchor="middle" className="fill-cad-line-primary/60" style={{ fontSize: '9px', fontFamily: 'JetBrains Mono, monospace' }}>A | B</text>
  </svg>
);

export const DimensionDetailDrawing = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 200 100"
    className={`w-full h-full fill-none ${className ?? ''}`}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="30" y1="25" x2="30" y2="80" className="stroke-cad-dimension/70 stroke-[1px]" />
    <line x1="170" y1="25" x2="170" y2="80" className="stroke-cad-dimension/70 stroke-[1px]" />
    <line x1="30" y1="60" x2="170" y2="60" className="stroke-cad-dimension/70 stroke-[1px]" />
    {/* Arrow heads */}
    <polygon points="30,55 40,60 30,65" className="fill-cad-dimension/50 stroke-none" />
    <polygon points="170,55 160,60 170,65" className="fill-cad-dimension/50 stroke-none" />
    {/* Dimension text */}
    <text x="100" y="55" textAnchor="middle" className="fill-cad-dimension/70" style={{ fontSize: '11px', fontFamily: 'JetBrains Mono, monospace' }}>4.250"</text>
  </svg>
);
