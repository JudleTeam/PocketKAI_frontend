import { useGroup, useSchedule } from '@/entities';
import { Nullable } from '@/shared';
import { DateTime } from 'luxon';
import { useEffect, useRef } from 'react';

export function useInfiniteScroll() {
  const observer = useRef<Nullable<IntersectionObserver>>(null);
  const { currentGroup } = useGroup();
  const {
    schedule,
    addToCurrentSchedule,
    weekScheduleStatus: status,
  } = useSchedule();
  const upperRef = useRef<HTMLDivElement>(null);
  const lowerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!schedule || !currentGroup || !schedule.days.length) return;
    const options = {
      root: null,
      rootMargin: '420px 0px 120px 0px',
      threshold: 0.1,
    };
    observer.current = new IntersectionObserver((entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && status !== 'loading') {
          const loader = entry.target as HTMLDivElement;
          observerInstance.unobserve(loader);
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

    if (upperRef.current) observer.current.observe(upperRef.current);
    if (lowerRef.current) observer.current.observe(lowerRef.current);
    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [schedule, currentGroup, status, addToCurrentSchedule]);
  return { upperRef, lowerRef };
}
