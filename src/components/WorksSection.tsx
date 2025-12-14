import { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import STLModel from './STLModel';
import ExpSchematic from '@/assets/ExpSchematic.png';
import HandheldProbeAnimated from '@/assets/HandheldProbeAnimated.gif';
import NovelProbeAnimated from '@/assets/NovelProbeAnimated.gif';
import DeformationFigure from '@/assets/DeformationFigure.png';
import PressureFigure from '@/assets/PressureFigure.png';
import PhantomModels from '@/assets/PhantomModels.png';
import PhantomMoldsAndMaterials from '@/assets/PhantomMoldsAndMaterials.png';
import ContactAngleAnalysis from '@/assets/ContactAngleAnalysis.png';
import ContactAngleResults from '@/assets/ContactAngleResults.png';
import PillarMold from '@/assets/PillarMold.png';
import PillarWicking from '@/assets/PillarWicking.png';
import LykenLook1 from '@/assets/LykenLook1.png';
import LykenLook2 from '@/assets/LykenLook2.png';
import LykenLook3 from '@/assets/LykenLook3.png';
import LykenSketch1 from '@/assets/LykenSketch1.png';
import LykenSketch2 from '@/assets/LykenSketch2.png';
import LykenSketch3 from '@/assets/LykenSketch3.png';
import LykenSketch4 from '@/assets/LykenSketch4.png';
import LykenSketch5 from '@/assets/LykenSketch5.png';
import LykenSketch6 from '@/assets/LykenSketch6.png';
import LykenSketch7 from '@/assets/LykenSketch7.png';
import LykenFullSketch1 from '@/assets/LykenFullSketch1.png';
import LykenFullSketch2 from '@/assets/LykenFullSketch2.png';
import LykenDetail1 from '@/assets/LykenDetail1.png';
import LykenDetail2 from '@/assets/LykenDetail2.png';
import LykenDetail3 from '@/assets/LykenDetail3.png';
import LykenDetail4 from '@/assets/LykenDetail4.png';
import LykenBody1 from '@/assets/LykenBody1.png';
import LykenBody2 from '@/assets/LykenBody2.png';
import LykenBody3 from '@/assets/LykenBody3.png';
import LykenHem1 from '@/assets/LykenHem1.png';
import LykenHem2 from '@/assets/LykenHem2.png';
import PetalJewelry1 from '@/assets/PetalJewelry1.png';
import PetalJewelry2 from '@/assets/PetalJewelry2.png';
import PetalJewelry3 from '@/assets/PetalJewelry3.png';
import VeganLeather1 from '@/assets/VeganLeather1.png';
import VeganLeather2 from '@/assets/VeganLeather2.png';
import VeganLeather3 from '@/assets/VeganLeather3.png';
import RootTextile1 from '@/assets/RootTextile1.png';
import RootTextile2 from '@/assets/RootTextile2.png';
import RootTextile3 from '@/assets/RootTextile3.png';
import RootTextile4 from '@/assets/RootTextile4.png';
import LykenResult from '@/assets/LykenResult.png';
import TexelsMap1 from '@/assets/TexelsMap1.png';
import TexelsMap2 from '@/assets/TexelsMap2.png';
import TexelsMap3 from '@/assets/TexelsMap3.png';
import TexelsMap4 from '@/assets/TexelsMap4.png';
import TexelsPaper1 from '@/assets/TexelsPaper1.png';
import TexelsPaper2 from '@/assets/TexelsPaper2.png';
import TexelsPaper3 from '@/assets/TexelsPaper3.png';
import TexelsFabric1 from '@/assets/TexelsFabric1.png';
import TexelsFabric2 from '@/assets/TexelsFabric2.png';
import TexelsFabric3 from '@/assets/TexelsFabric3.png';
import TexelsCircuit1 from '@/assets/TexelsCircuit1.png';
import TexelsCircuit2 from '@/assets/TexelsCircuit2.png';

const texelsMapImages = [TexelsMap1, TexelsMap2, TexelsMap3, TexelsMap4];

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
    thumbnail: '/placeholder.svg',
    displayTitle: 'Can I design a textile that replicates any texture you give it?',
    subtitle: 'For my honors undergraduate thesis, I am prototyping a fabric that can smock itself into a variety of programmable texture patterns.',
    hasSchematic: false
  },
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
  { 
    id: 'lyken', 
    title: 'LYKEN', 
    thumbnail: '/placeholder.svg',
    displayTitle: 'What could circular fashion look like in Orlando?',
    subtitle: 'I set out to create one full look using only home grown and native biomaterials or recycled fibers.',
    hasSchematic: false
  },
];

