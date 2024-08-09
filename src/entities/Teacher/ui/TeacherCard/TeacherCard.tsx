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
import { UiDrawer } from '@/shared/ui/ui-drawer/UiDrawer';
import { useDisclosure } from '@chakra-ui/react';
import { TeacherDrawer } from '../TeacherDrawer/TeacherDrawer';
import React, { memo, useEffect } from 'react';
import { TeacherDisciplineType } from '../../model/types';

export const TeacherCard = memo(function TeacherCard({
  disciplineType,
  disciplineName,
}: {
  disciplineType: TeacherDisciplineType;
  disciplineName: string;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const mainTextColor = useColorModeValue('light.main_text', 'dark.main_text');
  const mainElementColor = useColorModeValue(
    'light.main_element',
    'dark.main_element'
  );
  const themeColor = useColorModeValue('#858585', '#0E1117');
  const { theme } = useChakra();
  const mainColor = useColorModeValue(
    theme.colors.light.main,
    theme.colors.dark.main
  );
  useEffect(() => {
    if(location.hash.slice(1,) === disciplineType.teacher?.id){
      onOpen();
    }
  }, [disciplineType.teacher?.id, onOpen])
  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      if (isOpen) {
        metaThemeColor.setAttribute('content', themeColor);
      } else {
        metaThemeColor.setAttribute('content', mainColor);
      }
    }
  }, [themeColor, mainColor, isOpen]);
  return (
    <Box>
      <Box
        id={disciplineType.teacher?.id}
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
            <Box color={mainTextColor} fontWeight="medium" fontSize="14px" display='flex' flexWrap='wrap' gap='0 10px'>
            {disciplineType.parsed_types
                ? disciplineType.parsed_types.map(parsed_type => (
                  <React.Fragment key={parsed_type}>
                    {LessonTypes && LessonTypes[parsed_type]}{' '}
                  </React.Fragment>
                ))
                : disciplineType.original_types.map(original_type => (
                  <React.Fragment key={original_type}>
                    {original_type}{' '}
                  </React.Fragment>
                ))}
            </Box>
            <Box fontSize="14px"></Box>
          </Box>
        </Box>
        <ArrowIcon transform="rotate(90deg)"></ArrowIcon>
      </Box>
      <Divider />
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
