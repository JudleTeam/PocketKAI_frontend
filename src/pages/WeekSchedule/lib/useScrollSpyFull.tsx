import { useEffect, useRef } from 'react';

export function useScrollSpyFull(
  longDaysOfWeek: string[],
  currentDay: string,
  setCurrentDay: React.Dispatch<React.SetStateAction<string>>
) {
  const observers = useRef<IntersectionObserver[] | undefined>([]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '-20% 0px -80% 0px',
      threshold: 0,
    };

    observers.current = longDaysOfWeek.map((day) => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentDay(day);
          }
        });
      }, options);
      const target = document.getElementById(day);
      if (target) observer.observe(target);
      return observer;
    });

    return () => {
      observers.current?.forEach((observer) => observer.disconnect());
    };
  }, [longDaysOfWeek, setCurrentDay]);

  return currentDay; // Return current day if needed
}
