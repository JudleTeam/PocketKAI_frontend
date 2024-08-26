import {
  Text,
  Box,
  useColorModeValue,
  useDisclosure,
  VStack,
  useChakra,
} from '@chakra-ui/react';
import { DateTime } from 'luxon';
import { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { UiDatebar } from '@/shared/ui/ui-datebar/UiDatebar';
import { DatebarContent } from '../datebar/DatebarContent';
import styles from './AppLayout.module.scss';
import { UiModal } from '@/shared/ui/ui-modal/UiModal';
import { AddGroupToFavourite } from '@/features';
import { SelectGroup } from '@/features';
import { useGroup, useSchedule } from '@/entities';
import { useScrollSpy } from '../lib/useScrollSpy';
import { parityTypes } from '@/shared/constants';
import { scrollToToday } from '@/shared/lib';
import { isScheduleOutdated } from '@/entities';
import logo from '../../../shared/assets/images/logo.png';
export type ContextType = [
  string,
  React.Dispatch<React.SetStateAction<string>>
];

export function AppLayout() {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  // this is made to scroll  on certain day after navigating to other page that is not part of app layout
  const currentDayRef = useRef<string>('');
  const currentDayLocalStorage = sessionStorage.getItem('currentDay');
  const [currentDay, setCurrentDay] = useState<string>(
    currentDayLocalStorage ||
      DateTime.now().setZone('Europe/Moscow').toFormat('yyyy-LL-dd')
  );
  const { currentGroup } = useGroup();
  const {
    schedule,
    parity,
    weekScheduleStatus,
    getSchedule,
    getFullWeekScheduleByName,
    getWeekParity,
  } = useSchedule();
  const swiperRef = useScrollSpy(schedule, setCurrentDay);
  const location = useLocation();
  useEffect(() => {
    const weekAgo = DateTime.now()
      .setZone('Europe/Moscow')
      .startOf('week')
      .minus({ days: 7 })
      .toFormat('yyyy-LL-dd');
    const days_count = 21;

    if (currentGroup && weekScheduleStatus === 'idle') {
      getFullWeekScheduleByName(currentGroup.group_name).then(() => {
        getSchedule({
          date_from: weekAgo,
          days_count,
        }).then(() => {
          scrollToToday(false);
        });
      });
    }
  }, [
    currentGroup,
    weekScheduleStatus,
    getSchedule,
    getWeekParity,
    getFullWeekScheduleByName,
  ]);

  useEffect(() => {
    currentDayRef.current = currentDay;
  }, [currentDay]);

  useEffect(() => {
    document.getElementById(currentDay)?.scrollIntoView();
    return () => {
      sessionStorage.setItem('currentDay', currentDayRef.current);
    };
  }, [location.pathname]);
  const { theme } = useChakra();
  const mainTextColor = useColorModeValue('light.main_text', 'dark.main_text');
  const mainColor = useColorModeValue(
    theme.colors.light.main,
    theme.colors.dark.main
  );
  const themeColor = useColorModeValue('#858585', '#0E1117');
  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      if (isOpen) {
        metaThemeColor.setAttribute('content', themeColor);
      } else {
        metaThemeColor.setAttribute('content', mainColor);
      }
    }
  }, [themeColor, mainColor, isOpen]);
  const isNotDatebar =
    location.pathname.includes('teachers') ||
    location.pathname.includes('schedule/full') ||
    location.pathname.includes('schedule/exams');
  return (
    <div className={styles['app-layout']}>
      <Box
        bgColor={mainColor}
        pos={'fixed'}
        display={'flex'}
        flexDir={'column'}
        gap={{ base: 0, md: 4 }}
        top={0}
        left={0}
        w={'100%'}
        zIndex={20}
      >
        <Box
          px={5}
          py={2}
          boxShadow={{ base: 'none', md: '0px 0px 5px 0px rgba(0, 0, 0, 0.2)' }}
          className={styles['app-layout__header']}
          bgColor={mainColor}
        >
          <Box display={{ base: 'none', md: 'block' }} w={16}>
            <img src={logo} />
          </Box>
          <Box
            w={{ base: '100%', md: '40%' }}
            display={'flex'}
            alignItems={'center'}
            justifyContent={{ base: 'space-between', md: 'flex-end' }}
            gap={4}
          >
            <VStack
              alignItems={'flex-start'}
              fontWeight={'medium'}
              color={mainTextColor}
              gap={0.4}
              onClick={() => scrollToToday(true)}
            >
              <Text fontSize={22}>
                {DateTime.now().setLocale('ru').toFormat('d MMMM')}
              </Text>

              <Text>{parity && parityTypes[parity?.parity]}</Text>
              <Text fontSize={12} color={'#ed8936'}>
                {isScheduleOutdated(schedule.parsed_at) &&
                  'Расписание устарело'}
              </Text>
            </VStack>
            <SelectGroup onOpen={onOpen} />
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
      <div className="pt-16">
        <Outlet context={[currentDay, setCurrentDay] satisfies ContextType} />
      </div>
      <UiModal
        isOpen={isOpen}
        onClose={onClose}
        setIsOpen={onToggle}
        modalActions={() => AddGroupToFavourite(onClose)}
      />
    </div>
  );
}
