import { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import STLModel from './STLModel';
import ExpSchematic from '@/assets/ExpSchematic.png';
import HandheldProbeAnimated from '@/assets/HandheldProbeAnimated.gif';
import NovelProbeAnimated from '@/assets/NovelProbeAnimated.gif';
import DeformationFigure from '@/assets/DeformationFigure.png';
import PressureFigure from '@/assets/PressureFigure.png';

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
  { 
    id: 'drug-delivery', 
    title: 'DRUG DELIVERY', 
    thumbnail: '/placeholder.svg',
    displayTitle: 'How can we optimize a surface to stick to bodily tracts for drug delivery?',
    subtitle: 'I physically and chemically modified a biocompatible substrate to wick mucus and latch itself onto the lining of a bodily tract for noninvasive, long term drug delivery through the epithelium.',
    hasSchematic: false
  },
  { id: 'lyken', title: 'LYKEN', thumbnail: '/placeholder.svg' },
];

const stlModels = [
  { url: '/models/Probe_Head_Attachment.stl', label: 'Novel Probe Attachment' },
  { url: '/models/Handheld_Probe_Attachment_v3.stl', label: 'Traditional Probe Attachment' },
  { url: '/models/Tilt_Mechanism.stl', label: 'Stage Tilt Mechanism' },
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
                  <div className="font-body text-foreground/70 text-sm md:text-base leading-relaxed text-justify">
                    <p>{activeProjectData.subtitle}</p>
                    {activeProject === 'cancer-screening' && (
                      <>
                        <p className="mt-4">(1) Increasing comfort would make it more approachable for women to monitor their tumors longitudinally and provide doctors with more information when determining treatment plans.</p>
                        <p className="mt-4">(2) Squeezing tumors less during screening results in a more accurate calculation of volume when assessing responses to treatment.</p>
                      </>
                    )}
                  </div>
                  
                  {/* Drug Delivery Content */}
                  {activeProject === 'drug-delivery' && (
                    <>
                      <h3 className="mt-8 font-body text-foreground text-lg md:text-xl text-center w-full">Testing Environment</h3>
                      <p className="mt-4 font-body text-foreground/70 text-sm md:text-base leading-relaxed text-justify">
                        {/* Content to be added */}
                      </p>
                      
                      <h3 className="mt-8 font-body text-foreground text-lg md:text-xl text-center w-full">Surface Optimization</h3>
                      <p className="mt-4 font-body text-foreground/70 text-sm md:text-base leading-relaxed text-justify">
                        {/* Content to be added */}
                      </p>
                      
                      <h3 className="mt-8 font-body text-foreground text-lg md:text-xl text-center w-full">Results</h3>
                      <p className="mt-4 font-body text-foreground/70 text-sm md:text-base leading-relaxed text-justify">
                        {/* Content to be added */}
                      </p>
                    </>
                  )}
                  
                  {/* Cancer Screening Content */}
                  {activeProjectData.hasSchematic && (
                    <>
                      <h3 className="mt-8 font-body text-foreground text-lg md:text-xl text-center w-full">Testing Stage</h3>
                      <div className="mt-4 flex items-start gap-2">
                        {/* Schematic Image */}
                        <div className="w-[66%]">
                          <img 
                            src={ExpSchematic} 
                            alt="Experimental schematic showing probe attached to z-axis manipulator, phantom breast with tumor, and force sensor"
                            className="w-full h-auto"
                          />
                        </div>
                        
                        {/* STL Models Column */}
                        <div className="flex flex-col gap-0 -mt-4">
                          <Suspense fallback={<div className="w-36 h-36 bg-muted/20 animate-pulse" />}>
                            {stlModels.map((model, index) => (
                              <STLModel 
                                key={index} 
                                url={model.url} 
                                scale={0.035} 
                                label={model.label}
                              />
                            ))}
                          </Suspense>
                        </div>
                      </div>
                      <p className="mt-4 font-body text-foreground/70 text-sm md:text-base leading-relaxed text-justify">
                        The test was performed on a phantom breast with a known tumor inside. I used a z-axis manipulator to control the motion of the probe precisely, and 3D printed attachments that would affix each probe to it. The phantom breast was placed on a laser cut acrylic stage bolted into a 3D printed ball-and-socket joint, which was then screwed into a digital force sensor that was clamped to the table. The ball-and-socket joint allowed the stage to be angled such that the tumor was exactly in line with the axis of motion of the probe. Two screws, when tightened, made the entire stage rigid such that all force from the probe was transferred to the force sensor without dissipating or converting. I verified accuracy with known weights.
                      </p>
                      
                      <h3 className="mt-8 font-body text-foreground text-lg md:text-xl text-center w-full">Data Collection</h3>
                      <div className="mt-4 flex items-center justify-center gap-4">
                        <img 
                          src={HandheldProbeAnimated} 
                          alt="Handheld probe data collection animation"
                          className="h-64 w-auto object-contain"
                        />
                        <img 
                          src={NovelProbeAnimated} 
                          alt="Novel probe data collection animation"
                          className="h-64 w-auto object-contain"
                        />
                      </div>
                      <p className="mt-4 font-body text-foreground/70 text-sm md:text-base leading-relaxed text-justify">
                        I screen recorded the process of collecting data for each probe. I placed acoustic gel over the tumor, then lowered the probes incrementally from 0 to 11 N of force. To make a fair comparison between the probes, I flattened the 3D data from our novel probe onto a 2D plane, conserving the highest value out of the depth for each point.
                      </p>
                      
                      <h3 className="mt-8 font-body text-foreground text-lg md:text-xl text-center w-full">Results</h3>
                      
                      <img 
                        src={DeformationFigure} 
                        alt="Tumor deformation comparison between linear array and wearable 4D system"
                        className="mt-4 w-full max-w-4xl mx-auto h-auto"
                      />
                      <p className="mt-4 font-body text-foreground/70 text-sm md:text-base leading-relaxed text-justify max-w-4xl mx-auto">
                        To visualize which system was more prone to causing tumor deformation, I wrote a computer vision program to track the bright regions of the ultrasound images and plot their positions over time.
                      </p>
                      
                      <img 
                        src={PressureFigure} 
                        alt="Image quality over increasing applied pressure comparison"
                        className="mt-6 w-full max-w-4xl mx-auto h-auto"
                      />
                      <p className="mt-4 font-body text-foreground/70 text-sm md:text-base leading-relaxed text-justify max-w-4xl mx-auto">
                        To assess image quality, I used Contrast-to-Noise Ratio (CNR). This would effectively communicate how distinguishable the tumor is from regular tissue. I modified a CNR calculator by Shrihari Viswanath so that a user could choose between manually selecting target and background regions for each photo or using the same regions for every image in a series. I also made it so that the results would be sent directly to a csv format for easier post-processing. This allowed me to graph quality over applied pressure.
                      </p>
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
