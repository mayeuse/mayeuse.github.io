import { useEffect, useRef } from 'react';

const FloatingParticles = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles: HTMLDivElement[] = [];
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute rounded-full';
      
      const size = Math.random() * 1.5 + 0.5;
      const opacity = Math.random() * 0.3 + 0.7;
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.backgroundColor = `rgba(180, 210, 180, ${opacity})`;
      particle.style.boxShadow = `0 0 ${size * 6}px rgba(180, 210, 180, ${opacity + 0.3})`;
      
      const duration = Math.random() * 6 + 4;
      const delay = Math.random() * -4;
      particle.style.animation = `float ${duration}s ${delay}s infinite ease-in-out`;
      
      container.appendChild(particle);
      particles.push(particle);
    }

    return () => {
      particles.forEach(p => p.remove());
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[5] overflow-hidden"
    />
  );
};

export default FloatingParticles;
