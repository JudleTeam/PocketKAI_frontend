import { Nullable, Schedule } from '@/shared';
import { MutableRefObject, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Swiper from 'swiper';
import { dateWithIndex } from './dateWithIndex';

export function useScrollSpy(
  schedule: Nullable<Schedule>,
  setCurrentDay: React.Dispatch<React.SetStateAction<string>>
) {
  const swiperRef: MutableRefObject<Nullable<Swiper>> = useRef(null);
  const observers = useRef<IntersectionObserver[] | undefined>([]);
  const location = useLocation();
  const isPreviousStartOfWeek = useRef<boolean>(false);
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
            const { dateIndex, isStartOfWeek } = dateWithIndex(days, newDay);
            const beginningIsNextSlideCond =
              !isPreviousStartOfWeek.current && isStartOfWeek;
            isPreviousStartOfWeek.current = isStartOfWeek;
            if (swiperRef.current && !swiperRef.current.isBeginning) {
              swiperRef.current.slideTo(dateIndex, 400);
            } else if (swiperRef.current && beginningIsNextSlideCond) {
              swiperRef.current?.slideTo(dateIndex, 400);
            } else {
              swiperRef.current?.slideTo(dateIndex, 0);
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
