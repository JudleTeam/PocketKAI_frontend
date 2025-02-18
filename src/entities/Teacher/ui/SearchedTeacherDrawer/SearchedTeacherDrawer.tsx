import { Text, Box, Tabs, useToast, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import {
  AnalyticsEvent,
  ClickSource,
  copyToast,
  getStatusTeacher,
  TabListHeader,
  Teacher,
  weekParityId,
} from '@/shared';
import { useEffect, useRef, useState } from 'react';
import { useTeachers } from '../../model/teacher.store';
import { getWeekParity, useColor } from '@/shared/lib';
import { Loader } from '@/shared/ui/loader/Loader';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Swiper as SwiperInstance } from 'swiper/types';
import WeekTeacherSchedule from '../TeacherDrawer/components/WeekTeacherSchedule';
import { useYaMetrika } from '@/entities/YaMetrika';

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
  const {
    teacherScheduleStatus,
    getTeacherScheduleById,
    backgroundTask,
    getBackgroundTaskStatus,
    isReady,
  } = useTeachers();
  const [isSchedule, setIsSchedule] = useState<boolean>(false);
  const toast = useToast();
  const { sendEvent } = useYaMetrika();
  const swiperRef = useRef<SwiperInstance | null>(null);

  const handleSwipeChange = (index: number) => {
    const parity = index === 0 ? 'even' : 'odd';
    setWeekParity(parity);
  };
  const handleTabChange = (index: number) => {
    setWeekParity(index === 0 ? 'even' : 'odd');
    swiperRef.current?.slideTo(index);
  };
  const { primaryColor, secondaryColor, accentColor } = useColor();

  useEffect(() => {
    if (isSchedule) {
      if (
        teacher &&
        (teacherScheduleStatus === 'idle' ||
          backgroundTask?.status === 'SUCCESS')
      ) {
        getTeacherScheduleById(teacher.id);
      }
    }
  }, [teacher, getTeacherScheduleById, backgroundTask, isSchedule]);

  useEffect(() => {
    if (!backgroundTask) return;
    const getStatuses = () => {
      if (
        backgroundTask.status !== 'SUCCESS' &&
        backgroundTask.status !== 'FAILED'
      ) {
        getBackgroundTaskStatus(backgroundTask.id);
      }
    };

    const isSomeNotEnded =
      backgroundTask.status === 'PENDING' ||
      backgroundTask.status === 'STARTED' ||
      backgroundTask.status === 'IDLE';

    //eslint-disable-next-line
    let intervalId: any;

    if (teacherScheduleStatus === 'success' && isSomeNotEnded) {
      intervalId = setInterval(() => {
        getStatuses();
      }, 2000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [getBackgroundTaskStatus, backgroundTask, teacherScheduleStatus]);

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
        onClick={() => {
          copyToast(teacher?.name || 'Преподаватель кафедры', toast);
          sendEvent(AnalyticsEvent.teacherCopyName, {
            click_source: ClickSource.foundTeachers,
          });
        }}
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
          onClick={() =>
            sendEvent(AnalyticsEvent.lessonReport, {
              click_source: ClickSource.foundTeachers,
            })
          }
        >
          Сообщить об ошибке
        </Text>
      </Box>
      {!isSchedule && teacher && !teacher.id.includes('default') && (
        <Button
          onClick={() => setIsSchedule(true)}
          bgColor={secondaryColor}
          borderRadius="32px"
          paddingY="23px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap="15px"
        >
          <Text fontSize="16px" color={accentColor} fontWeight="medium">
            Показать расписание
          </Text>
        </Button>
      )}
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
          {isSchedule && (
            <>
              <TabListHeader top="0" handleTabChange={handleTabChange} />
              <Box
                minH={200}
                mb={'50px'}
                onClick={(e) => e.stopPropagation()}
                display="flex"
                flexDirection="column"
                pt={'10px'}
                gap="10px"
                position="relative"
              >
                <Loader
                  teacherId={teacher.id}
                  status={getStatusTeacher(
                    backgroundTask,
                    teacherScheduleStatus,
                    isReady
                  )}
                  idleMessage=""
                >
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
            </>
          )}
        </Tabs>
      )}
    </Box>
  );
}
