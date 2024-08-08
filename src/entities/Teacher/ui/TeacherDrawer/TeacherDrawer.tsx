import { Text, Box, TabList, Tab, Tabs } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { LessonTypes, WEEK_DAYS } from '@/shared/constants';
import { DisciplineType } from '@/shared';
import { memo, useEffect, useState } from 'react';
import { useTeachers } from '../../model/teacher.store';
import { useColor } from '@/shared/lib';
import { Loader } from '@/shared/ui/loader/Loader';
import { TeacherLessonCard } from './TeacherLessonCard';
export const TeacherDrawer = memo(function TeacherDrawer({
  disciplineType,
  disciplineName,
}: {
  disciplineType: DisciplineType;
  disciplineName: string;
}) {
  const [weekParity, setWeekParity] = useState<'even' | 'odd'>('even');
  const { teacherScheduleStatus, teacherSchedule, getTeacherScheduleById } =
    useTeachers();
  useEffect(() => {
    if (disciplineType.teacher) {
      getTeacherScheduleById(disciplineType.teacher.id);
    }
  }, [disciplineType.teacher, getTeacherScheduleById]);
  const { mainTextColor, secondElementColor, secondElementLightColor } =
    useColor();
  return (
    <Box
      w="95%"
      h="100%"
      padding="40px 0 0 0"
      color={mainTextColor}
      display="flex"
      flexDirection="column"
      gap="5px"
    >
      <Text fontSize="24px" fontWeight="bold">
        {disciplineType.teacher?.name
          ? disciplineType.teacher?.name
          : 'Преподаватель кафедры'}
      </Text>
      <Box
        display="flex"
        flexDirection="column"
        fontSize="16px"
        padding="10px 0"
      >
        <Text color={mainTextColor}>{disciplineName}</Text>
        <Text>
          {disciplineType.parsed_type &&
            LessonTypes[disciplineType.parsed_type]}
        </Text>
        <Text
          as={Link}
          fontSize="14px"
          fontWeight="medium"
          color="orange.300"
          to="/account/report"
        >
          Сообщить об ошибке
        </Text>
      </Box>
      {disciplineType.teacher && (
        <Tabs variant="unstyled">
          <TabList
            display="flex"
            alignItems="center"
            justifyContent="space-around"
          >
            <Tab
              _selected={{
                color: secondElementLightColor,
                fontSize: '16px',
                boxShadow: `0 0 5px 0 rgba(0, 0, 0, 0.2)`,
                borderRadius: '4px',
              }}
              color={secondElementColor}
              fontWeight="medium"
              onClick={() => setWeekParity('even')}
            >
              Чётная неделя
            </Tab>
            <Tab
              _selected={{
                color: secondElementLightColor,
                fontSize: '16px',
                boxShadow: `0 0 5px 0 rgba(0, 0, 0, 0.2)`,
                borderRadius: '4px',
              }}
              color={secondElementColor}
              fontWeight="medium"
              onClick={() => setWeekParity('odd')}
            >
              Нечётная неделя
            </Tab>
          </TabList>

          <Box
            pos={'relative'}
            minH={'250px'}
            mt={'20px'}
            overflowY={'auto'}
            h="20%"
            onClick={(e) => e.stopPropagation()}
          >
            <Loader status={teacherScheduleStatus} idleMessage="">
              {teacherSchedule[weekParity].length > 0 ? (
                Object.values(WEEK_DAYS).map((day, index) => (
                  <Box>
                    <Text fontSize={22} fontWeight={'bold'}>
                      {day}
                    </Text>
                    {teacherSchedule[weekParity].map((lesson) => {
                      if (lesson.number_of_day === index + 1) {
                        return (
                          <TeacherLessonCard lesson={lesson} key={lesson.id} />
                        );
                      }
                    })}
                  </Box>
                ))
              ) : (
                <Text textAlign={'center'}>Пар нет</Text>
              )}
            </Loader>
          </Box>
        </Tabs>
      )}
    </Box>
  );
});
