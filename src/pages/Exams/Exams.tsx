import { Box, Text, useChakra, useColorModeValue } from '@chakra-ui/react';
import styles from './Exams.module.scss';
import { useGroup } from '@/entities';
import { useEffect } from 'react';
import { ExamCard } from '@/entities';
import { DateTime } from 'luxon';
import { getTodayDate } from '@/shared';
export function Exams() {
  const { getExamsByGroupId, exams, currentGroup } = useGroup();
  const today = getTodayDate();
  const { theme } = useChakra();
  const mainTextColor = useColorModeValue(
    theme.colors.light.main_text,
    theme.colors.dark.main_text
  );
  const getFormattedDate = (date: string) => {
    const newDate = DateTime.fromISO(date)
      .setLocale('ru')
      .toFormat('d MMMM yyyy');
    return newDate;
  };
  useEffect(() => {
    if (currentGroup?.id) {
      getExamsByGroupId(currentGroup?.id, {
        academic_year: '2023-2024',
        academic_year_half: 2,
      });
    }
  }, [getExamsByGroupId, currentGroup]);
  return (
    <Box className={styles['exams']}>
      {exams.length > 0 ? (
        exams.map((exam) => (
          <Box display="flex" flexDirection="column" gap="3px">
            <Text color={mainTextColor} fontWeight="regular" fontSize="18px">
              {exam.parsed_date
                ? getFormattedDate(exam.parsed_date)
                : exam.original_date}
            </Text>
            <div className={styles['exam__timeline']}>
              <div className={styles['exam__timeline-stub']} />
              <div className={styles['exam__timeline-part']}>
                <Box
                  bgColor={
                    exam.parsed_date && today >= exam.parsed_date
                      ? '#3182ce80'
                      : '#3182ce'
                  }
                  className={styles['exam__timeline-part-line']}
                ></Box>
              </div>
            </div>
            <ExamCard key={exam.id} exam={exam} />
          </Box>
        ))
      ) : (
        <Text fontWeight="medium" textAlign="center" color={mainTextColor}>
          Список экзаменов ещё не обновили!
        </Text>
      )}
    </Box>
  );
}
