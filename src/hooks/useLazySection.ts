import { useState, useEffect, useRef, useCallback } from 'react';

interface UseLazySectionOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useLazySection<T>(
  loadFn: () => Promise<T>,
  options: UseLazySectionOptions = {}
) {
  const { threshold = 0.1, rootMargin = '100px' } = options;
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const loadData = useCallback(async () => {
    if (hasLoaded || isLoading) return;
    
    setIsLoading(true);
    try {
      const result = await loadFn();
      setData(result);
      setHasLoaded(true);
    } catch (error) {
      console.error('Failed to load section data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [loadFn, hasLoaded, isLoading]);

  useEffect(() => {
    const element = ref.current;
    if (!element || hasLoaded) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadData();
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [loadData, threshold, rootMargin, hasLoaded]);

  return { ref, data, isLoading, hasLoaded };
}
