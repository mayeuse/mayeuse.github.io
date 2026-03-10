import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'STATEMENT', href: '#top' },
  { label: 'SELECTED WORKS', href: '#works' },
  { label: 'PRESENTATIONS', href: '#presentations' },
  { label: 'WRITING SAMPLE', href: '#writing' },
  { label: 'CONTACT', href: '#contact' },
];

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('top');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      for (let i = navLinks.length - 1; i >= 0; i--) {
        const targetId = navLinks[i].href.replace('#', '');
        const element = document.getElementById(targetId);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(targetId);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop nav - hidden on mobile */}
      <nav className="fixed top-1/2 right-[5%] z-50 -translate-y-1/2 hidden md:block">
        <ul className="flex flex-col gap-4 items-end">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className={`font-nav text-base md:text-lg uppercase tracking-wide transition-colors ${
                    isActive 
                      ? 'text-primary underline' 
                      : 'text-foreground hover:text-primary hover:underline'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile hamburger button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="fixed top-4 right-4 z-[60] md:hidden p-2 text-foreground"
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[55] bg-background/95 backdrop-blur-sm md:hidden flex items-center justify-center">
          <ul className="flex flex-col gap-6 items-center">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    className={`font-nav text-xl uppercase tracking-wide transition-colors ${
                      isActive 
                        ? 'text-primary underline' 
                        : 'text-foreground hover:text-primary hover:underline'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export default Navigation;
