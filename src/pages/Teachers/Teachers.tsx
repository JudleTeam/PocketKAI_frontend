import { useGroup } from '@/entities';
import { Box, Text, useChakra } from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/react';
import styles from './Teachers.module.scss';
import { TeacherCard } from '@/entities';
import { useEffect, useRef, useState } from 'react';
import { sliceLessonName } from '@/entities';
import { ArrowIcon } from '@/shared/assets';
export function Teachers() {
  const { theme } = useChakra();
  const mainTextColor = useColorModeValue(
    theme.colors.light.main_text,
    theme.colors.dark.main_text
  );
  const mainColor = useColorModeValue(
    theme.colors.light.main,
    theme.colors.dark.main
  );
  const mainElementColor = useColorModeValue(
    theme.colors.light.main_element,
    theme.colors.dark.main_element
  );
  const {
    currentGroup,
    groupDisciplines,
    groupDisciplinesStatus,
    getGroupDisciplines,
  } = useGroup();
  const [showButton, setShowButton] = useState(false);
  const teacherRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const currentRef = teacherRef.current;
    const handleScroll = () => {
      if (currentRef && currentRef.scrollTop > 200) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    console.log(teacherRef.current);
    if (currentRef) {
      currentRef.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);
  useEffect(() => {
    if (currentGroup && groupDisciplinesStatus === 'idle') {
      getGroupDisciplines(currentGroup.id);
    }
  }, [currentGroup, groupDisciplinesStatus, getGroupDisciplines]);
  return (
    <Box id="teacher" ref={teacherRef} className={styles['teachers']}>
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
              <Text color={mainTextColor} fontWeight="bold" fontSize="16px">
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
      {showButton && (
        <Box
          as="button"
          onClick={() => teacherRef.current?.scrollTo(0, 0)}
          w="40px"
          h="40px"
          borderRadius="8px"
          position="fixed"
          bottom="80px"
          right="5%"
          bgColor={mainElementColor}
          zIndex={'50'}
        >
          <ArrowIcon w="20px" h="20px" color="white"></ArrowIcon>
        </Box>
      )}
    </Box>
  );
}
