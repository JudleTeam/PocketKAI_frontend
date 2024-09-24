import { SwiperWeekSchedule, useSchedule } from '@/entities';
import { Tabs, Tab, TabList, Box, HStack } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { useGroup } from '@/entities';
import { DateTime } from 'luxon';
import styles from './WeekDaySchedule.module.scss';
import { SHORT_WEEK_DAYS } from '@/shared/constants';
import { useColor } from '@/shared/lib';
import { getTodayDate } from '@/shared';
import 'swiper/css';
export function WeekDaySchedule() {
  const swiperRef = useRef<any>(null);
  const { getFullWeekScheduleByName, weekSchedule, weekScheduleStatus } =
    useSchedule();
  const weekNumber = DateTime.now().weekNumber;
  const currentParity = weekNumber % 2 === 0 ? 'even' : 'odd';
  const [weekParity, setWeekParity] = useState<'odd' | 'even'>(currentParity);
  const { currentGroup, updateHiddenLesson } = useGroup();
  const dayName = DateTime.now()
    .setLocale('en')
    .setZone('Europe/Moscow')
    .weekdayLong?.toLowerCase();
  const todayIndex = DateTime.now().setLocale('ru').weekday;
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
      const todayIndexDay = DateTime.now().setLocale('ru').weekday;
      if (todayIndexDay === 7) {
        swiperRef.current.slideTo(0);
        return;
      }
      swiperRef.current.slideTo(todayIndexDay);
    }
  }, [weekScheduleStatus]);
  const [currentDay, setCurrentDay] = useState<string>(dayName + weekParity);
  const [currentDayIndex, setCurrentDayIndex] = useState<number>(todayIndex);
  const { mainColor, secondElementColor, secondElementLightColor, cardColor } =
    useColor();
  const currentDayOfWeek = dayName;

  const handleTabChange = (index: number) => {
    const updateWeekParity = index === 0 ? 'even' : 'odd';
    setWeekParity(updateWeekParity);
    setCurrentDay(
      Object.keys(SHORT_WEEK_DAYS)[currentDayIndex - 1] + updateWeekParity
    );
    swiperRef.current?.slideTo(currentDayIndex);
  };
  const handleDayButtonClick = (dayKey: string, index: number) => {
    setCurrentDay(dayKey + weekParity); // Устанавливаем текущий день
    swiperRef.current?.slideTo(index + 1); // Переключаем Swiper на нужный день
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
        alignItems={{md: 'center'}}
        bgColor={mainColor}
        boxShadow={`0 5px 5px 5px ${mainColor}`}
      >
        <TabList
          display="flex"
          w={{md: "40%"}}
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
        <HStack w={{xl: "40%"}} justifyContent="space-between">
          {Object.entries(SHORT_WEEK_DAYS).map((day, index) => (
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
                  handleDayButtonClick(day[0], index);
                }}
              >
                {day[1]}
              </button>
            </Box>
          ))}
        </HStack>
      </Box>
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
