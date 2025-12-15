import { useState, useEffect, useRef, Suspense } from 'react';
import STLModel from './STLModel';

interface LazySTLModelsProps {
  models: Array<{ url: string; label: string }>;
}

const LazySTLModels = ({ models }: LazySTLModelsProps) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || shouldLoad) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '200px' }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <div ref={ref} className="flex flex-col gap-0 -mt-4">
      {shouldLoad ? (
        <Suspense fallback={
          <>
            {models.map((_, index) => (
              <div key={index} className="w-36 h-36 bg-muted/20 animate-pulse rounded" />
            ))}
          </>
        }>
          {models.map((model, index) => (
            <STLModel 
              key={index} 
              url={model.url} 
              scale={0.035} 
              label={model.label}
            />
          ))}
        </Suspense>
      ) : (
        <>
          {models.map((_, index) => (
            <div key={index} className="w-36 h-36 bg-muted/10 rounded flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-muted/30 border-t-foreground/30 rounded-full animate-spin" />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default LazySTLModels;
