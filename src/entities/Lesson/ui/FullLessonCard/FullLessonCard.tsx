import { Lesson } from '@/shared';
import { Box, VStack, Text, useChakra } from '@chakra-ui/react';
import { LessonTypes } from '@/shared/constants';
import { getLessonBuilding } from '@/shared/lib';
import { ArrowIcon } from '@/shared/assets/chakraIcons/ArrowIcon';
import { FullLessonDrawer } from '../FullLessonDrawer/FullLessonDrawer';
import { useDisclosure } from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/react';
import { UiDrawer } from '@/shared/ui/ui-drawer/UiDrawer';
import { memo, useEffect } from 'react';
export const FullLessonCard = memo(function FullLessonCard({
  lesson,
  variant = 'dark',
}: {
  lesson: Lesson;
  variant?: 'light' | 'dark';
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const mainTextColor = useColorModeValue('light.main_text', 'dark.main_text');
  const cardColor = useColorModeValue('light.card', 'dark.card');
  const themeColor = useColorModeValue('#858585', '#0E1117');
  const { theme } = useChakra();
  const mainColor = useColorModeValue(
    theme.colors.light.main,
    theme.colors.dark.main
  );
  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      if (isOpen) {
        metaThemeColor.setAttribute('content', themeColor);
      } else {
        metaThemeColor.setAttribute('content', mainColor);
      }
    }
  }, [themeColor, mainColor, isOpen]);

  return (
    <>
      <Box
        onClick={onOpen}
        w="100%"
        bgColor={variant === 'dark' ? cardColor : 'none'}
        borderRadius="8px"
        padding="10px 15px"
        display="flex"
        justifyContent="space-between"
      >
        <VStack alignItems="start" gap="2px" w="60%">
          <Text color={mainTextColor} w="95%" fontWeight="bold" fontSize="16px" noOfLines={2}>
            {lesson.discipline.name}
          </Text>
          <Text color="gray.400" fontWeight="medium" fontSize="20px">
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
        drawerActions={FullLessonDrawer({ lesson })}
      />
    </>
  );
})