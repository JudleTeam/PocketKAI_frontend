import { useGroup } from '@/entities';
import { Box, Text, useChakra } from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/react';
import styles from './Teachers.module.scss';
import { TeacherCard } from '@/entities';
import { useEffect } from 'react';
import { sliceLessonName } from '@/entities';
export function Teachers() {
  const { theme } = useChakra();
  const mainTextColor = useColorModeValue('light.main_text', 'dark.main_text');
  const mainColor = useColorModeValue(
    theme.colors.light.main,
    theme.colors.dark.main
  );
  const { currentGroup, groupDisciplines, getGroupDisciplines } = useGroup();
  useEffect(() => {
    if (currentGroup) {
      getGroupDisciplines(currentGroup.id);
    }
  }, [getGroupDisciplines, currentGroup]);
  return (
    <Box className={styles['teachers']}>
      {currentGroup ? (
        <Text
          position="fixed"
          w="100%"
          zIndex="1"
          boxShadow={`0px 0px 10px 10px ${mainColor}`}
          bgColor={mainColor}
          fontSize="20px"
          fontWeight="bold"
          color={mainTextColor}
        >
          Преподаватели гр. {currentGroup?.group_name}
        </Text>
      ) : null}
      <Box
        padding="40px 0 10px 0"
        display="flex"
        flexDirection="column"
        gap="10px"
      >
        {groupDisciplines ? (
          groupDisciplines.map((discipline) => (
            <Box key={discipline.id}>
              <Text color={mainTextColor} fontWeight="medium" fontSize="16px">
                {sliceLessonName(discipline.name)}
              </Text>
              {discipline.types.map((disciplineType, index) => (
                <TeacherCard
                  disciplineType={disciplineType}
                  disciplineName={discipline.name}
                  key={index}
                />
              ))}
            </Box>
          ))
        ) : (
          <Box
            position="absolute"
            top="50%"
            left="50%"
            zIndex="2"
            transform="translate(-50%, -50%)"
            fontSize="18px"
            fontWeight="medium"
            color={mainTextColor}
          >
            Выберите группу!
          </Box>
        )}
      </Box>
    </Box>
  );
}
