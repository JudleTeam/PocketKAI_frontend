import { Box, Text, Divider } from '@chakra-ui/react';
import {
  FadedLessonCard,
  LessonCard,
  RestCard,
  useGroup,
  useSchedule,
} from '@/entities';
import { TopBoundary, BottomBoundary, DayNameWithShare } from '@/features';
import { useInfiniteScroll, useGoUpButton } from '@/shared/lib';
import { getStatus, getTodayDate, IdleMessage } from '@/shared';
import { ArrowIcon } from '@/shared/assets';
import { scrollToToday, useColor } from '@/shared/lib';
import { Loader } from '@/shared/ui/loader/Loader';
import styles from './ScheduleLayout.module.scss';
import { DateTime } from 'luxon';
import { getWeekParityDate } from '@/shared/lib';


export function ScheduleLayout() {
  const { schedule } = useSchedule();
  const { upperRef, lowerRef } = useInfiniteScroll();
  const { showButton, position: todayBlockPosition } = useGoUpButton();
  const { secondaryColor, accentColor, mainColor } = useColor();
  const { hiddenLessons } = useGroup();
  const today = getTodayDate();

  return (
    <Loader status={getStatus()} idleMessage={<IdleMessage />}>
      <Box
        id="schedule"
        className={styles['schedule']}
        alignItems={{ base: '', md: 'flex-start' }}
        w={{ base: '100%', md: 'fit-content' }}
        height={'100dvh'}
        py={14}
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
                hiddenLesson.lesson.id === lesson.id &&
                (day.date === hiddenLesson.lesson.type_hide ||
                  getWeekParityDate(day.date) ===
                  hiddenLesson.lesson.type_hide ||
                  hiddenLesson.lesson.type_hide === 'always')
            );
            return !isLessonHidden;
          });

          const hiddenLessonsExist = day.lessons.some((lesson) => {
            return hiddenLessons.some(
              (hiddenLesson) =>
                hiddenLesson.lesson.id === lesson.id &&
                (day.date === hiddenLesson.lesson.type_hide ||
                  getWeekParityDate(day.date) ===
                  hiddenLesson.lesson.type_hide ||
                  hiddenLesson.lesson.type_hide === 'always')
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
                <RestCard dayDate={day.date} />
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
            borderRadius="24px"
            position="fixed"
            bottom="80px"
            right="5%"
            zIndex={'10'}
            bgColor={mainColor}
          >
            <Box
              as="button"
              borderRadius="24px"
              w="50px"
              h="50px"
              bgColor={secondaryColor}
            >
              {todayBlockPosition === 'above' ? (
                <ArrowIcon color={accentColor} w={'20px'} h={'20px'} />
              ) : (
                <ArrowIcon
                  color={accentColor}
                  w={'20px'}
                  h={'20px'}
                  transform="rotate(180deg)"
                />
              )}
            </Box>
          </Box>
        )}
      </Box>
    </Loader>
  );
}
