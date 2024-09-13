import {
  Text,
  Box,
  TabList,
  Tab,
  Tabs,
  Divider,
  useToast,
  useColorModeValue,
} from '@chakra-ui/react';

import { Link } from 'react-router-dom';
import { LessonTypes, WEEK_DAYS } from '@/shared/constants';
import React, { useEffect, useRef, useState } from 'react';
import { useTeachers } from '../../model/teacher.store';
import { useColor } from '@/shared/lib';
import { Loader } from '@/shared/ui/loader/Loader';
import { TeacherLessonCard } from '../TeacherLessonCard';
import { TeacherDisciplineType } from '../../model/types';
import { getWeekParity } from '@/shared/lib';
import { copyToast } from '@/shared';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { useSettings } from '@/entities';
export const TeacherDrawer = function TeacherDrawer({
  disciplineType,
  disciplineName,
  activeSnapPoint,
  setActiveSnapPoint,
}: {
  disciplineType: TeacherDisciplineType;
  disciplineName: string;
  activeSnapPoint: number | string;
  setActiveSnapPoint: (snapPoint: number) => void;
}) {
  const [openPopoverIdEven, setOpenPopoverIdEven] = useState<string | null>(
    null
  ); // Состояние для четной недели
  const [openPopoverIdOdd, setOpenPopoverIdOdd] = useState<string | null>(null); // Состояние для нечетной недели
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
  const { isColoredDayDate } = useSettings();
  useEffect(() => {
    clearTeacherSchedule();
    const timeoutId = setTimeout(() => {
      if (disciplineType.teacher) {
        getTeacherScheduleById(disciplineType.teacher.id);
      }
    }, 200);
    return () => clearTimeout(timeoutId);
  }, [disciplineType.teacher, getTeacherScheduleById, clearTeacherSchedule]);
  const toast = useToast();
  const swiperRef = useRef<any>(null);
  const handleSwipeChange = (index: number) => {
    const parity = index === 0 ? 'even' : 'odd';
    setWeekParity(parity);
  };
  const handleTabChange = (index: number) => {
    setWeekParity(index === 0 ? 'even' : 'odd');
    swiperRef.current?.slideTo(index);
  };
  const {
    mainTextColor,
    mainElementColor,
    drawerColor,
    secondElementColor,
    secondElementLightColor,
    cardColor,
  } = useColor();
  const dayNameColor = useColorModeValue(
    `${mainElementColor}40`,
    `${mainElementColor}`
  );

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
  const renderWeekSchedule = (week: 'even' | 'odd') => {
    const openPopoverId =
      week === 'even' ? openPopoverIdEven : openPopoverIdOdd;
    return teacherSchedule[week].length > 0 ? (
      Object.values(WEEK_DAYS).map((day, index) => {
        const filteredTeacherSchedule = teacherSchedule[week].filter(
          (lesson) => lesson.number_of_day === index + 1
        );
        return (
          <Box key={day} py={2}>
            <Box
              display={'flex'}
              alignItems={'center'}
              bgColor={isColoredDayDate ? dayNameColor : ''}
              _active={{ opacity: 0.5, bgColor: 'gray.200' }}
              transition={'0.2s'}
              borderRadius={3}
              py={1}
              px={1.5}
              my={1}
              w={'fit-content'}
              color={`${mainTextColor}e6`}
              fontWeight="medium"
              fontSize="18px"
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
                  week={week}
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
      <Text padding="15px 0" textAlign={'center'}>
        Пар нет
      </Text>
    );
  };
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
        onClick={() =>
          copyToast(
            disciplineType.teacher?.name || 'Преподаватель кафедры',
            toast
          )
        }
      >
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
          index={weekParity === 'even' ? 0 : 1}
          onChange={handleTabChange}
          onScroll={() => {
            if (activeSnapPoint !== 1) {
              setActiveSnapPoint(1);
            }
          }}
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
                boxShadow: `0 0 5px 0 rgba(0, 0, 0, 0.2)`,
                borderRadius: '4px',
                bgColor: cardColor,
              }}
              fontSize={'clamp(14px, 4vw, 20px)'}
              color={secondElementColor}
              fontWeight="medium"
              onClick={() => {
                setWeekParity('even');
                handleTabChange(0);
              }}
            >
              Чётная неделя
            </Tab>
            <Tab
              _selected={{
                color: secondElementLightColor,
                boxShadow: `0 0 5px 0 rgba(0, 0, 0, 0.2)`,
                borderRadius: '4px',
                bgColor: cardColor,
              }}
              fontSize={'clamp(14px, 4vw, 20px)'}
              color={secondElementColor}
              fontWeight="medium"
              onClick={() => {
                setWeekParity('odd');
                handleTabChange(1);
              }}
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
              <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                onSlideChange={({ activeIndex }) =>
                  handleSwipeChange(activeIndex)
                }
                initialSlide={weekParity === 'even' ? 0 : 1}
                modules={[Pagination]}
                style={{ width: '100%' }}
              >
                <SwiperSlide>
                  <Box>{renderWeekSchedule('even')}</Box>
                </SwiperSlide>

                <SwiperSlide>
                  <Box>{renderWeekSchedule('odd')}</Box>
                </SwiperSlide>
              </Swiper>
            </Loader>
          </Box>
        </Tabs>
      )}
    </Box>
  );
};
