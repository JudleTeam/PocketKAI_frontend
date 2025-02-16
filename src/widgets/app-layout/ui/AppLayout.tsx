import { Text, Box, useDisclosure, VStack, useColorModeValue, useColorMode } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { SelectGroup } from '@/features';
import { useGroup, useSchedule, useSettings } from '@/entities';

import logoLight from '@/shared/assets/images/logo_light.png'
import logoDark from '@/shared/assets/images/logo_dark.png'
import {
  UiDatebar,
  getTodayDate,
  parityTypes,
  scrollToToday,
  useColor,
  useMetaThemeColor,
} from '@/shared';
import { BadgeContent } from '../badge/BadgeContent';
import { useScrollSpy } from '../lib/useScrollSpy';
import { DatebarContent } from '../datebar/DatebarContent';
import s from './AppLayout.module.scss';

export type ContextType = [
  string,
  React.Dispatch<React.SetStateAction<string>>,
];

export function AppLayout() {
  const [currentDay, setCurrentDay] = useState<string>(
    DateTime.now().setZone('Europe/Moscow').toFormat('yyyy-LL-dd')
  );
  const { colorMode } = useColorMode()
  const { mainColor, primaryColor, themeColor } = useColor();
  const { isOpen } = useDisclosure();
  const { currentGroup, updateHiddenLesson } = useGroup();
  const {
    schedule,
    parity,
    weekScheduleStatus,
    getSchedule,
    getFullWeekScheduleById,
    getWeekParity,
    backgroundTask,
    getBackgroundTaskStatus,
  } = useSchedule();
  const swiperRef = useScrollSpy(schedule, setCurrentDay);
  const location = useLocation();
  const today = getTodayDate();

  useMetaThemeColor(mainColor, isOpen, themeColor);

  const isNotDatebar =
    location.pathname.includes('teachers') ||
    location.pathname.includes('schedule/full') ||
    location.pathname.includes('schedule/exams') ||
    location.pathname.includes('hidden');

  useEffect(() => {
    const weekAgo = DateTime.now()
      .setZone('Europe/Moscow')
      .startOf('week')
      .minus({ days: 7 })
      .toFormat('yyyy-LL-dd');
    const days_count = 21;

    if (currentGroup && weekScheduleStatus === 'idle') {
      getFullWeekScheduleById(currentGroup.id).then(() => {
        getSchedule({
          date_from: weekAgo,
          days_count,
        }).then(() => {
          scrollToToday(false);
        });
        5;
      });
    }
    if (
      currentGroup &&
      backgroundTask &&
      backgroundTask?.status === 'SUCCESS'
    ) {
      getFullWeekScheduleById(currentGroup.id).then(() => {
        getSchedule({
          date_from: weekAgo,
          days_count,
        }).then(() => {
          scrollToToday(false);
        });
        5;
      });
    }
  }, [
    currentGroup,
    weekScheduleStatus,
    getSchedule,
    getWeekParity,
    getFullWeekScheduleById,
    backgroundTask,
  ]);

  useEffect(() => {
    updateHiddenLesson(today);
  }, [updateHiddenLesson, today, weekScheduleStatus]);

  useEffect(() => {
    if (!backgroundTask) return;
    console.log(backgroundTask);
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

    if (weekScheduleStatus === 'success' && isSomeNotEnded) {
      intervalId = setInterval(() => {
        getStatuses();
      }, 2000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [getBackgroundTaskStatus, backgroundTask, weekScheduleStatus]);

  useEffect(() => {
    document.getElementById(currentDay)?.scrollIntoView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <Box
      className={s.root}
      data-tour="1"
      scrollPaddingTop={
        location.pathname.includes('schedule/full') ? '240px' : '160px'
      }
    >
      <Box
        className={s.root__content}
        bgColor={mainColor}
        boxShadow={{ base: 'none', md: `0px 5px 5px 5px ${mainColor}` }}
        gap={{ base: 0, md: 1 }}
      >
        <Box px={5} py={1} className={s.root__header} bgColor={mainColor}>
          <Box className={s['root__info']}>
            <VStack
              className={s['root__info-text']}
              data-tour="2"
              alignItems={'flex-start'}
              gap={0.4}
              color={primaryColor}
              onClick={() => scrollToToday(true)}
            >
              <Text fontSize={'clamp(20px, 5vw, 20px)'}>
                {DateTime.now()
                  .setZone('Europe/Moscow')
                  .setLocale('ru')
                  .toFormat('d MMMM')}
              </Text>
              <Text fontSize={'clamp(14px, 4vw, 16px)'}>
                {parity && parityTypes[parity?.parity]}
              </Text>
            </VStack>
            <SelectGroup />
            <BadgeContent schedule={schedule} />
          </Box>
          <Box display={{ base: 'none', md: 'block' }} w={12}>
            <img src={colorMode === 'light' ? logoLight : logoDark} />
          </Box>
        </Box>
        <UiDatebar
          isNotDatebar={isNotDatebar}
          datebarContent={DatebarContent({
            currentDay,
            setCurrentDay,
            swiperRef,
          })}
        />
      </Box>
      <div className={s.root__outlet}>
        <Outlet context={[currentDay, setCurrentDay] satisfies ContextType} />
      </div>
    </Box>
  );
}
