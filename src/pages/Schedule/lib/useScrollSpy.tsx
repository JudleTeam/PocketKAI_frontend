import { Nullable, Schedule } from '@/shared';
import { useCurrentDay } from '@/widgets';
import { useEffect, useRef } from 'react';

export function useScrollSpy(schedule: Nullable<Schedule>) {
  const [, setCurrentDay, swiperRef] = useCurrentDay();
  const observers = useRef<IntersectionObserver[] | undefined>([]);
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0,
    };

    observers.current = schedule?.days.map((day, _, days) => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const newDay = entry.target.id;
            setCurrentDay(newDay);
            console.log(newDay);
            const dateIndex = days.findIndex((day) => day.date === newDay);
            if (swiperRef.current) {
              swiperRef.current.slideTo(dateIndex);
            }
          }
        });
      }, options);
      const target = document.getElementById(day.date);
      if (target) observer.observe(target);
      return observer;
    });

    return () => {
      observers.current?.forEach((observer) => observer.disconnect());
    };
  }, [schedule, setCurrentDay, swiperRef]);
}