const lykenImages = [LykenLook1, LykenLook2, LykenLook3];
const lykenSketchImages = [LykenSketch1, LykenSketch2, LykenSketch3, LykenSketch4, LykenSketch5, LykenSketch6, LykenSketch7];
const lykenDetailImages = [LykenDetail1, LykenDetail2, LykenDetail3, LykenDetail4];
const lykenBodyImages = [LykenBody1, LykenBody2, LykenBody3];
const lykenHemImages = [LykenHem1, LykenHem2];

const stlModels = [
  { url: '/models/Probe_Head_Attachment.stl', label: 'Novel Probe Attachment' },
  { url: '/models/Handheld_Probe_Attachment_v3.stl', label: 'Traditional Probe Attachment' },
  { url: '/models/Tilt_Mechanism.stl', label: 'Stage Tilt Mechanism' },
];

const WorksSection = () => {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [sketchCarouselIndex, setSketchCarouselIndex] = useState(0);
  const [detailCarouselIndex, setDetailCarouselIndex] = useState(0);
  const [bodyCarouselIndex, setBodyCarouselIndex] = useState(0);
  const [hemCarouselIndex, setHemCarouselIndex] = useState(0);
  const [texelsMapIndex, setTexelsMapIndex] = useState(0);

  // Auto-cycle through TEXELS map images
  useEffect(() => {
    if (activeProject === 'texels') {
      const interval = setInterval(() => {
        setTexelsMapIndex((prev) => (prev + 1) % texelsMapImages.length);
      }, 400);
      return () => clearInterval(interval);
    }
  }, [activeProject]);

  const handleCarouselPrev = () => {
    setCarouselIndex((prev) => (prev - 1 + lykenImages.length) % lykenImages.length);
  };

  const handleCarouselNext = () => {
    setCarouselIndex((prev) => (prev + 1) % lykenImages.length);
  };

  const handleSketchCarouselPrev = () => {
    setSketchCarouselIndex((prev) => (prev - 1 + lykenSketchImages.length) % lykenSketchImages.length);
  };

  const handleSketchCarouselNext = () => {
    setSketchCarouselIndex((prev) => (prev + 1) % lykenSketchImages.length);
  };

  const handleDetailCarouselPrev = () => {
    setDetailCarouselIndex((prev) => (prev - 1 + lykenDetailImages.length) % lykenDetailImages.length);
  };

  const handleDetailCarouselNext = () => {
    setDetailCarouselIndex((prev) => (prev + 1) % lykenDetailImages.length);
  };

  const handleBodyCarouselPrev = () => {
    setBodyCarouselIndex((prev) => (prev - 1 + lykenBodyImages.length) % lykenBodyImages.length);
  };

  const handleBodyCarouselNext = () => {
    setBodyCarouselIndex((prev) => (prev + 1) % lykenBodyImages.length);
  };

  const handleHemCarouselPrev = () => {
    setHemCarouselIndex((prev) => (prev - 1 + lykenHemImages.length) % lykenHemImages.length);
  };

  const handleHemCarouselNext = () => {
    setHemCarouselIndex((prev) => (prev + 1) % lykenHemImages.length);
  };

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
                  
                  {/* TEXELS Design Content */}
                  {activeProject === 'texels' && (
                    <>
                      <h3 className="mt-8 font-body text-foreground text-lg md:text-xl text-center w-full">Design</h3>
                      <div className="mt-4 flex gap-4 items-stretch">
                        {/* Left: Cycling map animation */}
                        <div className="w-[35%] relative flex flex-col">
                          <div className="flex-1 flex items-center">
                            <img
                              src={texelsMapImages[texelsMapIndex]}
                              alt={`Programmable textiles mind map stage ${texelsMapIndex + 1}`}
                              className="w-full h-full object-contain"
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
                            <img src={TexelsPaper1} alt="Paper smocking pattern 1" className="w-1/3 object-cover aspect-square" />
                            <img src={TexelsPaper2} alt="Paper smocking pattern 2" className="w-1/3 object-cover aspect-square" />
                            <img src={TexelsPaper3} alt="Paper smocking pattern 3" className="w-1/3 object-cover aspect-square" />
                          </div>
                          {/* Bottom row - 3 fabric images */}
                          <div className="flex gap-2">
                            <img src={TexelsFabric1} alt="Fabric smocking pattern 1" className="w-1/3 object-cover aspect-square" />
                            <img src={TexelsFabric2} alt="Fabric smocking pattern 2" className="w-1/3 object-cover aspect-square" />
                            <img src={TexelsFabric3} alt="Fabric smocking pattern 3" className="w-1/3 object-cover aspect-square" />
                          </div>
                        </div>
                      </div>
                      <p className="mt-4 font-body text-foreground/70 text-sm md:text-base leading-relaxed text-justify">
                        I began with a review of the current state of programmable fabrics and problems hindering their adoption. I chose to focus on user friendliness, reusability, and amount of possible shapes, which was very low on average. I explored different forms of shape language for creating 3D shapes out of deformed 2D surfaces, and landed on "Canadian" or "North American" smocking as a format of intuitive patterns with a consistent grid layout and many possible resulting textures.
                      </p>
                      
                      {/* Circuit images section */}
                      <img src={TexelsCircuit1} alt="Electronic circuit diagram of texel array on Simulink" className="mt-6 w-full object-contain" />
                      <div className="mt-4 flex gap-4 items-center">
                        <img src={TexelsCircuit2} alt="Driver and smocking pattern diagram" className="w-1/3 object-contain" />
                        <p className="w-2/3 font-body text-foreground/70 text-sm md:text-base leading-relaxed text-justify">
                          Inspired by individually addressable pixels in an LCD display, I drafted and simulated a circuit on Simulink that could activate selected points on the grid to smock together by passing electricity through a thin shape memory wire connecting them.
                        </p>
                      </div>
                    </>
                  )}
                  
                  {/* Drug Delivery Content */}
                  {activeProject === 'drug-delivery' && (
                    <>
                      <h3 className="mt-8 font-body text-foreground text-lg md:text-xl text-center w-full">Phantom Environment</h3>
                      <div className="mt-4 flex flex-col gap-4 items-center">
                        <img 
                          src={PhantomModels} 
                          alt="Phantom environment 3D models" 
                          className="w-full object-contain"
                        />
                        <img 
                          src={PhantomMoldsAndMaterials} 
                          alt="Phantom molds and materials" 
                          className="w-full object-contain"
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
                          src={ContactAngleAnalysis} 
                          alt="Contact angle analysis in ImageJ" 
                          className="max-h-[200px] object-contain"
                        />
                        <img 
                          src={ContactAngleResults} 
                          alt="Contact angle results comparing coated and uncoated surfaces" 
                          className="max-h-[200px] object-contain"
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
                          src={PillarMold} 
                          alt="Varied pillar mold design" 
                          className="max-h-[200px] object-contain"
                        />
                        <img 
                          src={PillarWicking} 
                          alt="Pillar wicking test results" 
                          className="max-h-[200px] object-contain"
                        />
                      </div>
                      <p className="mt-4 font-body text-foreground/70 text-sm md:text-base leading-relaxed text-justify">
                        I analyzed the distance covered and change in surface area of water drops with imageJ to determine the wicking effects of the pillars. I proposed a design with varying sizes to move and hold mucus in designated areas, as different sizes had different advantages.
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
                  
                  {/* Lyken Content */}
                  {activeProject === 'lyken' && (
                    <>
                      <div className="mb-6" />
                      <div className="flex gap-8">
                        {/* Left side - All Carousels (50% width) */}
                        <div className="w-1/2 flex flex-col gap-4">
                          {/* First Carousel - Looks */}
                          <div className="relative flex items-center justify-center h-[100px]">
                            <div className="absolute left-[5%] z-0 opacity-30 scale-75">
                              <img src={lykenImages[(carouselIndex - 1 + lykenImages.length) % lykenImages.length]} alt="Previous look" className="max-h-[80px] object-contain" />
                            </div>
                            <button onClick={handleCarouselPrev} className="absolute left-[25%] z-20 p-1 rounded-full border border-foreground/20 hover:bg-foreground/10 transition-colors bg-background/50">
                              <ChevronLeft className="w-3 h-3" />
                            </button>
                            <motion.div key={carouselIndex} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} className="relative z-10">
                              <img src={lykenImages[carouselIndex]} alt={`Look ${carouselIndex + 1}`} className="max-h-[90px] object-contain" />
                            </motion.div>
                            <button onClick={handleCarouselNext} className="absolute right-[25%] z-20 p-1 rounded-full border border-foreground/20 hover:bg-foreground/10 transition-colors bg-background/50">
                              <ChevronRight className="w-3 h-3" />
                            </button>
                            <div className="absolute right-[5%] z-0 opacity-30 scale-75">
                              <img src={lykenImages[(carouselIndex + 1) % lykenImages.length]} alt="Next look" className="max-h-[80px] object-contain" />
                            </div>
                          </div>
                          
                          {/* Second Carousel - Sketches */}
                          <div className="relative flex items-center justify-center h-[100px]">
                            <div className="absolute left-[5%] z-0 opacity-30 scale-75">
                              <img src={lykenSketchImages[(sketchCarouselIndex - 1 + lykenSketchImages.length) % lykenSketchImages.length]} alt="Previous sketch" className="max-h-[80px] object-contain" />
                            </div>
                            <button onClick={handleSketchCarouselPrev} className="absolute left-[25%] z-20 p-1 rounded-full border border-foreground/20 hover:bg-foreground/10 transition-colors bg-background/50">
                              <ChevronLeft className="w-3 h-3" />
                            </button>
                            <motion.div key={`sketch-${sketchCarouselIndex}`} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} className="relative z-10">
                              <img src={lykenSketchImages[sketchCarouselIndex]} alt={`Sketch ${sketchCarouselIndex + 1}`} className="max-h-[90px] object-contain" />
                            </motion.div>
                            <button onClick={handleSketchCarouselNext} className="absolute right-[25%] z-20 p-1 rounded-full border border-foreground/20 hover:bg-foreground/10 transition-colors bg-background/50">
                              <ChevronRight className="w-3 h-3" />
                            </button>
                            <div className="absolute right-[5%] z-0 opacity-30 scale-75">
                              <img src={lykenSketchImages[(sketchCarouselIndex + 1) % lykenSketchImages.length]} alt="Next sketch" className="max-h-[80px] object-contain" />
                            </div>
                          </div>
                          
                          {/* Third Carousel - Details */}
                          <div className="relative flex items-center justify-center h-[100px]">
                            <div className="absolute left-[5%] z-0 opacity-30 scale-75">
                              <img src={lykenDetailImages[(detailCarouselIndex - 1 + lykenDetailImages.length) % lykenDetailImages.length]} alt="Previous detail" className="max-h-[80px] object-contain" />
                            </div>
                            <button onClick={handleDetailCarouselPrev} className="absolute left-[25%] z-20 p-1 rounded-full border border-foreground/20 hover:bg-foreground/10 transition-colors bg-background/50">
                              <ChevronLeft className="w-3 h-3" />
                            </button>
                            <motion.div key={`detail-${detailCarouselIndex}`} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} className="relative z-10">
                              <img src={lykenDetailImages[detailCarouselIndex]} alt={`Detail ${detailCarouselIndex + 1}`} className="max-h-[90px] object-contain" />
                            </motion.div>
                            <button onClick={handleDetailCarouselNext} className="absolute right-[25%] z-20 p-1 rounded-full border border-foreground/20 hover:bg-foreground/10 transition-colors bg-background/50">
                              <ChevronRight className="w-3 h-3" />
                            </button>
                            <div className="absolute right-[5%] z-0 opacity-30 scale-75">
                              <img src={lykenDetailImages[(detailCarouselIndex + 1) % lykenDetailImages.length]} alt="Next detail" className="max-h-[80px] object-contain" />
                            </div>
                          </div>
                          
                          {/* Fourth Carousel - Body */}
                          <div className="relative flex items-center justify-center h-[100px]">
                            <div className="absolute left-[5%] z-0 opacity-30 scale-75">
                              <img src={lykenBodyImages[(bodyCarouselIndex - 1 + lykenBodyImages.length) % lykenBodyImages.length]} alt="Previous body" className="max-h-[80px] object-contain" />
                            </div>
                            <button onClick={handleBodyCarouselPrev} className="absolute left-[25%] z-20 p-1 rounded-full border border-foreground/20 hover:bg-foreground/10 transition-colors bg-background/50">
                              <ChevronLeft className="w-3 h-3" />
                            </button>
                            <motion.div key={`body-${bodyCarouselIndex}`} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} className="relative z-10">
                              <img src={lykenBodyImages[bodyCarouselIndex]} alt={`Body ${bodyCarouselIndex + 1}`} className="max-h-[90px] object-contain" />
                            </motion.div>
                            <button onClick={handleBodyCarouselNext} className="absolute right-[25%] z-20 p-1 rounded-full border border-foreground/20 hover:bg-foreground/10 transition-colors bg-background/50">
                              <ChevronRight className="w-3 h-3" />
                            </button>
                            <div className="absolute right-[5%] z-0 opacity-30 scale-75">
                              <img src={lykenBodyImages[(bodyCarouselIndex + 1) % lykenBodyImages.length]} alt="Next body" className="max-h-[80px] object-contain" />
                            </div>
                          </div>
                          
                          {/* Fifth Carousel - Hem */}
                          <div className="relative flex items-center justify-center h-[100px]">
                            <div className="absolute left-[5%] z-0 opacity-30 scale-75">
                              <img src={lykenHemImages[(hemCarouselIndex - 1 + lykenHemImages.length) % lykenHemImages.length]} alt="Previous hem" className="max-h-[80px] object-contain" />
                            </div>
                            <button onClick={handleHemCarouselPrev} className="absolute left-[25%] z-20 p-1 rounded-full border border-foreground/20 hover:bg-foreground/10 transition-colors bg-background/50">
                              <ChevronLeft className="w-3 h-3" />
                            </button>
                            <motion.div key={`hem-${hemCarouselIndex}`} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} className="relative z-10">
                              <img src={lykenHemImages[hemCarouselIndex]} alt={`Hem ${hemCarouselIndex + 1}`} className="max-h-[90px] object-contain" />
                            </motion.div>
                            <button onClick={handleHemCarouselNext} className="absolute right-[25%] z-20 p-1 rounded-full border border-foreground/20 hover:bg-foreground/10 transition-colors bg-background/50">
                              <ChevronRight className="w-3 h-3" />
                            </button>
                            <div className="absolute right-[5%] z-0 opacity-30 scale-75">
                              <img src={lykenHemImages[(hemCarouselIndex + 1) % lykenHemImages.length]} alt="Next hem" className="max-h-[80px] object-contain" />
                            </div>
                          </div>
                        </div>
                        
                        {/* Right side - Paragraph + Still Image (50% width) */}
                        <div className="w-1/2 flex flex-col gap-4">
                          <p className="font-body text-foreground/70 text-sm md:text-base leading-relaxed text-justify">
                            Aside from the material challenge, I worked with a narrative concept for this piece. I wanted to explore flowers not just as my main physical medium but as cultural symbols for love and commitment. When sketching designs, I focused on cultural signifiers that similarly evoked ceremonies of love, vulnerability, entanglement, and restriction.
                          </p>
                          <img src={LykenFullSketch1} alt="Full sketch design 1" className="w-full object-contain" />
                        </div>
                      </div>
                      
                      {/* Petal Jewelry Section */}
                      <h3 className="mt-8 font-body text-foreground text-lg md:text-xl text-center w-full">Petal Jewelry</h3>
                      <div className="mt-4 flex gap-4 justify-center">
                        <img src={PetalJewelry1} alt="Fallen flower petals collection" className="max-h-[200px] object-contain" />
                        <img src={PetalJewelry2} alt="Clay made from flower petals - hibiscus, yucca, king's mantle" className="max-h-[200px] object-contain" />
                        <img src={PetalJewelry3} alt="Finished petal clay beads" className="max-h-[200px] object-contain" />
                      </div>
                      <p className="mt-4 font-body text-foreground/70 text-sm md:text-base leading-relaxed text-justify">
                        I used fallen petals of native flowers to create clay beads. I mimicked traditions of associating flowers to distinct meanings by making separate clays for each type of flower. I spelled messages with the flower beads based on the first letter of their names to replicate the old romantic gesture of acrostic jewelry.
                      </p>
                      
                      {/* Vegan Leather Section */}
                      <h3 className="mt-8 font-body text-foreground text-lg md:text-xl text-center w-full">Vegan Leather with Petals</h3>
                      <div className="mt-4 flex gap-4 justify-center">
                        <img src={VeganLeather1} alt="Hibiscus petals for vegan leather" className="max-h-[200px] object-contain" />
                        <img src={VeganLeather2} alt="Petals encapsulated in kombucha leather" className="max-h-[200px] object-contain" />
                        <img src={VeganLeather3} alt="Finished vegan leather arm bands" className="max-h-[200px] object-contain" />
                      </div>
                      <p className="mt-4 font-body text-foreground/70 text-sm md:text-base leading-relaxed text-justify">
                        I experimented with ways to effectively encapsulate flower petals between layers of natural kombucha leather to create arm bands.
                      </p>
                      
                      {/* Root as Textile Section */}
                      <h3 className="mt-8 font-body text-foreground text-lg md:text-xl text-center w-full">Root as Textile</h3>
                      <div className="mt-4 flex gap-4 justify-center">
                        <img src={RootTextile1} alt="Root mat growing process" className="max-h-[200px] object-contain" />
                        <img src={RootTextile2} alt="Root textile on dress form" className="max-h-[200px] object-contain" />
                        <img src={RootTextile3} alt="Needle lace with roots" className="max-h-[200px] object-contain" />
                        <img src={RootTextile4} alt="Attaching root textile to form" className="max-h-[200px] object-contain" />
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
                          <img src={LykenResult} alt="Final LYKEN look on model" className="max-h-[400px] object-contain" />
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
