import { motion, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { portfolioData } from '../../data/portfolioData';
import { SectionTitle } from '../ui/MagneticText';

export const Testimonials = () => {
  const shouldReduceMotion = useReducedMotion();

  const container: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const item: Variants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <section id="testimonials" className="py-32 w-full max-w-7xl mx-auto px-8 md:px-20 relative z-10 overflow-hidden">
      <SectionTitle>References</SectionTitle>
      
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="flex overflow-x-auto pb-12 snap-x snap-mandatory hide-scrollbar gap-8"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; }`}</style>
        
        {portfolioData.testimonials.map((testimonial, idx) => (
          <motion.div
            key={idx}
            variants={item}
            whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
            className="flex-shrink-0 w-full sm:w-[85%] md:w-[60%] lg:w-[45%] snap-center"
          >
            <div className="bg-white p-10 h-full border-t-[4px] border-l-[1px] border-r-[1px] border-b-[1px] border-secondary/10 border-t-accent-secondary shadow-sm flex flex-col justify-between">
              <svg className="w-8 h-8 text-accent-primary/20 mb-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              
              <blockquote className="text-[17px] leading-relaxed italic text-primary font-medium mb-10 flex-1">
                "{testimonial.text}"
              </blockquote>
              
              <div className="flex items-center justify-between mt-auto">
                <div>
                  <div className="font-heading font-bold text-lg mb-1">{testimonial.author}</div>
                  <div className="font-mono text-xs uppercase tracking-wide text-secondary">{testimonial.role}</div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-sm border border-emerald-100">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-sm font-bold text-emerald-700">{testimonial.score}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
