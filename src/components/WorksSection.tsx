import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import STLModel from './STLModel';
import { Skeleton } from './ui/skeleton';

// Only import thumbnails initially - project images load on demand
import TexelsThumbnail from '@/assets/TexelsThumbnail.png';
import CancerScreeningThumbnail from '@/assets/CancerScreeningThumbnail.png';
import DrugDeliveryThumbnail from '@/assets/DrugDeliveryThumbnail.png';
import LykenThumbnail from '@/assets/LykenThumbnail.png';

interface Project {
  id: string;
  title: string;
  thumbnail: string;
  displayTitle?: string;
  subtitle?: string;
  hasSchematic?: boolean;
}

const projects: Project[] = [
  { 
    id: 'texels', 
    title: 'TEXELS', 
    thumbnail: TexelsThumbnail,
    displayTitle: 'Can I design a textile that replicates any texture you give it?',
    subtitle: 'For my honors undergraduate thesis, I am prototyping a fabric that can smock itself into a variety of programmable texture patterns.',
    hasSchematic: false
  },
  { 
    id: 'cancer-screening', 
    title: 'CANCER SCREENING', 
    thumbnail: CancerScreeningThumbnail,
    displayTitle: 'Can a novel probe by the Conformable Decoders detect tumors with less pressure?',
    subtitle: 'I built a testing system to compare a new ultrasound probe to the industry standard for two reasons.',
    hasSchematic: true
  },
  { 
    id: 'drug-delivery', 
    title: 'DRUG DELIVERY', 
    thumbnail: DrugDeliveryThumbnail,
    displayTitle: 'How can we optimize a surface to stick to bodily tracts for drug delivery?',
    subtitle: 'I physically and chemically modified a biocompatible substrate to wick mucus and latch itself onto the lining of a bodily tract for noninvasive, long term drug delivery through the epithelium.',
    hasSchematic: false
  },
  { 
    id: 'lyken', 
    title: 'LYKEN', 
    thumbnail: LykenThumbnail,
    displayTitle: 'What could circular fashion look like in Orlando?',
    subtitle: 'I set out to create one full look using only home grown and native biomaterials or recycled fibers.',
    hasSchematic: false
  },
];

const stlModels = [
  { url: '/models/Probe_Head_Attachment.stl', label: 'Novel Probe Attachment' },
  { url: '/models/Handheld_Probe_Attachment_v3.stl', label: 'Traditional Probe Attachment' },
  { url: '/models/Tilt_Mechanism.stl', label: 'Stage Tilt Mechanism' },
];

// Type definitions for dynamically loaded images
interface TexelsImages {
  texelsMapImages: string[];
  TexelsPaper1: string;
  TexelsPaper2: string;
  TexelsPaper3: string;
  TexelsFabric1: string;
  TexelsFabric2: string;
  TexelsFabric3: string;
  TexelsCircuit1: string;
  TexelsCircuit2: string;
  TexelsPrototyping1: string;
  TexelsPrototyping2: string;
}

interface CancerImages {
  ExpSchematic: string;
  HandheldProbeAnimated: string;
  NovelProbeAnimated: string;
  DeformationFigure: string;
  PressureFigure: string;
}

interface DrugDeliveryImages {
  PhantomModels: string;
  PhantomMoldsAndMaterials: string;
  ContactAngleAnalysis: string;
  ContactAngleResults: string;
  PillarMold: string;
  PillarWicking: string;
}

interface LykenImages {
  lykenLookImages: string[];
  lykenSketchImages: string[];
  lykenDetailImages: string[];
  lykenBodyImages: string[];
  lykenHemImages: string[];
  LykenFullSketch1: string;
  LykenFullSketch2: string;
  PetalJewelry1: string;
  PetalJewelry2: string;
  PetalJewelry3: string;
  VeganLeather1: string;
  VeganLeather2: string;
  VeganLeather3: string;
  RootTextile1: string;
  RootTextile2: string;
  RootTextile3: string;
  RootTextile4: string;
  LykenResult: string;
}

