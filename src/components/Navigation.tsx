const navLinks = [
  { label: 'STATEMENT', href: '#top' },
  { label: 'SELECTED WORKS', href: '#works' },
  { label: 'PRESENTATIONS', href: '#presentations' },
  { label: 'AWARDS', href: '#awards' },
  { label: 'CONTACT', href: '#contact' },
];

const Navigation = () => {
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
        {navLinks.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="font-nav text-foreground text-sm md:text-base uppercase tracking-wide hover:text-primary hover:underline transition-colors"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
