import { portfolioData } from '../../data/portfolioData';
import { revisionTable, titleBlock } from '../../data/drawingPackageData';

/**
 * TitleBlockFooter — bottom title block with revision table,
 * approval signatures area, and contact CTA.
 */
export function TitleBlockFooter() {
  return (
    <footer className="px-8 md:px-24 py-16 relative">
      {/* Outer border */}
      <div
        className="border-2"
        style={{ borderColor: 'var(--dp-border)' }}
      >
        {/* Revision table */}
        <div
          className="border-b-2"
          style={{ borderColor: 'var(--dp-border)' }}
        >
          <div
            className="px-4 py-2 text-[10px] uppercase tracking-[0.15em] font-bold border-b"
            style={{
              color: 'var(--dp-accent)',
              borderColor: 'var(--dp-border)',
              background: 'var(--dp-surface)',
            }}
          >
            Revision History
          </div>
          {revisionTable.map((entry) => (
            <div
              key={entry.rev}
              className="grid grid-cols-12 text-[11px] border-b last:border-b-0"
              style={{ borderColor: 'var(--dp-border-dim)' }}
            >
              <div
                className="col-span-1 px-4 py-2 border-r font-bold"
                style={{ borderColor: 'var(--dp-border-dim)', color: 'var(--dp-accent)' }}
              >
                {entry.rev}
              </div>
              <div
                className="col-span-2 px-4 py-2 border-r"
                style={{ borderColor: 'var(--dp-border-dim)', color: 'var(--dp-text-dim)' }}
              >
                {entry.date}
              </div>
              <div
                className="col-span-9 px-4 py-2 uppercase tracking-[0.05em]"
                style={{ color: 'var(--dp-text)' }}
              >
                {entry.description}
              </div>
            </div>
          ))}
        </div>

        {/* Approval + Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Approval signatures */}
          <div
            className="p-6 border-r"
            style={{ borderColor: 'var(--dp-border)' }}
          >
            <div
              className="text-[10px] uppercase tracking-[0.15em] font-bold mb-4"
              style={{ color: 'var(--dp-accent)' }}
            >
              Approvals
            </div>
            <div className="space-y-3 text-[11px]">
              <div className="flex justify-between border-b pb-2" style={{ borderColor: 'var(--dp-border-dim)' }}>
                <span style={{ color: 'var(--dp-text-dim)' }}>DRAWN BY:</span>
                <span style={{ color: 'var(--dp-text)' }}>{titleBlock.drawnBy}</span>
              </div>
              <div className="flex justify-between border-b pb-2" style={{ borderColor: 'var(--dp-border-dim)' }}>
                <span style={{ color: 'var(--dp-text-dim)' }}>CHECKED BY:</span>
                <span style={{ color: 'var(--dp-text)' }}>{titleBlock.checkedBy}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: 'var(--dp-text-dim)' }}>STATUS:</span>
                <span className="font-bold" style={{ color: 'oklch(0.72 0.19 155)' }}>
                  AVAILABLE FOR WORK
                </span>
              </div>
            </div>
          </div>

          {/* Contact info */}
          <div className="p-6">
            <div
              className="text-[10px] uppercase tracking-[0.15em] font-bold mb-4"
              style={{ color: 'var(--dp-accent)' }}
            >
              Contact
            </div>
            <div className="space-y-3 text-[11px]">
              <div>
                <span style={{ color: 'var(--dp-text-dim)' }}>EMAIL: </span>
                <a
                  href={`mailto:${portfolioData.personal.email}`}
                  className="underline transition-colors"
                  style={{ color: 'var(--dp-accent)' }}
                >
                  {portfolioData.personal.email}
                </a>
              </div>
              <div>
                <span style={{ color: 'var(--dp-text-dim)' }}>PHONE: </span>
                <a
                  href={`tel:${portfolioData.personal.phone.replace(/[\s()]/g, '')}`}
                  className="transition-colors"
                  style={{ color: 'var(--dp-text)' }}
                >
                  {portfolioData.personal.phone}
                </a>
              </div>
              <div>
                <span style={{ color: 'var(--dp-text-dim)' }}>LINKEDIN: </span>
                <a
                  href={portfolioData.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline transition-colors"
                  style={{ color: 'var(--dp-accent)' }}
                >
                  linkedin.com/in/mark-hintz-builds
                </a>
              </div>
            </div>

            {/* CTA */}
            <a
              href={`mailto:${portfolioData.personal.email}`}
              className="inline-flex items-center mt-6 px-6 py-3 text-[12px] uppercase tracking-[0.15em] font-bold transition-all duration-200"
              style={{
                background: 'var(--dp-accent)',
                color: 'var(--dp-bg)',
              }}
            >
              Start a Project →
            </a>
          </div>
        </div>

        {/* Copyright bar */}
        <div
          className="border-t px-4 py-2 text-[9px] uppercase tracking-[0.1em] flex justify-between"
          style={{
            borderColor: 'var(--dp-border)',
            color: 'var(--dp-text-dim)',
          }}
        >
          <span>{portfolioData.personal.copyright}</span>
          <span>±0.0005" ON THE FLOOR. TYPESCRIPT IN THE CHAIR.</span>
        </div>
      </div>
    </footer>
  );
}
