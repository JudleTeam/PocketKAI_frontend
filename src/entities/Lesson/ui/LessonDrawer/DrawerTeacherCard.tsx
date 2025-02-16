import { Lesson } from '@/shared';
import { useColor } from '@/shared/lib';
import { Avatar, Box, Text } from '@chakra-ui/react';
import { HashLink } from 'react-router-hash-link';

export function DrawerTeacherCard({ lesson }: { lesson: Lesson }) {
  const { cardColor, mainColor, accentColor } = useColor();
  return (
    <Box
      as={HashLink}
      to={
        lesson.teacher
          ? `/teachers#${lesson?.teacher?.id}&${lesson.discipline.id}`
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
          {lesson?.teacher?.name
            ? lesson.teacher.name
            : 'Преподаватель кафедры'}
        </Text>
        <Text fontSize="12px" fontWeight="medium">
          {lesson.department?.name}
        </Text>
      </Box>
    </Box>
  );
}
