import {
  Text,
  Box,
  TabList,
  Tab,
  Tabs,
  Divider,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
  useToast,
} from '@chakra-ui/react';

import { Link } from 'react-router-dom';
import { LessonTypes, WEEK_DAYS } from '@/shared/constants';
import React, { useEffect, useState } from 'react';
import { useTeachers } from '../../model/teacher.store';
import { useColor } from '@/shared/lib';
import { Loader } from '@/shared/ui/loader/Loader';
import { TeacherLessonCard } from '../TeacherLessonCard';
import { TeacherDisciplineType } from '../../model/types';
import { getWeekParity } from '@/shared/lib';
import { CopyIcon } from '@chakra-ui/icons';
import { copyToast } from '@/shared';
export const TeacherDrawer = function TeacherDrawer({
  disciplineType,
  disciplineName,
}: {
  disciplineType: TeacherDisciplineType;
  disciplineName: string;
}) {
  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);

  const [weekParity, setWeekParity] = useState<'even' | 'odd'>(getWeekParity());
  const numberParity = {
    even: 0,
    odd: 1,
  };
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
    cardColor,
  } = useColor();
  const toast = useToast();
  return (
    <Box
      h="100%"
      position="relative"
      pt={3}
      color={mainTextColor}
      display="flex"
      flexDirection="column"
      gap="5px"
    >
      <Text
        fontSize="24px"
        fontWeight="bold"
        onClick={() => {
          const teacherName =
            disciplineType.teacher?.name || 'Преподаватель кафедры';
          copyToast(teacherName, toast);
        }}
        _active={{ textDecoration: 'underline', transition: '0.2s' }}
      >
        <CopyIcon />{' '}
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
          defaultIndex={numberParity[weekParity]}
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
                bgColor: cardColor,
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
                bgColor: cardColor,
              }}
              color={secondElementColor}
              fontWeight="medium"
              onClick={() => setWeekParity('odd')}
            >
              Нечётная неделя
            </Tab>
          </TabList>
          <Box
            minH={200}
            mb={'30px'}
            onClick={(e) => e.stopPropagation()}
            display="flex"
            flexDirection="column"
            gap="10px"
            position="relative" 
          >
            <Loader status={teacherScheduleStatus} idleMessage="">
              {teacherSchedule[weekParity].length > 0 ? (
                Object.values(WEEK_DAYS).map((day, index) => {
                  const filteredTeacherSchedule = teacherSchedule[
                    weekParity
                  ].filter((lesson) => lesson.number_of_day === index + 1);
                  return (
                    <Box
                      position="relative"
                      key={day}
                      {...(index !== 0 ? { 'data-vaul-no-drag': true } : {})}
                    >
                      <Text
                        fontSize={20}
                        fontWeight={'medium'}
                        padding="10px 0"
                      >
                        {day}
                      </Text>
                      {filteredTeacherSchedule.length > 0 ? (
                        filteredTeacherSchedule.map((lesson) => (
                          <Popover
                            isLazy
                            key={lesson.id}
                            isOpen={openPopoverId === lesson.id}
                            onOpen={() =>
                              lesson.id && setOpenPopoverId(lesson.id)
                            }
                            onClose={() => setOpenPopoverId(null)}
                          >
                            <PopoverTrigger>
                              <button style={{ width: '100%' }}>
                                <TeacherLessonCard
                                  lesson={lesson}
                                  key={lesson.id}
                                />
                              </button>
                            </PopoverTrigger>
                            <PopoverContent bgColor={mainColor}>
                              <PopoverArrow bg={mainColor} />
                              <PopoverHeader
                                fontSize="16px"
                                fontWeight={'bold'}
                                color={mainTextColor}
                              >
                                {lesson.discipline.name}
                              </PopoverHeader>
                              <PopoverBody
                                fontSize={'16px'}
                                fontWeight={'medium'}
                                color={mainTextColor}
                                display="flex"
                                flexDirection={'column'}
                                gap="5px"
                              >
                                {lesson.parsed_dates_status ===
                                'good' ? null : (
                                  <Text>
                                    Даты проведения: {lesson.original_dates}
                                  </Text>
                                )}
                                <Box display="flex" flexWrap={'wrap'}>
                                  <Text>Группы:&nbsp;</Text>
                                  {lesson.groups.map((group, index) => (
                                    <React.Fragment key={group.id}>
                                      {`${group.group_name}${
                                        lesson.groups.length - 1 === index
                                          ? ''
                                          : ', '
                                      }`}
                                    </React.Fragment>
                                  ))}
                                </Box>
                              </PopoverBody>
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
