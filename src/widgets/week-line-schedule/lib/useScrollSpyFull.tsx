import { useEffect, useRef } from 'react';

export function useScrollSpyFull(
  longDaysOfWeek: string[],
  currentDay: string,
  weekParity: 'even' | 'odd',
  setCurrentDay: React.Dispatch<React.SetStateAction<string>>
) {
  const observers = useRef<IntersectionObserver[] | undefined>([]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.1,
    };

    observers.current = longDaysOfWeek.map((day) => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentDay(day + weekParity);
          }
        });
      }, options);
      const target = document.getElementById(day + weekParity);
      if (target) observer.observe(target);
      return observer;
    });

    return () => {
      observers.current?.forEach((observer) => observer.disconnect());
    };
  }, [longDaysOfWeek, setCurrentDay, weekParity]);

  return currentDay; // Return current day if needed
}
