import { useGroup } from '@/entities';
import { getTodayDate, Lesson } from '@/shared';
import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useSchedule } from '../../model/schedule.store';
import { Loader } from '@/shared/ui/loader/Loader';
import { IdleMessage } from '@/shared';
import WeekDay from '../WeekDay';

export function RenderWeekSchedule({
  weekDays,
  weekParity,
}: {
  weekDays: { [key: string]: Lesson[] };
  weekParity: 'odd' | 'even';
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

  return (
    <Box
      h={'75vh'}
      style={{ scrollbarWidth: 'none' }}
      overflowY="auto"
      pb={8}
      px={1}
    >
      <Loader status={weekScheduleStatus} idleMessage={<IdleMessage />}>
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
            <React.Fragment key={dayName + weekParity}>
              <WeekDay
                dayName={dayName}
                dayLessons={dayLessons}
                weekParity={weekParity}
                allLessonsHidden={allLessonsHidden}
                hiddenLessons={hiddenLessons}
                hiddenLessonsExist={hiddenLessonsExist}
                isSwiper={false}
              />
            </React.Fragment>
          );
        })}
      </Loader>
    </Box>
  );
}
