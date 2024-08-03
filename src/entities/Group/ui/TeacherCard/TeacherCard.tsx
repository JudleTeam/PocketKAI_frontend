import {
  Box,
  Text,
  Divider,
  Avatar,
  useColorModeValue,
} from '@chakra-ui/react';
import { ArrowIcon } from '@/shared/assets';
import { LessonTypes } from '@/entities';
import { Lesson } from '@/shared';
import { UiDrawer } from '@/shared/ui/ui-drawer/UiDrawer';
import { useDisclosure } from '@chakra-ui/react';
import { TeacherDrawer } from '../TeacherDrawer/TeacherDrawer';
import { sliceLessonName } from '@/entities';
export function TeacherCard({ lesson }: { lesson: Lesson }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const mainTextColor = useColorModeValue('light.main_text', 'dark.main_text');
  return (
    <Box>
      <Box
        onClick={onOpen}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        padding="10px 0"
      >
        <Box display="flex" gap="10px" alignItems="center">
          <Avatar></Avatar>
          <Box>
          <Text color={mainTextColor} fontWeight="bold" fontSize="14px">
              {lesson.teacher?.name}
            </Text>
            <Text color={mainTextColor} fontWeight="medium" fontSize="14px">
              {sliceLessonName(lesson.discipline.name)}
            </Text>
            <Box fontSize='14px'>
            {lesson.parsed_lesson_type &&
              LessonTypes[lesson.parsed_lesson_type]}
            </Box>
          </Box>
        </Box>
        <ArrowIcon transform="rotate(90deg)"></ArrowIcon>
      </Box>
      <Divider></Divider>
      <UiDrawer
        isOpen={isOpen}
        onClose={onClose}
        drawerActions={TeacherDrawer({lesson})}
      ></UiDrawer>
    </Box>
  );
}
