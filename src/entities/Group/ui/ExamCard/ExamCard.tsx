import { ExamType } from '@/shared';
import { HStack, Text, useChakra, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import { getLessonBuilding } from '@/shared/lib';
import { getExamState } from '../../lib/getExamState';
import { lessonStateIcons } from '@/shared/constants';
import { examStateLine } from '../../constants/examStateLine';
import { DateTime } from 'luxon';
import styles from './ExamCard.module.scss';
import { ExamDrawer } from '../ExamDrawer/ExamDrawer';
import { UiDrawer } from '@/shared/ui/ui-drawer/UiDrawer';
import { useEffect } from 'react';
export function ExamCard({ exam }: { exam: ExamType }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { theme } = useChakra();
  const mainTextColor = useColorModeValue(
    theme.colors.light.main_text,
    theme.colors.dark.main_text
  );
  const themeColor = useColorModeValue( '#858585','#0E1117')
  const mainColor = useColorModeValue(theme.colors.light.main, theme.colors.dark.main)
  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      if (isOpen) {
        metaThemeColor.setAttribute('content', themeColor);
      } else {
        metaThemeColor.setAttribute('content', mainColor);
      }
      console.log(metaThemeColor.getAttribute('content'));
    }
  }, [themeColor, mainColor, isOpen]);

  return (
    <>
      <HStack
        className={styles['exam-card']}
        alignItems="flex-start"
        onClick={onOpen}
      >
        <div className={styles['exam-card__time']}>
          <Text
            className={styles['exam-card__time--start']}
            color={mainTextColor}
          >
            {exam.time ? DateTime.fromISO(exam.time).toFormat('HH:mm') : 'Н/Д'}
          </Text>
        </div>
        <div className={styles['exam-card__timeline']}>
          {lessonStateIcons[getExamState(exam).state]}
          {examStateLine(getExamState(exam).color)}
        </div>
        <div className={styles['exam-card__info']}>
          <Text
            color={mainTextColor}
            fontWeight="bold"
            lineHeight={1.3}
            className={styles['exam-card__name']}
          >
            {exam.discipline.name}
          </Text>
          <Text color={mainTextColor} fontWeight={'medium'}>
            {getLessonBuilding(exam.building_number, exam.audience_number)}
          </Text>
        </div>
      </HStack>
      <UiDrawer
        isOpen={isOpen}
        onClose={onClose}
        drawerActions={ExamDrawer({ exam })}
      />
    </>
  );
}
