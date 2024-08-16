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
  PopoverBody,
  PopoverArrow,
  PopoverHeader,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { WEEK_DAYS } from '@/shared/constants';
import { Teacher } from '@/shared';
import { useEffect, useState } from 'react';
import { useTeachers } from '../../model/teacher.store';
import { useColor } from '@/shared/lib';
import { Loader } from '@/shared/ui/loader/Loader';
import { TeacherLessonCard } from '../TeacherLessonCard';
import React from 'react';
export function SearchedTeacherDrawer({ teacher }: { teacher: Teacher }) {
  const [weekParity, setWeekParity] = useState<'even' | 'odd'>('even');
  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);
  const { teacherScheduleStatus, teacherSchedule, getTeacherScheduleById } =
    useTeachers();
  useEffect(() => {
    if (teacher) {
      getTeacherScheduleById(teacher.id);
    }
  }, [teacher, getTeacherScheduleById]);

  const {
    mainTextColor,
    mainColor,
    drawerColor,
    secondElementColor,
    secondElementLightColor,
    cardColor,
  } = useColor();
  return (
    <Box
      w="95%"
      h="100%"
      padding="25px 0 0 0"
      color={mainTextColor}
      display="flex"
      flexDirection="column"
      gap="5px"
    >
      <Text fontSize="24px" fontWeight="bold">
        {teacher?.name ?? 'Преподаватель кафедры'}
      </Text>
      <Box
        display="flex"
        flexDirection="column"
        fontSize="16px"
        padding="10px 0"
      >
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
      {teacher && (
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
                          <Popover
                            placement="bottom"
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
                                  {lesson.groups.map((group) => (
                                    <React.Fragment key={group.id}>
                                      {group.group_name}{' '}
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
}
