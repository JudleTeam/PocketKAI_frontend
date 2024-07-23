import { useEffect, useRef } from 'react';
import { useCurrentWeekDay } from './useCurrentWeekDay';

export function useScrollSpyFull(longDaysOfWeek: string[]) {
  const [currentDay, setCurrentDay] = useCurrentWeekDay();
  const observers = useRef<IntersectionObserver[] | undefined>([]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '-30% 0px -70% 0px',
      threshold: 0,
    };

    observers.current = longDaysOfWeek.map((day) => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            //@ts-ignore
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

  return currentDay;  // Return current day if needed
}
