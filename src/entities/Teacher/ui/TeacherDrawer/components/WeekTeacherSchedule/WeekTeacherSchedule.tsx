import { useSettings, useTeachers } from '@/entities';
import { useColor, WEEK_DAYS } from '@/shared';
import { Text, Box, Divider } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { TeacherLessonCard } from '../../../TeacherLessonCard/TeacherLessonCard';

type WeekTeacherScheduleProps = {
  weekParity: 'even' | 'odd';
};

const WeekTeacherSchedule: React.FC<WeekTeacherScheduleProps> = ({
  weekParity,
}) => {
  const [openPopoverIdEven, setOpenPopoverIdEven] = useState<string | null>(
    null
  );
  const [openPopoverIdOdd, setOpenPopoverIdOdd] = useState<string | null>(null);
  const { primaryColor, secondaryColor } = useColor();
  const { teacherSchedule } = useTeachers();
  const { isColoredDayDate } = useSettings();
  const openPopoverId =
    weekParity === 'even' ? openPopoverIdEven : openPopoverIdOdd;

  useEffect(() => {
    if (weekParity === 'even') {
      setOpenPopoverIdOdd(null);
    }
    if (weekParity === 'odd') {
      setOpenPopoverIdEven(null);
    }
  }, [weekParity]);

  const handlePopoverOpen = (lessonId: string | null, week: 'even' | 'odd') => {
    if (week === 'even') {
      setOpenPopoverIdEven((prevId) => (prevId === lessonId ? null : lessonId));
    } else {
      setOpenPopoverIdOdd((prevId) => (prevId === lessonId ? null : lessonId));
    }
  };

  return teacherSchedule[weekParity].length > 0 ? (
    Object.values(WEEK_DAYS).map((day, index) => {
      const filteredTeacherSchedule = teacherSchedule[weekParity].filter(
        (lesson) => lesson.number_of_day === index + 1
      );
      return (
        <Box key={day} py={2}>
          <Box
            display={'flex'}
            alignItems={'center'}
            bgColor={isColoredDayDate ? secondaryColor : ''}
            _active={{ opacity: 0.5, bgColor: 'gray.200' }}
            transition={'0.2s'}
            borderRadius="16px"
            py="5px"
            px={isColoredDayDate ? '15px' : '10px'}
            my={1}
            w={'fit-content'}
            color={`${primaryColor}e6`}
            fontWeight="medium"
            fontSize="16px"
          >
            <Text>{day}</Text>
          </Box>
          {filteredTeacherSchedule.length > 0 ? (
            filteredTeacherSchedule.map((lesson) => (
              <TeacherLessonCard
                key={lesson.id}
                lesson={lesson}
                openPopoverId={openPopoverId}
                setOpenPopoverId={handlePopoverOpen}
                week={weekParity}
              />
            ))
          ) : (
            <Text padding="5px 0" fontSize="16px" fontWeight="bold">
              Выходной
            </Text>
          )}
          <Divider padding="10px 0" />
        </Box>
      );
    })
  ) : (
    <Box height={'40vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
      <Text padding="15px 0" textAlign={'center'}>
        Пар нет
      </Text>
    </Box>
  );
};

export default WeekTeacherSchedule;
