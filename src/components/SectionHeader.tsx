interface SectionHeaderProps {
  title: string;
}

const SectionHeader = ({ title }: SectionHeaderProps) => {
  return (
    <div className="fixed top-[6%] right-[5%] z-40">
      <span className="font-nav text-foreground text-2xl md:text-4xl uppercase tracking-wide">
        {title}
      </span>
    </div>
  );
};

export default SectionHeader;
