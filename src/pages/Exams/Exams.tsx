import { Box, Text, useChakra, useColorModeValue } from '@chakra-ui/react';
import styles from './Exams.module.scss';
import { useGroup } from '@/entities';
import { useEffect } from 'react';
import { ExamCard } from '@/entities';
import { DateTime } from 'luxon';
import { getTodayDate } from '@/shared';
import { lessonStateIcons } from '@/shared/constants';
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
      getExamsByGroupId(currentGroup?.id);
    }
  }, [getExamsByGroupId, currentGroup]);
  return (
    <Box className={styles['exams']}>
      <Text
        fontSize="22px"
        padding="5px 0"
        fontWeight="medium"
        color={mainTextColor}
      >
        Экзамены
      </Text>
      {exams.length > 0 ? (
        exams.map((exam, index) => (
          <Box key={exam.id} display="flex" flexDirection="column" gap="3px">
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
            {exams.length - 1 === index ? (
              <Box display="flex" flexDirection="column" gap="10px">
                <div className={styles['exam__timeline']}>
                  <div className={styles['exam__timeline-stub']} />
                  <div className={styles['exam__timeline-part']}>
                    <Box
                      bgColor={'#3182ce'}
                      className={styles['exam__timeline-part-line']}
                    ></Box>
                    <Box display='flex' justifyContent={'center'} alignItems={'center'}>{lessonStateIcons['upcoming']}</Box>
                  </div>
                  <Box>
                    <Box className={styles['exam__timeline-part-line']}></Box>
                    <Text
                      fontSize="16px"
                      fontWeight="bold"
                      textAlign="center"
                      padding="3px 0"
                      color={mainTextColor}
                    >
                      Каникулы
                    </Text>
                  </Box>
                </div>
              </Box>
            ) : null}
          </Box>
        ))
      ) : currentGroup ? (
        <Text fontWeight="medium" textAlign="center" color={mainTextColor}>
          Список экзаменов ещё не обновили!
        </Text>
      ) : (
        <Box
          position="absolute"
          top="50%"
          left="50%"
          zIndex="2"
          transform="translate(-50%, -50%)"
          fontSize="20px"
          color={mainTextColor}
        >
          Выберите группу
        </Box>
      )}
    </Box>
  );
}
