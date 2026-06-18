import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import WorksSection from "@/components/WorksSection";
import PresentationsSection from "@/components/PresentationsSection";
import WritingSampleSection from "@/components/WritingSampleSection";
import ContactSection from "@/components/ContactSection";
import SectionHeader from "@/components/SectionHeader";
import HandwrittenLogo from "@/components/HandwrittenLogo";
import FloatingParticles from "@/components/FloatingParticles";
import GalleryWallBackground from "@/components/GalleryWallBackground";

const sections = [
  { id: 'top', title: '' },
  { id: 'works', title: 'SELECTED WORKS' },
  { id: 'presentations', title: 'PRESENTATIONS' },
  { id: 'writing', title: 'WRITING SAMPLE' },
  { id: 'contact', title: 'CONTACT' },
];

const Index = () => {
  const [currentSection, setCurrentSection] = useState('');
  const { section } = useParams();
  const navigate = useNavigate();
  const hasScrolledToUrlSection = useRef(false);

  // Scroll to the section named in the URL, once, on initial load
  useEffect(() => {
    if (hasScrolledToUrlSection.current) return;
    hasScrolledToUrlSection.current = true;

    if (section) {
      const el = document.getElementById(section);
      if (el) el.scrollIntoView({ behavior: 'instant' as ScrollBehavior });
    }
  }, [section]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i].id);
        if (element && element.offsetTop <= scrollPosition) {
          setCurrentSection(sections[i].title);

          // keep the URL in sync with scroll position
          const path = sections[i].id === 'top' ? '/' : `/${sections[i].id}`;
          if (window.location.pathname !== path) {
            window.history.replaceState(null, '', path);
          }
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen relative">
      <GalleryWallBackground />
      <FloatingParticles />
      <HandwrittenLogo />
      {currentSection && <SectionHeader title={currentSection} />}
      <Navigation />
      <HeroSection />
      <WorksSection />
      <PresentationsSection />
      <WritingSampleSection />
      <ContactSection />

      {/* Transparent footer */}
      <footer className="h-16 bg-transparent" />
    </main>
  );
};

export default Index;