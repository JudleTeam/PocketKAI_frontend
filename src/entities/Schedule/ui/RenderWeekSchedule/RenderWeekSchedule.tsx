import { useGroup } from '@/entities';
import { getStatusSchedule, Lesson } from '@/shared';
import { Box } from '@chakra-ui/react';
import React from 'react';
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
  const { hiddenLessons } = useGroup();

  return (
    <Box
      h={{ base: '73dvh', md: '82dvh' }}
      style={{ scrollbarWidth: 'none' }}
      overflowY="auto"
      pb={8}
      px={1}
    >
      <Loader status={getStatusSchedule()} idleMessage={<IdleMessage />}>
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
