import { ProblemIcon, TeacherLesson, useColor } from '@/shared';
import { Box, Text } from '@chakra-ui/react';
import s from './LessonStatus.module.scss';

export const LessonStatus = ({ lesson }: { lesson: TeacherLesson }) => {
  const { mainTextColor } = useColor();
  const isProblem =
    lesson.parsed_dates_status === 'need_check' ||
    (lesson.parsed_dates_status === 'good' && lesson?.parsed_dates?.length > 0);

  return (
    <Box className={s.root} color={isProblem ? '#ED8936' : mainTextColor}>
      {isProblem && <ProblemIcon alignSelf="center" w="25px" h="25px" />}
      <Text noOfLines={2}>{lesson.discipline.name}</Text>
    </Box>
  );
};
