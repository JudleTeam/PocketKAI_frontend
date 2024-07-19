import { Text, useDisclosure, VStack } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { UiDatebar } from '@/shared/ui/ui-datebar/UiDatebar';
import { DatebarContent } from '../datebar-content/DatebarContent';
import styles from './AppLayout.module.scss';
import { UiModal } from '@/shared/ui/ui-modal/UiModal';
import { AddGroupToFavourite } from '@/features';
import { SelectGroup } from '@/features';
import { useGroup, useSchedule } from '@/entities';

export type ContextType = [
  string,
  React.Dispatch<React.SetStateAction<string>>,
  MutableRefObject<any>
];

export function AppLayout() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentDay, setCurrentDay] = useState<string>(
    DateTime.now().toFormat('yyyy-LL-dd')
  );
  const currentDateBySchedule = () => {
    const currentDate = DateTime.now();
    const WeekAgo = currentDate.minus({ days: 0 });
    return WeekAgo.toFormat('yyyy-LL-dd');
  };
  const { currentGroup } = useGroup();
  const { getScheduleByName, getWeekParity, parity } = useSchedule();
  const swiperRef = useRef(null);
  useEffect(() => {
    getWeekParity();
    const date_from = currentDateBySchedule();
    const days_count = 14;
    if (currentGroup) {
      getScheduleByName(currentGroup.group_name, { date_from, days_count });
    }
  }, [currentGroup, getScheduleByName, getWeekParity]);
  const parityTypes = {
    odd: 'Нечётная неделя',
    even: 'Чётная неделя',
  };
  const location = useLocation();
  const isTeachers = location.pathname.includes('teachers');
  return (
    <div className={styles['app-layout']}>
      <div className={styles['app-layout__header']}>
        <VStack
          alignItems={'flex-start'}
          fontWeight={'medium'}
          color={'blue.900'}
          gap={0.4}
        >
          <Text fontSize={22}>
            {DateTime.now().setLocale('ru').toFormat('d MMMM')}
          </Text>
          <Text>{parity && parityTypes[parity?.parity]}</Text>
        </VStack>
        <SelectGroup isOpen={isOpen} onOpen={onOpen} />
      </div>
      {!isTeachers && (
        <UiDatebar
          datebarContent={DatebarContent({
            currentDay,
            setCurrentDay,
            swiperRef,
          })}
        />
      )}
      <Outlet
        context={[currentDay, setCurrentDay, swiperRef] satisfies ContextType}
      />
      <UiModal
        isOpen={isOpen}
        onClose={onClose}
        modalActions={() => AddGroupToFavourite(onClose)}
      />
    </div>
  );
}
