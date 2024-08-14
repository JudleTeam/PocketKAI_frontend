import {
  Box,
  Text,
  Avatar,
  useColorModeValue,
  useChakra,
} from '@chakra-ui/react';
import { ArrowIcon } from '@/shared/assets';
import { LessonTypes } from '@/shared/constants';
import { useDisclosure } from '@chakra-ui/react';
import { TeacherDrawer } from '../TeacherDrawer/TeacherDrawer';
import React, { memo, useEffect } from 'react';
import { TeacherDisciplineType } from '../../model/types';
import { Drawer } from 'vaul';

export const TeacherCard = memo(function TeacherCard({
  disciplineType,
  disciplineName,
}: {
  disciplineType: TeacherDisciplineType;
  disciplineName: string;
}) {
  const { isOpen, onOpen } = useDisclosure();
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
    if (location.hash.slice(1) === disciplineType.teacher?.id) {
      onOpen();
    }
  }, [disciplineType.teacher?.id, onOpen]);
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
    <Drawer.Root snapPoints={[0.6, 1]} fadeFromIndex={0}>
      <Drawer.Trigger asChild>
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
              <Box
                color={mainTextColor}
                fontWeight="medium"
                fontSize="14px"
                display="flex"
                flexWrap="wrap"
                gap="0 10px"
              >
                {disciplineType.parsed_types
                  ? disciplineType.parsed_types.map((parsed_type) => (
                      <React.Fragment key={parsed_type}>
                        {LessonTypes && LessonTypes[parsed_type]}{' '}
                      </React.Fragment>
                    ))
                  : disciplineType.original_types.map((original_type) => (
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
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 z-20" />
        <Drawer.Content
          className={
            'flex flex-col ' +
            'bg-white rounded-t-[25px] ' +
            'mt-24 z-20 ' +
            'h-[100%] max-h-[100%] ' +
            'fixed bottom-0 left-0 right-0 ' +
            'md:max-w-[550px] md:mx-auto lg:max-w-[50vw]'
          }
        >
          <Drawer.Handle className="mt-2 w-2 h-2 bg-black" />
          <TeacherDrawer
            disciplineName={disciplineName}
            disciplineType={disciplineType}
          />
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
});
