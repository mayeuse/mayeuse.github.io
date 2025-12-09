import Model3D from './Model3D';

const HeroSection = () => {
  return (
    <section id="top" className="min-h-screen flex items-center pl-[10%] pr-[10%] relative z-10">
      <div className="flex items-center gap-8 md:gap-16">
        <div className="w-1/3">
          <p className="font-nav text-foreground text-lg md:text-xl leading-relaxed">
            I am a senior at the University of Central Florida with a major in Computer Science 
            and a minor in International Engineering from the Australian National University.
          </p>
        </div>
        <Model3D />
      </div>
    </section>
  );
};

export default HeroSection;
