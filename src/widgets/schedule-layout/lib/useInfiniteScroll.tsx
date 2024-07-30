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
  const scheduleContainerRef = useRef<HTMLDivElement>(null);
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
          if (loader === upperRef.current) {
            const previousScrollHeight =
              scheduleContainerRef.current?.scrollHeight;

            const dateFrom = DateTime.fromISO(schedule?.days[0].date)
              .minus({ days: 7 })
              .toFormat('yyyy-LL-dd');
            addToCurrentSchedule(
              {
                date_from: dateFrom,
                days_count: 7,
              },
              false
            ).then(() => {
              if (
                !previousScrollHeight ||
                !scheduleContainerRef.current?.scrollHeight
              )
                return;
              scrollPosition.current =
                scheduleContainerRef.current?.scrollHeight -
                previousScrollHeight;
              scheduleContainerRef.current?.scrollTo(0, scrollPosition.current);
            });
          }
          if (loader === lowerRef.current) {
            scrollPosition.current =
              scheduleContainerRef.current?.scrollTop ?? 0;
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
            ).then(() => {
              scheduleContainerRef.current?.scrollTo(0, scrollPosition.current);
            });
          }
        }
      });
    }, options);

    if (upperRef.current) observer.current.observe(upperRef.current);
    if (lowerRef.current) observer.current.observe(lowerRef.current);
    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [
    schedule,
    currentGroup,
    status,
    addToCurrentSchedule,
    scheduleContainerRef,
  ]);
  return { upperRef, lowerRef, scheduleContainerRef };
}
