/**
 * DrawingSheetBorder — continuous ruled borders on both viewport edges.
 * Creates the full-immersion engineering drawing sheet feel.
 */
export function DrawingSheetBorder() {
  return (
    <>
      {/* Left border */}
      <div
        className="fixed left-0 top-0 bottom-0 w-[2px] z-40 pointer-events-none"
        style={{ background: 'var(--dp-border)' }}
      />
      <div
        className="fixed left-[12px] top-0 bottom-0 w-px z-40 pointer-events-none"
        style={{ background: 'var(--dp-border-dim)' }}
      />
      {/* Right border */}
      <div
        className="fixed right-0 top-0 bottom-0 w-[2px] z-40 pointer-events-none"
        style={{ background: 'var(--dp-border)' }}
      />
      <div
        className="fixed right-[12px] top-0 bottom-0 w-px z-40 pointer-events-none"
        style={{ background: 'var(--dp-border-dim)' }}
      />
    </>
  );
}
