import {
  Box,
  Text,
  Avatar
} from '@chakra-ui/react';
import { ArrowIcon } from '@/shared/assets';
import { LessonTypes } from '@/shared/constants';
import { TeacherDrawer } from '../TeacherDrawer/TeacherDrawer';
import React, { memo, useEffect } from 'react';
import { TeacherDisciplineType } from '../../model/types';
import { Drawer, DrawerContent, DrawerTrigger } from '@/shared/ui/drawer';
import { useColor, useDisclosure } from '@/shared/lib';

export const TeacherCard = memo(function TeacherCard({
  disciplineType,
  disciplineName,
}: {
  disciplineType: TeacherDisciplineType;
  disciplineName: string;
}) {
  const { isOpen, setIsOpen, onOpen } = useDisclosure();

  const {mainTextColor, themeColor, mainColor, mainElementColor} = useColor();
  useEffect(() => {
    if (!isOpen && location.hash.slice(1) === disciplineType.teacher?.id) {
      onOpen();
    }
  }, [disciplineType.teacher?.id, isOpen, onOpen]);
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
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <div
          className="flex justify-between items-center py-[10px]"
          id={disciplineType.teacher?.id}
          onClick={() => setIsOpen(true)}
        >
          <div className="flex items-center gap-[10px]">
            <Avatar bg={mainElementColor} />
            <div>
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
            </div>
          </div>
          <ArrowIcon transform="rotate(90deg)" />
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <TeacherDrawer
          disciplineName={disciplineName}
          disciplineType={disciplineType}
        />
      </DrawerContent>
    </Drawer>
  );
});
