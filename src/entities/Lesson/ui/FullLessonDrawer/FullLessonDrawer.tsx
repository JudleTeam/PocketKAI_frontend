import {
  DrawerHeader,
  Text,
  VStack,
  Box,
  Avatar,
  useColorModeValue,
} from '@chakra-ui/react';
import { Lesson } from '@/shared';
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';
import { getLessonBuilding } from '../../../../shared/lib/helpers/getLessonBuilding';
import { LessonTypes } from '../../../../shared/constants/lessonTypes';
import { parityTypes } from '@/shared/constants';
export function FullLessonDrawer({ lesson }: { lesson: Lesson }) {
  const mainTextColor = useColorModeValue('light.main_text', 'dark.main_text');
  return (
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
          <Text>{parityTypes[lesson.parsed_parity]}</Text>
        </VStack>
        <VStack
          w="55%"
          display="flex"
          alignItems="end"
          gap="2px"
          textAlign="end"
        >
          <Text>
            {getLessonBuilding(lesson.building_number, lesson.audience_number)}
          </Text>
          <Text>
            {lesson.parsed_lesson_type &&
              LessonTypes[lesson.parsed_lesson_type]}
          </Text>
        </VStack>
      </Box>
      {lesson.parsed_dates && (
        <Text fontWeight="medium" fontSize="18px">
          Даты проведения пары:{' '}
          {lesson.parsed_dates
            .map((date) =>
              DateTime.fromISO(date).setLocale('ru').toFormat('dd MMMM')
            )
            .join(', ')}
        </Text>
      )}
      <Text
        as={Link}
        padding="10px 0"
        fontSize="14px"
        fontWeight="medium"
        color="orange.300"
        to="/account/report"
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
  );
}
