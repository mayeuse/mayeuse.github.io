import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  type: 'pdf' | 'image' | 'instagram' | 'youtube' | 'image-with-link';
  src?: string;
  link?: string;
  youtubeStart?: number;
  expandable?: boolean;
};

const mediaItems: MediaItem[] = [
  { type: 'pdf', src: '/documents/CapitolPosterDraft.pdf', expandable: true },
  { type: 'image', src: Presentation2, expandable: true },
  { type: 'instagram', src: 'https://www.instagram.com/p/DOZnpRjDVNR/embed/' },
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
  const [isYoutubePlaying, setIsYoutubePlaying] = useState(false);
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const autoRotateRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-rotate carousel
  useEffect(() => {
    if (!isHovered && !isYoutubePlaying) {
      autoRotateRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % mediaItems.length);
      }, 2000);
    }

    return () => {
      if (autoRotateRef.current) {
        clearInterval(autoRotateRef.current);
      }
    };
  }, [isHovered, isYoutubePlaying]);

  // Listen for YouTube iframe messages
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin === 'https://www.youtube.com') {
        try {
          const data = JSON.parse(event.data);
          if (data.event === 'onStateChange') {
            // 1 = playing, 2 = paused
            setIsYoutubePlaying(data.info === 1);
          }
        } catch {
          // Not a JSON message
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handlePresentationClick = (index: number) => {
    setActiveIndex(index);
    if (autoRotateRef.current) {
      clearInterval(autoRotateRef.current);
    }
  };

  const handleExpand = useCallback((index: number) => {
    setExpandedItem(index);
  }, []);

  const renderMediaItem = (item: MediaItem, index: number, isExpanded = false) => {
    const containerClass = isExpanded 
      ? "w-full h-full flex items-center justify-center" 
      : "flex flex-col items-center gap-2 h-full";

    switch (item.type) {
      case 'pdf':
        return (
          <div className={containerClass}>
            <iframe
              src={`${item.src}#toolbar=0&navpanes=0`}
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
      case 'instagram':
        return (
          <div className="w-full h-full flex items-center justify-center">
            <iframe
              src="https://www.instagram.com/p/DOZnpRjDVNR/embed/"
              className="w-full h-full max-w-[320px] rounded-lg"
              frameBorder="0"
              scrolling="no"
              allowTransparency
              title="Instagram Video"
            />
          </div>
        );
      case 'youtube':
        return (
          <iframe
            src={`${item.src}?start=${item.youtubeStart}&enablejsapi=1`}
            className="w-full h-full rounded-lg"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="YouTube Video"
          />
        );
      default:
        return null;
    }
  };

  const prevIndex = (activeIndex - 1 + mediaItems.length) % mediaItems.length;
  const nextIndex = (activeIndex + 1) % mediaItems.length;

  return (
    <>
      <section id="presentations" className="min-h-screen flex items-center justify-center px-[5%] relative z-10">
        <div className="flex items-center gap-8 w-full max-w-6xl">
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

          {/* Center - Carousel */}
          <div 
            className="relative flex items-center justify-center w-[50%] h-[400px]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Previous item (faded) */}
            <div className="absolute -left-[15%] z-0 opacity-30 scale-50 h-[300px] w-[200px] flex items-center justify-center">
              {mediaItems[prevIndex].type === 'image' || mediaItems[prevIndex].type === 'image-with-link' ? (
                <img 
                  src={mediaItems[prevIndex].src} 
                  alt="Previous" 
                  className="max-h-full max-w-full object-contain rounded-lg" 
                />
              ) : (
                <div className="w-full h-full bg-foreground/10 rounded-lg" />
              )}
            </div>

            {/* Active item */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 w-[80%] h-[350px] flex items-center justify-center"
              >
                {renderMediaItem(mediaItems[activeIndex], activeIndex)}
              </motion.div>
            </AnimatePresence>

            {/* Next item (faded) */}
            <div className="absolute -right-[15%] z-0 opacity-30 scale-50 h-[300px] w-[200px] flex items-center justify-center">
              {mediaItems[nextIndex].type === 'image' || mediaItems[nextIndex].type === 'image-with-link' ? (
                <img 
                  src={mediaItems[nextIndex].src} 
                  alt="Next" 
                  className="max-h-full max-w-full object-contain rounded-lg" 
                />
              ) : (
                <div className="w-full h-full bg-foreground/10 rounded-lg" />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Expanded view modal */}
      <AnimatePresence>
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
      </AnimatePresence>
    </>
  );
};

export default PresentationsSection;
