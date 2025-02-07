import { useGroup } from '@/entities';
import { getTodayDate, Lesson } from '@/shared';
import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useSchedule } from '../../model/schedule.store';
import { Loader } from '@/shared/ui/loader/Loader';
import { IdleMessage } from '@/shared';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SHORT_WEEK_DAYS } from '@/shared/constants';
import WeekDay from '../WeekDay';

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

    setCurrentDayIndex(activeIndex);
    const selectedDay = dayKeys[activeIndex - 1];
    setCurrentDay(selectedDay + weekParity);
  };

  const handleWeekChange = (slideToIndex: number, dayName: string) => {
    setWeekParity((prevParity) => (prevParity === 'even' ? 'odd' : 'even'));

    setTimeout(() => {
      swiperRef.current?.slideTo(slideToIndex, 0);
      setCurrentDayIndex(slideToIndex);
      setCurrentDay(dayName + (weekParity === 'even' ? 'odd' : 'even'));
    }, 100);
  };

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
                <WeekDay
                  dayName={dayName}
                  dayLessons={dayLessons}
                  weekParity={weekParity}
                  allLessonsHidden={allLessonsHidden}
                  hiddenLessons={hiddenLessons}
                  hiddenLessonsExist={hiddenLessonsExist}
                  isSwiper
                />
              </SwiperSlide>
            );
          })}
          <SwiperSlide key="end-slide"></SwiperSlide>
        </Swiper>
      </Loader>
    </Box>
  );
}
