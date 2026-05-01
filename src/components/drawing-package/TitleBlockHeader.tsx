import { titleBlock } from '../../data/drawingPackageData';

/**
 * TitleBlockHeader — sticky title block at the top of the drawing sheet.
 * Styled like a formal ANSI/ISO drawing title block with bordered cells.
 */
export function TitleBlockHeader() {
  return (
    <header
      className="sticky top-0 z-50 w-full border-b-2 select-none"
      style={{
        background: 'var(--dp-bg)',
        borderColor: 'var(--dp-border)',
      }}
    >
      <div className="flex items-stretch text-[10px] uppercase tracking-[0.15em]">
        {/* Drawing title — left block */}
        <div
          className="flex-1 px-5 py-2 border-r flex flex-col justify-center"
          style={{ borderColor: 'var(--dp-border)' }}
        >
          <span style={{ color: 'var(--dp-text-dim)' }}>Drawing Title:</span>
          <span
            className="text-sm font-bold tracking-[0.2em] mt-0.5"
            style={{ color: 'var(--dp-accent)' }}
          >
            {titleBlock.drawingTitle}
          </span>
        </div>

        {/* Name */}
        <div
          className="px-4 py-2 border-r flex flex-col justify-center"
          style={{ borderColor: 'var(--dp-border)' }}
        >
          <span style={{ color: 'var(--dp-text-dim)' }}>Name:</span>
          <span className="font-bold mt-0.5" style={{ color: 'var(--dp-text)' }}>
            {titleBlock.name}
          </span>
        </div>

        {/* Revision */}
        <div
          className="px-4 py-2 border-r flex flex-col justify-center"
          style={{ borderColor: 'var(--dp-border)' }}
        >
          <span style={{ color: 'var(--dp-text-dim)' }}>Rev:</span>
          <span className="font-bold mt-0.5" style={{ color: 'var(--dp-accent)' }}>
            {titleBlock.revision}
          </span>
        </div>

        {/* Date */}
        <div
          className="px-4 py-2 border-r hidden sm:flex flex-col justify-center"
          style={{ borderColor: 'var(--dp-border)' }}
        >
          <span style={{ color: 'var(--dp-text-dim)' }}>Date:</span>
          <span className="mt-0.5" style={{ color: 'var(--dp-text)' }}>
            {titleBlock.date}
          </span>
        </div>

        {/* Scale */}
        <div
          className="px-4 py-2 border-r hidden md:flex flex-col justify-center"
          style={{ borderColor: 'var(--dp-border)' }}
        >
          <span style={{ color: 'var(--dp-text-dim)' }}>Scale:</span>
          <span className="mt-0.5" style={{ color: 'var(--dp-text)' }}>
            {titleBlock.scale}
          </span>
        </div>

        {/* Sheet */}
        <div className="px-4 py-2 hidden md:flex flex-col justify-center">
          <span style={{ color: 'var(--dp-text-dim)' }}>Sheet:</span>
          <span className="mt-0.5" style={{ color: 'var(--dp-text)' }}>
            {titleBlock.sheetLabel}
          </span>
        </div>
      </div>
    </header>
  );
}
