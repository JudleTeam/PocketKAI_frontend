import { useSchedule } from '@/entities';
import {
  Tabs,
  Tab,
  TabList,
  Box,
  Text,
  VStack,
  HStack,
  useColorModeValue,
  useChakra,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FullLessonCard } from '@/entities';
import { useCurrentWeekDay } from './lib/useCurrentWeekDay';
import { useGroup } from '@/entities';
import { DateTime } from 'luxon';
import { useScrollSpyFull } from './lib/useScrollSpyFull';
import styles from './WeekSchedule.module.scss';

export function WeekSchedule() {
  const [weekParity, setWeekParity] = useState<'odd' | 'even'>('even');
  const {
    getFullWeekScheduleByName,
    weekSchedule,
    weekScheduleStatus: status,
  } = useSchedule();
  const { currentGroup } = useGroup();
  const dayIndex = DateTime.now().setLocale('en').weekdayLong.toLowerCase();
  useEffect(() => {
    if (currentGroup && status === 'idle') {
      getFullWeekScheduleByName(currentGroup?.group_name);
    }
  }, [currentGroup, status, getFullWeekScheduleByName]);
  const weekDayName = {
    monday: 'Понедельник',
    tuesday: 'Вторник',
    wednesday: 'Среда',
    thursday: 'Четверг',
    friday: 'Пятница',
    saturday: 'Суббота',
    sunday: 'Воскресенье',
  } as const;
  const weekShortDay = {
    monday: 'Пн',
    tuesday: 'Вт',
    wednesday: 'Ср',
    thursday: 'Чт',
    friday: 'Пт',
    saturday: 'Сб',
    sunday: 'Вс',
  };
  const { theme } = useChakra();
  const main_text = useColorModeValue('light.main_text', 'dark.main_text');
  const second_element_light = useColorModeValue(
    'light.second_element_light',
    'dark.second_element_light'
  );
  const second_element = useColorModeValue(
    'light.second_element',
    'dark.second_element'
  );
  const card = useColorModeValue(
    theme.colors.light.card,
    theme.colors.dark.card
  );
  const main = useColorModeValue(
    theme.colors.light.main,
    theme.colors.dark.main
  );
  const currentDayOfWeek = dayIndex;
  const longDaysOfWeek = Object.keys(weekShortDay);
  useScrollSpyFull(longDaysOfWeek);
  const [currentDay, setCurrentDay] = useCurrentWeekDay();
  return (
    <Tabs className={styles['full-schedule']} variant="unstyled">
      <Box
        className={styles['full-schedule__tab-list']}
        bgColor={main}
        boxShadow={`0 -25px 20px 50px ${main}`}
      >
        <TabList
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          position="sticky"
          top="10px"
        >
          <Tab
            _selected={{
              color: second_element_light,
              bgColor: card,
              fontSize: '16px',
              boxShadow: `0 0 5px 0px ${card}`,
              borderRadius: '4px',
            }}
            color={second_element}
            fontWeight="medium"
            onClick={() => setWeekParity('even')}
          >
            Чётная неделя
          </Tab>
          <Tab
            _selected={{
              color: second_element_light,
              bgColor: card,
              fontSize: '16px',
              boxShadow: `0 0 5px 0px ${card}`,
              borderRadius: '4px',
            }}
            color={second_element}
            fontWeight="medium"
            onClick={() => setWeekParity('odd')}
          >
            Нечётная неделя
          </Tab>
        </TabList>
        <HStack justifyContent="space-between">
          {Object.entries(weekShortDay).map((day) => (
            <Box
              key={day[0]}
              color={
                currentDayOfWeek === day[0]
                  ? second_element_light
                  : second_element
              }
              fontSize="18px"
              fontWeight="medium"
              borderRadius="8px"
              bgColor={currentDay === day[0] ? card : ''}
              boxShadow={currentDay === day[0] ? `0 0 5px 0 ${card}` : ''}
              padding={currentDay === day[0] ? '10px' : ''}
            >
              <button
                onClick={() => {
                  setCurrentDay(day[0]);
                  const target = document.getElementById(day[0]);
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
      {weekSchedule &&
        Object.entries(weekSchedule[weekParity].week_days).map((weekDay) => {
          const dayName = weekDay[0] as keyof typeof weekShortDay;
          const dayLessons = weekDay[1];
          return (
            <div id={dayName} key={dayName}>
              <Text color={main_text} fontWeight="medium" fontSize="18px">
                {dayName && weekDayName[dayName]}
              </Text>
              {dayLessons.length > 0 ? (
                <VStack gap="10px">
                  {dayLessons.map((lesson) => (
                    <FullLessonCard lesson={lesson} />
                  ))}
                </VStack>
              ) : (
                <Box
                  w="100%"
                  bgColor={card}
                  borderRadius="8px"
                  padding="10px 15px"
                  color={main_text}
                  fontWeight="bold"
                  fontSize="18px"
                >
                  Время отдыхать
                </Box>
              )}
            </div>
          );
        })}
    </Tabs>
  );
}
