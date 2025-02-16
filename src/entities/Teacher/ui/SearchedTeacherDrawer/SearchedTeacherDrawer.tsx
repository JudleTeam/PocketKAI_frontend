import { Text, Box, Tabs, useToast } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { copyToast, TabListHeader, Teacher, weekParityId } from '@/shared';
import { useEffect, useRef, useState } from 'react';
import { useTeachers } from '../../model/teacher.store';
import { getWeekParity, useColor } from '@/shared/lib';
import { Loader } from '@/shared/ui/loader/Loader';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Swiper as SwiperInstance } from 'swiper/types';
import WeekTeacherSchedule from '../TeacherDrawer/components/WeekTeacherSchedule';

export function SearchedTeacherDrawer({
  teacher,
  setActiveSnapPoint,
  activeSnapPoint,
}: {
  teacher: Teacher;
  activeSnapPoint: number | string;
  setActiveSnapPoint: (snapPoint: number) => void;
}) {
  const [weekParity, setWeekParity] = useState<'even' | 'odd'>(getWeekParity());
  const numberParity = {
    even: 0,
    odd: 1,
  };
  const { teacherScheduleStatus, getTeacherScheduleById } = useTeachers();
  const toast = useToast();
  const swiperRef = useRef<SwiperInstance | null>(null);
  const handleSwipeChange = (index: number) => {
    const parity = index === 0 ? 'even' : 'odd';
    setWeekParity(parity);
  };
  const handleTabChange = (index: number) => {
    setWeekParity(index === 0 ? 'even' : 'odd');
    swiperRef.current?.slideTo(index);
  };
  const { primaryColor } = useColor();
  useEffect(() => {
    if (teacher) {
      getTeacherScheduleById(teacher.id);
    }
  }, [teacher, getTeacherScheduleById]);

  return (
    <Box
      h="100%"
      position="relative"
      pt={3}
      color={primaryColor}
      display="flex"
      flexDirection="column"
      gap="5px"
    >
      <Text
        fontSize="24px"
        fontWeight="bold"
        onClick={() =>
          copyToast(teacher?.name || 'Преподаватель кафедры', toast)
        }
      >
        {' '}
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
          to="/report"
        >
          Сообщить об ошибке
        </Text>
      </Box>
      {teacher && (
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
          <TabListHeader top="0" handleTabChange={handleTabChange} />
          <Box
            minH={200}
            mb={'30px'}
            onClick={(e) => e.stopPropagation()}
            display="flex"
            flexDirection="column"
            pt={'10px'}
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
                initialSlide={weekParity === 'even' ? 0 : 1}
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
}
