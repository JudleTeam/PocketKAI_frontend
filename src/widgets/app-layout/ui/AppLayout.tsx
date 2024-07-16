import { Select, Text, VStack } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { UiDatebar } from '@/shared/ui/ui-datebar/UiDatebar';
import { DatebarContent } from '../datebar-content/DatebarContent';
import styles from './AppLayout.module.scss';

export type ContextType = [
  string,
  React.Dispatch<React.SetStateAction<string>>
];

export function AppLayout() {
  const todayDate = DateTime.now().setLocale('ru').toFormat('d MMMM');

  const [currentDay, setCurrentDay] = useState<string>(
    DateTime.now().toFormat('yyyy-LL-dd')
  );
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
          <Text fontSize={22}>{todayDate}</Text>
          <Text>Чётная неделя</Text>
        </VStack>
        <Select
          w="50%"
          placeholder="Опции"
          className={styles['app-layout__select']}
        >
          <option value="group">Добавить группу</option>
          <option value="exams">Расписание экзаменов</option>
          <option value="schedule">Полное расписание</option>
        </Select>
        {/* <a href={`#${currentDay}`}>Перейти</a> */}
      </div>
      {!isTeachers && <UiDatebar datebarContent={DatebarContent} />}
      <div className={styles['app-layout__content']}>
        <Outlet context={[currentDay, setCurrentDay] satisfies ContextType} />
      </div>
    </div>
  );
}
