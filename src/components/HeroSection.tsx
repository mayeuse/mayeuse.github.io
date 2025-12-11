import { Info } from 'lucide-react';
import Model3D from './Model3D';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

const HeroSection = () => {
  return (
    <section id="top" className="min-h-screen flex items-center pl-[10%] pr-[10%] relative z-10">
      <div className="flex items-center gap-8 md:gap-16">
        <div className="w-1/3">
          <p className="font-nav text-foreground text-lg md:text-xl leading-relaxed">
            I am a senior at the University of Central Florida with a major in Computer Science 
            and a minor in International Engineering from the Australian National University.
          </p>
          <HoverCard openDelay={100} closeDelay={200}>
            <HoverCardTrigger asChild>
              <button className="flex items-center gap-2 mt-4 font-nav text-foreground text-sm md:text-base transition-colors hover:text-pink-500 hover:underline cursor-pointer">
                <Info className="w-4 h-4" />
                <span>Why This Flower?</span>
              </button>
            </HoverCardTrigger>
            <HoverCardContent align="start" className="w-64">
              <p className="text-sm">This is my rendition of the morivivi.</p>
            </HoverCardContent>
          </HoverCard>
        </div>
        <Model3D />
      </div>
    </section>
  );
};

export default HeroSection;
