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
      <div className="flex items-center w-full">
        <div className="w-[50%] relative z-20">
          <p className="font-nav text-foreground text-lg md:text-xl leading-relaxed">
            I am a Computer Science major at the University of Central Florida with a minor in International Engineering from the Australian National University. Through art, engineering, and anthropology, I aim to develop new tools that can express and translate information through varying epistemologies.
          </p>
          <HoverCard openDelay={100} closeDelay={200}>
            <HoverCardTrigger asChild>
              <button className="flex items-center gap-2 mt-4 font-nav text-foreground text-sm md:text-base transition-colors hover:text-pink-500 hover:underline cursor-pointer">
                <Info className="w-4 h-4" />
                <span>Why This Flower?</span>
              </button>
            </HoverCardTrigger>
            <HoverCardContent align="start" className="w-80">
              <p className="text-sm leading-relaxed">This is my rendition of the "sensitive plant," or as I call it, "morivivi." Some of my first memories in the Dominican Republic are of making its leaves curl up outside my family home. Since then, I look for it everywhere I go. It serves as a strong reminder to me of the through lines that exist between what feel like completely different worlds. It also resembles the plant from "Horton Hears a Who," which housed an entirely new world on one small speck of dust.</p>
            </HoverCardContent>
          </HoverCard>
        </div>
        <div className="flex-1 flex justify-center">
          <Model3D />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
