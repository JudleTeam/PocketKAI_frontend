import { Text, Box, Avatar, useToast } from '@chakra-ui/react';
import { copyToast, ExamType } from '@/shared';
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';
import { getLessonBuilding, useColor } from '@/shared/lib';
import { HashLink } from 'react-router-hash-link';
export function ExamDrawer({ exam }: { exam: ExamType }) {
  const { cardColor, primaryColor, mainColor, accentColor } = useColor();
  const toast = useToast();
  return (
    <Box
      padding="25px 0 0 0"
      color={primaryColor}
      display="flex"
      flexDirection="column"
      gap="5px"
    >
      <Text
        fontSize="24px"
        fontWeight="bold"
        onClick={() => copyToast(exam.discipline.name, toast)}
        _active={{ textDecoration: 'underline', transition: '0.2s' }}
      >
        {exam.discipline.name}
      </Text>
      <Text fontSize="24px" fontWeight="medium">
        {exam.time.slice(0, -3)}
      </Text>
      <Box
        display="flex"
        justifyContent="space-between"
        fontSize="16px"
        padding="10px 0"
      >
        <Text>
          {getLessonBuilding(exam.building_number, exam.audience_number)}
        </Text>
      </Box>
      {exam.parsed_date ? (
        <Text fontWeight="medium" fontSize="18px">
          Дата проведения экзамена:{' '}
          {DateTime.fromISO(exam.parsed_date)
            .setLocale('ru')
            .toFormat('d MMMM yyyy')}
        </Text>
      ) : (
        <Text fontWeight="medium" fontSize="18px">
          Дата проведения экзамена: {exam.original_date}
        </Text>
      )}
      <Text
        as={Link}
        padding="10px 0"
        fontSize="14px"
        fontWeight="medium"
        color="orange.300"
        to="/report"
      >
        Сообщить об ошибке
      </Text>
      <Box
        as={HashLink}
        to={
          exam.teacher
            ? `/teachers#${exam?.teacher?.id}&${exam.discipline.id}`
            : '/teachers'
        }
        bgColor={cardColor}
        borderRadius="16px"
        padding="14px"
        display="flex"
        alignItems="center"
        gap="15px"
        transition="0.2s"
        _active={{ bgColor: mainColor, transition: '0.2s' }}
      >
        <Avatar bg={accentColor} />
        <Box>
          <Text fontSize="16px" fontWeight="medium">
            {exam?.teacher?.name ? exam.teacher.name : 'Преподаватель кафедры'}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
