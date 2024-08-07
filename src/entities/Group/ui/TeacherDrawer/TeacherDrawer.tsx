import { DrawerHeader, Text, Box, useColorModeValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { LessonTypes } from '@/shared/constants';
import { DisciplineTypes } from '@/shared';
import { useEffect } from 'react';
export function TeacherDrawer({
  disciplineType,
  disciplineName,
  isOpen
}: {
  disciplineType: DisciplineTypes;
  disciplineName: string;
  isOpen: boolean
}) {
  const mainTextColor = useColorModeValue('light.main_text', 'dark.main_text');
  const themeColor = useColorModeValue( '#858585','#0E1117')
  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor && isOpen) {
      metaThemeColor.setAttribute('content', themeColor);
      console.log(metaThemeColor.getAttribute('content'))
    }
  }, [themeColor, isOpen]);
  return (
    <DrawerHeader
      w="95%"
      padding="40px 0 0 0"
      color={mainTextColor}
      display="flex"
      flexDirection="column"
      gap="5px"
    >
      <Text fontSize="24px" fontWeight="bold">
        {disciplineType.teacher?.name
          ? disciplineType.teacher?.name
          : 'Преподаватель кафедры'}
      </Text>
      <Box
        display="flex"
        flexDirection="column"
        fontSize="16px"
        padding="10px 0"
      >
        <Text color={mainTextColor}>{disciplineName}</Text>
        <Text>
          {disciplineType.parsed_type &&
            LessonTypes[disciplineType.parsed_type]}
        </Text>
      </Box>
      <Text
        as={Link}
        fontSize="14px"
        fontWeight="medium"
        color="orange.300"
        to="/account/report"
      >
        Сообщить об ошибке
      </Text>
    </DrawerHeader>
  );
}
