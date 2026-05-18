import { portfolioData } from '../../data/portfolioData';
import { SectionTitle } from '../ui/MagneticText';
import { StackedCardsProject } from './StackedCardsProject';

export const Projects = () => {
  return (
    <section id="projects" className="relative z-10 w-full py-32">
      <div className="mx-auto mb-20 w-full max-w-7xl px-8 md:px-20">
        <SectionTitle>Projects</SectionTitle>
      </div>

      <div className="w-full">
        {portfolioData.projects.map((project, projectIndex) => (
          <StackedCardsProject
            key={project.title}
            project={project}
            projectIndex={projectIndex}
            projectCount={portfolioData.projects.length}
          />
        ))}
      </div>
    </section>
  );
};
