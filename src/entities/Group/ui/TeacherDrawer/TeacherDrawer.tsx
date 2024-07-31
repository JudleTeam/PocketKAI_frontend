import {
  DrawerHeader,
  DrawerContent,
  DrawerCloseButton,
  Text,
  VStack,
  Box,
  Avatar,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { parityTypes } from '@/shared/constants';
import { LessonTypes } from '@/entities';
import { Lesson } from '@/shared';
import { getLessonBuilding } from '@/entities';
export function TeacherDrawer({ lesson }: { lesson: Lesson }) {
  const mainTextColor = useColorModeValue('light.main_text', 'dark.main_text');
  return (
    <DrawerContent
      minH="70vh"
      maxH="100%"
      borderRadius="16px 16px 0 0"
      display="flex"
      flex={1}
      flexDirection="column"
      alignItems="center"
    >
      <DrawerCloseButton />
      <DrawerHeader
        w="95%"
        padding="40px 0 0 0"
        color={mainTextColor}
        display="flex"
        flexDirection="column"
        gap="5px"
      >
        <Text fontSize="24px" fontWeight="bold">
          {lesson.discipline.name}
        </Text>
        <Text fontSize="24px" fontWeight="medium">
          {lesson.start_time?.slice(0, -3)} {lesson.end_time && '-'}{' '}
          {lesson.end_time?.slice(0, -3)}
        </Text>
        <Box
          display="flex"
          justifyContent="space-between"
          fontSize="16px"
          padding="10px 0"
        >
          <VStack
            w="45%"
            display="flex"
            alignItems="start"
            gap="2px"
            textAlign="start"
          >
            <Text>
              {lesson.parsed_parity && parityTypes[lesson.parsed_parity]}
            </Text>
          </VStack>
          <VStack
            w="55%"
            display="flex"
            alignItems="end"
            gap="2px"
            textAlign="end"
          >
            <Text>
              {getLessonBuilding(
                lesson.building_number,
                lesson.audience_number
              )}
            </Text>
            <Text>
              {lesson.parsed_lesson_type &&
                LessonTypes[lesson.parsed_lesson_type]}
            </Text>
          </VStack>
        </Box>
        <Text
        as={Link}
          padding="10px 0"
          fontSize="14px"
          fontWeight="medium"
          color="orange.300"
          to='/account/report'
        >
          Сообщить об ошибке
        </Text>
        {lesson.teacher && (
          <Box
            boxShadow="0px 0px 5px 0px #00000020"
            borderRadius="16px"
            padding="14px"
            display="flex"
            alignItems="center"
            gap="15px"
          >
            <Avatar />
            <Box>
              <Text fontSize="16px" fontWeight="medium">
                {lesson?.teacher?.name}
              </Text>
              <Text fontSize="12px" fontWeight="medium">
                {lesson.department?.name}
              </Text>
            </Box>
          </Box>
        )}
      </DrawerHeader>
    </DrawerContent>
  );
}
