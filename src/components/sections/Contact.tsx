import { motion, useReducedMotion } from 'framer-motion';
import { portfolioData } from '../../data/portfolioData';

export const Contact = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <footer id="contact" className="relative bg-slate-900 dark:bg-[#0F172A] text-white overflow-hidden pt-32 pb-16">
      {/* CAD Grid Background Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="w-full max-w-7xl mx-auto px-8 md:px-20 relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mb-16"
        >
          <h2 className="font-heading text-5xl md:text-6xl font-extrabold mb-8 tracking-tight">{portfolioData.personal.footerCTA}</h2>
          <p className="text-xl text-white/70 mb-12">
            Whether you need a SolidWorks macro to eliminate repetitive tasks or an end-to-end mechanical design reviewed for manufacturability, I'm ready to talk.
          </p>
          
          <motion.a 
            href={`mailto:${portfolioData.personal.email}`}
            whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            className="inline-flex items-center gap-3 bg-accent-primary hover:bg-accent-secondary text-white font-heading font-bold uppercase tracking-widest px-10 py-5 rounded-sm shadow-xl hover:shadow-2xl transition-all"
          >
            <span>Start a Project</span>
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </motion.a>
        </motion.div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full border-t border-white/10 pt-16 mb-16">
          <div className="text-center md:text-left">
            <h4 className="font-mono text-sm text-accent-secondary uppercase tracking-widest mb-4">Location</h4>
            <p className="text-lg font-medium">{portfolioData.personal.location}</p>
          </div>
          <div className="text-center md:text-left">
            <h4 className="font-mono text-sm text-accent-secondary uppercase tracking-widest mb-4">Direct Contact</h4>
            <a href={`mailto:${portfolioData.personal.email}`} className="text-lg font-medium hover:text-accent-primary transition-colors block mb-2">{portfolioData.personal.email}</a>
            <a href={`tel:${portfolioData.personal.phone.replace(/[\s()]/g, '')}`} className="text-lg font-medium hover:text-accent-primary transition-colors block">{portfolioData.personal.phone}</a>
          </div>
          <div className="text-center md:text-left">
            <h4 className="font-mono text-sm text-accent-secondary uppercase tracking-widest mb-4">Social</h4>
            <a href={portfolioData.personal.linkedin} target="_blank" rel="noopener noreferrer" className="text-lg font-medium hover:text-accent-primary transition-colors inline-block">LinkedIn Profile →</a>
          </div>
        </div>

        {/* Credits */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center text-sm font-mono text-white/50 pt-8 border-t border-white/5">
          <div className="mb-4 md:mb-0">
            {portfolioData.personal.copyright}
          </div>
          <div className="flex gap-4">
            <span>{portfolioData.footerCredits[0]}</span>
            <span>&middot;</span>
            <span>{portfolioData.footerCredits[1]}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
