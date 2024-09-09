import { Lesson } from '@/shared';
import { Box, VStack, Text } from '@chakra-ui/react';
import { LessonTypes } from '@/shared/constants';
import { getLessonBuilding, useColor, useDisclosure } from '@/shared/lib';
import { ArrowIcon } from '@/shared/assets/chakraIcons/ArrowIcon';
import { FullLessonDrawer } from '../FullLessonDrawer/FullLessonDrawer';
import { memo, useEffect } from 'react';
import { Drawer, DrawerTrigger, DrawerContent } from '@/shared/ui/drawer';
import { HideLesson } from '@/features';
export const FullLessonCard = memo(function FullLessonCard({
  lesson,
  variant = 'dark',
}: {
  lesson: Lesson;
  variant?: 'light' | 'dark';
}) {
  const { isOpen, setIsOpen } = useDisclosure();
  const { mainTextColor, themeColor, mainColor, cardColor, tabTeacher } =
    useColor();
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
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <HideLesson lesson={lesson}>
        <DrawerTrigger asChild>
          <Box
            w="100%"
            bgColor={variant === 'dark' ? cardColor : 'none'}
            borderRadius="8px"
            padding="10px 15px"
            display="flex"
            justifyContent="space-between"
            transition="0.2s"
            _active={{ bgColor: tabTeacher, transition: '0.2s' }}
          >
            <VStack alignItems="start" gap="2px" w="70%">
              <Text
                color={mainTextColor}
                w="95%"
                fontWeight="bold"
                fontSize={'clamp(15px, 4.5vw, 18px)'}
                noOfLines={2}
              >
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
              <Text
                fontWeight="medium"
                fontSize="14px"
                w="80%"
                textAlign="center"
              >
                {getLessonBuilding(
                  lesson.building_number,
                  lesson.audience_number
                )}
              </Text>
            </VStack>
            <VStack alignItems="center" justifyContent="center">
              <ArrowIcon transform="rotate(90deg)" color="gray.400" />
            </VStack>
          </Box>
        </DrawerTrigger>
      </HideLesson>
      <DrawerContent>
        <FullLessonDrawer lesson={lesson} />
      </DrawerContent>
    </Drawer>
  );
});
