import { AnalyticsEvent, Lesson, useMetaThemeColor } from '@/shared';
import { Box, VStack, Text } from '@chakra-ui/react';
import { LessonTypes } from '@/shared/constants';
import { getLessonBuilding, useColor, useDisclosure } from '@/shared/lib';
import { ArrowIcon } from '@/shared/assets/chakraIcons/ArrowIcon';
import { memo } from 'react';
import { Drawer, DrawerTrigger, DrawerContent } from '@/shared/ui/drawer';
import { HideLesson } from '@/features';
import { LessonDrawer } from '../LessonDrawer/LessonDrawer';
import { useYaMetrika } from '@/entities';
export const FullLessonCard = memo(function FullLessonCard({
  lesson,
  variant = 'dark',
}: {
  lesson: Lesson;
  variant?: 'light' | 'dark';
}) {
  const { isOpen, setIsOpen } = useDisclosure();
  const { primaryColor, themeColor, mainColor, cardColor } = useColor();
  const { sendEvent } = useYaMetrika();

  useMetaThemeColor(mainColor, isOpen, themeColor);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <HideLesson lesson={lesson}>
        <DrawerTrigger asChild>
          <Box
            onClick={() => sendEvent(AnalyticsEvent.lessonOpenDrawer)}
            w="100%"
            bgColor={variant === 'dark' ? cardColor : 'none'}
            cursor={'pointer'}
            borderRadius="8px"
            padding="10px 15px"
            display="flex"
            justifyContent="space-between"
            transition="0.2s"
            _active={{ bgColor: mainColor, transition: '0.2s' }}
          >
            <VStack alignItems="start" gap="2px" w="70%">
              <Text
                color={primaryColor}
                w="95%"
                fontWeight="bold"
                fontSize={'clamp(15px, 4vw, 18px)'}
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
        <LessonDrawer lesson={lesson} />
      </DrawerContent>
    </Drawer>
  );
});
