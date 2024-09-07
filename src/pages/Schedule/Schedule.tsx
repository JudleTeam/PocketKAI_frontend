import { Box, Text, Divider } from '@chakra-ui/react';

import { FadedLessonCard, LessonCard, RestCard, useSchedule } from '@/entities';
import { TopBoundary, BottomBoundary, DayNameWithShare } from '@/features';

import { useInfiniteScroll } from './lib/useInfiniteScroll';
import { getTodayDate } from '@/shared';
import { ArrowIcon } from '@/shared/assets';
import { useGoUpButton } from './lib/useGoUpButton';
import { scrollToToday, useColor } from '@/shared/lib';
import { Loader } from '@/shared/ui/loader/Loader';
import styles from './Schedule.module.scss';
import { DateTime } from 'luxon';
import { getWeekParityDate } from '@/shared/lib';
export function Schedule() {
  const today = getTodayDate();
  const { hiddenLessons, schedule, weekScheduleStatus } = useSchedule();
  const { upperRef, lowerRef } = useInfiniteScroll();
  const { showButton, position: todayBlockPosition } = useGoUpButton();
  const { mainElementColor } = useColor();

  return (
    <Loader status={weekScheduleStatus} idleMessage="Выберите группу">
      <Box
        id="schedule"
        className={styles['schedule']}
        alignItems={{ base: '', md: 'flex-start' }}
        w={{ base: '100%', md: 'fit-content' }}
        margin={{ base: '0', md: '0 auto' }}
      >
        <TopBoundary ref={upperRef} />
        {schedule?.days.map((day) => {
          const isFirstDayOfWeek = DateTime.fromISO(day.date).weekday === 1;
          const weekParity =
            DateTime.fromISO(day.date).weekNumber % 2 === 0
              ? 'Чётная неделя'
              : 'Нечётная неделя';

          const visibleLessons = day.lessons.filter((lesson) => {
            const isLessonHidden = hiddenLessons.some(
              (hiddenLesson) =>
                hiddenLesson.id === lesson.id &&
                (day.date === hiddenLesson.type_hide ||
                  getWeekParityDate(day.date) === hiddenLesson.type_hide ||
                  hiddenLesson.type_hide === 'always')
            );
            return !isLessonHidden;
          });

          // Проверяем, есть ли скрытые занятия
          const hiddenLessonsExist = day.lessons.some((lesson) => {
            return hiddenLessons.some(
              (hiddenLesson) =>
                hiddenLesson.id === lesson.id &&
                (day.date === hiddenLesson.type_hide ||
                  getWeekParityDate(day.date) === hiddenLesson.type_hide ||
                  hiddenLesson.type_hide === 'always')
            );
          });
          return (
            <Box key={day.date} id={day.date} className={styles['day']}>
              {isFirstDayOfWeek && (
                <Box
                  w={'100%'}
                  display="flex"
                  flexDir="column"
                  color={'gray.400'}
                  fontWeight="medium"
                  fontSize="16px"
                  pt="5px"
                  lineHeight="100%"
                  gap="10px"
                >
                  <Divider />
                  <Text>{weekParity}</Text>
                </Box>
              )}
              <DayNameWithShare
                day={day}
                hiddenLessonsExist={hiddenLessonsExist}
              />
              <div className={styles['day__timeline']}>
                <div className={styles['day__timeline-stub']} />
                <div className={styles['day__timeline-part']}>
                  <Box
                    bgColor={today >= day.date ? '#3182ce80' : '#3182ce'}
                    className={styles['day__timeline-part-line']}
                  />
                </div>
              </div>
              {visibleLessons.length === 0 ? (
                <RestCard dayDate={day.date} /> // Выводим RestCard, если нет нескрытых занятий
              ) : (
                visibleLessons.map((lesson) => {
                  return lesson.parsed_dates &&
                    !lesson.parsed_dates.includes(day.date) ? (
                    <FadedLessonCard
                      key={lesson.id}
                      lesson={lesson}
                      dayDate={day.date}
                    />
                  ) : (
                    <LessonCard
                      lesson={lesson}
                      dayDate={day.date}
                      key={lesson.id}
                    />
                  );
                })
              )}
            </Box>
          );
        })}
        <BottomBoundary ref={lowerRef} />

        {!!showButton && (
          <Box
            onClick={() => scrollToToday(true)}
            as="button"
            w="50px"
            h="50px"
            borderRadius="8px"
            position="fixed"
            bottom="80px"
            right="5%"
            bgColor={mainElementColor}
            zIndex={'10'}
          >
            {todayBlockPosition === 'above' ? (
              <ArrowIcon color="white" w={'20px'} h={'20px'} />
            ) : (
              <ArrowIcon
                color="white"
                w={'20px'}
                h={'20px'}
                transform="rotate(180deg)"
              />
            )}
          </Box>
        )}
      </Box>
    </Loader>
  );
}
