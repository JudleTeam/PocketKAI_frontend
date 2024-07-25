import {
  Text,
  Box,
  useColorModeValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { UiDatebar } from '@/shared/ui/ui-datebar/UiDatebar';
import { DatebarContent } from '../datebar/DatebarContent';
import styles from './AppLayout.module.scss';
import { UiModal } from '@/shared/ui/ui-modal/UiModal';
import { AddGroupToFavourite } from '@/features';
import { SelectGroup } from '@/features';
import { useGroup, useSchedule } from '@/entities';
import { getTodayDate } from '@/shared';
import { useScrollSpy } from '../lib/useScrollSpy';
import { parityTypes } from '@/shared/constants';

export type ContextType = [
  string,
  React.Dispatch<React.SetStateAction<string>>
];

export function AppLayout() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentDay, setCurrentDay] = useState<string>(
    DateTime.now().toFormat('yyyy-LL-dd')
  );
  const { currentGroup } = useGroup();
  const {
    schedule,
    parity,
    weekScheduleStatus: status,
    getSchedule,
    getFullWeekScheduleByName,
    getWeekParity,
  } = useSchedule();
  const swiperRef = useScrollSpy(schedule, setCurrentDay);
  const handleTodayDateClick = () => {
    document.getElementById(getTodayDate())?.scrollIntoView();
  };
  useEffect(() => {
    getWeekParity();
    const weekAgo = DateTime.now()
      .startOf('week')
      .minus({ days: 7 })
      .toFormat('yyyy-LL-dd');
    const days_count = 21;
    if (currentGroup && status === 'idle') {
      getFullWeekScheduleByName(currentGroup.group_name).then(() => {
        getSchedule({
          date_from: weekAgo,
          days_count,
        });
      });
    }
  }, [
    currentGroup,
    status,
    getSchedule,
    getWeekParity,
    getFullWeekScheduleByName,
  ]);
  const mainTextColor = useColorModeValue('light.main_text', 'dark.main_text');
  const mainColor = useColorModeValue('light.main', 'dark.main');
  const location = useLocation();
  const isNotDatebar =
    location.pathname.includes('teachers') ||
    location.pathname.includes('schedule/full');
  return (
    <div className={styles['app-layout']}>
      <Box className={styles['app-layout__header']} bgColor={mainColor}>
        <VStack
          alignItems={'flex-start'}
          fontWeight={'medium'}
          color={mainTextColor}
          gap={0.4}
          onClick={handleTodayDateClick}
        >
          <Text fontSize={22}>
            {DateTime.now().setLocale('ru').toFormat('d MMMM')}
          </Text>
          <Text>{parity && parityTypes[parity?.parity]}</Text>
        </VStack>
        <SelectGroup isOpen={isOpen} onOpen={onOpen} />
      </Box>
      <UiDatebar
        isNotDatebar={isNotDatebar}
        datebarContent={DatebarContent({
          currentDay,
          setCurrentDay,
          swiperRef,
        })}
      />
      <Outlet context={[currentDay, setCurrentDay] satisfies ContextType} />
      <UiModal
        isOpen={isOpen}
        onClose={onClose}
        modalActions={() => AddGroupToFavourite(onClose)}
      />
    </div>
  );
}
