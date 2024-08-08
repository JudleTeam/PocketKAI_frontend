import { TeacherLesson } from '@/shared';
import { Box, VStack, Text } from '@chakra-ui/react';
import { getLessonBuilding, useColor } from '@/shared/lib';
import { useDisclosure } from '@chakra-ui/react';
export function TeacherLessonCard({ lesson }: { lesson: TeacherLesson }) {
  const { onOpen } = useDisclosure();
  const { mainTextColor } = useColor();
  return (
    <Box
      onClick={onOpen}
      w="100%"
      borderRadius="8px"
      padding="8px 0"
      display="flex"
      justifyContent="space-between"
    >
      <VStack alignItems="start" gap="2px" w="60%">
        <Text color={mainTextColor} w="100%" fontWeight="bold" fontSize="16px">
          {lesson.discipline.name}
        </Text>
        <Text color="gray.400" fontWeight="medium" fontSize="20px">
          {lesson.start_time?.slice(0, 5)} {lesson.end_time && '-'}{' '}
          {lesson.end_time?.slice(0, 5)}
        </Text>
      </VStack>
      <VStack w="40%" alignItems="flex-end" justify={'center'} gap="0">
        <Text fontWeight="medium" fontSize="14px" w="60%" textAlign="center">
          {getLessonBuilding(lesson.building_number, lesson.audience_number)}
        </Text>
      </VStack>
    </Box>
  );
}
