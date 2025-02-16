import { ExamType, useColor } from '@/shared';
import { HStack, Text } from '@chakra-ui/react';
import { getLessonBuilding } from '@/shared/lib';
import { getExamState } from '../../lib/getExamState';
import { lessonStateIcons } from '@/shared/constants';
import { examStateLine } from '../../constants/examStateLine';
import { DateTime } from 'luxon';
import styles from './ExamCard.module.scss';
import { ExamDrawer } from '../ExamDrawer/ExamDrawer';
import { Drawer, DrawerContent, DrawerTrigger } from '@/shared/ui/drawer';
import { useDisclosure } from '@/shared/lib';
import { useMetaThemeColor } from '@/shared';
export function ExamCard({ exam }: { exam: ExamType }) {
  const { isOpen, setIsOpen } = useDisclosure();
  const { primaryColor, themeColor, mainColor } = useColor();

  useMetaThemeColor(mainColor, isOpen, themeColor);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <HStack
          onClick={() => setIsOpen(true)}
          className={styles['exam-card']}
          alignItems="flex-start"
          transition="0.2s"
          _active={{ opacity: 0.5, transition: '0.2s' }}
        >
          <div className={styles['exam-card__time']}>
            <Text
              className={styles['exam-card__time--start']}
              color={primaryColor}
            >
              {exam.time
                ? DateTime.fromISO(exam.time).toFormat('HH:mm')
                : 'Н/Д'}
            </Text>
          </div>
          <div className={styles['exam-card__timeline']}>
            {lessonStateIcons[getExamState(exam).state]}
            {examStateLine(getExamState(exam).color)}
          </div>
          <div className={styles['exam-card__info']}>
            <Text
              color={primaryColor}
              fontWeight="bold"
              lineHeight={1.3}
              className={styles['exam-card__name']}
              noOfLines={2}
            >
              {exam.discipline.name}
            </Text>
            <Text color={primaryColor} fontWeight={'medium'}>
              {getLessonBuilding(exam.building_number, exam.audience_number)}
            </Text>
          </div>
        </HStack>
      </DrawerTrigger>
      <DrawerContent>
        <ExamDrawer exam={exam} />
      </DrawerContent>
    </Drawer>
  );
}
