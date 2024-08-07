import {
  Box,
  Text,
  Divider,
  Avatar,
  useColorModeValue,
  useChakra,
} from '@chakra-ui/react';
import { ArrowIcon } from '@/shared/assets';
import { LessonTypes } from '@/shared/constants';
import { DisciplineTypes } from '@/shared';
import { UiDrawer } from '@/shared/ui/ui-drawer/UiDrawer';
import { useDisclosure } from '@chakra-ui/react';
import { TeacherDrawer } from '../TeacherDrawer/TeacherDrawer';
import { memo, useEffect } from 'react';

export const TeacherCard = memo(function TeacherCard({
  disciplineType,
  disciplineName,
}: {
  disciplineType: DisciplineTypes;
  disciplineName: string;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const mainTextColor = useColorModeValue('light.main_text', 'dark.main_text');
  const mainElementColor = useColorModeValue('light.main_element', 'dark.main_element')
  const themeColor = useColorModeValue( '#858585','#0E1117')
  const {theme} = useChakra()
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
    <Box>
      <Box
        onClick={onOpen}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        padding="10px 0"
      >
        <Box display="flex" gap="10px" alignItems="center">
          <Avatar bg={mainElementColor} />
          <Box>
            <Text color={mainTextColor} fontWeight="medium" fontSize="14px">
              {disciplineType.teacher?.name ?? 'Преподаватель кафедры'}
            </Text>
            <Text color={mainTextColor} fontWeight="medium" fontSize="14px">
              {disciplineType.parsed_type
                ? LessonTypes && LessonTypes[disciplineType.parsed_type]
                : disciplineType.original_type}
            </Text>
            <Box fontSize="14px"></Box>
          </Box>
        </Box>
        <ArrowIcon transform="rotate(90deg)"></ArrowIcon>
      </Box>
      <Divider></Divider>
      <UiDrawer
        isOpen={isOpen}
        onClose={onClose}
        drawerActions={
          <TeacherDrawer
            disciplineName={disciplineName}
            disciplineType={disciplineType}
          />
        }
      />
    </Box>
  );
});
