import { useSchedule, RenderWeekSchedule } from '@/entities';
import { Tabs, Box, useBreakpointValue } from '@chakra-ui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  getWeekParity,
  SHORT_WEEK_DAYS,
  getCurrentDayOfWeek,
  TabListHeader,
} from '@/shared';
import { DateTime } from 'luxon';
import { useScrollSpyFull } from './lib/useScrollSpyFull';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperInstance } from 'swiper/types';
import { Pagination } from 'swiper/modules';
import s from './WeekLineSchedule.module.scss';
import 'swiper/css';

type WeekParity = 'even' | 'odd';

const paritys: WeekParity[] = ['even', 'odd'];

export function WeekLineSchedule() {
  const { weekSchedule, weekScheduleStatus } = useSchedule();
  const currentDayOfWeek = getCurrentDayOfWeek();
  const weekNumber = DateTime.now().setZone('Europe/Moscow').weekNumber;
  const currentParity = getWeekParity();
  const swiperRef = useRef<SwiperInstance | null>(null);
  const [weekParity, setWeekParity] = useState<'odd' | 'even'>(currentParity);
  const [currentDay, setCurrentDay] = useState<string>('');
  const longDaysOfWeek = Object.keys(SHORT_WEEK_DAYS);

  useScrollSpyFull(longDaysOfWeek, currentDay, weekParity, setCurrentDay);

  useEffect(() => {
    if (weekScheduleStatus === 'success') {
      const todayWeekDay = getCurrentDayOfWeek();
      if (!todayWeekDay || todayWeekDay === 'sunday') return;

      setTimeout(() => {
        requestAnimationFrame(() => {
          const target = document.getElementById(todayWeekDay + weekParity);
          target?.scrollIntoView({ behavior: 'smooth' });
        });
      }, 100);
    }
  }, [weekScheduleStatus, weekParity]);

  const handleSwipeChange = useCallback((index: number) => {
    const parity = index === 0 ? 'even' : 'odd';
    setWeekParity(parity);
  }, []);

  const handleTabChange = useCallback((index: number) => {
    setWeekParity(index === 0 ? 'even' : 'odd');
    swiperRef.current?.slideTo(index);
  }, []);

  const handleClick = useCallback(
    (dayName: string) => {
      setCurrentDay(dayName + weekParity);
      const target = document.getElementById(dayName + weekParity);
      if (target) {
        target.scrollIntoView();
      }
    },
    [weekParity]
  );
  const isDesktop = useBreakpointValue({ base: false, md: true });

  return (
    <Tabs
      className={s.root}
      pt={{ md: '5px' }}

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
      <Box w={{ base: '100%', md: '70%', lg: '40%' }}>
        <Swiper
          className={s.root__swiper}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={({ activeIndex }) => handleSwipeChange(activeIndex)}
          initialSlide={weekParity === 'even' ? 0 : 1}
          modules={[Pagination]}
        >
          {paritys.map((parity) => (
            <SwiperSlide className={s.root__slide}>
              <RenderWeekSchedule
                weekDays={weekSchedule ? weekSchedule[parity].week_days : {}}
                weekParity={parity}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Tabs>
  );
}
