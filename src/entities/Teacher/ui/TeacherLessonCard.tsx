import { TeacherLesson } from '@/shared';
import { Box, VStack, Text } from '@chakra-ui/react';
import { getLessonBuilding, useColor } from '@/shared/lib';
import { useDisclosure } from '@chakra-ui/react';
import { LessonTypes } from '@/shared/constants';
import { ElipsisIcon } from '@/shared/assets/chakraIcons/ElipsisIcon';
import { ProblemIcon } from '@/shared/assets';
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
      transition='0.2s'
      _active={{opacity: 0.5, transition: '0.2s'}}
    >
      <VStack alignItems="start" gap="2px" w="100%">
        <Box
          color={
            lesson.parsed_dates_status === 'need_check'
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
          {lesson.parsed_dates_status === 'need_check' ?
          <ProblemIcon alignSelf={'center'} w={'25px'} h={'25px'}></ProblemIcon>
          : null}
          <Text noOfLines={2}>
          {lesson.discipline.name}
          </Text>
        </Box>
        <Text textAlign={'center'} fontSize="14px">
          {lesson.parsed_lesson_type ? LessonTypes[lesson.parsed_lesson_type] : lesson.original_lesson_type}
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
      <VStack alignItems='center' justifyContent='center'>
        <ElipsisIcon w='25px' h='25px' color={mainTextColor}/> 
      </VStack>
    </Box>
  );
}
