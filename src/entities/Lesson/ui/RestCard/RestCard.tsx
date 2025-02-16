import { HStack, Text, Box } from '@chakra-ui/react';
import styles from './RestCard.module.scss';
import { getRestState } from '../../lib/getRestState';
import { lessonStateIcons } from '@/shared/constants';
import { useColor } from '@/shared';

export function RestCard({ dayDate }: { dayDate: string }) {
  const { primaryColor } = useColor();
  return (
    <HStack className={styles['rest-card']} alignItems="flex-start">
      <div className={styles['rest-card__time']}>
        <p className={styles['rest-card__time--start']}>13:30</p>
      </div>
      <div className={styles['rest-card__timeline']}>
        {lessonStateIcons[getRestState(dayDate).state]}
        {/* {lessonStateLine(getRestState(dayDate).color)} */}
        <Box
          bgColor={getRestState(dayDate).color}
          className={styles['rest-card__timeline-line']}
        ></Box>
      </div>
      <div className={styles['rest-card__info']}>
        <Text
          color={primaryColor}
          fontWeight="bold"
          lineHeight={1.3}
          className={styles['rest-card__name']}
        >
          Время отдыхать
        </Text>
      </div>
    </HStack>
  );
}
