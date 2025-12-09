const Navigation = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 right-0 z-50 p-6 pr-[5%]">
      <a 
        href="#statement"
        className="font-nav text-foreground text-lg uppercase tracking-wide hover:text-primary hover:underline transition-colors"
      >
        Statement
      </a>
    </nav>
  );
};

export default Navigation;
