import { Nullable, Schedule } from '@/shared';
import { MutableRefObject, useEffect, useRef } from 'react';
import Swiper from 'swiper';

export function useScrollSpy(schedule: Nullable<Schedule>) {
  const swiperRef: MutableRefObject<Nullable<Swiper>> = useRef(null);
  const observers = useRef<IntersectionObserver[] | undefined>([]);
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '-30% 0px -70% 0px',
      threshold: 0,
    };

    observers.current = schedule?.days.map((day, _, days) => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const newDay = entry.target.id;

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
  }, [schedule, swiperRef]);
  return swiperRef;
}
