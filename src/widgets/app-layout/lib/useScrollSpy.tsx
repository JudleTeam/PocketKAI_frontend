import { Nullable, Schedule } from '@/shared';
import { MutableRefObject, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Swiper from 'swiper';

export function useScrollSpy(
  schedule: Nullable<Schedule>,
  setCurrentDay: React.Dispatch<React.SetStateAction<string>>
) {
  const swiperRef: MutableRefObject<Nullable<Swiper>> = useRef(null);
  const observers = useRef<IntersectionObserver[] | undefined>([]);
  const location = useLocation();
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
            setCurrentDay(newDay);
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
  }, [schedule, swiperRef, setCurrentDay, location.pathname]);
  return swiperRef;
}
