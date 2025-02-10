import { TeacherLesson, useColor } from '@/shared';
import { InfoIcon } from '@/shared/assets/chakraIcons/InfoIcon';
import {
  Popover,
  PopoverTrigger,
  PopoverArrow,
  PopoverHeader,
  PopoverContent,
  PopoverBody,
  Box,
  Text,
} from '@chakra-ui/react';
import React from 'react';

export const LessonPopover = ({
  lesson,
  openPopoverId,
  setOpenPopoverId,
  week,
}: {
  lesson: TeacherLesson;
  openPopoverId: string | null;
  setOpenPopoverId: (lessonId: string | null, week: 'even' | 'odd') => void;
  week: 'even' | 'odd';
}) => {
  const { primaryColor, mainColor } = useColor();

  return (
    <Popover
      isLazy
      key={lesson.id}
      isOpen={openPopoverId === lesson.id}
      onOpen={() => setOpenPopoverId(lesson.id, week)}
      onClose={() => setOpenPopoverId(null, week)}
    >
      <PopoverTrigger>
        <InfoIcon
          transition="0.2s"
          _active={{ opacity: 0.5, transition: '0.2s' }}
          w={'25px'}
          h={'25px'}
        />
      </PopoverTrigger>
      <PopoverContent bgColor={mainColor}>
        <PopoverArrow bg={mainColor} />
        <PopoverHeader fontSize="16px" fontWeight={'bold'} color={primaryColor}>
          {lesson.discipline.name}
        </PopoverHeader>
        <PopoverBody
          fontSize={'16px'}
          fontWeight={'medium'}
          color={primaryColor}
          display="flex"
          flexDirection={'column'}
          justifyContent={'start'}
          alignItems={'start'}
          gap="5px"
        >
          <Box>
            {lesson.parsed_dates_status === 'need_check' ||
            (lesson.parsed_dates_status === 'good' &&
              lesson?.parsed_dates?.length > 0) ? (
              <Text>Даты проведения: {lesson.original_dates}</Text>
            ) : null}
          </Box>
          <Box display="flex" flexWrap={'wrap'}>
            <Text>Группы:&nbsp;</Text>
            {lesson.groups.map((group, index) => (
              <React.Fragment key={group.id}>
                {`${group.group_name}${
                  lesson.groups.length - 1 === index ? '' : ', '
                }`}
              </React.Fragment>
            ))}
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
