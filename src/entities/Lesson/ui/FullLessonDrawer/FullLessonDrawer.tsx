import {
  Text,
  VStack,
  Box,
  Avatar,
  useColorModeValue,
  useChakra,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverBody,
  PopoverTrigger,
  useToast,
} from '@chakra-ui/react';
import { copyToast, Lesson } from '@/shared';
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';
import { getLessonBuilding, useColor } from '@/shared/lib';
import { LessonTypes } from '@/shared/constants';
import { parityTypes } from '@/shared/constants';
import { HashLink } from 'react-router-hash-link';

export function FullLessonDrawer({
  lesson,
}: {
  lesson: Lesson;
}) {
  const { theme } = useChakra();
  const tab = useColorModeValue(theme.colors.light.tab, theme.colors.dark.tab);
  const mainTextColor = useColorModeValue('light.main_text', 'dark.main_text');
  const mainElementColor = useColorModeValue(
    'light.main_element',
    'dark.main_element'
  );
  const { cardColor, tabTeacher } = useColor();
  const toast = useToast();
  return (
    <Box
      padding="15px 0 0 0"
      color={mainTextColor}
      display="flex"
      flexDirection="column"
      gap="5px"
    >
      <Text
        fontSize="24px"
        fontWeight="bold"
        onClick={() => copyToast(lesson.discipline.name, toast)}
      >
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
      {lesson.parsed_dates && lesson.parsed_dates_status === 'good' ? (
        <Text fontWeight="medium" fontSize="18px" color={mainTextColor}>
          Даты проведения пары:{' '}
          {lesson.parsed_dates
            .map((date) =>
              DateTime.fromISO(date).setLocale('ru').toFormat('dd MMMM')
            )
            .join(', ')}
        </Text>
      ) : lesson.parsed_dates && lesson.parsed_dates_status === 'need_check' ? (
        <Popover>
          <PopoverTrigger>
            <button
              style={{
                display: 'flex',
                textAlign: 'start',
                flexWrap: 'wrap',
                width: '100%',
                color: '#ED8936',
                fontWeight: '500',
                fontSize: '18px',
              }}
            >
              Даты проведения пары: {lesson.original_dates}
            </button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverBody fontSize="14px">
              <Text fontSize={'14px'} color={mainTextColor}>
                {lesson.parsed_dates
                  .map((date) =>
                    DateTime.fromISO(date).setLocale('ru').toFormat('dd MMMM')
                  )
                  .join(', ')}
              </Text>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      ) : lesson.original_dates &&
        lesson.parsed_dates_status == 'need_check' ? (
        <Text fontWeight="medium" fontSize="18px" color={mainTextColor}>
          Даты проведения пары: {lesson.original_dates}
        </Text>
      ) : null}
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
      <Box
        as={HashLink}
        to={
          lesson.teacher
            ? `/teachers#${lesson?.teacher?.id}&${lesson.discipline.id}`
            : '/teachers'
        }
        boxShadow={`0px 0px 5px 0px ${tab}`}
        bgColor={cardColor}
        borderRadius="16px"
        padding="14px"
        display="flex"
        alignItems="center"
        gap="15px"
        transition="0.2s"
        _active={{ bgColor: tabTeacher, transition: '0.2s' }}
      >
        <Avatar bg={mainElementColor} />
        <Box>
          <Text fontSize="16px" fontWeight="medium">
            {lesson?.teacher?.name
              ? lesson.teacher.name
              : 'Преподаватель кафедры'}
          </Text>
          <Text fontSize="12px" fontWeight="medium">
            {lesson.department?.name}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
