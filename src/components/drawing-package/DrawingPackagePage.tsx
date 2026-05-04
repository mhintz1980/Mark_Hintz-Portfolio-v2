import '../../styles/drawing-package.css';
import { useScroll } from 'framer-motion';
import { useRef } from 'react';
import { DrawingBackground } from './DrawingBackground';
import { DrawingSheetBorder } from './DrawingSheetBorder';
import { TitleBlockHeader } from './TitleBlockHeader';
import { DrawingHero } from './DrawingHero';
import { ProjectZone } from './ProjectZone';
import { SpecTable } from './SpecTable';
import { GeneralNotes } from './GeneralNotes';
import { TitleBlockFooter } from './TitleBlockFooter';
import { projectDetails } from '../../data/drawingPackageData';

/**
 * DrawingPackagePage — the full "Drawing Package" portfolio variation.
 * Structured as a continuous engineering drawing sheet with SVG linework background.
 */
export function DrawingPackagePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  return (
    <div ref={containerRef} className="drawing-package relative min-h-screen">
      <DrawingBackground scrollYProgress={scrollYProgress} />
      <DrawingSheetBorder />
      <TitleBlockHeader />

      <main className="relative z-10">
        <DrawingHero />

        {/* Section divider with section line convention */}
        <SectionDivider label="C — C" subtitle="PROJECT DETAIL VIEWS" />

        {/* Projects — detail views */}
        {projectDetails.map((project, i) => (
          <ProjectZone key={project.id} project={project} index={i} />
        ))}

        <SectionDivider label="D — D" subtitle="CAPABILITIES SPECIFICATION" />
        <SpecTable />

        <SectionDivider label="E — E" subtitle="GENERAL NOTES" />
        <GeneralNotes />
      </main>

      <TitleBlockFooter />
    </div>
  );
}

/**
 * SectionDivider — engineering drawing section line marker.
 * Displays a horizontal ruled line with section label.
 */
function SectionDivider({ label, subtitle }: { label: string; subtitle: string }) {
  return (
    <div className="px-8 md:px-24 py-12">
      <div className="flex items-center gap-4">
        {/* Left marker */}
        <div
          className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-[8px] font-bold shrink-0"
          style={{ borderColor: 'var(--dp-accent)', color: 'var(--dp-accent)' }}
        >
          {label.charAt(0)}
        </div>
        {/* Line */}
        <div className="flex-1 border-t" style={{ borderColor: 'var(--dp-border)' }} />
        {/* Label */}
        <div className="text-[10px] uppercase tracking-[0.2em] shrink-0" style={{ color: 'var(--dp-text-dim)' }}>
          {subtitle}
        </div>
        {/* Line */}
        <div className="flex-1 border-t" style={{ borderColor: 'var(--dp-border)' }} />
        {/* Right marker */}
        <div
          className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-[8px] font-bold shrink-0"
          style={{ borderColor: 'var(--dp-accent)', color: 'var(--dp-accent)' }}
        >
          {label.charAt(0)}
        </div>
      </div>
    </div>
  );
}
