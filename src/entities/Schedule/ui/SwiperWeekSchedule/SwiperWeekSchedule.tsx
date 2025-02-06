import { useGroup } from '@/entities';
import { FullLessonCard } from '@/entities';
import { DayNameWithShareFull } from '@/features';
import { getTodayDate, Lesson } from '@/shared';
import { useColor } from '@/shared/lib';
import { VStack, Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useSchedule } from '../../model/schedule.store';
import { Loader } from '@/shared/ui/loader/Loader';
import styles from './SwiperWeekSchedule.module.scss';
import { IdleMessage } from '@/shared';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SHORT_WEEK_DAYS } from '@/shared/constants';
type DayName =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday';
export function SwiperWeekSchedule({
  weekDays,
  weekParity,
  setWeekParity,
  swiperRef,
  setCurrentDay,
  setCurrentDayIndex,
}: {
  weekDays: { [key: string]: Lesson[] };
  weekParity: 'odd' | 'even';
  setWeekParity: React.Dispatch<React.SetStateAction<'odd' | 'even'>>;
  swiperRef: React.MutableRefObject<any>;
  setCurrentDay: React.Dispatch<React.SetStateAction<string>>;
  setCurrentDayIndex: (value: React.SetStateAction<number>) => void;
}) {
  const { getFullWeekScheduleByName, weekScheduleStatus } = useSchedule();
  const { currentGroup, hiddenLessons, updateHiddenLesson } = useGroup();
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
  const handleDaySwipeChange = (activeIndex: number) => {
    const dayKeys = Object.keys(SHORT_WEEK_DAYS);

    setCurrentDayIndex(activeIndex); // Update the current day index
    const selectedDay = dayKeys[activeIndex - 1];
    setCurrentDay(selectedDay + weekParity);
  };
  const handleWeekChange = (slideToIndex: number, dayName: string) => {
    setWeekParity((prevParity) => (prevParity === 'even' ? 'odd' : 'even'));

    setTimeout(() => {
      swiperRef.current?.slideTo(slideToIndex, 0); // Переместиться на нужный слайд без анимации
      setCurrentDayIndex(slideToIndex);
      setCurrentDay(dayName + (weekParity === 'even' ? 'odd' : 'even'));
    }, 100);
  };

  const { mainTextColor, cardColor, mainColor } = useColor();
  return (
    <Box
      cursor={'grab'}
      w={{ md: '70%', lg: '40%' }}
      height={'80vh'}
      _active={{ cursor: 'grabbing' }}
    >
      <Loader status={weekScheduleStatus} idleMessage={<IdleMessage />}>
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          autoHeight
          onSlideChange={({ activeIndex }) => handleDaySwipeChange(activeIndex)}
          onReachEnd={() => {
            setTimeout(() => {
              handleWeekChange(1, 'monday');
            }, 100);
          }}
          onReachBeginning={() => {
            setTimeout(() => {
              handleWeekChange(6, 'saturday');
            }, 100);
          }}
        >
          <SwiperSlide key="start-slide"></SwiperSlide>
          {Object.entries(weekDays).map(([dayName, dayLessons]) => {
            if (dayName === 'sunday') return null;

            const allLessonsHidden = dayLessons.every((lesson) =>
              hiddenLessons.some(
                (hiddenLesson) =>
                  hiddenLesson.lesson.id === lesson.id &&
                  (weekParity === hiddenLesson.lesson.type_hide ||
                    hiddenLesson.lesson.type_hide === 'always')
              )
            );
            const hiddenLessonsExist = dayLessons.some((lesson) =>
              hiddenLessons.some(
                (hiddenLesson) =>
                  hiddenLesson.lesson.id === lesson.id &&
                  (weekParity === hiddenLesson.lesson.type_hide ||
                    hiddenLesson.lesson.type_hide === 'always')
              )
            );
            return (
              <SwiperSlide key={dayName + weekParity}>
                <Box id={dayName + weekParity}>
                  <Box
                    zIndex={20}
                    position="relative"
                    boxShadow={`0 5px 5px 5px ${mainColor}`}
                  >
                    <DayNameWithShareFull
                      dayName={dayName as DayName}
                      dayLessons={dayLessons}
                      weekParity={weekParity}
                      hiddenLessonsExist={hiddenLessonsExist}
                    />
                  </Box>
                  {allLessonsHidden ? (
                    <Box
                      w="100%"
                      bgColor={cardColor}
                      borderRadius="8px"
                      padding="10px 15px"
                      color={mainTextColor}
                      fontWeight="bold"
                      fontSize={'clamp(15px, 4.5vw, 18px)'}
                    >
                      Время отдыхать
                    </Box>
                  ) : (
                    <VStack
                      gap="10px"
                      height="70vh"
                      pt={4}
                      pb={10}
                      px={1}
                      overflowY={'scroll'}
                      overflowX={'hidden'}
                      style={{ scrollbarWidth: 'none' }}
                    >
                      {dayLessons.map((lesson) => {
                        const isLessonHidden = hiddenLessons.some(
                          (hiddenLesson) =>
                            hiddenLesson.lesson.id === lesson.id &&
                            (weekParity === hiddenLesson.lesson.type_hide ||
                              hiddenLesson.lesson.type_hide === 'always')
                        );

                        if (!isLessonHidden) {
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
                        }
                        return null;
                      })}
                    </VStack>
                  )}
                </Box>
              </SwiperSlide>
            );
          })}
          <SwiperSlide key="end-slide"></SwiperSlide>
        </Swiper>
      </Loader>
    </Box>
  );
}
