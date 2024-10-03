import { useGroup } from '@/entities';
import { FullLessonCard } from '@/entities';
import { DayNameWithShareFull } from '@/features';
import { getTodayDate, Lesson } from '@/shared';
import { useColor } from '@/shared/lib';
import { VStack, Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useSchedule } from '../../model/schedule.store';
import { Loader } from '@/shared/ui/loader/Loader';
import styles from './RenderWeekSchedule.module.scss';
import { IdleMessage } from '@/shared';
import { SwiperSlide, Swiper } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

type DayName =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday';
export function RenderWeekSchedule({
  weekDays,
  weekParity,
  swiperDayRef,
}: {
  weekDays: { [key: string]: Lesson[] };
  weekParity: 'odd' | 'even';
  swiperDayRef: React.MutableRefObject<any>;
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
  const { mainTextColor, cardColor } = useColor();
  return (
    <Box
      w="100%"
      padding={
        weekScheduleStatus === 'loading' || weekScheduleStatus === 'idle'
          ? '70vh 0 60px 0'
          : '75px 0 60px 0'
      }
      style={{ scrollbarWidth: 'none' }}
      overflowY={'auto'}
    >
      <Loader status={weekScheduleStatus} idleMessage={<IdleMessage />}>
        <Swiper
          ref={swiperDayRef}
          direction="vertical"
          modules={[Pagination]}
          onSwiper={(swiper) => {
            swiperDayRef.current = swiper 
          }}
          slidesPerView={'auto'}
        >
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
                <Box id={dayName + weekParity} p={'4px'} scrollMarginTop={{base: '-90px', md: '-60px'}}>
                  <DayNameWithShareFull
                    dayName={dayName as DayName}
                    dayLessons={dayLessons}
                    weekParity={weekParity}
                    hiddenLessonsExist={hiddenLessonsExist}
                  />
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
                    <VStack gap="10px">
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
        </Swiper>
      </Loader>
    </Box>
  );
}
