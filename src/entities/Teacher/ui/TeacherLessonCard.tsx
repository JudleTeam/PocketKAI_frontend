import { TeacherLesson } from '@/shared';
import { Box, VStack, Text } from '@chakra-ui/react';
import { getLessonBuilding, useColor } from '@/shared/lib';
import { useDisclosure } from '@chakra-ui/react';
import { LessonTypes } from '@/shared/constants';
export function TeacherLessonCard({ lesson }: { lesson: TeacherLesson }) {
  const { onOpen } = useDisclosure();
  const { mainTextColor } = useColor();
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
        <Text
          color={
            lesson.parsed_dates_status === 'need_check'
              ? '#ED8936'
              : mainTextColor
          }
          textAlign={'start'}
          w="100%"
          fontWeight="bold"
          fontSize="16px"
          noOfLines={2}
        >
          {lesson.parsed_dates_status === 'need_check' ? '! ' : null}
          {lesson.discipline.name}
        </Text>
        <Text textAlign={'center'} fontSize="16px">
          {lesson.parsed_lesson_type ? LessonTypes[lesson.parsed_lesson_type] : lesson.original_lesson_type}
        </Text>
        <Text color="gray.400" fontWeight="medium" fontSize="20px">
          {lesson.start_time?.slice(0, 5)} {lesson.end_time && '-'}{' '}
          {lesson.end_time?.slice(0, 5)}
        </Text>
      </VStack>
      <VStack w="40%" alignItems="center" justify={'center'} gap="0">
        <Text
          fontWeight="medium"
          fontSize="14px"
          w="80%"
          wordBreak="break-word"
          textAlign="center"
        >
          {getLessonBuilding(lesson.building_number, lesson.audience_number)}
        </Text>
      </VStack>
    </Box>
  );
}
