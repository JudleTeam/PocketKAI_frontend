import { TeacherLesson } from '@/shared';
import {
  Box,
  VStack,
  Text,
  useColorModeValue,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
} from '@chakra-ui/react';
import { getLessonBuilding, useColor } from '@/shared/lib';
import { useDisclosure } from '@chakra-ui/react';
import { LessonTypes } from '@/shared/constants';
import { ProblemIcon } from '@/shared/assets';
import { InfoIcon } from '@/shared/assets/chakraIcons/InfoIcon';
import React from 'react';
export function TeacherLessonCard({
  lesson,
  openPopoverId,
  setOpenPopoverId,
  week,
}: {
  lesson: TeacherLesson;
  openPopoverId: string | null;
  setOpenPopoverId: (lessonId: string | null, week: 'even' | 'odd') => void;
  week: 'even' | 'odd';
}) {
  const { onOpen } = useDisclosure();
  const { mainTextColor } = useColor();
  const popoverColor = useColorModeValue('gray.50', 'gray.700');
  return (
    <Box
      className="w-full"
      onClick={onOpen}
      borderRadius="8px"
      padding="8px 0"
      display="flex"
      justifyContent="space-between"
    >
      <VStack alignItems="start" gap="2px" w="100%">
        <Box
          color={
            lesson.parsed_dates_status === 'need_check' ||
            (lesson.parsed_dates_status === 'good' &&
              lesson?.parsed_dates?.length > 0)
              ? '#ED8936'
              : mainTextColor
          }
          display={'flex'}
          textAlign={'start'}
          w="95%"
          fontWeight="bold"
          fontSize="16px"
          gap={'5px'}
        >
          {lesson.parsed_dates_status === 'need_check' ||
          (lesson.parsed_dates_status === 'good' &&
            lesson?.parsed_dates?.length > 0) ? (
            <ProblemIcon
              alignSelf={'center'}
              w={'25px'}
              h={'25px'}
            ></ProblemIcon>
          ) : null}
          <Text noOfLines={2}>{lesson.discipline.name}</Text>
        </Box>
        <Text textAlign={'center'} fontSize="14px">
          {lesson.parsed_lesson_type
            ? LessonTypes[lesson.parsed_lesson_type]
            : lesson.original_lesson_type}
        </Text>
        <Text color="gray.400" fontWeight="medium" fontSize="20px">
          {lesson.start_time?.slice(0, 5)} {lesson.end_time && '-'}{' '}
          {lesson.end_time?.slice(0, 5)}
        </Text>
      </VStack>
      <VStack w="40%" alignItems="end" justify={'center'} gap="0">
        <Text
          fontWeight="medium"
          fontSize="14px"
          w="100%"
          wordBreak="break-word"
          textAlign="center"
        >
          {getLessonBuilding(lesson.building_number, lesson.audience_number)}
        </Text>
      </VStack>
      <VStack alignItems="center" px={'5px'} justifyContent="center">
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
          <PopoverContent bgColor={popoverColor}>
            <PopoverArrow bg={popoverColor} />
            <PopoverHeader
              fontSize="16px"
              fontWeight={'bold'}
              color={mainTextColor}
            >
              {lesson.discipline.name}
            </PopoverHeader>
            <PopoverBody
              fontSize={'16px'}
              fontWeight={'medium'}
              color={mainTextColor}
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
      </VStack>
    </Box>
  );
}
