import { Box, Text, Divider } from '@chakra-ui/react';
import { HiddenLesson, Lesson } from '@/shared';
import { useColor } from '@/shared/lib';
import { ReactNode } from 'react';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/shared/ui/context-menu';
import { useSchedule } from '@/entities';

export function HideLesson({
  dayDate,
  lessonAction,
  lesson,
}: {
  dayDate?: string;
  lessonAction: ReactNode;
  lesson: Lesson;
}) {
  const { mainTextColor } = useColor();
  const { hiddenLessons, addHiddenLesson } = useSchedule();
  const isHiddenAlways = hiddenLessons.some(
    (hiddenLesson) =>
      hiddenLesson.id === lesson.id && hiddenLesson.type_hide === 'always'
  );
  const isHiddenOnOdd = hiddenLessons.some(
    (hiddenLesson) =>
      hiddenLesson.id === lesson.id && hiddenLesson.type_hide === 'odd'
  );
  const isHiddenOnEven = hiddenLessons.some(
    (hiddenLesson) =>
      hiddenLesson.id === lesson.id && hiddenLesson.type_hide === 'even'
  );

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
    };
    addHiddenLesson(hideLesson);
  };
  console.log(hiddenLessons);
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <Box
          _active={{ opacity: 0.5, bgColor: 'gray.200' }}
          transition={'0.2s'}
          borderRadius={3}
          w={'full'}
          color={mainTextColor}
          fontWeight="medium"
          fontSize="18px"
        >
          {lessonAction}
        </Box>
      </ContextMenuTrigger>
      <ContextMenuContent>
        {/* Скрыть навсегда */}
        {!isHiddenAlways && (
          <ContextMenuItem onClick={() => handleClick('always')}>
            <Text>Скрыть навсегда</Text>
          </ContextMenuItem>
        )}
        <Divider />
        {/* Скрыть на нечётной неделе */}
        {!isHiddenOnOdd && (
          <ContextMenuItem onClick={() => handleClick('odd')}>
            <Text>Скрыть на нечётной неделе</Text>
          </ContextMenuItem>
        )}
        <Divider />
        {/* Скрыть на чётной неделе */}
        {!isHiddenOnEven && (
          <ContextMenuItem onClick={() => handleClick('even')}>
            <Text>Скрыть на чётной неделе</Text>
          </ContextMenuItem>
        )}
        <Divider />
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