const WorksSection = () => {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [sketchCarouselIndex, setSketchCarouselIndex] = useState(0);
  const [detailCarouselIndex, setDetailCarouselIndex] = useState(0);
  const [bodyCarouselIndex, setBodyCarouselIndex] = useState(0);
  const [hemCarouselIndex, setHemCarouselIndex] = useState(0);
  const [texelsMapIndex, setTexelsMapIndex] = useState(0);
  
  // Dynamic image states
  const [texelsImages, setTexelsImages] = useState<TexelsImages | null>(null);
  const [cancerImages, setCancerImages] = useState<CancerImages | null>(null);
  const [drugImages, setDrugImages] = useState<DrugDeliveryImages | null>(null);
  const [lykenImages, setLykenImages] = useState<LykenImages | null>(null);
  const [loadingImages, setLoadingImages] = useState(false);

  // Load project images dynamically when project is clicked
  useEffect(() => {
    const loadProjectImages = async () => {
      if (!activeProject) return;
      
      setLoadingImages(true);
      
      try {
        switch (activeProject) {
          case 'texels':
            if (!texelsImages) {
              const images = await import('./projectImages/texelsImages');
              setTexelsImages(images as TexelsImages);
            }
            break;
          case 'cancer-screening':
            if (!cancerImages) {
              const images = await import('./projectImages/cancerImages');
              setCancerImages(images as CancerImages);
            }
            break;
          case 'drug-delivery':
            if (!drugImages) {
              const images = await import('./projectImages/drugDeliveryImages');
              setDrugImages(images as DrugDeliveryImages);
            }
            break;
          case 'lyken':
            if (!lykenImages) {
              const images = await import('./projectImages/lykenImages');
              setLykenImages(images as LykenImages);
            }
            break;
        }
      } catch (error) {
        console.error('Failed to load project images:', error);
      } finally {
        setLoadingImages(false);
      }
    };
    
    loadProjectImages();
  }, [activeProject, texelsImages, cancerImages, drugImages, lykenImages]);

  // Auto-cycle through TEXELS map images
  useEffect(() => {
    if (activeProject === 'texels' && texelsImages) {
      const interval = setInterval(() => {
        setTexelsMapIndex((prev) => (prev + 1) % texelsImages.texelsMapImages.length);
      }, 400);
      return () => clearInterval(interval);
    }
  }, [activeProject, texelsImages]);

  const handleCarouselPrev = () => {
    if (!lykenImages) return;
    setCarouselIndex((prev) => (prev - 1 + lykenImages.lykenLookImages.length) % lykenImages.lykenLookImages.length);
  };

  const handleCarouselNext = () => {
    if (!lykenImages) return;
    setCarouselIndex((prev) => (prev + 1) % lykenImages.lykenLookImages.length);
  };

  const handleSketchCarouselPrev = () => {
    if (!lykenImages) return;
    setSketchCarouselIndex((prev) => (prev - 1 + lykenImages.lykenSketchImages.length) % lykenImages.lykenSketchImages.length);
  };

  const handleSketchCarouselNext = () => {
    if (!lykenImages) return;
    setSketchCarouselIndex((prev) => (prev + 1) % lykenImages.lykenSketchImages.length);
  };

  const handleDetailCarouselPrev = () => {
    if (!lykenImages) return;
    setDetailCarouselIndex((prev) => (prev - 1 + lykenImages.lykenDetailImages.length) % lykenImages.lykenDetailImages.length);
  };

  const handleDetailCarouselNext = () => {
    if (!lykenImages) return;
    setDetailCarouselIndex((prev) => (prev + 1) % lykenImages.lykenDetailImages.length);
  };

  const handleBodyCarouselPrev = () => {
    if (!lykenImages) return;
    setBodyCarouselIndex((prev) => (prev - 1 + lykenImages.lykenBodyImages.length) % lykenImages.lykenBodyImages.length);
  };

  const handleBodyCarouselNext = () => {
    if (!lykenImages) return;
    setBodyCarouselIndex((prev) => (prev + 1) % lykenImages.lykenBodyImages.length);
  };

  const handleHemCarouselPrev = () => {
    if (!lykenImages) return;
    setHemCarouselIndex((prev) => (prev - 1 + lykenImages.lykenHemImages.length) % lykenImages.lykenHemImages.length);
  };

  const handleHemCarouselNext = () => {
    if (!lykenImages) return;
    setHemCarouselIndex((prev) => (prev + 1) % lykenImages.lykenHemImages.length);
  };

  const handleProjectClick = (projectId: string) => {
    console.log('Clicked project:', projectId);
    setActiveProject(projectId);
    // Reset carousel indices
    setCarouselIndex(0);
    setSketchCarouselIndex(0);
    setDetailCarouselIndex(0);
    setBodyCarouselIndex(0);
    setHemCarouselIndex(0);
    setTexelsMapIndex(0);
    // Scroll to top of project description
    setTimeout(() => {
      const projectDisplay = document.querySelector('.project-display-area');
      if (projectDisplay) {
        projectDisplay.scrollTop = 0;
      }
    }, 50);
  };

  const activeProjectData = activeProject ? projects.find(p => p.id === activeProject) : null;
  
  console.log('Current activeProject:', activeProject, 'Data:', activeProjectData);

  const isAnimating = (projectId: string) => {
    return hoveredProject === projectId && activeProject !== projectId;
  };

  const isFrozen = (projectId: string) => {
    return activeProject === projectId;
  };

  // Loading skeleton for project content
  const ProjectSkeleton = () => (
    <div className="space-y-4 w-full">
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-64 w-full mt-4" />
    </div>
  );

  return (
    <section id="works" className="h-screen flex items-start pt-[25vh] relative z-10">
      <div className="flex w-full h-[70vh]">
        {/* Thumbnails Column */}
        <div className="flex flex-col justify-between h-full pl-[10%]">
          {projects.map((project) => (
            <div
              key={project.id}
              className="cursor-pointer group"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => handleProjectClick(project.id)}
            >
              {/* Thumbnail - still image for now, will be replaced with video later */}
              {/* Animation settings preserved: scale 1->1.05, opacity transitions, duration 0.8s, easeInOut */}
              <div className="relative w-24 h-16 md:w-32 md:h-20 overflow-hidden">
                <motion.img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-contain"
                  animate={{
                    scale: isAnimating(project.id) ? [1, 1.05, 1] : isFrozen(project.id) ? 1.05 : 1,
                    opacity: isAnimating(project.id) ? [0.7, 1, 0.9] : isFrozen(project.id) ? 1 : 0.8,
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: isAnimating(project.id) ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Project Display Area */}
        <div className="project-display-area flex-1 flex flex-col items-start justify-start px-8 pr-[15%] overflow-y-auto">
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
                  
                  {/* Show loading skeleton while images load */}
                  {loadingImages && <ProjectSkeleton />}
                  
                  {/* TEXELS Design Content */}
                  {activeProject === 'texels' && texelsImages && !loadingImages && (
                    <>
                      <h3 className="mt-8 font-body text-foreground text-lg md:text-xl text-center w-full">Design</h3>
                      <div className="mt-4 flex gap-4 items-stretch">
                        {/* Left: Cycling map animation */}
                        <div className="w-[35%] relative flex flex-col">
                          <div className="flex-1 flex items-center">
                            <img
                              src={texelsImages.texelsMapImages[texelsMapIndex]}
                              alt={`Programmable textiles mind map stage ${texelsMapIndex + 1}`}
                              className="w-full h-full object-contain"
                              loading="lazy"
                            />
                          </div>
                          <a 
                            href="https://docs.google.com/presentation/d/1k-66ggAYF3-HQOfZ-W9AUxxbpRBd1Azldqbmlzte5h0/edit?usp=sharing"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-end gap-1 mt-2 text-xs text-foreground/60 hover:text-foreground transition-colors"
                          >
                            <span>view mindmap</span>
                            <ExternalLink size={12} />
                          </a>
                        </div>
                        
                        {/* Right: Image grids */}
                        <div className="w-[65%] flex flex-col gap-2">
                          {/* Top row - 3 paper images */}
                          <div className="flex gap-2">
                            <img src={texelsImages.TexelsPaper1} alt="Paper smocking pattern 1" className="w-1/3 object-cover aspect-square" loading="lazy" />
                            <img src={texelsImages.TexelsPaper2} alt="Paper smocking pattern 2" className="w-1/3 object-cover aspect-square" loading="lazy" />
                            <img src={texelsImages.TexelsPaper3} alt="Paper smocking pattern 3" className="w-1/3 object-cover aspect-square" loading="lazy" />
                          </div>
                          {/* Bottom row - 3 fabric images */}
                          <div className="flex gap-2">
                            <img src={texelsImages.TexelsFabric1} alt="Fabric smocking pattern 1" className="w-1/3 object-cover aspect-square" loading="lazy" />
                            <img src={texelsImages.TexelsFabric2} alt="Fabric smocking pattern 2" className="w-1/3 object-cover aspect-square" loading="lazy" />
                            <img src={texelsImages.TexelsFabric3} alt="Fabric smocking pattern 3" className="w-1/3 object-cover aspect-square" loading="lazy" />
                          </div>
                        </div>
                      </div>
                      <p className="mt-4 font-body text-foreground/70 text-sm md:text-base leading-relaxed text-justify">
                        I began with a review of the current state of programmable fabrics and problems hindering their adoption. I chose to focus on user friendliness, reusability, and amount of possible shapes, which was very low on average. I explored different forms of shape language for creating 3D shapes out of deformed 2D surfaces, and landed on "Canadian" or "North American" smocking as a format of intuitive patterns with a consistent grid layout and many possible resulting textures.
                      </p>
                      
                      {/* Circuit images section */}
                      <div className="mt-6 flex justify-center">
                        <img src={texelsImages.TexelsCircuit2} alt="Driver and smocking pattern diagram" className="w-2/3 object-contain" loading="lazy" />
                      </div>
                      <p className="mt-4 font-body text-foreground/70 text-sm md:text-base leading-relaxed text-justify">
                        Inspired by individually addressable pixels in an LCD display, I drafted and simulated a circuit on Simulink that could activate selected points on the grid to smock together by passing electricity through a thin shape memory wire connecting them.
                      </p>
                      <img src={texelsImages.TexelsCircuit1} alt="Electronic circuit diagram of texel array on Simulink" className="mt-4 w-full object-contain" loading="lazy" />
                      
                      <h3 className="mt-8 font-body text-foreground text-lg md:text-xl text-center w-full">Prototyping</h3>
                      
                      <div className="mt-4 flex gap-4">
                        {/* Video on left */}
                        <div className="w-1/2">
                          <video 
                            src="/videos/TexelsPrototyping.mp4" 
                            autoPlay 
                            loop 
                            muted 
                            playsInline
                            preload="none"
                            className="w-full object-contain"
                          />
                        </div>
                        
                        {/* Right column with image and paragraph */}
                        <div className="w-1/2 flex flex-col">
                          <img 
                            src={texelsImages.TexelsPrototyping1} 
                            alt="Fabric with shape memory wire connections" 
                            className="w-full object-contain"
                            loading="lazy"
                          />
                          <p className="font-body text-foreground/70 text-sm leading-relaxed text-justify py-2">
                            I performed the proper calculations to select components that would bring the theoretical circuit into reality on a small scale while ensuring compatibility and proper power handling. I am currently assembling these pieces and integrating them into the fabric by hand. I have relied on a mix of traditional electrical engineering, jewelry, and fashion methods to form connections between nontraditional components on a flexible surface.
                          </p>
                        </div>
                      </div>
                      
                      <img 
                        src={texelsImages.TexelsPrototyping2} 
                        alt="Annotated diagram of circuit components integrated into fabric" 
                        className="mt-4 w-full object-contain"
                        loading="lazy"
                      />
                      
                      <h3 className="mt-8 font-body text-foreground text-lg md:text-xl text-center w-full">Future Work</h3>
                      <p className="mt-4 font-body text-foreground/70 text-sm md:text-base leading-relaxed text-justify">
                        I am now integrating the software of the device through a microcontroller and several shift registers acting as the row and gate drivers. I will create a simple graphical user interface for people to input the patterns they would like to see the fabric conform to. Then, I will conduct interviews with people in different fields to understand the fabric's usability in varying use cases.
                      </p>
                    </>
                  )}
                  
                  {/* Drug Delivery Content */}
                  {activeProject === 'drug-delivery' && drugImages && !loadingImages && (
                    <>
                      <h3 className="mt-8 font-body text-foreground text-lg md:text-xl text-center w-full">Phantom Environment</h3>
                      <div className="mt-4 flex flex-col gap-4 items-center">
                        <img 
                          src={drugImages.PhantomModels} 
                          alt="Phantom environment 3D models" 
                          className="w-full object-contain"
                          loading="lazy"
                        />
                        <img 
                          src={drugImages.PhantomMoldsAndMaterials} 
                          alt="Phantom molds and materials" 
                          className="w-full object-contain"
                          loading="lazy"
                        />
                      </div>
                      <p className="mt-4 font-body text-foreground/70 text-sm md:text-base leading-relaxed text-justify">
                        I created a phantom bodily tract with elastomers of the correct stiffness and simulated bodily fluids.
                      </p>
                      
                      <h3 className="mt-8 font-body text-foreground text-lg md:text-xl text-center w-full">Chemical Optimization</h3>
                      <p className="mt-4 font-body text-foreground/70 text-sm md:text-base leading-relaxed text-justify">
                        After exploration, I worked with polydimethylsiloxane (PDMS) as the device substrate due to its elasticity, biocompatibility, and biodurability. However, its hydrophobicity would repel mucus, so I replicated a study that deposited a hydrophilic coating of polydopamine and bovine serum albumin (BSA).
                      </p>
                      <div className="mt-4 flex gap-4 justify-center">
                        <img 
                          src={drugImages.ContactAngleAnalysis} 
                          alt="Contact angle analysis in ImageJ" 
                          className="max-h-[200px] object-contain"
                          loading="lazy"
                        />
                        <img 
                          src={drugImages.ContactAngleResults} 
                          alt="Contact angle results comparing coated and uncoated surfaces" 
                          className="max-h-[200px] object-contain"
                          loading="lazy"
                        />
                      </div>
                      <p className="mt-4 font-body text-foreground/70 text-sm md:text-base leading-relaxed text-justify">
                        I found that the coating achieved hydrophilicity in both water and simulated mucus by analyzing contact angles in imageJ. The coating wore off within two hours, but reactivated at least once upon soaking in BSA and phosphate buffer, allowing for device reuse.
                      </p>
                      
                      <h3 className="mt-8 font-body text-foreground text-lg md:text-xl text-center w-full">Physical Optimization</h3>
                      <p className="mt-4 font-body text-foreground/70 text-sm md:text-base leading-relaxed text-justify">
                        To introduce mechanical adhesion, I added pillars to the surface of the PDMS. I tested molds made of PLA and resin with different curing steps, pillars of different diameters (10-, 5-, 2-, and 1-mm), and of different heights (1- and 2-mm).
                      </p>
                      <div className="mt-4 flex gap-4 justify-center">
                        <img 
                          src={drugImages.PillarMold} 
                          alt="Varied pillar mold design" 
                          className="max-h-[200px] object-contain"
                          loading="lazy"
                        />
                        <img 
                          src={drugImages.PillarWicking} 
                          alt="Pillar wicking test results" 
                          className="max-h-[200px] object-contain"
                          loading="lazy"
                        />
                      </div>
                      <p className="mt-4 font-body text-foreground/70 text-sm md:text-base leading-relaxed text-justify">
                        I analyzed the distance covered and change in surface area of water drops with imageJ to determine the wicking effects of the pillars. I proposed a design with varying sizes to move and hold mucus in designated areas, as different sizes had different advantages.
                      </p>
                    </>
                  )}
                  
                  {/* Cancer Screening Content */}
                  {activeProjectData.hasSchematic && cancerImages && !loadingImages && (
                    <>
                      <h3 className="mt-8 font-body text-foreground text-lg md:text-xl text-center w-full">Testing Stage</h3>
                      <div className="mt-4 flex items-start gap-2">
                        {/* Schematic Image */}
                        <div className="w-[66%]">
                          <img 
                            src={cancerImages.ExpSchematic} 
                            alt="Experimental schematic showing probe attached to z-axis manipulator, phantom breast with tumor, and force sensor"
                            className="w-full h-auto"
                            loading="lazy"
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
                          src={cancerImages.HandheldProbeAnimated} 
                          alt="Handheld probe data collection animation"
                          className="h-64 w-auto object-contain"
                          loading="lazy"
                        />
                        <img 
                          src={cancerImages.NovelProbeAnimated} 
                          alt="Novel probe data collection animation"
                          className="h-64 w-auto object-contain"
                          loading="lazy"
                        />
                      </div>
                      <p className="mt-4 font-body text-foreground/70 text-sm md:text-base leading-relaxed text-justify">
                        I screen recorded the process of collecting data for each probe. I placed acoustic gel over the tumor, then lowered the probes incrementally from 0 to 11 N of force. To make a fair comparison between the probes, I flattened the 3D data from our novel probe onto a 2D plane, conserving the highest value out of the depth for each point.
                      </p>
                      
                      <h3 className="mt-8 font-body text-foreground text-lg md:text-xl text-center w-full">Results</h3>
                      
                      <img 
                        src={cancerImages.DeformationFigure} 
                        alt="Tumor deformation comparison between linear array and wearable 4D system"
                        className="mt-4 w-full max-w-4xl mx-auto h-auto"
                        loading="lazy"
                      />
                      <p className="mt-4 font-body text-foreground/70 text-sm md:text-base leading-relaxed text-justify max-w-4xl mx-auto">
                        To visualize which system was more prone to causing tumor deformation, I wrote a computer vision program to track the bright regions of the ultrasound images and plot their positions over time.
                      </p>
                      
                      <img 
                        src={cancerImages.PressureFigure} 
                        alt="Image quality over increasing applied pressure comparison"
                        className="mt-6 w-full max-w-4xl mx-auto h-auto"
                        loading="lazy"
                      />
                      <p className="mt-4 font-body text-foreground/70 text-sm md:text-base leading-relaxed text-justify max-w-4xl mx-auto">
                        To assess image quality, I used Contrast-to-Noise Ratio (CNR). This would effectively communicate how distinguishable the tumor is from regular tissue. I modified a CNR calculator by Shrihari Viswanath so that a user could choose between manually selecting target and background regions for each photo or using the same regions for every image in a series. I also made it so that the results would be sent directly to a csv format for easier post-processing. This allowed me to graph quality over applied pressure.
                      </p>
                    </>
                  )}
                  
                  {/* Lyken Content */}
                  {activeProject === 'lyken' && lykenImages && !loadingImages && (
                    <>
                      <div className="mb-6" />
                      <div className="flex gap-8">
                        {/* Left side - All Carousels (50% width) */}
                        <div className="w-1/2 flex flex-col gap-4">
                          {/* First Carousel - Looks */}
                          <div className="relative flex items-center justify-center h-[100px]">
                            <div className="absolute left-[5%] z-0 opacity-30 scale-75">
                              <img src={lykenImages.lykenLookImages[(carouselIndex - 1 + lykenImages.lykenLookImages.length) % lykenImages.lykenLookImages.length]} alt="Previous look" className="max-h-[80px] object-contain" loading="lazy" />
                            </div>
                            <button onClick={handleCarouselPrev} className="absolute left-[25%] z-20 p-1 rounded-full border border-foreground/20 hover:bg-foreground/10 transition-colors bg-background/50">
                              <ChevronLeft className="w-3 h-3" />
                            </button>
                            <motion.div key={carouselIndex} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} className="relative z-10">
                              <img src={lykenImages.lykenLookImages[carouselIndex]} alt={`Look ${carouselIndex + 1}`} className="max-h-[90px] object-contain" loading="lazy" />
                            </motion.div>
                            <button onClick={handleCarouselNext} className="absolute right-[25%] z-20 p-1 rounded-full border border-foreground/20 hover:bg-foreground/10 transition-colors bg-background/50">
                              <ChevronRight className="w-3 h-3" />
                            </button>
                            <div className="absolute right-[5%] z-0 opacity-30 scale-75">
                              <img src={lykenImages.lykenLookImages[(carouselIndex + 1) % lykenImages.lykenLookImages.length]} alt="Next look" className="max-h-[80px] object-contain" loading="lazy" />
                            </div>
                          </div>
                          
                          {/* Second Carousel - Sketches */}
                          <div className="relative flex items-center justify-center h-[100px]">
                            <div className="absolute left-[5%] z-0 opacity-30 scale-75">
                              <img src={lykenImages.lykenSketchImages[(sketchCarouselIndex - 1 + lykenImages.lykenSketchImages.length) % lykenImages.lykenSketchImages.length]} alt="Previous sketch" className="max-h-[80px] object-contain" />
                            </div>
                            <button onClick={handleSketchCarouselPrev} className="absolute left-[25%] z-20 p-1 rounded-full border border-foreground/20 hover:bg-foreground/10 transition-colors bg-background/50">
                              <ChevronLeft className="w-3 h-3" />
                            </button>
                            <motion.div key={`sketch-${sketchCarouselIndex}`} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} className="relative z-10">
                              <img src={lykenImages.lykenSketchImages[sketchCarouselIndex]} alt={`Sketch ${sketchCarouselIndex + 1}`} className="max-h-[90px] object-contain" />
                            </motion.div>
                            <button onClick={handleSketchCarouselNext} className="absolute right-[25%] z-20 p-1 rounded-full border border-foreground/20 hover:bg-foreground/10 transition-colors bg-background/50">
                              <ChevronRight className="w-3 h-3" />
                            </button>
                            <div className="absolute right-[5%] z-0 opacity-30 scale-75">
                              <img src={lykenImages.lykenSketchImages[(sketchCarouselIndex + 1) % lykenImages.lykenSketchImages.length]} alt="Next sketch" className="max-h-[80px] object-contain" />
                            </div>
                          </div>
                          
                          {/* Third Carousel - Details */}
                          <div className="relative flex items-center justify-center h-[100px]">
                            <div className="absolute left-[5%] z-0 opacity-30 scale-75">
                              <img src={lykenImages.lykenDetailImages[(detailCarouselIndex - 1 + lykenImages.lykenDetailImages.length) % lykenImages.lykenDetailImages.length]} alt="Previous detail" className="max-h-[80px] object-contain" />
                            </div>
                            <button onClick={handleDetailCarouselPrev} className="absolute left-[25%] z-20 p-1 rounded-full border border-foreground/20 hover:bg-foreground/10 transition-colors bg-background/50">
                              <ChevronLeft className="w-3 h-3" />
                            </button>
                            <motion.div key={`detail-${detailCarouselIndex}`} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} className="relative z-10">
                              <img src={lykenImages.lykenDetailImages[detailCarouselIndex]} alt={`Detail ${detailCarouselIndex + 1}`} className="max-h-[90px] object-contain" />
                            </motion.div>
                            <button onClick={handleDetailCarouselNext} className="absolute right-[25%] z-20 p-1 rounded-full border border-foreground/20 hover:bg-foreground/10 transition-colors bg-background/50">
                              <ChevronRight className="w-3 h-3" />
                            </button>
                            <div className="absolute right-[5%] z-0 opacity-30 scale-75">
                              <img src={lykenImages.lykenDetailImages[(detailCarouselIndex + 1) % lykenImages.lykenDetailImages.length]} alt="Next detail" className="max-h-[80px] object-contain" />
                            </div>
                          </div>
                          
                          {/* Fourth Carousel - Body */}
                          <div className="relative flex items-center justify-center h-[100px]">
                            <div className="absolute left-[5%] z-0 opacity-30 scale-75">
                              <img src={lykenImages.lykenBodyImages[(bodyCarouselIndex - 1 + lykenImages.lykenBodyImages.length) % lykenImages.lykenBodyImages.length]} alt="Previous body" className="max-h-[80px] object-contain" />
                            </div>
                            <button onClick={handleBodyCarouselPrev} className="absolute left-[25%] z-20 p-1 rounded-full border border-foreground/20 hover:bg-foreground/10 transition-colors bg-background/50">
                              <ChevronLeft className="w-3 h-3" />
                            </button>
                            <motion.div key={`body-${bodyCarouselIndex}`} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} className="relative z-10">
                              <img src={lykenImages.lykenBodyImages[bodyCarouselIndex]} alt={`Body ${bodyCarouselIndex + 1}`} className="max-h-[90px] object-contain" />
                            </motion.div>
                            <button onClick={handleBodyCarouselNext} className="absolute right-[25%] z-20 p-1 rounded-full border border-foreground/20 hover:bg-foreground/10 transition-colors bg-background/50">
                              <ChevronRight className="w-3 h-3" />
                            </button>
                            <div className="absolute right-[5%] z-0 opacity-30 scale-75">
                              <img src={lykenImages.lykenBodyImages[(bodyCarouselIndex + 1) % lykenImages.lykenBodyImages.length]} alt="Next body" className="max-h-[80px] object-contain" />
                            </div>
                          </div>
                          
                          {/* Fifth Carousel - Hem */}
                          <div className="relative flex items-center justify-center h-[100px]">
                            <div className="absolute left-[5%] z-0 opacity-30 scale-75">
                              <img src={lykenImages.lykenHemImages[(hemCarouselIndex - 1 + lykenImages.lykenHemImages.length) % lykenImages.lykenHemImages.length]} alt="Previous hem" className="max-h-[80px] object-contain" />
                            </div>
                            <button onClick={handleHemCarouselPrev} className="absolute left-[25%] z-20 p-1 rounded-full border border-foreground/20 hover:bg-foreground/10 transition-colors bg-background/50">
                              <ChevronLeft className="w-3 h-3" />
                            </button>
                            <motion.div key={`hem-${hemCarouselIndex}`} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} className="relative z-10">
                              <img src={lykenImages.lykenHemImages[hemCarouselIndex]} alt={`Hem ${hemCarouselIndex + 1}`} className="max-h-[90px] object-contain" />
                            </motion.div>
                            <button onClick={handleHemCarouselNext} className="absolute right-[25%] z-20 p-1 rounded-full border border-foreground/20 hover:bg-foreground/10 transition-colors bg-background/50">
                              <ChevronRight className="w-3 h-3" />
                            </button>
                            <div className="absolute right-[5%] z-0 opacity-30 scale-75">
                              <img src={lykenImages.lykenHemImages[(hemCarouselIndex + 1) % lykenImages.lykenHemImages.length]} alt="Next hem" className="max-h-[80px] object-contain" />
                            </div>
                          </div>
                        </div>
                        
                        {/* Right side - Paragraph + Still Image (50% width) */}
                        <div className="w-1/2 flex flex-col gap-4">
                          <p className="font-body text-foreground/70 text-sm md:text-base leading-relaxed text-justify">
                            Aside from the material challenge, I worked with a narrative concept for this piece. I wanted to explore flowers not just as my main physical medium but as cultural symbols for love and commitment. When sketching designs, I focused on cultural signifiers that similarly evoked ceremonies of love, vulnerability, entanglement, and restriction.
                          </p>
                          <img src={lykenImages.LykenFullSketch1} alt="Full sketch design 1" className="w-full object-contain" />
                        </div>
                      </div>
                      
                      {/* Petal Jewelry Section */}
                      <h3 className="mt-8 font-body text-foreground text-lg md:text-xl text-center w-full">Petal Jewelry</h3>
                      <div className="mt-4 flex gap-4 justify-center">
                        <img src={lykenImages.PetalJewelry1} alt="Fallen flower petals collection" className="max-h-[200px] object-contain" />
                        <img src={lykenImages.PetalJewelry2} alt="Clay made from flower petals - hibiscus, yucca, king's mantle" className="max-h-[200px] object-contain" />
                        <img src={lykenImages.PetalJewelry3} alt="Finished petal clay beads" className="max-h-[200px] object-contain" />
                      </div>
                      <p className="mt-4 font-body text-foreground/70 text-sm md:text-base leading-relaxed text-justify">
                        I used fallen petals of native flowers to create clay beads. I mimicked traditions of associating flowers to distinct meanings by making separate clays for each type of flower. I spelled messages with the flower beads based on the first letter of their names to replicate the old romantic gesture of acrostic jewelry.
                      </p>
                      
                      {/* Vegan Leather Section */}
                      <h3 className="mt-8 font-body text-foreground text-lg md:text-xl text-center w-full">Vegan Leather with Petals</h3>
                      <div className="mt-4 flex gap-4 justify-center">
                        <img src={lykenImages.VeganLeather1} alt="Hibiscus petals for vegan leather" className="max-h-[200px] object-contain" />
                        <img src={lykenImages.VeganLeather2} alt="Petals encapsulated in kombucha leather" className="max-h-[200px] object-contain" />
                        <img src={lykenImages.VeganLeather3} alt="Finished vegan leather arm bands" className="max-h-[200px] object-contain" />
                      </div>
                      <p className="mt-4 font-body text-foreground/70 text-sm md:text-base leading-relaxed text-justify">
                        I experimented with ways to effectively encapsulate flower petals between layers of natural kombucha leather to create arm bands.
                      </p>
                      
                      {/* Root as Textile Section */}
                      <h3 className="mt-8 font-body text-foreground text-lg md:text-xl text-center w-full">Root as Textile</h3>
                      <div className="mt-4 flex gap-4 justify-center">
                        <img src={lykenImages.RootTextile1} alt="Root mat growing process" className="max-h-[200px] object-contain" />
                        <img src={lykenImages.RootTextile2} alt="Root textile on dress form" className="max-h-[200px] object-contain" />
                        <img src={lykenImages.RootTextile3} alt="Needle lace with roots" className="max-h-[200px] object-contain" />
                        <img src={lykenImages.RootTextile4} alt="Attaching root textile to form" className="max-h-[200px] object-contain" />
                      </div>
                      <p className="mt-4 font-body text-foreground/70 text-sm md:text-base leading-relaxed text-justify">
                        I grew various rounds of root mats to create "woven" sheets. I learned needle lace to integrate the roots into a stronger textile structure that could mimic their visual characteristics.
                      </p>
                      
                      {/* Result Section */}
                      <h3 className="mt-8 font-body text-foreground text-lg md:text-xl text-center w-full">Result</h3>
                      <div className="mt-4 flex gap-8 items-center">
                        <div className="w-1/2 flex items-center justify-center">
                          <p className="font-body text-foreground/70 text-sm md:text-base leading-relaxed text-justify">
                            I selected my strongest roots and combined every prior technique into the final look. This look was part of a mini-collection with five other designers each addressing their own visions of environmentalist futures. I co-directed the team with Isabella Chiappini.
                          </p>
                        </div>
                        <div className="w-1/2 flex justify-center">
                          <img src={lykenImages.LykenResult} alt="Final LYKEN look on model" className="max-h-[400px] object-contain" />
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
