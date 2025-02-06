import { TeacherLesson } from '@/shared';
import { Box, VStack, Text } from '@chakra-ui/react';
import { getLessonBuilding, LessonTypes } from '@/shared';
import { useDisclosure } from '@chakra-ui/react';
import { LessonPopover } from './components/LessonPopover';
import { LessonStatus } from './components/LessonStatus';
import s from './TeacherLessonCard.module.scss';

export function TeacherLessonCard({
  lesson,
  openPopoverId,
  setOpenPopoverId,
  week,
}: {
  lesson: TeacherLesson;
  openPopoverId: string | null;
  setOpenPopoverId: (lessonId: string | null, week: 'even' | 'odd') => void;
  week: 'even' | 'odd';
}) {
  const { onOpen } = useDisclosure();

  return (
    <Box onClick={onOpen} className={s.root}>
      <VStack className={s.root__txt}>
        <LessonStatus lesson={lesson} />
        <Text className={s['root__txt-types']}>
          {lesson.parsed_lesson_type
            ? LessonTypes[lesson.parsed_lesson_type]
            : lesson.original_lesson_type}
        </Text>
        <Text className={s['root__txt-time']} color="gray.400">
          {lesson.start_time?.slice(0, 5)} {lesson.end_time && '-'}{' '}
          {lesson.end_time?.slice(0, 5)}
        </Text>
      </VStack>
      <VStack className={s.root__build}>
        <Text className={s['root__build-txt']}>
          {getLessonBuilding(lesson.building_number, lesson.audience_number)}
        </Text>
      </VStack>
      <VStack className={s.root__popover}>
        <LessonPopover
          lesson={lesson}
          openPopoverId={openPopoverId}
          setOpenPopoverId={setOpenPopoverId}
          week={week}
        />
      </VStack>
    </Box>
  );
}
