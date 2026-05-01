import { motion, useReducedMotion } from 'framer-motion';
import { portfolioData } from '../../data/portfolioData';

/**
 * GeneralNotes — testimonials as numbered drawing general notes.
 * Positioned like ANSI/ISO general notes on the drawing corner.
 * NOTE 1, NOTE 2, NOTE 3 format.
 */
export function GeneralNotes() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="px-8 md:px-24 py-24 relative">
      {/* Section marker */}
      <div
        className="text-[10px] uppercase tracking-[0.2em] mb-8 font-bold"
        style={{ color: 'var(--dp-accent)' }}
      >
        GENERAL NOTES:
      </div>

      <div className="max-w-3xl ml-auto space-y-8">
        {portfolioData.testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="border-b pb-6"
            style={{ borderColor: 'var(--dp-border-dim)' }}
          >
            <div className="flex items-start gap-4">
              {/* Note number */}
              <div
                className="text-[11px] font-bold uppercase tracking-[0.1em] shrink-0 pt-0.5"
                style={{ color: 'var(--dp-accent)' }}
              >
                NOTE {index + 1}.
              </div>

              {/* Note content */}
              <div>
                <p
                  className="text-[13px] leading-relaxed mb-3"
                  style={{ color: 'var(--dp-text)' }}
                >
                  "{testimonial.text}"
                </p>
                <div
                  className="text-[10px] uppercase tracking-[0.15em]"
                  style={{ color: 'var(--dp-text-dim)' }}
                >
                  — {testimonial.author.toUpperCase()}, {testimonial.role.toUpperCase()}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
