import { FullLessonCard } from '@/entities';
import { DayNameWithShareFull } from '@/features';
import { DayName, IHiddenLessons, Lesson, useColor } from '@/shared';
import { VStack } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import s from './WeekDay.module.scss';

type WeekDayProps = {
  dayName: string;
  weekParity: 'odd' | 'even';
  dayLessons: Lesson[];
  allLessonsHidden: boolean;
  hiddenLessonsExist: boolean;
  hiddenLessons: IHiddenLessons[];
  isSwiper: boolean;
};

const WeekDay: React.FC<WeekDayProps> = ({
  dayName,
  weekParity,
  dayLessons,
  allLessonsHidden,
  hiddenLessonsExist,
  hiddenLessons,
  isSwiper,
}) => {
  const { cardColor, primaryColor, mainColor } = useColor();
  return (
    <Box id={dayName + weekParity}>
      <Box
        zIndex={20}
        position="relative"
        boxShadow={isSwiper ? `0 5px 5px 5px ${mainColor}` : 'none'}
      >
        <DayNameWithShareFull
          dayName={dayName as DayName}
          dayLessons={dayLessons}
          weekParity={weekParity}
          hiddenLessonsExist={hiddenLessonsExist}
        />
      </Box>
      {allLessonsHidden ? (
        <VStack px={1} pt={4} h={isSwiper ? { base: '68dvh', md: '76.8dvh' } : 'auto'}>
          <Box
            w="100%"
            bgColor={cardColor}
            borderRadius="8px"
            padding="10px 15px"
            color={primaryColor}
            fontWeight="bold"
            fontSize={'clamp(15px, 4.5vw, 18px)'}
          >
            Время отдыхать
          </Box>
        </VStack>
      ) : (
        <VStack
          px={1}
          pt={3}
          pb={isSwiper ? 10 : 3}
          gap="10px"
          overflowY={isSwiper ? 'scroll' : 'initial'}
          overflowX={'hidden'}
          h={isSwiper ? { base: '68dvh', md: '76.8dvh' } : 'auto'}
          style={{ scrollbarWidth: 'none' }}
        >
          {dayLessons.map((lesson) => {
            const isLessonHidden = hiddenLessons.some(
              (hiddenLesson) =>
                hiddenLesson.lesson.id === lesson.id &&
                (weekParity === hiddenLesson.lesson.type_hide ||
                  hiddenLesson.lesson.type_hide === 'always')
            );

            if (!isLessonHidden) {
              if (
                lesson.parsed_dates ||
                lesson.parsed_dates_status === 'need_check'
              ) {
                return (
                  <Box className={s.faded} key={lesson.id}>
                    <FullLessonCard lesson={lesson} />
                  </Box>
                );
              }
              return <FullLessonCard lesson={lesson} key={lesson.id} />;
            }
            return null;
          })}
        </VStack>
      )}
    </Box>
  );
};

export default WeekDay;
