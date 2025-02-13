import { SwiperWeekSchedule, useSchedule } from '@/entities';
import { Tabs, useBreakpointValue } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { DateTime } from 'luxon';
import {
  getCurrentDayOfWeek,
  getWeekParity,
  TabListHeader,
  SHORT_WEEK_DAYS,
} from '@/shared';
import { Swiper as SwiperInstance } from 'swiper/types';
import 'swiper/css';
import s from './WeekDaySchedule.module.scss';

export function WeekDaySchedule() {
  const { weekSchedule, weekScheduleStatus } = useSchedule();
  const swiperRef = useRef<SwiperInstance | null>(null);
  const todayIndex = DateTime.now()
    .setZone('Europe/Moscow')
    .setLocale('ru').weekday;
  const weekNumber = DateTime.now().setZone('Europe/Moscow').weekNumber;
  const currentParity = getWeekParity();
  const currentDayOfWeek = getCurrentDayOfWeek();
  const [weekParity, setWeekParity] = useState<'odd' | 'even'>(currentParity);
  const [currentDay, setCurrentDay] = useState<string>(
    currentDayOfWeek + weekParity
  );
  const [currentDayIndex, setCurrentDayIndex] = useState<number>(todayIndex);

  useEffect(() => {
    if (weekScheduleStatus === 'success') {
      const todayIndexDay = DateTime.now()
        .setZone('Europe/Moscow')
        .setLocale('ru').weekday;
      if (todayIndexDay === 7) {
        swiperRef.current?.slideTo(6);
        return;
      } else {
        swiperRef.current?.slideTo(todayIndexDay);
      }
    }
  }, [weekScheduleStatus]);

  const handleTabChange = (index: number) => {
    const updateWeekParity = index === 0 ? 'even' : 'odd';
    setWeekParity(updateWeekParity);
    setCurrentDay(
      Object.keys(SHORT_WEEK_DAYS)[currentDayIndex - 1] + updateWeekParity
    );
    swiperRef.current?.slideTo(currentDayIndex);
  };

  const handleClick = (dayKey: string, index: number) => {
    setCurrentDay(dayKey + weekParity);
    swiperRef.current?.slideTo(index + 1);
  };

  const isDesktop = useBreakpointValue({ base: false, md: true });

  return (
    <Tabs
      className={s.root}
      pt={{ md: '10px' }}
      alignItems={{ md: 'center' }}
      defaultIndex={weekNumber % 2}
      variant="unstyled"
      index={weekParity === 'even' ? 0 : 1}
      onChange={handleTabChange}
    >
      <TabListHeader
        w={isDesktop ? '40%' : '100%'}
        currentDay={currentDay}
        currentDayOfWeek={currentDayOfWeek}
        currentParity={currentParity}
        handleTabChange={handleTabChange}
        handleClick={handleClick}
        weekParity={weekParity}
      />
      <SwiperWeekSchedule
        weekDays={weekSchedule ? weekSchedule[weekParity].week_days : {}}
        weekParity={weekParity}
        setWeekParity={setWeekParity}
        swiperRef={swiperRef}
        setCurrentDay={setCurrentDay}
        setCurrentDayIndex={setCurrentDayIndex}
      />
    </Tabs>
  );
}
