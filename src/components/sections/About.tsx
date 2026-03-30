import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { portfolioData } from '../../data/portfolioData';
import { SectionTitle } from '../ui/MagneticText';

export const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
  };

  return (
    <section id="about" className="py-32 w-full max-w-7xl mx-auto px-8 md:px-20 relative z-10">
      <SectionTitle>About</SectionTitle>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Left Column - Bio & Testimonial */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="lg:col-span-7 space-y-8"
        >
          <motion.p variants={itemVariants} className="text-xl leading-relaxed text-secondary">
            {portfolioData.personal.about}
          </motion.p>
          
          <motion.blockquote
            variants={itemVariants}
            className="mt-8 p-6 bg-accent-primary/5 border-l-[3px] border-accent-primary rounded-r-md italic text-[15px] leading-relaxed text-secondary"
          >
            <p className="mb-3">
              "{portfolioData.testimonials[2].text.split(". ")[0]}. {portfolioData.testimonials[2].text.split(". ")[1]}."
            </p>
            <cite className="not-italic text-sm font-mono text-accent-primary block">
              — {portfolioData.testimonials[2].author}, {portfolioData.testimonials[2].role}
            </cite>
          </motion.blockquote>
        </motion.div>

        {/* Right Column - Spec Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="lg:col-span-5"
        >
          <div className="relative p-7 bg-white/80 backdrop-blur-md border border-secondary/20 rounded-[2px] shadow-sm font-mono text-xs">
            {/* Tolerance styling decoration */}
            <div className="absolute -top-px -right-[40px] hidden md:flex items-start gap-1.5 opacity-80 pointer-events-none">
                <div className="w-[30px] h-px bg-accent-secondary mt-2"></div>
                <div className="border border-accent-secondary text-accent-secondary px-2 py-1 flex flex-col gap-0.5 whitespace-nowrap bg-white/50 backdrop-blur scale-[0.8] origin-top-left">
                    <span>⌀ 0.001" TIR</span>
                    <span>⊕ ±0.0005 [REF]</span>
                </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-baseline border-b border-cad-line-primary/30 pb-2">
                <span className="text-secondary tracking-widest uppercase">Experience</span>
                <span className="text-primary font-medium">15+ Years</span>
              </div>
              <div className="flex justify-between items-baseline border-b border-cad-line-primary/30 pb-2">
                <span className="text-secondary tracking-widest uppercase">Machines</span>
                <span className="text-primary font-medium text-right">7-Axis Mill-Turn / CMM</span>
              </div>
              <div className="flex justify-between items-baseline border-b border-cad-line-primary/30 pb-2">
                <span className="text-secondary tracking-widest uppercase">CAD</span>
                <span className="text-primary font-medium">SolidWorks / Vault / DFM</span>
              </div>
              <div className="flex justify-between items-baseline border-b border-cad-line-primary/30 pb-2">
                <span className="text-secondary tracking-widest uppercase">Automation</span>
                <span className="text-primary font-medium">Python / APIs / AI Tooling</span>
              </div>
              <div className="flex justify-between items-baseline border-b border-cad-line-primary/30 pb-2">
                <span className="text-secondary tracking-widest uppercase">Location</span>
                <span className="text-primary font-medium">Jacksonville, FL</span>
              </div>
              <div className="flex justify-between items-baseline pt-1">
                <span className="text-secondary tracking-widest uppercase">Status</span>
                <span className="text-emerald-500 font-medium animate-pulse">AVAILABLE</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
