import { Text, Box, TabList, Tab, Tabs, Divider } from '@chakra-ui/react';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { Link } from 'react-router-dom';
import { LessonTypes, WEEK_DAYS } from '@/shared/constants';
import React, { useEffect, useState } from 'react';
import { useTeachers } from '../../model/teacher.store';
import { useColor } from '@/shared/lib';
import { Loader } from '@/shared/ui/loader/Loader';
import { TeacherLessonCard } from '../TeacherLessonCard';
import { TeacherDisciplineType } from '../../model/types';
export const TeacherDrawer = function TeacherDrawer({
  disciplineType,
  disciplineName,
}: {
  disciplineType: TeacherDisciplineType;
  disciplineName: string;
}) {
  const [weekParity, setWeekParity] = useState<'even' | 'odd'>('even');
  const {
    teacherScheduleStatus,
    teacherSchedule,
    getTeacherScheduleById,
    clearTeacherSchedule,
  } = useTeachers();
  useEffect(() => {
    clearTeacherSchedule();
    const timeoutId = setTimeout(() => {
      if (disciplineType.teacher) {
        getTeacherScheduleById(disciplineType.teacher.id);
      }
    }, 200);
    return () => clearTimeout(timeoutId);
  }, [disciplineType.teacher, getTeacherScheduleById, clearTeacherSchedule]);

  const {
    mainTextColor,
    mainColor,
    drawerColor,
    secondElementColor,
    secondElementLightColor,
  } = useColor();
  return (
    <Box
      h="100%"
      pt={5}
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
        <Text display="flex" flexWrap={'wrap'} gap="0 10px">
          {disciplineType.parsed_types.length > 0
            ? disciplineType.parsed_types.map((parsed_type) => (
                <React.Fragment key={parsed_type}>
                  {LessonTypes && LessonTypes[parsed_type]}{' '}
                </React.Fragment>
              ))
            : disciplineType.original_types.map((original_type) => (
                <React.Fragment key={original_type}>
                  {original_type}{' '}
                </React.Fragment>
              ))}
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
        <Tabs
          variant="unstyled"
          overflowY={'auto'}
          style={{ scrollbarWidth: 'none' }}
        >
          <TabList
            padding="5px"
            position="sticky"
            top="0"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            backgroundColor={drawerColor}
            zIndex={100}
            boxShadow={`0 0 10px 10px ${drawerColor}`}
          >
            <Tab
              _selected={{
                color: secondElementLightColor,
                fontSize: '16px',
                boxShadow: `0 0 5px 0 rgba(0, 0, 0, 0.2)`,
                borderRadius: '4px',
                bgColor: mainColor,
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
                bgColor: mainColor,
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
            minH={200}
            mb={'30px'}
            onClick={(e) => e.stopPropagation()}
            display="flex"
            flexDirection="column"
            gap="10px"
          >
            <Loader status={teacherScheduleStatus} idleMessage="">
              {teacherSchedule[weekParity].length > 0 ? (
                Object.values(WEEK_DAYS).map((day, index) => {
                  const filteredTeacherSchedule = teacherSchedule[
                    weekParity
                  ].filter((lesson) => lesson.number_of_day === index + 1);
                  return (
                    <Box>
                      <Text
                        fontSize={20}
                        fontWeight={'medium'}
                        padding="10px 0"
                      >
                        {day}
                      </Text>
                      {filteredTeacherSchedule.length > 0 ? (
                        filteredTeacherSchedule.map((lesson) => (
                          <Popover>
                            <PopoverTrigger asChild>
                              <button style={{ width: '100%' }}>
                                <TeacherLessonCard
                                  lesson={lesson}
                                  key={lesson.id}
                                />
                              </button>
                            </PopoverTrigger>
                            <PopoverContent className="bg-white">
                              <h4
                                className={`text-sm font-medium text-[${mainTextColor}] `}
                              >
                                {lesson.discipline.name}
                              </h4>
                              <div className="flex flex-col text-md gap-2 font-medium">
                                color={mainTextColor}
                                {lesson.parsed_dates_status ===
                                'good' ? null : (
                                  <Text>
                                    Даты проведения: {lesson.original_dates}
                                  </Text>
                                )}
                              </div>
                              <Box>
                                <Box display="flex" flexWrap={'wrap'}>
                                  <Text>Группы:&nbsp;</Text>
                                  {lesson.groups.map((group) => (
                                    <React.Fragment key={group.id}>
                                      {group.group_name}{' '}
                                    </React.Fragment>
                                  ))}
                                </Box>
                              </Box>
                            </PopoverContent>
                          </Popover>
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
                <Text padding="15px 0" textAlign={'center'}>
                  Пар нет
                </Text>
              )}
            </Loader>
          </Box>
        </Tabs>
      )}
    </Box>
  );
};
