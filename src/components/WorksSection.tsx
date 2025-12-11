import { useState } from 'react';
import { motion } from 'framer-motion';

interface Project {
  id: string;
  title: string;
  thumbnail: string;
  displayTitle?: string;
  subtitle?: string;
}

const projects: Project[] = [
  { id: 'texels', title: 'TEXELS', thumbnail: '/placeholder.svg' },
  { 
    id: 'cancer-screening', 
    title: 'CANCER SCREENING', 
    thumbnail: '/placeholder.svg',
    displayTitle: 'Can a novel probe by the Conformable Decoders detect tumors with less pressure?',
    subtitle: 'I built a testing system to compare a new ultrasound probe to the industry standard for two reasons. (1) Increasing comfort would make it more approachable for women to monitor their tumors longitudinally and provide doctors with more information when determining treatment plans. (2) squeezing tumors less during screening results in a more accurate calculation of volume when assessing responses to treatment.'
  },
  { id: 'drug-delivery', title: 'DRUG DELIVERY', thumbnail: '/placeholder.svg' },
  { id: 'lyken', title: 'LYKEN', thumbnail: '/placeholder.svg' },
];

const WorksSection = () => {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const handleProjectClick = (projectId: string) => {
    setActiveProject(projectId);
  };

  const isAnimating = (projectId: string) => {
    return hoveredProject === projectId && activeProject !== projectId;
  };

  const isFrozen = (projectId: string) => {
    return activeProject === projectId;
  };

  return (
    <section id="works" className="min-h-screen flex items-center py-20">
      <div className="flex w-full h-full">
        {/* Thumbnails Column */}
        <div className="flex flex-col gap-8 pl-[10%]">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex flex-col items-start cursor-pointer group"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => handleProjectClick(project.id)}
            >
              {/* Thumbnail */}
              <div className="relative w-32 h-24 md:w-40 md:h-28 overflow-hidden bg-muted/20">
                <motion.div
                  className="w-full h-full bg-gradient-to-br from-foreground/5 to-foreground/20"
                  animate={{
                    scale: isAnimating(project.id) ? [1, 1.05, 1] : isFrozen(project.id) ? 1.05 : 1,
                    opacity: isAnimating(project.id) ? [0.5, 1, 0.8] : isFrozen(project.id) ? 1 : 0.6,
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: isAnimating(project.id) ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-primary/10"
                    animate={{
                      x: isAnimating(project.id) ? [0, 10, 0] : isFrozen(project.id) ? 10 : 0,
                      y: isAnimating(project.id) ? [0, -5, 0] : isFrozen(project.id) ? -5 : 0,
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: isAnimating(project.id) ? Infinity : 0,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{
                      rotate: isAnimating(project.id) ? [0, 2, -2, 0] : isFrozen(project.id) ? 2 : 0,
                    }}
                    transition={{
                      duration: 0.6,
                      repeat: isAnimating(project.id) ? Infinity : 0,
                    }}
                  >
                    <div className="w-8 h-8 border border-foreground/30 rounded-full" />
                  </motion.div>
                </motion.div>
              </div>
              
              {/* Label */}
              <span className={`mt-2 font-nav text-sm md:text-base uppercase tracking-wider transition-colors duration-300 ${
                activeProject === project.id 
                  ? 'text-primary' 
                  : 'text-foreground/60 group-hover:text-foreground'
              }`}>
                {project.title}
              </span>
            </div>
          ))}
        </div>

        {/* Project Display Area */}
        <div className="flex-1 flex items-center justify-center px-8">
          {activeProject ? (
            <div className="max-w-2xl">
              {projects.find(p => p.id === activeProject)?.displayTitle ? (
                <div className="space-y-6">
                  <h2 className="font-body text-foreground text-3xl md:text-4xl lg:text-5xl leading-tight">
                    {projects.find(p => p.id === activeProject)?.displayTitle}
                  </h2>
                  <p className="font-body text-foreground/70 text-base md:text-lg leading-relaxed">
                    {projects.find(p => p.id === activeProject)?.subtitle}
                  </p>
                </div>
              ) : (
                <h2 className="font-body text-foreground text-5xl md:text-7xl lg:text-8xl uppercase tracking-wide">
                  {projects.find(p => p.id === activeProject)?.title}
                </h2>
              )}
            </div>
          ) : (
            <h2 className="font-body text-foreground/20 text-5xl md:text-7xl uppercase tracking-wide">
              Selected Works
            </h2>
          )}
        </div>
      </div>
    </section>
  );
};

export default WorksSection;
