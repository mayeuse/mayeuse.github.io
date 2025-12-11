import { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import STLModel from './STLModel';
import ExpSchematic from '@/assets/ExpSchematic.png';

interface Project {
  id: string;
  title: string;
  thumbnail: string;
  displayTitle?: string;
  subtitle?: string;
  hasSchematic?: boolean;
}

const projects: Project[] = [
  { id: 'texels', title: 'TEXELS', thumbnail: '/placeholder.svg' },
  { 
    id: 'cancer-screening', 
    title: 'CANCER SCREENING', 
    thumbnail: '/placeholder.svg',
    displayTitle: 'Can a novel probe by the Conformable Decoders detect tumors with less pressure?',
    subtitle: 'I built a testing system to compare a new ultrasound probe to the industry standard for two reasons.',
    hasSchematic: true
  },
  { id: 'drug-delivery', title: 'DRUG DELIVERY', thumbnail: '/placeholder.svg' },
  { id: 'lyken', title: 'LYKEN', thumbnail: '/placeholder.svg' },
];

const stlModels = [
  { url: '/models/Probe_Head_Attachment.stl', label: 'Novel Probe Attachment' },
  { url: '/models/Handheld_Probe_Attachment_v3.stl', label: 'Traditional Probe Attachment' },
  { url: '/models/Tilt_Mechanism.stl', label: 'Stage Tilt Mechanism', extraRotation: [0, 0, -Math.PI / 2] as [number, number, number] },
];

const WorksSection = () => {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const handleProjectClick = (projectId: string) => {
    console.log('Clicked project:', projectId);
    setActiveProject(projectId);
  };

  const activeProjectData = activeProject ? projects.find(p => p.id === activeProject) : null;
  
  console.log('Current activeProject:', activeProject, 'Data:', activeProjectData);

  const isAnimating = (projectId: string) => {
    return hoveredProject === projectId && activeProject !== projectId;
  };

  const isFrozen = (projectId: string) => {
    return activeProject === projectId;
  };

  return (
    <section id="works" className="h-screen flex items-start pt-[25vh] relative z-10">
      <div className="flex w-full h-[70vh]">
        {/* Thumbnails Column */}
        <div className="flex flex-col justify-between h-full pl-[10%]">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex flex-col items-start cursor-pointer group"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => handleProjectClick(project.id)}
            >
              {/* Thumbnail */}
              <div className="relative w-24 h-16 md:w-32 md:h-20 overflow-hidden bg-muted/20">
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
                    <div className="w-6 h-6 border border-foreground/30 rounded-full" />
                  </motion.div>
                </motion.div>
              </div>
              
              {/* Label */}
              <span className={`mt-1 font-nav text-xs md:text-sm uppercase tracking-wider transition-colors duration-300 ${
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
        <div className="flex-1 flex flex-col items-start justify-start px-8 pr-[15%] overflow-y-auto">
          {activeProjectData ? (
            <div className="max-w-2xl">
              {activeProjectData.displayTitle ? (
                <div className="space-y-4">
                  <h2 className="font-body text-foreground text-2xl md:text-3xl lg:text-4xl leading-tight">
                    {activeProjectData.displayTitle}
                  </h2>
                  <div className="font-body text-foreground/70 text-sm md:text-base leading-relaxed">
                    <p>{activeProjectData.subtitle}</p>
                    <p className="mt-4">(1) Increasing comfort would make it more approachable for women to monitor their tumors longitudinally and provide doctors with more information when determining treatment plans.</p>
                    <p className="mt-4">(2) Squeezing tumors less during screening results in a more accurate calculation of volume when assessing responses to treatment.</p>
                  </div>
                  
                  {activeProjectData.hasSchematic && (
                    <>
                      <h3 className="mt-8 font-body text-foreground text-lg md:text-xl text-center w-full">Testing Stage</h3>
                      <div className="mt-4 flex items-start gap-2">
                        {/* Schematic Image */}
                        <div className="flex flex-col w-[50%]">
                          <img 
                            src={ExpSchematic} 
                            alt="Experimental schematic showing probe attached to z-axis manipulator, phantom breast with tumor, and force sensor"
                            className="w-full h-auto"
                          />
                          <p className="mt-4 font-body text-foreground/70 text-sm md:text-base leading-relaxed">
                            I used a mixture of digital and manual fabrication techniques to create a force sensing stand.
                          </p>
                        </div>
                        
                        {/* STL Models Column */}
                        <div className="flex flex-col gap-0">
                          <Suspense fallback={<div className="w-36 h-36 bg-muted/20 animate-pulse" />}>
                            {stlModels.map((model, index) => (
                              <STLModel 
                                key={index} 
                                url={model.url} 
                                scale={0.035} 
                                label={model.label}
                                extraRotation={model.extraRotation}
                              />
                            ))}
                          </Suspense>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <h2 className="font-body text-foreground text-5xl md:text-7xl lg:text-8xl uppercase tracking-wide">
                  {activeProjectData.title}
                </h2>
              )}
            </div>
          ) : (
            <h2 className="font-body text-foreground/20 text-5xl md:text-7xl uppercase tracking-wide pt-[20%]">
              Selected Works
            </h2>
          )}
        </div>
      </div>
    </section>
  );
};

export default WorksSection;
