import { Text, useDisclosure, VStack, 
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,Button,
  Box,
  Input,
  Heading, 
  HStack, Stack,Divider,
  RadioGroup, Radio,
} from '@chakra-ui/react';
import styles from './schedule-layout.module.scss';
import { DateTime } from 'luxon';
import { useSchedule } from '../../model/schedule.store';
import { useEffect } from 'react';
import { DatebarActions } from '@/widgets';
import { Datebar } from '@/shared/ui/ui-datebar/Datebar';
import { Select } from '@/widgets';
import { UiModal } from '@/shared/ui/ui-modal/UiModal';
import { SelectGroupAction } from '@/widgets';

export function ScheduleLayout() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const todayDate = DateTime.now().setLocale('ru').toFormat('d MMMM');
  const { weekSchedule, getWeekScheduleByName } = useSchedule();

  console.log(weekSchedule);
  useEffect(() => {
    getWeekScheduleByName('6210');
  }, []);
  return (
    <div className={styles['schedule']}>
      <div className={styles['schedule__header']}>
        <VStack
          alignItems={'flex-start'}
          gap={0.5}
          className={styles['schedule__current-date']}
        >
          <Text>{todayDate}</Text>
          <Text>Чётная неделя</Text>
        </VStack>
        <Select isOpen={isOpen} onOpen={onOpen}></Select>
      </div>
      <div className={styles['schedule__navigation']}>
        <Datebar datebarActions={DatebarActions}/>
      </div>
      <div className={styles['schedule__content']}></div>
      <UiModal isOpen={isOpen} onClose={onClose} modalActions={() => SelectGroupAction(onClose)} />
    </div>
  );
}