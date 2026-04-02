import { motion, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { portfolioData } from '../../data/portfolioData';
import { SectionTitle } from '../ui/MagneticText';

export const Projects = () => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 20, stiffness: 100 } }
  };

  return (
    <section id="projects" className="py-32 w-full max-w-7xl mx-auto px-8 md:px-20 relative z-10">
      <SectionTitle>Projects</SectionTitle>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-12"
      >
        {portfolioData.projects.map((project, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={shouldReduceMotion ? {} : { y: -8 }}
            className={`
              group relative flex flex-col bg-white overflow-hidden rounded-sm
              border border-secondary/10 shadow-sm transition-shadow hover:shadow-xl
              ${project.featured ? 'md:col-span-2 md:flex-row' : ''}
            `}
          >
            {/* The CAD Tolerance decoration overlay for featured projects */}
            {project.featured && (
              <div className="absolute top-4 right-4 z-20 pointer-events-none hidden md:block">
                <div className="bg-white/80 backdrop-blur-md border border-accent-secondary/50 text-accent-secondary p-2 text-xs font-mono shadow-sm">
                  <div>[REF] PRODUCTION SCALE</div>
                  <div className="border-t border-accent-secondary/30 my-1"></div>
                  <div>AUTOMATION: 100%</div>
                </div>
              </div>
            )}

            <div className={`relative overflow-hidden ${project.featured ? 'md:w-1/2' : 'w-full'} aspect-[16/10] bg-background`}>
              <motion.img 
                src={`${import.meta.env.BASE_URL}${project.image}`} 
                alt={project.title}
                className="w-full h-full object-cover"
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300" />
            </div>
            
            <div className={`p-8 flex flex-col justify-between flex-1 ${project.featured ? 'md:w-1/2' : ''}`}>
              <div>
                <h3 className="text-2xl font-heading font-bold mb-2 group-hover:text-accent-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm font-mono text-secondary mb-6">
                  {project.category}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex} 
                      className="px-2.5 py-1 text-xs font-medium bg-secondary/10 text-primary rounded-sm tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {project.outcome && (
                <div className="flex items-start gap-3 p-4 bg-emerald-50 text-primary border-l-2 border-emerald-500 rounded-r-sm">
                  <span className="text-emerald-500 flex-shrink-0 mt-0.5">→</span>
                  <p className="text-[15px] font-medium leading-snug">{project.outcome}</p>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
