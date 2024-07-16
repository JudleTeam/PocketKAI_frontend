import { Text, useDisclosure, VStack } from '@chakra-ui/react';
import { DateTime } from 'luxon';
import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { UiDatebar } from '@/shared/ui/ui-datebar/UiDatebar';
import { DatebarContent } from '../datebar-content/DatebarContent';
import styles from './AppLayout.module.scss';
import { UiModal } from '@/shared/ui/ui-modal/UiModal';
import { SelectGroupAction } from '@/entities';
import { UiSelect } from '@/shared/ui/ui-select/Select';
export type ContextType = [
  string,
  React.Dispatch<React.SetStateAction<string>>
];

export function AppLayout() {
  const todayDate = DateTime.now().setLocale('ru').toFormat('d MMMM');
  const { isOpen, onOpen, onClose } = useDisclosure();
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
        <UiSelect isOpen={isOpen} onOpen={onOpen} />
        {/* <a href={`#${currentDay}`}>Перейти</a> */}
      </div>
      {!isTeachers && <UiDatebar datebarContent={DatebarContent} />}
      <div className={styles['app-layout__content']}>
        <Outlet context={[currentDay, setCurrentDay] satisfies ContextType} />
      </div>
      <UiModal
        isOpen={isOpen}
        onClose={onClose}
        modalActions={() => SelectGroupAction(onClose)}
      />
    </div>
  );
}
