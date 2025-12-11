import { useEffect, useState } from 'react';

const navLinks = [
  { label: 'STATEMENT', href: '#top' },
  { label: 'SELECTED WORKS', href: '#works' },
  { label: 'PRESENTATIONS', href: '#presentations' },
  { label: 'AWARDS', href: '#awards' },
  { label: 'CONTACT', href: '#contact' },
];

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('top');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      // Check sections in reverse order to find the current one
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
  };

  return (
    <nav className="fixed top-1/2 right-[5%] z-50 -translate-y-1/2">
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
  );
};

export default Navigation;