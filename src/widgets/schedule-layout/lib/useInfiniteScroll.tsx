import { useGroup, useSchedule } from '@/entities';
import { Nullable, Schedule } from '@/shared';
import { DateTime } from 'luxon';
import { useEffect, useRef } from 'react';

export function useInfiniteScroll(
  schedule: Nullable<Schedule>,
  currentDay: string
) {
  const observer = useRef<Nullable<IntersectionObserver>>(null);
  const { currentGroup } = useGroup();
  const { addToCurrentSchedule, scheduleStatus: status } = useSchedule();
  const upperRef = useRef<HTMLDivElement>(null);
  const lowerRef = useRef<HTMLDivElement>(null);
  const scrollPosition = useRef<number>(0);
  useEffect(() => {
    if (!schedule || !currentGroup || !schedule.days.length) return;
    const options = {
      root: null,
      rootMargin: '100px 0px 100px 0px',
      threshold: 1,
    };
    observer.current = new IntersectionObserver((entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && status !== 'loading') {
          const loader = entry.target as HTMLDivElement;
          observerInstance.unobserve(loader);
          scrollPosition.current = window.scrollY;
          if (loader === upperRef.current) {
            const dateFrom = DateTime.fromISO(schedule?.days[0].date)
              .minus({ days: 7 })
              .toFormat('yyyy-LL-dd');
            addToCurrentSchedule(
              {
                date_from: dateFrom,
                days_count: 7,
              },
              false
            );
            // window.scrollTo(0, scrollPosition.current);
          }
          if (loader === lowerRef.current) {
            const dateFrom = DateTime.fromISO(
              schedule?.days[schedule.days.length - 1].date
            )
              .plus({ days: 1 })
              .toFormat('yyyy-LL-dd');
            addToCurrentSchedule(
              {
                date_from: dateFrom,
                days_count: 7,
              },
              true
            );
          }
        }
      });
    }, options);
    document.getElementById(currentDay)?.scrollIntoView();

    if (upperRef.current) observer.current.observe(upperRef.current);
    if (lowerRef.current) observer.current.observe(lowerRef.current);

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [schedule, currentGroup, addToCurrentSchedule]);
  return { upperRef, lowerRef };
}
