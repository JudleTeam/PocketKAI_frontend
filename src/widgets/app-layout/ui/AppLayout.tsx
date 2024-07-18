import { Text, useDisclosure, VStack,HStack } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
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
  React.Dispatch<React.SetStateAction<string>>
];

export function AppLayout() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentDay, setCurrentDay] = useState<string>(
    DateTime.now().toFormat('yyyy-LL-dd')
  );
  const currentDateBySchedule = () => {
    const currentDate = DateTime.now()
    const WeekAgo = currentDate.minus({ days: 0 });
    return WeekAgo.toFormat('yyyy-LL-dd')
  }
  const { currentGroup } = useGroup();
  const { getScheduleByName } = useSchedule();
  useEffect(() => {
    const date_from = currentDateBySchedule()
    const days_count = 14
    if (currentGroup) {
      getScheduleByName(currentGroup.group_name, {date_from, days_count} );
    }
  }, [currentGroup, getScheduleByName]);
  const location = useLocation();
  const isTeachers = location.pathname.includes('teachers');
  return (
    <div className={styles['app-layout']}>
      <div className={styles['app-layout__header']}>
        <HStack className={styles['app-layout__header-select']}>
        <VStack
          alignItems={'flex-start'}
          fontWeight={'medium'}
          color={'blue.900'}
          gap={0.4}
        >
          <Text fontSize={22}>
            {DateTime.now().setLocale('ru').toFormat('d MMMM')}
          </Text>
          <Text>Чётная неделя</Text>
        </VStack>
        <SelectGroup isOpen={isOpen} onOpen={onOpen} />
        </HStack>
        {/* <a href={`#${currentDay}`}>Перейти</a> */}
        {!isTeachers && <UiDatebar datebarContent={DatebarContent} />}
      </div>
      <Outlet context={[currentDay, setCurrentDay] satisfies ContextType} />
      <UiModal
        isOpen={isOpen}
        onClose={onClose}
        modalActions={() => AddGroupToFavourite(onClose)}
      />
    </div>
  );
}
