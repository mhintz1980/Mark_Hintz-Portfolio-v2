import { motion, useReducedMotion } from 'framer-motion';
import { coreServices } from '../../data/portfolioData';

/**
 * SpecTable — services as a BOM/specification table with ruled rows.
 * Engineering managers read tables; give them one.
 */
export function SpecTable() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="px-8 md:px-24 py-24 relative">
      {/* Section line marker */}
      <div
        className="text-[10px] uppercase tracking-[0.2em] mb-6"
        style={{ color: 'var(--dp-text-dim)' }}
      >
        B — B &nbsp;&nbsp; CAPABILITIES SPECIFICATION
      </div>

      <div
        className="border-2 overflow-hidden"
        style={{ borderColor: 'var(--dp-border)' }}
      >
        {/* Table header */}
        <div
          className="grid grid-cols-12 text-[10px] uppercase tracking-[0.15em] font-bold border-b-2"
          style={{
            background: 'var(--dp-surface)',
            borderColor: 'var(--dp-border)',
            color: 'var(--dp-accent)',
          }}
        >
          <div className="col-span-1 px-4 py-3 border-r" style={{ borderColor: 'var(--dp-border)' }}>
            Item
          </div>
          <div className="col-span-3 px-4 py-3 border-r" style={{ borderColor: 'var(--dp-border)' }}>
            Capability
          </div>
          <div className="col-span-5 px-4 py-3 border-r hidden md:block" style={{ borderColor: 'var(--dp-border)' }}>
            Description
          </div>
          <div className="col-span-3 md:col-span-3 px-4 py-3">
            Requirements
          </div>
        </div>

        {/* Table rows */}
        {coreServices.map((service, index) => (
          <motion.div
            key={index}
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.3, delay: index * 0.08 }}
            className="grid grid-cols-12 text-[11px] border-b last:border-b-0"
            style={{ borderColor: 'var(--dp-border-dim)' }}
          >
            <div
              className="col-span-1 px-4 py-4 border-r font-bold"
              style={{ borderColor: 'var(--dp-border-dim)', color: 'var(--dp-accent)' }}
            >
              {String(index + 1).padStart(2, '0')}
            </div>
            <div
              className="col-span-3 px-4 py-4 border-r font-bold uppercase tracking-[0.05em]"
              style={{ borderColor: 'var(--dp-border-dim)', color: 'var(--dp-text)' }}
            >
              {service.title}
            </div>
            <div
              className="col-span-5 px-4 py-4 border-r leading-relaxed hidden md:block"
              style={{ borderColor: 'var(--dp-border-dim)', color: 'var(--dp-text-dim)' }}
            >
              {service.description}
            </div>
            <div className="col-span-3 md:col-span-3 px-4 py-4">
              <div className="flex flex-wrap gap-1.5">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] uppercase tracking-[0.1em] px-2 py-0.5 border"
                    style={{
                      borderColor: 'var(--dp-border)',
                      color: 'var(--dp-accent)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
