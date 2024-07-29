import { useGroup } from '@/entities';
import { Box, Text } from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/react';
import styles from './Teachers.module.scss';
import { TeacherCard } from '@/entities';
export function Teachers() {
  const mainTextColor = useColorModeValue('light.main_text', 'dark.main_text');
  const { lessonsCurrentGroup } = useGroup();
  return (
    <Box
      className={styles['teachers']}
      display="flex"
      flexDirection="column"
      gap="10px"
    >
      <Text fontSize="24px" fontWeight="bold" color={mainTextColor}>
        Ваши преподаватели
      </Text>
      {lessonsCurrentGroup &&
        lessonsCurrentGroup.map((lesson) => (
          <TeacherCard lesson={lesson} key={lesson.id} />
        ))}
    </Box>
  );
}
