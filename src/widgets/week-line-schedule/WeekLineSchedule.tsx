import { useSchedule } from '@/entities';
import { Tabs, Tab, TabList, Box, HStack } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { useGroup } from '@/entities';
import { DateTime } from 'luxon';
import { useScrollSpyFull } from './lib/useScrollSpyFull';
import styles from './WeekLineSchedule.module.scss';
import { SHORT_WEEK_DAYS } from '@/shared/constants';
import { useColor } from '@/shared/lib';
import { getTodayDate } from '@/shared';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { RenderWeekSchedule } from '@/entities';

export function WeekLineSchedule() {
  const swiperRef = useRef<any>(null);
  const { getFullWeekScheduleByName, weekSchedule, weekScheduleStatus } =
    useSchedule();
  const weekNumber = DateTime.now().weekNumber;
  const currentParity = weekNumber % 2 === 0 ? 'even' : 'odd';
  const [weekParity, setWeekParity] = useState<'odd' | 'even'>(currentParity);
  const { currentGroup, updateHiddenLesson } = useGroup();
  const dayIndex = DateTime.now().setLocale('en').weekdayLong.toLowerCase();
  useEffect(() => {
    updateHiddenLesson(getTodayDate());
    if (currentGroup && weekScheduleStatus === 'idle') {
      getFullWeekScheduleByName(currentGroup?.group_name);
    }
  }, [
    currentGroup,
    weekScheduleStatus,
    getFullWeekScheduleByName,
    updateHiddenLesson,
  ]);
  useEffect(() => {
    if (weekScheduleStatus === 'success') {
      const todayWeekDay = DateTime.now()
        .setLocale('en')
        .setZone('Europe/Moscow')
        .weekdayLong?.toLowerCase();
      if (todayWeekDay === 'sunday' || !todayWeekDay) {
        window.scrollTo(0, 0);
        return;
      }

      setTimeout(() => {
        const target = document.getElementById(todayWeekDay + weekParity);
        if (target) {
          target.scrollIntoView();
        }
      }, 100);
    }
  }, [weekScheduleStatus]);
  const [currentDay, setCurrentDay] = useState<string>('');
  const { mainColor, secondElementColor, secondElementLightColor, cardColor } =
    useColor();
  const currentDayOfWeek = dayIndex;
  const longDaysOfWeek = Object.keys(SHORT_WEEK_DAYS);
  useScrollSpyFull(longDaysOfWeek, currentDay, weekParity, setCurrentDay);
  const handleSwipeChange = (index: number) => {
    const parity = index === 0 ? 'even' : 'odd';
    setWeekParity(parity);
  };
  const handleTabChange = (index: number) => {
    setWeekParity(index === 0 ? 'even' : 'odd');
    swiperRef.current?.slideTo(index);
  };

  return (
    <Tabs
      className={styles['full-schedule']}
      pt={{md: '40px'}}
      alignItems={{md: 'center'}}
      defaultIndex={weekNumber % 2}
      variant="unstyled"
      index={weekParity === 'even' ? 0 : 1}
      onChange={handleTabChange}
    >
      <Box
        className={styles['full-schedule__tab-list']}
        pt={{ md: '35px' }}
        bgColor={mainColor}
        boxShadow={`0 5px 5px 5px ${mainColor}`}
        alignItems={{md: 'center'}}
      >
        <TabList
          w={{md: "40%"}}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          position="sticky"
          top="10px"
        >
          <Tab
            _selected={{
              color: secondElementLightColor,
              bgColor: cardColor,
              boxShadow: `0 0 5px 0 rgba(0, 0, 0, 0.2)`,
              borderRadius: '4px',
            }}
            fontSize={'clamp(14px, 4vw, 20px)'}
            color={secondElementColor}
            fontWeight="medium"
            onClick={() => {
              setWeekParity('even');
              handleTabChange(0);
            }}
          >
            Чётная неделя
          </Tab>
          <Tab
            _selected={{
              color: secondElementLightColor,
              bgColor: cardColor,
              boxShadow: `0 0 5px 0 rgba(0, 0, 0, 0.2)`,
              borderRadius: '4px',
            }}
            fontSize={'clamp(14px, 4vw, 20px)'}
            color={secondElementColor}
            fontWeight="medium"
            onClick={() => {
              setWeekParity('odd');
              handleTabChange(1);
            }}
          >
            Нечётная неделя
          </Tab>
        </TabList>
        <HStack w={{md: "40%"}} justifyContent="space-between">
          {Object.entries(SHORT_WEEK_DAYS).map((day) => (
            <Box
              key={day[0] + weekParity}
              color={
                currentDayOfWeek+currentParity === day[0]+weekParity
                  ? secondElementLightColor
                  : secondElementColor
              }
              fontSize={'clamp(16px, 1em, 18px)'}
              fontWeight="medium"
              borderRadius="6px"
              bgColor={currentDay === day[0] + weekParity ? cardColor : ''}
              boxShadow={
                currentDay === day[0] + weekParity
                  ? `0 0 5px 0 rgba(0, 0, 0, 0.2)`
                  : ''
              }
              padding={'6px 8px'}
            >
              <button
                onClick={() => {
                  setCurrentDay(day[0] + weekParity);
                  const target = document.getElementById(day[0] + weekParity);
                  {
                    target && target.scrollIntoView();
                  }
                }}
              >
                {day[1]}
              </button>
            </Box>
          ))}
        </HStack>
      </Box>
      <Box w={{base: '100%', xl: "40%"}}>
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        ref={swiperRef}
        style={{
          width: '100%',
        }}
        onSlideChange={({ activeIndex }) => handleSwipeChange(activeIndex)}
        initialSlide={weekParity === 'even' ? 0 : 1}
        modules={[Pagination]}
      >
        <SwiperSlide
          style={{
            width: '100%',
          }}
        >
          <RenderWeekSchedule
            weekDays={weekSchedule ? weekSchedule['even'].week_days : {}}
            weekParity="even"
          />
        </SwiperSlide>
        <SwiperSlide
          style={{
            width: '100%',
          }}
        >
          <RenderWeekSchedule
            weekDays={weekSchedule ? weekSchedule['odd'].week_days : {}}
            weekParity="odd"
          />
        </SwiperSlide>
      </Swiper>
      </Box>
    </Tabs>
  );
}
