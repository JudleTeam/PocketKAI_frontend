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

export function Schedule() {
  const today = getTodayDate();
  const { schedule, weekScheduleStatus } = useSchedule();
  const { upperRef, lowerRef } = useInfiniteScroll();
  const { showButton, position: todayBlockPosition } = useGoUpButton();
  const { mainElementColor } = useColor();
  // const { isTodayAnimated } = useSettings();
  // const todayBoxColor = useColorModeValue(
  //   `${mainElementColor}36`,
  //   `${mainElementColor}33`
  // );
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
          return (
            <Box
              key={day.date}
              id={day.date}
              className={styles['day']}
              // bgColor={
              //   day.date === today && isTodayAnimated ? todayBoxColor : ''
              // }
              // borderRadius={'8px'}
              // my={day.date === today && isTodayAnimated ? '5px' : 0}
              // py={day.date === today && isTodayAnimated ? '5px' : 0}
            >
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
              <DayNameWithShare day={day} />
              <div className={styles['day__timeline']}>
                <div className={styles['day__timeline-stub']} />
                <div className={styles['day__timeline-part']}>
                  <Box
                    bgColor={today >= day.date ? '#3182ce80' : '#3182ce'}
                    className={styles['day__timeline-part-line']}
                  />
                </div>
              </div>
              {day.lessons.length === 0 && <RestCard dayDate={day.date} />}
              {day.lessons.map((lesson) => {
                if (
                  lesson.parsed_dates &&
                  !lesson.parsed_dates.includes(day.date)
                ) {
                  return (
                    <FadedLessonCard
                      key={lesson.id}
                      lesson={lesson}
                      dayDate={day.date}
                    />
                  );
                }

                return (
                  <LessonCard
                    lesson={lesson}
                    dayDate={day.date}
                    key={lesson.id}
                  />
                );
              })}
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
