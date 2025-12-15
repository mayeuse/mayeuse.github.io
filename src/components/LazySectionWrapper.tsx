import { ReactNode, useState, useEffect, useRef } from 'react';
import { Skeleton } from './ui/skeleton';

interface LazySectionWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  onVisible?: () => void;
  className?: string;
}

const LazySectionWrapper = ({ 
  children, 
  fallback,
  onVisible,
  className = ''
}: LazySectionWrapperProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || isVisible) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          onVisible?.();
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [isVisible, onVisible]);

  const defaultFallback = (
    <div className="space-y-4">
      <Skeleton className="h-48 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  );

  return (
    <div ref={ref} className={className}>
      {isVisible ? children : (fallback || defaultFallback)}
    </div>
  );
};

export default LazySectionWrapper;
