import { useSchedule } from '@/entities';
import {
  Tabs,
  Tab,
  TabList,
  Box,
  Text,
  VStack,
  HStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FullLessonCard } from '@/entities';
import { useGroup } from '@/entities';
import { DateTime } from 'luxon';
import { useScrollSpyFull } from './lib/useScrollSpyFull';
import styles from './WeekSchedule.module.scss';
import { SHORT_WEEK_DAYS, WEEK_DAYS } from '@/shared/constants';
import { useColor } from '@/shared/lib';
import { Loader } from '@/shared/ui/loader/Loader';

export function WeekSchedule() {
  const { getFullWeekScheduleByName, weekSchedule, weekScheduleStatus } =
    useSchedule();
  const weekNumber = DateTime.now().weekNumber;
  const currentParity = weekNumber % 2 === 0 ? 'even' : 'odd';
  const [weekParity, setWeekParity] = useState<'odd' | 'even'>(currentParity);
  const { currentGroup } = useGroup();
  const dayIndex = DateTime.now().setLocale('en').weekdayLong.toLowerCase();
  useEffect(() => {
    if (currentGroup && weekScheduleStatus === 'idle') {
      getFullWeekScheduleByName(currentGroup?.group_name);
    }
  }, [currentGroup, weekScheduleStatus, getFullWeekScheduleByName]);

  useEffect(() => {
    const todayWeekDay = DateTime.now()
      .setLocale('ru')
      .setZone('Europe/Moscow')
      .weekdayLong?.toLowerCase();
    if (todayWeekDay === 'воскресенье' || !todayWeekDay) {
      window.scrollTo(0, 0);
      return;
    }
    document
      .getElementById(todayWeekDay)
      ?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const [currentDay, setCurrentDay] = useState<string>('');
  const {
    mainColor,
    mainTextColor,
    secondElementColor,
    secondElementLightColor,
    cardColor,
  } = useColor();
  const currentDayOfWeek = dayIndex;
  const longDaysOfWeek = Object.keys(SHORT_WEEK_DAYS);
  useScrollSpyFull(longDaysOfWeek, currentDay, setCurrentDay);
  return (
    <Tabs
      className={styles['full-schedule']}
      defaultIndex={weekNumber % 2}
      variant="unstyled"
    >
      <Box
        className={styles['full-schedule__tab-list']}
        bgColor={mainColor}
        boxShadow={`0 5px 5px 5px ${mainColor}`}
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
              color: secondElementLightColor,
              bgColor: cardColor,
              fontSize: '16px',
              boxShadow: `0 0 5px 0 rgba(0, 0, 0, 0.2)`,
              borderRadius: '4px',
            }}
            color={secondElementColor}
            fontWeight="medium"
            onClick={() => setWeekParity('even')}
          >
            Чётная неделя
          </Tab>
          <Tab
            _selected={{
              color: secondElementLightColor,
              bgColor: cardColor,
              fontSize: '16px',
              boxShadow: `0 0 5px 0 rgba(0, 0, 0, 0.2)`,
              borderRadius: '4px',
            }}
            color={secondElementColor}
            fontWeight="medium"
            onClick={() => setWeekParity('odd')}
          >
            Нечётная неделя
          </Tab>
        </TabList>
        <HStack justifyContent="space-between">
          {Object.entries(SHORT_WEEK_DAYS).map((day) => (
            <Box
              key={day[0]}
              color={
                currentDayOfWeek === day[0]
                  ? secondElementLightColor
                  : secondElementColor
              }
              fontSize="18px"
              fontWeight="medium"
              borderRadius="8px"
              bgColor={currentDay === day[0] ? cardColor : ''}
              boxShadow={
                currentDay === day[0] ? `0 0 5px 0 rgba(0, 0, 0, 0.2)` : ''
              }
              padding={'10px'}
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
      <Box
        w="100%"
        padding="125px 4px 60px 4px"
        style={{ scrollbarWidth: 'none' }}
        overflowY="auto"
        top="30vh"
        left="50%"
        transform={
          weekScheduleStatus === 'success' ? 'none' : 'translate(-50%, 0)'
        }
        position={weekScheduleStatus === 'success' ? 'initial' : 'absolute'}
      >
        <Loader status={weekScheduleStatus} idleMessage="Выберите группу">
          {weekSchedule &&
            Object.entries(weekSchedule[weekParity].week_days).map(
              (weekDay) => {
                const dayName = weekDay[0] as keyof typeof SHORT_WEEK_DAYS;
                const dayLessons = weekDay[1];
                if (weekDay[0] === 'sunday') return null;
                return (
                  <div id={dayName} key={dayName}>
                    <Text
                      color={mainTextColor}
                      fontWeight="medium"
                      fontSize="18px"
                      padding="10px 0"
                    >
                      {dayName && WEEK_DAYS[dayName]}
                    </Text>
                    {dayLessons.length > 0 ? (
                      <VStack gap="10px">
                        {dayLessons?.map((lesson) => {
                          if (
                            lesson.parsed_dates ||
                            lesson.parsed_dates_status === 'need_check'
                          ) {
                            return (
                              <Box className={styles['faded']} key={lesson.id}>
                                <FullLessonCard lesson={lesson} />
                              </Box>
                            );
                          }
                          return (
                            <FullLessonCard lesson={lesson} key={lesson.id} />
                          );
                        })}
                      </VStack>
                    ) : (
                      <Box
                        w="100%"
                        bgColor={cardColor}
                        borderRadius="8px"
                        padding="10px 15px"
                        color={mainTextColor}
                        fontWeight="bold"
                        fontSize="18px"
                      >
                        Время отдыхать
                      </Box>
                    )}
                  </div>
                );
              }
            )}
        </Loader>
      </Box>
    </Tabs>
  );
}
