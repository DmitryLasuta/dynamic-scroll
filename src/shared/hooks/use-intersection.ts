import { useCallback, useRef } from 'react';

export const useIntersection = (onIntersect: () => void) => {
  const unsubscribe = useRef(() => {});
  return useCallback(
    (element: HTMLDivElement | null) => {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(intersection => {
          if (intersection.isIntersecting) {
            onIntersect();
          }
        });
      });

      if (element) {
        observer.observe(element);
        unsubscribe.current = () => observer.unobserve;
      } else {
        unsubscribe.current();
      }
    },
    [onIntersect]
  );
};