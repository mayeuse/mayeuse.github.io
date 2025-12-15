import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Maximize2, X } from 'lucide-react';

import Presentation2 from '@/assets/Presentation2.jpg';
import Presentation4 from '@/assets/Presentation4.jpg';
import Presentation5 from '@/assets/Presentation5.png';
import Presentation6 from '@/assets/Presentation6.jpg';
import Presentation7 from '@/assets/Presentation7.jpg';
import Presentation9 from '@/assets/Presentation9.jpg';

const presentations = [
  "2026 Florida Undergraduate Research Association Posters at the Capitol",
  "2025 MIT Summer Research Program (MSRP)",
  "2025 MSRP Student Reflection Speech",
  "2025 MSRP Media Lab Intern Showcase",
  "2025 UCF Student Scholar Symposium",
  "2025 UCF Impact of Research Competition",
  "2024 MIT Summer Research Program (MSRP)",
  "2024 MSRP Highlight Reel",
  "2024 MSRP Media Lab Intern Showcase",
];

type MediaItem = {
  type: 'pdf' | 'image' | 'youtube' | 'image-with-link';
  src?: string;
  link?: string;
  youtubeStart?: number;
  expandable?: boolean;
};

const mediaItems: MediaItem[] = [
  { type: 'pdf', src: '/documents/CapitolPosterDraft.pdf', expandable: true },
  { type: 'image', src: Presentation2, expandable: true },
  { type: 'youtube', src: 'https://www.youtube.com/embed/wxdZTukw9nE' },
  { type: 'image-with-link', src: Presentation4, link: 'https://docs.google.com/presentation/d/1uR8SfBKQFP-NcyxxOh3tvAU7mf4jk1c21WHq2RfcCt4/edit?usp=sharing' },
  { type: 'image', src: Presentation5 },
  { type: 'image', src: Presentation6 },
  { type: 'image', src: Presentation7, expandable: true },
  { type: 'youtube', src: 'https://www.youtube.com/embed/sb_m4tytao4', youtubeStart: 88 },
  { type: 'image-with-link', src: Presentation9, link: 'https://docs.google.com/presentation/d/1JAoad6QpkUi0HViixAxjg4qaAHSexjncuW9crRLL4Jg/edit?usp=sharing' },
];

const formatPresentation = (text: string) => {
  return text
    .toLowerCase()
    .replace(/\bmit\b/gi, 'MIT')
    .replace(/\bucf\b/gi, 'UCF')
    .replace(/\bmsrp\b/gi, 'MSRP');
};

const PresentationsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const autoRotateRef = useRef<NodeJS.Timeout | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Auto-rotate carousel
  useEffect(() => {
    if (!isHovered && !isVideoPlaying && !isDragging) {
      autoRotateRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % mediaItems.length);
      }, 3000);
    }

    return () => {
      if (autoRotateRef.current) {
        clearInterval(autoRotateRef.current);
      }
    };
  }, [isHovered, isVideoPlaying, isDragging]);

  // Listen for YouTube iframe messages
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin === 'https://www.youtube.com') {
        try {
          const data = JSON.parse(event.data);
          if (data.event === 'onStateChange') {
            // 1 = playing, 2 = paused, 0 = ended
            setIsVideoPlaying(data.info === 1);
          }
        } catch {
          // Not a JSON message
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Lock carousel position when video is playing
  const lockedIndex = useRef<number | null>(null);
  
  useEffect(() => {
    if (isVideoPlaying) {
      lockedIndex.current = activeIndex;
    } else {
      lockedIndex.current = null;
    }
  }, [isVideoPlaying, activeIndex]);

  const handlePresentationClick = (index: number) => {
    // Don't allow navigation while video is playing
    if (isVideoPlaying) return;
    
    setActiveIndex(index);
    if (autoRotateRef.current) {
      clearInterval(autoRotateRef.current);
    }
  };

  const handleExpand = useCallback((index: number) => {
    setExpandedItem(index);
  }, []);

  const updateIndexFromPosition = (clientX: number) => {
    // Don't allow navigation while video is playing
    if (isVideoPlaying) return;
    
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = x / rect.width;
    const newIndex = Math.round(percentage * (mediaItems.length - 1));
    setActiveIndex(Math.max(0, Math.min(mediaItems.length - 1, newIndex)));
  };

  const handleSliderClick = (e: React.MouseEvent<HTMLDivElement>) => {
    updateIndexFromPosition(e.clientX);
  };

  const handleSliderMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    updateIndexFromPosition(e.clientX);
  };

  const handleSliderMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updateIndexFromPosition(e.clientX);
  };

  const handleSliderMouseUp = () => {
    setIsDragging(false);
  };

  const renderMediaItem = (item: MediaItem, index: number, isExpanded = false) => {
    const containerClass = isExpanded 
      ? "w-full h-full flex items-center justify-center" 
      : "flex flex-col items-center gap-2 h-full";

    switch (item.type) {
      case 'pdf':
        return (
          <div className={containerClass}>
            <iframe
              src={`${item.src}#toolbar=0&navpanes=0&view=FitH`}
              className={isExpanded ? "w-[80vw] h-[85vh] rounded-lg" : "w-full h-full rounded-lg"}
              title={`Presentation ${index + 1}`}
            />
            {!isExpanded && item.expandable && (
              <button
                onClick={(e) => { e.stopPropagation(); handleExpand(index); }}
                className="flex items-center gap-1 text-sm font-nav text-foreground hover:text-primary transition-colors mt-2"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            )}
          </div>
        );
      case 'image':
        return (
          <div className={containerClass}>
            <img
              src={item.src}
              alt={`Presentation ${index + 1}`}
              className={isExpanded 
                ? "max-h-[85vh] max-w-[80vw] object-contain rounded-lg" 
                : `${item.expandable ? 'max-h-[85%]' : 'max-h-full'} max-w-full object-contain rounded-lg`}
              loading="lazy"
            />
            {!isExpanded && item.expandable && (
              <button
                onClick={(e) => { e.stopPropagation(); handleExpand(index); }}
                className="flex items-center gap-1 text-sm font-nav text-foreground hover:text-primary transition-colors"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            )}
          </div>
        );
      case 'image-with-link':
        return (
          <div className="flex flex-col items-center gap-2 h-full">
            <img
              src={item.src}
              alt={`Presentation ${index + 1}`}
              className="max-h-[85%] max-w-full object-contain rounded-lg"
              loading="lazy"
            />
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm font-nav text-foreground hover:text-primary hover:underline transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              view slides
            </a>
          </div>
        );
      case 'youtube':
        const startParam = item.youtubeStart ? `start=${item.youtubeStart}&` : '';
        return (
          <iframe
            src={`${item.src}?${startParam}enablejsapi=1&origin=${window.location.origin}`}
            className="w-full h-full rounded-lg"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="YouTube Video"
            onPlay={() => setIsVideoPlaying(true)}
            onPause={() => setIsVideoPlaying(false)}
          />
        );
      default:
        return null;
    }
  };

  const getItemStyle = (index: number) => {
    const diff = index - activeIndex;
    
    if (diff === 0) {
      return {
        x: 0,
        scale: 1,
        z: 10,
        opacity: 1,
      };
    } else if (diff === 1 || diff === -(mediaItems.length - 1)) {
      return {
        x: 220,
        scale: 0.7,
        z: 0,
        opacity: 0.5,
      };
    } else if (diff === -1 || diff === mediaItems.length - 1) {
      return {
        x: -220,
        scale: 0.7,
        z: 0,
        opacity: 0.5,
      };
    } else {
      return {
        x: diff > 0 ? 400 : -400,
        scale: 0.5,
        z: -10,
        opacity: 0,
      };
    }
  };

  const prevIndex = (activeIndex - 1 + mediaItems.length) % mediaItems.length;
  const nextIndex = (activeIndex + 1) % mediaItems.length;
  const visibleIndices = [prevIndex, activeIndex, nextIndex];

  return (
    <>
      <section id="presentations" className="min-h-screen flex items-center justify-center px-[5%] relative z-10">
        <div className="flex flex-col items-center gap-6 w-full max-w-6xl">
          <div className="flex items-center gap-8 w-full">
            {/* Left side - Presentation list */}
            <ul className="flex flex-col gap-3 items-start w-[35%]">
              {presentations.map((presentation, index) => (
                <li key={index}>
                  <button
                    onClick={() => handlePresentationClick(index)}
                    className={`font-nav text-sm md:text-base capitalize tracking-wide transition-colors cursor-pointer text-left ${
                      activeIndex === index
                        ? 'text-primary underline'
                        : 'text-foreground hover:text-primary hover:underline'
                    }`}
                  >
                    {formatPresentation(presentation)}
                  </button>
                </li>
              ))}
            </ul>

            {/* Center - 3D Carousel */}
            <div 
              className="relative flex items-center justify-center w-[50%] h-[400px]"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{ perspective: '1000px' }}
            >
              {visibleIndices.map((index) => {
                const style = getItemStyle(index);
                return (
                  <motion.div
                    key={index}
                    animate={{
                      x: style.x,
                      scale: style.scale,
                      opacity: style.opacity,
                    }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="absolute w-[80%] h-[350px] flex items-center justify-center"
                    style={{ 
                      zIndex: style.z,
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    {renderMediaItem(mediaItems[index], index)}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Progress slider bar */}
          <div 
            ref={sliderRef}
            className="w-[50%] ml-[35%] h-2 rounded-full relative select-none"
            onClick={handleSliderClick}
            onMouseDown={handleSliderMouseDown}
            onMouseMove={handleSliderMouseMove}
            onMouseUp={handleSliderMouseUp}
            onMouseLeave={handleSliderMouseUp}
            style={{ cursor: isDragging ? 'grabbing' : 'pointer' }}
          >
            {/* Track background */}
            <div className="absolute inset-0 bg-foreground/10 rounded-full" />
            {/* Green progress bar before circle */}
            <motion.div
              className="absolute top-0 left-0 h-full bg-primary rounded-full"
              animate={{
                width: `calc(${(activeIndex / (mediaItems.length - 1)) * 100}%)`,
              }}
              transition={{ duration: isDragging ? 0 : 0.2, ease: 'easeOut' }}
            />
            {/* Circle indicator */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full shadow-md"
              animate={{
                left: `calc(${(activeIndex / (mediaItems.length - 1)) * 100}% - 8px)`,
              }}
              transition={{ duration: isDragging ? 0 : 0.2, ease: 'easeOut' }}
              style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            />
          </div>
        </div>
      </section>

      {/* Expanded view modal */}
      {expandedItem !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-background/90 z-50 flex items-center justify-center"
          onClick={() => setExpandedItem(null)}
        >
          <button
            onClick={() => setExpandedItem(null)}
            className="absolute top-8 right-8 text-foreground hover:text-primary transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
          {renderMediaItem(mediaItems[expandedItem], expandedItem, true)}
        </motion.div>
      )}
    </>
  );
};

export default PresentationsSection;