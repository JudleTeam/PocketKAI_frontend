import { Box, Text, Divider } from '@chakra-ui/react';
import { HiddenLesson, Lesson } from '@/shared';
import { useColor } from '@/shared/lib';
import React, { ReactNode } from 'react';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/shared/ui/context-menu';
import { useGroup } from '@/entities';

export function HideLesson({
  dayDate,
  children,
  lesson,
}: {
  dayDate?: string;
  children: ReactNode;
  lesson: Lesson;
}) {
  const { mainTextColor } = useColor();
  const { currentGroup, hiddenLessons, addHiddenLesson } = useGroup();
  const isHiddenAlways = hiddenLessons.some(
    (hiddenLesson) =>
      hiddenLesson.lesson.id === lesson.id &&
      hiddenLesson.lesson.type_hide === 'always'
  );
  const isHiddenOnOdd = hiddenLessons.some(
    (hiddenLesson) =>
      hiddenLesson.lesson.id === lesson.id &&
      hiddenLesson.lesson.type_hide === 'odd'
  );
  const isHiddenOnEven = hiddenLessons.some(
    (hiddenLesson) =>
      hiddenLesson.lesson.id === lesson.id &&
      hiddenLesson.lesson.type_hide === 'even'
  );

  const hasAlways =
    !isHiddenAlways &&
    lesson.parsed_parity !== 'even' &&
    lesson.parsed_parity !== 'odd';
  const hasOdd =
    !isHiddenOnOdd &&
    ((lesson.parsed_dates_status === 'need_check' &&
      !lesson.parsed_dates &&
      lesson.parsed_parity === 'any') ||
      (lesson.parsed_dates_status !== 'need_check' &&
        !lesson.parsed_dates &&
        lesson.parsed_parity === 'any') ||
      lesson.parsed_parity === 'odd');
  const hasEven =
    !isHiddenOnEven &&
    ((lesson.parsed_dates_status === 'need_check' &&
      !lesson.parsed_dates &&
      lesson.parsed_parity === 'any') ||
      (lesson.parsed_dates_status !== 'need_check' &&
        !lesson.parsed_dates &&
        lesson.parsed_parity === 'any') ||
      lesson.parsed_parity === 'even');
  const handleClick = (type_hide: string) => {
    const hideLesson: HiddenLesson = {
      id: lesson.id,
      discipline: lesson.discipline,
      type_hide,
      parsed_dates: lesson.parsed_dates,
      original_dates: lesson.original_dates,
      parsed_lesson_type: lesson.parsed_lesson_type,
      original_lesson_type: lesson.original_lesson_type,
      start_time: lesson.start_time,
      end_time: lesson.end_time,
      number_of_day: lesson.number_of_day,
      parsed_dates_status: lesson.parsed_dates_status,
      parsed_parity: lesson.parsed_parity,
    };
    if (currentGroup) {
      addHiddenLesson(hideLesson, currentGroup);
    }
  };
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <Box
          transition={'0.2s'}
          borderRadius={3}
          w={'full'}
          color={mainTextColor}
          fontWeight="medium"
          fontSize="18px"
        >
          {children}
        </Box>
      </ContextMenuTrigger>
      <ContextMenuContent avoidCollisions className="flex flex-col gap-1">
        {/* Скрыть на каждой неделе */}
        {hasAlways && (
          <React.Fragment>
            <ContextMenuItem onClick={() => handleClick('always')}>
              <Text>Скрыть на каждой неделе</Text>
            </ContextMenuItem>
            {(hasOdd || hasEven || dayDate) && <Divider />}
          </React.Fragment>
        )}

        {/* Скрыть на нечётной неделе */}
        {hasOdd && (
          <React.Fragment>
            <ContextMenuItem onClick={() => handleClick('odd')}>
              <Text>Скрыть на нечётной неделе</Text>
            </ContextMenuItem>
            {(hasEven || dayDate) && <Divider />}
          </React.Fragment>
        )}

        {/* Скрыть на чётной неделе */}
        {hasEven && (
          <React.Fragment>
            <ContextMenuItem onClick={() => handleClick('even')}>
              <Text>Скрыть на чётной неделе</Text>
            </ContextMenuItem>
            {dayDate && <Divider />}
          </React.Fragment>
        )}

        {/* Скрыть на конкретную дату */}
        {dayDate && (
          <ContextMenuItem onClick={() => handleClick(dayDate)}>
            <Text>Скрыть на этот день</Text>
          </ContextMenuItem>
        )}
      </ContextMenuContent>
    </ContextMenu>
  );
}
