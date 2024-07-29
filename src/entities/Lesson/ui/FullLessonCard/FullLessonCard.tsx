import { Lesson } from '@/shared';
import { Box, VStack, Text } from '@chakra-ui/react';
import { LessonTypes } from '../../constants/lessonTypes';
import { getLessonBuilding } from '../../lib/getLessonBuilding';
import { ArrowIcon } from '@/shared/assets/chakraIcons/ArrowIcon';
import { sliceLessonName } from '../../lib/sliceLessonName';
import { FullLessonDrawer } from '../FullLessonDrawer/FullLessonDrawer';
import { useDisclosure } from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/react';
import { useRef } from 'react';
import { UiDrawer } from '@/shared/ui/ui-drawer/UiDrawer';
export function FullLessonCard({ lesson }: { lesson: Lesson }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);
  const mainTextColor = useColorModeValue('light.main_text', 'dark.main_text');
  const cardColor = useColorModeValue('light.card', 'dark.card');
  return (
    <>
      <Box
        onClick={onOpen}
        w="100%"
        bgColor={cardColor}
        borderRadius="8px"
        padding="10px 15px"
        display="flex"
        justifyContent="space-between"
      >
        <VStack alignItems="start" gap="2px" w="60%">
          <Text color={mainTextColor} fontWeight="bold" fontSize="18px">
            {sliceLessonName(lesson.discipline.name)}
          </Text>
          <Text color="gray.400" fontWeight="medium" fontSize="22px">
            {lesson.start_time?.slice(0, 5)} {lesson.end_time && '-'}{' '}
            {lesson.end_time?.slice(0, 5)}
          </Text>
        </VStack>
        <VStack w="40%" alignItems="center" gap="0">
          <Text fontWeight="medium" fontSize="14px">
            {lesson.parsed_lesson_type &&
              LessonTypes[lesson.parsed_lesson_type]}
          </Text>
          <Text fontWeight="medium" fontSize="14px" w="60%" textAlign="center">
            {getLessonBuilding(lesson.building_number, lesson.audience_number)}
          </Text>
        </VStack>
        <VStack alignItems="center" justifyContent="center">
          <ArrowIcon transform="rotate(90deg)" color="gray.400"></ArrowIcon>
        </VStack>
      </Box>
      <UiDrawer
        isOpen={isOpen}
        onClose={onClose}
        btnRef={btnRef}
        drawerActions={FullLessonDrawer({ lesson, isOpen, onClose })}
      />
    </>
  );
}
