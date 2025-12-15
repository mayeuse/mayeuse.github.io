import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { Skeleton } from './ui/skeleton';
import LazySectionWrapper from './LazySectionWrapper';
import LazySTLModels from './LazySTLModels';

// Only import thumbnails initially - project images load on demand
import TexelsThumb1 from '@/assets/TexelsThumb1.png';
import TexelsThumb2 from '@/assets/TexelsThumb2.png';
import CancerThumb1 from '@/assets/CancerThumb1.png';
import CancerThumb2 from '@/assets/CancerThumb2.png';
import DrugThumb1 from '@/assets/DrugThumb1.png';
import DrugThumb2 from '@/assets/DrugThumb2.png';
import LykenThumb1 from '@/assets/LykenThumb1.png';
import LykenThumb2 from '@/assets/LykenThumb2.png';

interface Project {
  id: string;
  title: string;
  thumbnailPrimary: string;
  thumbnailSecondary: string;
  displayTitle?: string;
  subtitle?: string;
  hasSchematic?: boolean;
}

const projects: Project[] = [
  { 
    id: 'texels', 
    title: 'TEXELS', 
    thumbnailPrimary: TexelsThumb1,
    thumbnailSecondary: TexelsThumb2,
    displayTitle: 'Can I design a textile that replicates any texture you give it?',
    subtitle: 'For my honors undergraduate thesis, I am prototyping a fabric that can smock itself into a variety of programmable texture patterns.',
    hasSchematic: false
  },
  { 
    id: 'cancer-screening', 
    title: 'CANCER SCREENING', 
    thumbnailPrimary: CancerThumb1,
    thumbnailSecondary: CancerThumb2,
    displayTitle: 'Can a novel probe by the Conformable Decoders detect tumors with less pressure?',
    subtitle: 'I built a testing system to compare a new ultrasound probe to the industry standard for two reasons.',
    hasSchematic: true
  },
  { 
    id: 'drug-delivery', 
    title: 'DRUG DELIVERY', 
    thumbnailPrimary: DrugThumb1,
    thumbnailSecondary: DrugThumb2,
    displayTitle: 'How can we optimize a surface to stick to bodily tracts for drug delivery?',
    subtitle: 'I physically and chemically modified a biocompatible substrate to wick mucus and latch itself onto the lining of a bodily tract for noninvasive, long term drug delivery.',
    hasSchematic: false
  },
  { 
    id: 'lyken', 
    title: 'LYKEN', 
    thumbnailPrimary: LykenThumb1,
    thumbnailSecondary: LykenThumb2,
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
interface TexelsDesignImages {
  texelsMapImages: string[];
  TexelsPaper1: string;
  TexelsPaper2: string;
  TexelsPaper3: string;
  TexelsFabric1: string;
  TexelsFabric2: string;
  TexelsFabric3: string;
  TexelsCircuit1: string;
  TexelsCircuit2: string;
}

interface TexelsPrototypingImages {
  TexelsPrototyping1: string;
  TexelsPrototyping2: string;
}

interface CancerInitialImages {
  ExpSchematic: string;
}

interface CancerResultsImages {
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

interface LykenMainImages {
  lykenLookImages: string[];
  lykenSketchImages: string[];
  LykenFullSketch1: string;
}

interface LykenCarouselImages {
  lykenDetailImages: string[];
  lykenBodyImages: string[];
  lykenHemImages: string[];
}

interface LykenSubsectionImages {
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
  
  // Dynamic image states - split by subsection for progressive loading
  const [texelsDesignImages, setTexelsDesignImages] = useState<TexelsDesignImages | null>(null);
  const [texelsPrototypingImages, setTexelsPrototypingImages] = useState<TexelsPrototypingImages | null>(null);
  const [cancerInitialImages, setCancerInitialImages] = useState<CancerInitialImages | null>(null);
  const [cancerResultsImages, setCancerResultsImages] = useState<CancerResultsImages | null>(null);
  const [drugImages, setDrugImages] = useState<DrugDeliveryImages | null>(null);
  const [lykenMainImages, setLykenMainImages] = useState<LykenMainImages | null>(null);
  const [lykenCarouselImages, setLykenCarouselImages] = useState<LykenCarouselImages | null>(null);
  const [lykenSubsectionImages, setLykenSubsectionImages] = useState<LykenSubsectionImages | null>(null);
  const [loadingImages, setLoadingImages] = useState(false);

  // Preload initial project images on hover (before click)
  const preloadProjectImages = useCallback(async (projectId: string) => {
    switch (projectId) {
      case 'texels':
        if (!texelsDesignImages) {
          import('./projectImages/texelsDesignImages');
        }
        break;
      case 'cancer-screening':
        if (!cancerInitialImages) {
          import('./projectImages/cancerInitialImages');
        }
        break;
      case 'drug-delivery':
        if (!drugImages) {
          import('./projectImages/drugDeliveryImages');
        }
        break;
      case 'lyken':
        if (!lykenMainImages) {
          import('./projectImages/lykenMainImages');
        }
        break;
    }
  }, [texelsDesignImages, cancerInitialImages, drugImages, lykenMainImages]);

  // Load initial project images when project is clicked
  useEffect(() => {
    const loadProjectImages = async () => {
      if (!activeProject) return;
      
      setLoadingImages(true);
      
      try {
        switch (activeProject) {
          case 'texels':
            if (!texelsDesignImages) {
              const images = await import('./projectImages/texelsDesignImages');
              setTexelsDesignImages(images as TexelsDesignImages);
            }
            break;
          case 'cancer-screening':
            if (!cancerInitialImages) {
              const images = await import('./projectImages/cancerInitialImages');
              setCancerInitialImages(images as CancerInitialImages);
            }
            break;
          case 'drug-delivery':
            if (!drugImages) {
              const images = await import('./projectImages/drugDeliveryImages');
              setDrugImages(images as DrugDeliveryImages);
            }
            break;
          case 'lyken':
            if (!lykenMainImages) {
              const images = await import('./projectImages/lykenMainImages');
              setLykenMainImages(images as LykenMainImages);
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
  }, [activeProject, texelsDesignImages, cancerInitialImages, drugImages, lykenMainImages]);

  // Lazy load subsection images
  const loadTexelsPrototyping = useCallback(async () => {
    if (!texelsPrototypingImages) {
      const images = await import('./projectImages/texelsPrototypingImages');
      setTexelsPrototypingImages(images as TexelsPrototypingImages);
    }
  }, [texelsPrototypingImages]);

  const loadCancerResults = useCallback(async () => {
    if (!cancerResultsImages) {
      const images = await import('./projectImages/cancerResultsImages');
      setCancerResultsImages(images as CancerResultsImages);
    }
  }, [cancerResultsImages]);

  const loadLykenCarousels = useCallback(async () => {
    if (!lykenCarouselImages) {
      const images = await import('./projectImages/lykenCarouselImages');
      setLykenCarouselImages(images as LykenCarouselImages);
    }
  }, [lykenCarouselImages]);

  const loadLykenSubsections = useCallback(async () => {
    if (!lykenSubsectionImages) {
      const images = await import('./projectImages/lykenSubsectionImages');
      setLykenSubsectionImages(images as LykenSubsectionImages);
    }
  }, [lykenSubsectionImages]);

  // Auto-cycle through TEXELS map images
  useEffect(() => {
    if (activeProject === 'texels' && texelsDesignImages) {
      const interval = setInterval(() => {
        setTexelsMapIndex((prev) => (prev + 1) % texelsDesignImages.texelsMapImages.length);
      }, 400);
      return () => clearInterval(interval);
    }
  }, [activeProject, texelsDesignImages]);

  const handleCarouselPrev = () => {
    if (!lykenMainImages) return;
    setCarouselIndex((prev) => (prev - 1 + lykenMainImages.lykenLookImages.length) % lykenMainImages.lykenLookImages.length);
  };

  const handleCarouselNext = () => {
    if (!lykenMainImages) return;
    setCarouselIndex((prev) => (prev + 1) % lykenMainImages.lykenLookImages.length);
  };

  const handleSketchCarouselPrev = () => {
    if (!lykenMainImages) return;
    setSketchCarouselIndex((prev) => (prev - 1 + lykenMainImages.lykenSketchImages.length) % lykenMainImages.lykenSketchImages.length);
  };

  const handleSketchCarouselNext = () => {
    if (!lykenMainImages) return;
    setSketchCarouselIndex((prev) => (prev + 1) % lykenMainImages.lykenSketchImages.length);
  };

  const handleDetailCarouselPrev = () => {
    if (!lykenCarouselImages) return;
    setDetailCarouselIndex((prev) => (prev - 1 + lykenCarouselImages.lykenDetailImages.length) % lykenCarouselImages.lykenDetailImages.length);
  };

  const handleDetailCarouselNext = () => {
    if (!lykenCarouselImages) return;
    setDetailCarouselIndex((prev) => (prev + 1) % lykenCarouselImages.lykenDetailImages.length);
  };

  const handleBodyCarouselPrev = () => {
    if (!lykenCarouselImages) return;
    setBodyCarouselIndex((prev) => (prev - 1 + lykenCarouselImages.lykenBodyImages.length) % lykenCarouselImages.lykenBodyImages.length);
  };

  const handleBodyCarouselNext = () => {
    if (!lykenCarouselImages) return;
    setBodyCarouselIndex((prev) => (prev + 1) % lykenCarouselImages.lykenBodyImages.length);
  };

  const handleHemCarouselPrev = () => {
    if (!lykenCarouselImages) return;
    setHemCarouselIndex((prev) => (prev - 1 + lykenCarouselImages.lykenHemImages.length) % lykenCarouselImages.lykenHemImages.length);
  };

  const handleHemCarouselNext = () => {
    if (!lykenCarouselImages) return;
    setHemCarouselIndex((prev) => (prev + 1) % lykenCarouselImages.lykenHemImages.length);
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
              onMouseEnter={() => {
                setHoveredProject(project.id);
                preloadProjectImages(project.id);
              }}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => handleProjectClick(project.id)}
            >
              {/* Thumbnail with hover fade between primary/secondary, secondary shown when active */}
              <div className="relative w-24 h-16 md:w-32 md:h-20 overflow-hidden">
                {/* Primary image - hidden when active or hovered */}
                <motion.img
                  src={project.thumbnailPrimary}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-contain"
                  animate={{
                    opacity: (hoveredProject === project.id || activeProject === project.id) ? 0 : 1,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
                {/* Secondary image - shown when hovered or active */}
                <motion.img
                  src={project.thumbnailSecondary}
                  alt={`${project.title} active`}
                  className="absolute inset-0 w-full h-full object-contain"
                  animate={{
                    opacity: (hoveredProject === project.id || activeProject === project.id) ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
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
                  {activeProject === 'texels' && texelsDesignImages && !loadingImages && (
                    <>
                      <h3 className="mt-8 font-body text-foreground text-lg md:text-xl text-center w-full">Design</h3>
                      <div className="mt-4 flex gap-4 items-stretch">
                        {/* Left: Cycling map animation */}
                        <div className="w-[35%] relative flex flex-col">
                          <div className="flex-1 flex items-center">
                            <img
                              src={texelsDesignImages.texelsMapImages[texelsMapIndex]}
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
                            <img src={texelsDesignImages.TexelsPaper1} alt="Paper smocking pattern 1" className="w-1/3 object-cover aspect-square" loading="lazy" />
                            <img src={texelsDesignImages.TexelsPaper2} alt="Paper smocking pattern 2" className="w-1/3 object-cover aspect-square" loading="lazy" />
                            <img src={texelsDesignImages.TexelsPaper3} alt="Paper smocking pattern 3" className="w-1/3 object-cover aspect-square" loading="lazy" />
                          </div>
                          {/* Bottom row - 3 fabric images */}
                          <div className="flex gap-2">
                            <img src={texelsDesignImages.TexelsFabric1} alt="Fabric smocking pattern 1" className="w-1/3 object-cover aspect-square" loading="lazy" />
                            <img src={texelsDesignImages.TexelsFabric2} alt="Fabric smocking pattern 2" className="w-1/3 object-cover aspect-square" loading="lazy" />
                            <img src={texelsDesignImages.TexelsFabric3} alt="Fabric smocking pattern 3" className="w-1/3 object-cover aspect-square" loading="lazy" />
                          </div>
                        </div>
                      </div>
                      <p className="mt-4 font-body text-foreground/70 text-sm md:text-base leading-relaxed text-justify">
                        I began with a review of the current state of programmable fabrics and problems hindering their adoption. I chose to focus on user friendliness, reusability, and amount of possible shapes. I explored different forms of shape language for creating 3D shapes out of deformed 2D surfaces, and landed on "Canadian" or "North American" smocking as a format of intuitive patterns with a consistent grid layout and many possible resulting textures.
                      </p>
                      
                      {/* Circuit images section */}
                      <div className="mt-6 flex justify-center">
                        <img src={texelsDesignImages.TexelsCircuit2} alt="Driver and smocking pattern diagram" className="w-2/3 object-contain" loading="lazy" />
                      </div>
                      <p className="mt-4 font-body text-foreground/70 text-sm md:text-base leading-relaxed text-justify">
                        Inspired by individually addressable pixels in an LCD display, I drafted and simulated a circuit on Simulink that could smock together selected points on the grid by passing electricity through a shape memory wire connecting them.
                      </p>
                      <img src={texelsDesignImages.TexelsCircuit1} alt="Electronic circuit diagram of texel array on Simulink" className="mt-4 w-full object-contain" loading="lazy" />
                      
                      {/* Prototyping Section - Lazy loaded */}
                      <LazySectionWrapper onVisible={loadTexelsPrototyping}>
                        {texelsPrototypingImages ? (
                          <>
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
                                  src={texelsPrototypingImages.TexelsPrototyping1} 
                                  alt="Fabric with shape memory wire connections" 
                                  className="w-full object-contain"
                                  loading="lazy"
                                />
                                <p className="font-body text-foreground/70 text-sm leading-relaxed text-justify py-2">
                                  I performed the proper calculations to select components that would bring the theoretical circuit into reality while ensuring compatibility and proper power handling. I am currently assembling these pieces and integrating them into the fabric by hand. I have relied on a mix of traditional electrical engineering, jewelry, and fashion methods to form connections between nontraditional components on a flexible surface.
                                </p>
                              </div>
                            </div>
                            
                            <img 
                              src={texelsPrototypingImages.TexelsPrototyping2} 
                              alt="Annotated diagram of circuit components integrated into fabric" 
                              className="mt-4 w-full object-contain"
                              loading="lazy"
                            />
                            
                            <h3 className="mt-8 font-body text-foreground text-lg md:text-xl text-center w-full">Future Work</h3>
                            <p className="mt-4 font-body text-foreground/70 text-sm md:text-base leading-relaxed text-justify">
                              I am now integrating the software of the device through a microcontroller and several shift registers acting as the row and gate drivers. I will create a simple graphical user interface for people to input the patterns they would like to see the fabric conform to. Then, I will conduct interviews with people in different fields to understand the fabric's potential in varying use cases.
                            </p>
                          </>
                        ) : (
                          <div className="space-y-4 mt-8">
                            <Skeleton className="h-6 w-32 mx-auto" />
                            <Skeleton className="h-48 w-full" />
                          </div>
                        )}
                      </LazySectionWrapper>
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
                        I analyzed the increase in surface area and distance travelled by water drops with imageJ to determine the wicking effects of the pillars. I proposed a design with varying sizes to move and hold mucus in designated areas, as different sizes had different advantages.
                      </p>
                    </>
                  )}
                  
                  {/* Cancer Screening Content */}
                  {activeProjectData.hasSchematic && cancerInitialImages && !loadingImages && (
                    <>
                      <h3 className="mt-8 font-body text-foreground text-lg md:text-xl text-center w-full">Testing Stage</h3>
                      <div className="mt-4 flex items-start gap-2">
                        {/* Schematic Image */}
                        <div className="w-[66%]">
                          <img 
                            src={cancerInitialImages.ExpSchematic} 
                            alt="Experimental schematic showing probe attached to z-axis manipulator, phantom breast with tumor, and force sensor"
                            className="w-full h-auto"
                            loading="lazy"
                          />
                        </div>
                        
                        {/* STL Models Column - Lazy loaded */}
                        <LazySTLModels models={stlModels} />
                      </div>
                      <p className="mt-4 font-body text-foreground/70 text-sm md:text-base leading-relaxed text-justify">
                        The test was performed on a phantom breast with a known tumor inside. I used a z-axis manipulator to control the motion of the probe precisely, and 3D printed attachments that would affix each probe to it. The phantom breast was placed on a laser cut acrylic stage bolted into a 3D printed ball-and-socket joint, which was then screwed into a digital force sensor that was clamped to the table. The ball-and-socket joint allowed the stage to be angled such that the tumor was exactly in line with the axis of motion of the probe. Two screws, when tightened, made the entire stage rigid such that all force from the probe was transferred to the force sensor without dissipating or converting. I verified accuracy with known weights.
                      </p>
                      
                      {/* Data Collection and Results - Lazy loaded */}
                      <LazySectionWrapper onVisible={loadCancerResults}>
                        {cancerResultsImages ? (
                          <>
                            <h3 className="mt-8 font-body text-foreground text-lg md:text-xl text-center w-full">Data Collection</h3>
                            <div className="mt-4 flex items-center justify-center gap-4">
                              <img 
                                src={cancerResultsImages.HandheldProbeAnimated} 
                                alt="Handheld probe data collection animation"
                                className="h-64 w-auto object-contain"
                                loading="lazy"
                              />
                              <img 
                                src={cancerResultsImages.NovelProbeAnimated} 
                                alt="Novel probe data collection animation"
                                className="h-64 w-auto object-contain"
                                loading="lazy"
                              />
                            </div>
                            <p className="mt-4 font-body text-foreground/70 text-sm md:text-base leading-relaxed text-justify">
                              I screen recorded the process of collecting data for each probe. I placed acoustic gel over the tumor, then lowered the probes incrementally from 0 to 11 N of force. To make a fair comparison between the probes, I flattened the 3D data from our novel probe onto a 2D plane.
                            </p>
                            
                            <h3 className="mt-8 font-body text-foreground text-lg md:text-xl text-center w-full">Results</h3>
                            
                            <img 
                              src={cancerResultsImages.DeformationFigure} 
                              alt="Tumor deformation comparison between linear array and wearable 4D system"
                              className="mt-4 w-full max-w-4xl mx-auto h-auto"
                              loading="lazy"
                            />
                            <p className="mt-4 font-body text-foreground/70 text-sm md:text-base leading-relaxed text-justify max-w-4xl mx-auto">
                              To visualize which system was more prone to deforming tumors, I wrote a computer vision program to track the bright regions of the ultrasound images and plot their positions over time.
                            </p>
                            
                            <img 
                              src={cancerResultsImages.PressureFigure} 
                              alt="Image quality over increasing applied pressure comparison"
                              className="mt-6 w-full max-w-4xl mx-auto h-auto"
                              loading="lazy"
                            />
                            <p className="mt-4 font-body text-foreground/70 text-sm md:text-base leading-relaxed text-justify max-w-4xl mx-auto">
                              To assess image quality, I used Contrast-to-Noise Ratio (CNR). This would effectively communicate how distinguishable the tumor is from regular tissue. I modified a CNR calculator by Shrihari Viswanath so that a user could choose between manually selecting target and background regions for each photo or using the same regions for every image in a series. I also made it so that the results would be sent directly to a csv format for easier post-processing. This allowed me to graph quality over applied pressure.
                            </p>
                          </>
                        ) : (
                          <div className="space-y-4 mt-8">
                            <Skeleton className="h-6 w-32 mx-auto" />
                            <Skeleton className="h-64 w-full" />
                          </div>
                        )}
                      </LazySectionWrapper>
                    </>
                  )}
                  
                  {/* Lyken Content */}
                  {activeProject === 'lyken' && lykenMainImages && !loadingImages && (
                    <>
                      <div className="mb-6" />
                      <div className="flex gap-8">
                        {/* Left side - Main Carousels (50% width) */}
                        <div className="w-1/2 flex flex-col gap-4">
                          {/* First Carousel - Looks */}
                          <div className="relative flex items-center justify-center h-[100px]">
                            <div className="absolute left-[5%] z-0 opacity-30 scale-75">
                              <img src={lykenMainImages.lykenLookImages[(carouselIndex - 1 + lykenMainImages.lykenLookImages.length) % lykenMainImages.lykenLookImages.length]} alt="Previous look" className="max-h-[80px] object-contain" loading="lazy" />
                            </div>
                            <button onClick={handleCarouselPrev} className="absolute left-[25%] z-20 p-1 rounded-full border border-foreground/20 hover:bg-foreground/10 transition-colors bg-background/50">
                              <ChevronLeft className="w-3 h-3" />
                            </button>
                            <motion.div key={carouselIndex} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} className="relative z-10">
                              <img src={lykenMainImages.lykenLookImages[carouselIndex]} alt={`Look ${carouselIndex + 1}`} className="max-h-[90px] object-contain" loading="lazy" />
                            </motion.div>
                            <button onClick={handleCarouselNext} className="absolute right-[25%] z-20 p-1 rounded-full border border-foreground/20 hover:bg-foreground/10 transition-colors bg-background/50">
                              <ChevronRight className="w-3 h-3" />
                            </button>
                            <div className="absolute right-[5%] z-0 opacity-30 scale-75">
                              <img src={lykenMainImages.lykenLookImages[(carouselIndex + 1) % lykenMainImages.lykenLookImages.length]} alt="Next look" className="max-h-[80px] object-contain" loading="lazy" />
                            </div>
                          </div>
                          
                          {/* Second Carousel - Sketches */}
                          <div className="relative flex items-center justify-center h-[100px]">
                            <div className="absolute left-[5%] z-0 opacity-30 scale-75">
                              <img src={lykenMainImages.lykenSketchImages[(sketchCarouselIndex - 1 + lykenMainImages.lykenSketchImages.length) % lykenMainImages.lykenSketchImages.length]} alt="Previous sketch" className="max-h-[80px] object-contain" />
                            </div>
                            <button onClick={handleSketchCarouselPrev} className="absolute left-[25%] z-20 p-1 rounded-full border border-foreground/20 hover:bg-foreground/10 transition-colors bg-background/50">
                              <ChevronLeft className="w-3 h-3" />
                            </button>
                            <motion.div key={`sketch-${sketchCarouselIndex}`} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} className="relative z-10">
                              <img src={lykenMainImages.lykenSketchImages[sketchCarouselIndex]} alt={`Sketch ${sketchCarouselIndex + 1}`} className="max-h-[90px] object-contain" />
                            </motion.div>
                            <button onClick={handleSketchCarouselNext} className="absolute right-[25%] z-20 p-1 rounded-full border border-foreground/20 hover:bg-foreground/10 transition-colors bg-background/50">
                              <ChevronRight className="w-3 h-3" />
                            </button>
                            <div className="absolute right-[5%] z-0 opacity-30 scale-75">
                              <img src={lykenMainImages.lykenSketchImages[(sketchCarouselIndex + 1) % lykenMainImages.lykenSketchImages.length]} alt="Next sketch" className="max-h-[80px] object-contain" />
                            </div>
                          </div>
                          
                          {/* Detail/Body/Hem Carousels - Lazy loaded */}
                          <LazySectionWrapper onVisible={loadLykenCarousels}>
                            {lykenCarouselImages ? (
                              <>
                                {/* Third Carousel - Details */}
                                <div className="relative flex items-center justify-center h-[100px]">
                                  <div className="absolute left-[5%] z-0 opacity-30 scale-75">
                                    <img src={lykenCarouselImages.lykenDetailImages[(detailCarouselIndex - 1 + lykenCarouselImages.lykenDetailImages.length) % lykenCarouselImages.lykenDetailImages.length]} alt="Previous detail" className="max-h-[80px] object-contain" />
                                  </div>
                                  <button onClick={handleDetailCarouselPrev} className="absolute left-[25%] z-20 p-1 rounded-full border border-foreground/20 hover:bg-foreground/10 transition-colors bg-background/50">
                                    <ChevronLeft className="w-3 h-3" />
                                  </button>
                                  <motion.div key={`detail-${detailCarouselIndex}`} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} className="relative z-10">
                                    <img src={lykenCarouselImages.lykenDetailImages[detailCarouselIndex]} alt={`Detail ${detailCarouselIndex + 1}`} className="max-h-[90px] object-contain" />
                                  </motion.div>
                                  <button onClick={handleDetailCarouselNext} className="absolute right-[25%] z-20 p-1 rounded-full border border-foreground/20 hover:bg-foreground/10 transition-colors bg-background/50">
                                    <ChevronRight className="w-3 h-3" />
                                  </button>
                                  <div className="absolute right-[5%] z-0 opacity-30 scale-75">
                                    <img src={lykenCarouselImages.lykenDetailImages[(detailCarouselIndex + 1) % lykenCarouselImages.lykenDetailImages.length]} alt="Next detail" className="max-h-[80px] object-contain" />
                                  </div>
                                </div>
                                
                                {/* Fourth Carousel - Body */}
                                <div className="relative flex items-center justify-center h-[100px]">
                                  <div className="absolute left-[5%] z-0 opacity-30 scale-75">
                                    <img src={lykenCarouselImages.lykenBodyImages[(bodyCarouselIndex - 1 + lykenCarouselImages.lykenBodyImages.length) % lykenCarouselImages.lykenBodyImages.length]} alt="Previous body" className="max-h-[80px] object-contain" />
                                  </div>
                                  <button onClick={handleBodyCarouselPrev} className="absolute left-[25%] z-20 p-1 rounded-full border border-foreground/20 hover:bg-foreground/10 transition-colors bg-background/50">
                                    <ChevronLeft className="w-3 h-3" />
                                  </button>
                                  <motion.div key={`body-${bodyCarouselIndex}`} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} className="relative z-10">
                                    <img src={lykenCarouselImages.lykenBodyImages[bodyCarouselIndex]} alt={`Body ${bodyCarouselIndex + 1}`} className="max-h-[90px] object-contain" />
                                  </motion.div>
                                  <button onClick={handleBodyCarouselNext} className="absolute right-[25%] z-20 p-1 rounded-full border border-foreground/20 hover:bg-foreground/10 transition-colors bg-background/50">
                                    <ChevronRight className="w-3 h-3" />
                                  </button>
                                  <div className="absolute right-[5%] z-0 opacity-30 scale-75">
                                    <img src={lykenCarouselImages.lykenBodyImages[(bodyCarouselIndex + 1) % lykenCarouselImages.lykenBodyImages.length]} alt="Next body" className="max-h-[80px] object-contain" />
                                  </div>
                                </div>
                                
                                {/* Fifth Carousel - Hem */}
                                <div className="relative flex items-center justify-center h-[100px]">
                                  <div className="absolute left-[5%] z-0 opacity-30 scale-75">
                                    <img src={lykenCarouselImages.lykenHemImages[(hemCarouselIndex - 1 + lykenCarouselImages.lykenHemImages.length) % lykenCarouselImages.lykenHemImages.length]} alt="Previous hem" className="max-h-[80px] object-contain" />
                                  </div>
                                  <button onClick={handleHemCarouselPrev} className="absolute left-[25%] z-20 p-1 rounded-full border border-foreground/20 hover:bg-foreground/10 transition-colors bg-background/50">
                                    <ChevronLeft className="w-3 h-3" />
                                  </button>
                                  <motion.div key={`hem-${hemCarouselIndex}`} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} className="relative z-10">
                                    <img src={lykenCarouselImages.lykenHemImages[hemCarouselIndex]} alt={`Hem ${hemCarouselIndex + 1}`} className="max-h-[90px] object-contain" />
                                  </motion.div>
                                  <button onClick={handleHemCarouselNext} className="absolute right-[25%] z-20 p-1 rounded-full border border-foreground/20 hover:bg-foreground/10 transition-colors bg-background/50">
                                    <ChevronRight className="w-3 h-3" />
                                  </button>
                                  <div className="absolute right-[5%] z-0 opacity-30 scale-75">
                                    <img src={lykenCarouselImages.lykenHemImages[(hemCarouselIndex + 1) % lykenCarouselImages.lykenHemImages.length]} alt="Next hem" className="max-h-[80px] object-contain" />
                                  </div>
                                </div>
                              </>
                            ) : (
                              <div className="space-y-4">
                                <Skeleton className="h-[100px] w-full" />
                                <Skeleton className="h-[100px] w-full" />
                                <Skeleton className="h-[100px] w-full" />
                              </div>
                            )}
                          </LazySectionWrapper>
                        </div>
                        
                        {/* Right side - Paragraph + Still Image (50% width) */}
                        <div className="w-1/2 flex flex-col gap-4">
                          <p className="font-body text-foreground/70 text-sm md:text-base leading-relaxed text-justify">
                            Aside from the material challenge, I worked with a narrative concept for this piece. I wanted to explore flowers not just as my main physical medium but as cultural symbols for love and commitment. When sketching designs, I focused on fashion elements that similarly evoked ceremonies of love, vulnerability, entanglement, and restriction.
                          </p>
                          <img src={lykenMainImages.LykenFullSketch1} alt="Full sketch design 1" className="w-full object-contain" />
                        </div>
                      </div>
                      
                      {/* Subsections - Lazy loaded */}
                      <LazySectionWrapper onVisible={loadLykenSubsections}>
                        {lykenSubsectionImages ? (
                          <>
                            {/* Petal Jewelry Section */}
                            <h3 className="mt-8 font-body text-foreground text-lg md:text-xl text-center w-full">Petal Jewelry</h3>
                            <div className="mt-4 flex gap-4 justify-center">
                              <img src={lykenSubsectionImages.PetalJewelry1} alt="Fallen flower petals collection" className="max-h-[200px] object-contain" />
                              <img src={lykenSubsectionImages.PetalJewelry2} alt="Clay made from flower petals - hibiscus, yucca, king's mantle" className="max-h-[200px] object-contain" />
                              <img src={lykenSubsectionImages.PetalJewelry3} alt="Finished petal clay beads" className="max-h-[200px] object-contain" />
                            </div>
                            <p className="mt-4 font-body text-foreground/70 text-sm md:text-base leading-relaxed text-justify">
                              I used fallen petals of native flowers to create clay beads. I kept traditions of associating flowers to distinct meanings by making separate clays for each type of flower. I spelled messages with the flower beads based on the first letter of their names to replicate the old romantic gesture of acrostic jewelry.
                            </p>
                            
                            {/* Vegan Leather Section */}
                            <h3 className="mt-8 font-body text-foreground text-lg md:text-xl text-center w-full">Vegan Leather with Petals</h3>
                            <div className="mt-4 flex gap-4 justify-center">
                              <img src={lykenSubsectionImages.VeganLeather1} alt="Hibiscus petals for vegan leather" className="max-h-[200px] object-contain" />
                              <img src={lykenSubsectionImages.VeganLeather2} alt="Petals encapsulated in kombucha leather" className="max-h-[200px] object-contain" />
                              <img src={lykenSubsectionImages.VeganLeather3} alt="Finished vegan leather arm bands" className="max-h-[200px] object-contain" />
                            </div>
                            <p className="mt-4 font-body text-foreground/70 text-sm md:text-base leading-relaxed text-justify">
                              I experimented with ways to effectively encapsulate flower petals between layers of natural kombucha leather to create arm bands.
                            </p>
                            
                            {/* Root as Textile Section */}
                            <h3 className="mt-8 font-body text-foreground text-lg md:text-xl text-center w-full">Root as Textile</h3>
                            <div className="mt-4 flex gap-4 justify-center">
                              <img src={lykenSubsectionImages.RootTextile1} alt="Root mat growing process" className="max-h-[200px] object-contain" />
                              <img src={lykenSubsectionImages.RootTextile2} alt="Root textile on dress form" className="max-h-[200px] object-contain" />
                              <img src={lykenSubsectionImages.RootTextile3} alt="Needle lace with roots" className="max-h-[200px] object-contain" />
                              <img src={lykenSubsectionImages.RootTextile4} alt="Attaching root textile to form" className="max-h-[200px] object-contain" />
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
                                <img src={lykenSubsectionImages.LykenResult} alt="Final LYKEN look on model" className="max-h-[400px] object-contain" />
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="space-y-4 mt-8">
                            <Skeleton className="h-6 w-32 mx-auto" />
                            <Skeleton className="h-48 w-full" />
                          </div>
                        )}
                      </LazySectionWrapper>
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
