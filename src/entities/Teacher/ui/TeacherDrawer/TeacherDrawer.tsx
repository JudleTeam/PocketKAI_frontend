import { Text, Box, Tabs, useToast } from '@chakra-ui/react';
import {
  copyToast,
  TeachersType,
  LessonTypes,
  useColor,
  Loader,
  getWeekParity,
  weekParityId,
  TabListHeader,
} from '@/shared';
import { Link } from 'react-router-dom';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTeachers } from '../../model/teacher.store';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Swiper as SwiperInstance } from 'swiper/types';
import WeekTeacherSchedule from './components/WeekTeacherSchedule';
import s from './TeacherDrawer.module.scss';

type TeacherDrawerProps = {
  disciplineInfo: TeachersType;
  activeSnapPoint: number | string;
  setActiveSnapPoint: (snapPoint: number) => void;
};

export const TeacherDrawer: React.FC<TeacherDrawerProps> = ({
  disciplineInfo,
  activeSnapPoint,
  setActiveSnapPoint,
}) => {
  const { disciplineName, teacher, parsed_types, original_types } =
    disciplineInfo;

  const [weekParity, setWeekParity] = useState<'even' | 'odd'>(getWeekParity());
  const {
    teacherScheduleStatus,
    getTeacherScheduleById,
    clearTeacherSchedule,
  } = useTeachers();
  const { primaryColor } = useColor();
  const toast = useToast();
  const swiperRef = useRef<SwiperInstance | null>(null);

  useEffect(() => {
    clearTeacherSchedule();

    const timeoutId = setTimeout(() => {
      if (teacher && !teacher.id.includes('default')) {
        getTeacherScheduleById(teacher.id);
      }
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [teacher, getTeacherScheduleById, clearTeacherSchedule]);

  const handleSwipeChange = useCallback((index: number) => {
    const parity = index === 0 ? 'even' : 'odd';
    setWeekParity(parity);
  }, []);

  const handleTabChange = useCallback((index: number) => {
    setWeekParity(index === 0 ? 'even' : 'odd');
    swiperRef.current?.slideTo(index);
  }, []);

  return (
    <Box className={s.root} color={primaryColor}>
      <Text
        className={s.root__name}
        onClick={() =>
          copyToast(teacher?.name || 'Преподаватель кафедры', toast)
        }
      >
        {teacher?.name ? teacher?.name : 'Преподаватель кафедры'}
      </Text>
      <Box className={s.root__types}>
        <Text color={primaryColor}>{disciplineName}</Text>
        <Text display="flex" flexWrap={'wrap'} gap="0 10px">
          {parsed_types.length > 0
            ? parsed_types.map((parsed_type) => (
                <React.Fragment key={parsed_type}>
                  {LessonTypes && LessonTypes[parsed_type]}{' '}
                </React.Fragment>
              ))
            : original_types.map((original_type) => (
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
          to="/report"
        >
          Сообщить об ошибке
        </Text>
      </Box>
      {teacher && !teacher.id.includes('default') && (
        <Tabs
          variant="unstyled"
          overflowY={'auto'}
          style={{ scrollbarWidth: 'none' }}
          defaultIndex={weekParityId[weekParity]}
          index={weekParityId[weekParity]}
          onChange={handleTabChange}
          onScroll={() => {
            if (activeSnapPoint !== 1) {
              setActiveSnapPoint(1);
            }
          }}
        >
          <TabListHeader top="0" handleTabChange={handleTabChange} />
          <Box
            minH={200}
            pt={'10px'}
            mb={'30px'}
            onClick={(e) => e.stopPropagation()}
            display="flex"
            flexDirection="column"
            gap="10px"
            position="relative"
          >
            <Loader status={teacherScheduleStatus} idleMessage="">
              <Swiper
                autoHeight
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                onSlideChange={({ activeIndex }) =>
                  handleSwipeChange(activeIndex)
                }
                initialSlide={weekParityId[weekParity]}
                modules={[Pagination]}
                style={{ width: '100%' }}
              >
                {Object.keys(weekParityId).map((parity) => (
                  <SwiperSlide>
                    <Box>
                      <WeekTeacherSchedule
                        weekParity={parity as 'even' | 'odd'}
                      />
                    </Box>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Loader>
          </Box>
        </Tabs>
      )}
    </Box>
  );
};
