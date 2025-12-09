import handwrittenName from '@/assets/handwritten-name.png';

interface SectionHeaderProps {
  title: string;
}

const SectionHeader = ({ title }: SectionHeaderProps) => {
  return (
    <div className="fixed top-6 right-[5%] z-40 flex items-center gap-6">
      <span className="font-nav text-foreground text-sm md:text-base uppercase tracking-wide">
        {title}
      </span>
      <img 
        src={handwrittenName} 
        alt="Maya Eusebio" 
        className="h-8 md:h-10 w-auto"
      />
    </div>
  );
};

export default SectionHeader;
