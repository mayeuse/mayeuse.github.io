import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
  id: string;
  title: string;
  thumbnail: string;
}

const projects: Project[] = [
  { id: 'texels', title: 'TEXELS', thumbnail: '/placeholder.svg' },
  { id: 'cancer-screening', title: 'CANCER SCREENING', thumbnail: '/placeholder.svg' },
  { id: 'drug-delivery', title: 'DRUG DELIVERY', thumbnail: '/placeholder.svg' },
  { id: 'lyken', title: 'LYKEN', thumbnail: '/placeholder.svg' },
];

const WorksSection = () => {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const handleProjectClick = (projectId: string) => {
    setActiveProject(activeProject === projectId ? null : projectId);
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
              <div className="relative w-32 h-24 md:w-40 md:h-28 overflow-hidden bg-muted/20 border border-foreground/10">
                <motion.div
                  className="w-full h-full bg-gradient-to-br from-foreground/5 to-foreground/20"
                  animate={{
                    scale: hoveredProject === project.id || activeProject === project.id ? [1, 1.05, 1] : 1,
                    opacity: hoveredProject === project.id || activeProject === project.id ? [0.5, 1, 0.8] : 0.6,
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: hoveredProject === project.id && activeProject !== project.id ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-primary/10"
                    animate={{
                      x: hoveredProject === project.id || activeProject === project.id ? [0, 10, 0] : 0,
                      y: hoveredProject === project.id || activeProject === project.id ? [0, -5, 0] : 0,
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: hoveredProject === project.id && activeProject !== project.id ? Infinity : 0,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{
                      rotate: hoveredProject === project.id || activeProject === project.id ? [0, 2, -2, 0] : 0,
                    }}
                    transition={{
                      duration: 0.6,
                      repeat: hoveredProject === project.id && activeProject !== project.id ? Infinity : 0,
                    }}
                  >
                    <div className="w-8 h-8 border border-foreground/30 rounded-full" />
                  </motion.div>
                </motion.div>
                
                {/* Active indicator */}
                {activeProject === project.id && (
                  <motion.div
                    className="absolute inset-0 border-2 border-primary"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
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
          <AnimatePresence mode="wait">
            {activeProject && (
              <motion.div
                key={activeProject}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="text-center"
              >
                <h2 className="font-body text-foreground text-5xl md:text-7xl lg:text-8xl uppercase tracking-wide">
                  {projects.find(p => p.id === activeProject)?.title}
                </h2>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Default state when no project selected */}
          {!activeProject && (
            <motion.h2 
              className="font-body text-foreground/20 text-5xl md:text-7xl uppercase tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Selected Works
            </motion.h2>
          )}
        </div>
      </div>
    </section>
  );
};

export default WorksSection;
